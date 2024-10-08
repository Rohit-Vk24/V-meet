import React, { useRef, useEffect, useState } from 'react';
import socket from '../../services/socket'; // Import the socket instance
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEraser } from '@fortawesome/free-solid-svg-icons';
import { faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';
import './Whiteboard.css';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  // Shared history states
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions and context attributes
    const resizeCanvas = () => {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.putImageData(imgData, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setContext(ctx);

    // Load persisted data
    const savedData = localStorage.getItem('whiteboard');
    if (savedData) {
      const img = new Image();
      img.src = savedData;
      img.onload = () => ctx.drawImage(img, 0, 0);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (context) {
      context.strokeStyle = isEraser ? '#FFFFFF' : currentColor;
      context.lineWidth = lineWidth;
    }
  }, [currentColor, lineWidth, isEraser, context]);

  useEffect(() => {
    // Listen for drawing events from other clients
    socket.on('drawing', onDrawingEvent);
    socket.on('undo', handleUndoEvent);
    socket.on('redo', handleRedoEvent);
    socket.on('clear', handleClearEvent);

    // Clean up
    return () => {
      socket.off('drawing', onDrawingEvent);
      socket.off('undo', handleUndoEvent);
      socket.off('redo', handleRedoEvent);
      socket.off('clear', handleClearEvent);
    };
  }, [context, history, redoHistory]);

  const onDrawingEvent = (data) => {
    const { x0, y0, x1, y1, color, lineWidth, isEraser } = data;
    if (!context) return;

    context.strokeStyle = isEraser ? '#FFFFFF' : color;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(x0 * canvasRef.current.width, y0 * canvasRef.current.height);
    context.lineTo(x1 * canvasRef.current.width, y1 * canvasRef.current.height);
    context.stroke();
    context.closePath();
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setLastX(offsetX);
    setLastY(offsetY);
    context.beginPath();
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!isDrawing) return;
    context.closePath();
    setIsDrawing(false);

    const dataUrl = canvasRef.current.toDataURL();
    setHistory([...history, dataUrl]);
    setRedoHistory([]);
    localStorage.setItem('whiteboard', dataUrl);

    // Emit drawing data to the socket
    socket.emit('drawing', {
      x0: lastX / canvasRef.current.width,
      y0: lastY / canvasRef.current.height,
      x1: lastX / canvasRef.current.width,
      y1: lastY / canvasRef.current.height,
      color: currentColor,
      lineWidth: lineWidth,
      isEraser: isEraser,
    });
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;

    // Draw the line
    context.lineTo(offsetX, offsetY);
    context.stroke();

    // Emit drawing data to the socket
    socket.emit('drawing', {
      x0: lastX / canvasRef.current.width,
      y0: lastY / canvasRef.current.height,
      x1: offsetX / canvasRef.current.width,
      y1: offsetY / canvasRef.current.height,
      color: currentColor,
      lineWidth: lineWidth,
      isEraser: isEraser,
    });

    setLastX(offsetX);
    setLastY(offsetY);
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setRedoHistory([last, ...redoHistory]);
    const newHistory = history.slice(0, history.length - 1);
    setHistory(newHistory);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (newHistory.length > 0) {
      const img = new Image();
      img.src = newHistory[newHistory.length - 1];
      img.onload = () => ctx.drawImage(img, 0, 0);
      localStorage.setItem('whiteboard', newHistory[newHistory.length - 1]);
    } else {
      localStorage.removeItem('whiteboard');
    }

    // Emit the undo event to everyone
    socket.emit('undo');
  };

  const handleUndoEvent = () => {
    undo();
  };

  const redo = () => {
    if (redoHistory.length === 0) return;
    const first = redoHistory[0];
    setHistory([...history, first]);
    setRedoHistory(redoHistory.slice(1));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = first;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      localStorage.setItem('whiteboard', first);
    };

    // Emit the redo event to everyone
    socket.emit('redo');
  };

  const handleRedoEvent = () => {
    redo();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setRedoHistory([]);
    localStorage.removeItem('whiteboard');
    socket.emit('clear');
  };

  const handleClearEvent = () => {
    clearCanvas();
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const changeColor = (e) => {
    setCurrentColor(e.target.value);
    setIsEraser(false);
  };

  const changeLineWidth = (e) => {
    setLineWidth(e.target.value);
  };

  return (
    <div className="whiteboard-container">
      <div className="toolbar">
      <button onClick={undo} disabled={history.length === 0}>
  <FontAwesomeIcon icon={faUndo} /> 
</button>
<button onClick={redo} disabled={redoHistory.length === 0}>
  <FontAwesomeIcon icon={faRedo} /> 
</button>
        <button onClick={toggleEraser}>
  {isEraser ? (
    <>
      <FontAwesomeIcon icon={faPen} /> 
    </>
  ) : (
    <>
      <FontAwesomeIcon icon={faEraser} /> 
    </>
  )}
</button>
        <input type="color" value={currentColor} onChange={changeColor} />
        <label>
          Line Width:
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={changeLineWidth}
          />
        </label>
        <button onClick={clearCanvas}>
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="whiteboard-canvas"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
      />
    </div>
  );
};

export default Whiteboard;
