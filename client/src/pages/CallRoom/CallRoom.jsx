
// //CallRoom.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// import {
//   CallControls,
//   CallingState,
//   PaginatedGridLayout,
//   StreamCall,
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';
// import Whiteboard from '../../components/whiteboard/WhiteBoard';
// import VideoChatUI from '../../components/chatting/VideoChatUI';
// import socket from '../../services/socket';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './CallRoom.css';

// const apiKey = 'mmhfdzb5evj2';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0Nsb25lX0NvbW1hbmRlcl9Db2R5IiwidXNlcl9pZCI6IkNsb25lX0NvbW1hbmRlcl9Db2R5IiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MjgyMzMyNTAsImV4cCI6MTcyODgzODA1MH0.XkHOcqdwiLGjgDwzvA2cIelxgz5MXRAI5JHBHh7wVV0';
// const userId = 'Clone_Commander_Cody';
// const callId = 'S7Zg9wK9gQ0p';

//  const location = useLocation(); 
//  const userName = location.state?.name || 'User';

//  const user = {
//   id: userId,
//   name: userName,
//   image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
// };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call('default', callId);
// call.join({ create: true });

// export default function App() {

 
//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <MyUILayout />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// export const MyUILayout = () => {
//   const { useCallCallingState } = useCallStateHooks();
//   const callingState = useCallCallingState();
//   const [whiteboardActive, setWhiteboardActive] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//    // Use react-router-dom's useNavigate for navigation


//  const navigate = useNavigate();
//   if (callingState !== CallingState.JOINED) {
//     navigate('/');;
//   }

//   const toggleWhiteboard = () => {
//     setWhiteboardActive(!whiteboardActive);
//   };

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   return (
//     <StreamTheme>
//       <div className={`call-room-container ${whiteboardActive ? 'whiteboard-active' : ''}`}>
//         <div className="content-layout">
//           <div className="participants-layout">
//             <PaginatedGridLayout participantsBarPosition='bottom' />
//           </div>

//           {whiteboardActive && (
//             <Whiteboard />  
//           )}
//         </div>

//         <div className="controls-layout">
//           <button className="imgb" onClick={toggleWhiteboard}>
//             {whiteboardActive ? 'Back to Video' : 'ImagiBoard'}
//           </button>
//           <CallControls />
//           <button className="imgb" onClick={toggleDrawer}>Chat Room</button>
//         </div>

//         {/* Drawer */}
//         <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
//           <button className="close-btn" onClick={toggleDrawer}><FontAwesomeIcon icon={faXmark} /></button>
//           <div className="drawer-content">
//             <VideoChatUI socket={socket} /> {/* Add the chat UI here */}
//           </div>
//         </div>

//         {/* Backdrop (for when drawer is open) */}
//         {drawerOpen && <div className="backdrop" onClick={toggleDrawer}></div>}
//       </div>
//     </StreamTheme>
//   );
// };


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   CallControls,
//   CallingState,
//   PaginatedGridLayout,
//   StreamCall,
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';
// import Whiteboard from '../../components/whiteboard/WhiteBoard';
// import VideoChatUI from '../../components/chatting/VideoChatUI';
// import socket from '../../services/socket';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './CallRoom.css';

// const apiKey = 'mmhfdzb5evj2';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0Nsb25lX0NvbW1hbmRlcl9Db2R5IiwidXNlcl9pZCI6IkNsb25lX0NvbW1hbmRlcl9Db2R5IiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MjgyMzMyNTAsImV4cCI6MTcyODgzODA1MH0.XkHOcqdwiLGjgDwzvA2cIelxgz5MXRAI5JHBHh7wVV0';
// const userId = 'Clone_Commander_Cody';
// const callId = 'S7Zg9wK9gQ0p';

// export default function CallRoom() {
//   const location = useLocation(); // Move this inside the functional component
//   const userName = location.state?.name || 'User'; // Retrieve user name from location state
//   const navigate = useNavigate();
  
//   const user = {
//     id: userId,
//     name: userName,
//     image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
//   };

//   const [client, setClient] = useState(null);
//   const [call, setCall] = useState(null);

//   // Initialize the client and call, then join the call
//   useEffect(() => {
//     const initCall = async () => {
//       const streamClient = StreamVideoClient.getOrCreateInstance({ apiKey, user, token });

//       const streamCall = streamClient.call('default', callId);

//       await streamCall.join({ create: true });
//       setClient(streamClient);
//       setCall(streamCall);
//     };

//     initCall();
//   }, []);

//   // Ensure client and call are initialized
//   if (!client || !call) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <MyUILayout />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// export const MyUILayout = () => {
//   const { useCallCallingState } = useCallStateHooks();
//   const callingState = useCallCallingState();
//   const [whiteboardActive, setWhiteboardActive] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const navigate = useNavigate();

//   // Check if the user has joined the call
//   if (callingState !== CallingState.JOINED) {
//     return <div>Joining the call...</div>;
//   }

//   const toggleWhiteboard = () => {
//     setWhiteboardActive(!whiteboardActive);
//   };

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   return (
//     <StreamTheme>
//       <div className={`call-room-container ${whiteboardActive ? 'whiteboard-active' : ''}`}>
//         <div className="content-layout">
//           <div className="participants-layout">
//             <PaginatedGridLayout participantsBarPosition="bottom" />
//           </div>

//           {whiteboardActive && <Whiteboard />}
//         </div>

//         <div className="controls-layout">
//           <button className="imgb" onClick={toggleWhiteboard}>
//             {whiteboardActive ? 'Back to Video' : 'ImagiBoard'}
//           </button>
//           <CallControls />
//           <button className="imgb" onClick={toggleDrawer}>Chat Room</button>
//         </div>

//         {/* Drawer */}
//         <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
//           <button className="close-btn" onClick={toggleDrawer}>
//             <FontAwesomeIcon icon={faXmark} />
//           </button>
//           <div className="drawer-content">
//             <VideoChatUI socket={socket} /> {/* Add the chat UI here */}
//           </div>
//         </div>

//         {/* Backdrop (for when drawer is open) */}
//         {drawerOpen && <div className="backdrop" onClick={toggleDrawer}></div>}
//       </div>
//     </StreamTheme>
//   );
// };


import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CallControls,
  CallingState,
  PaginatedGridLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import Whiteboard from '../../components/whiteboard/WhiteBoard';
import VideoChatUI from '../../components/chatting/VideoChatUI';
import socket from '../../services/socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import './CallRoom.css';
import Loader from '../../components/Loader/Loader';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0Nsb25lX0NvbW1hbmRlcl9Db2R5IiwidXNlcl9pZCI6IkNsb25lX0NvbW1hbmRlcl9Db2R5IiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MjgyMzMyNTAsImV4cCI6MTcyODgzODA1MH0.XkHOcqdwiLGjgDwzvA2cIelxgz5MXRAI5JHBHh7wVV0';
const userId = 'Clone_Commander_Cody';
const callId = 'S7Zg9wK9gQ0p';

export default function CallRoom() {
  const location = useLocation();
  const userName = location.state?.name || 'User';
  const navigate = useNavigate();
  
  const user = {
    id: userId,
    name: userName,
    image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
  };

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  // Initialize the client and call only once
  useEffect(() => {
    const initCall = async () => {
      if (!client) {  // Avoid multiple instances
        const streamClient = StreamVideoClient.getOrCreateInstance({ apiKey, user, token });
        const streamCall = streamClient.call('default', callId);
        await streamCall.join({ create: true });
        setClient(streamClient);
        setCall(streamCall);
      }
    };

    initCall();

    // Cleanup on component unmount
    return () => {
      if (call) {
        call.leave();  // Ensure the user leaves the call when navigating away
      }
    };
  }, [client, call]);

  // Ensure client and call are initialized
  if (!client || !call) {
    return <Loader/>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout  userName={userName}/>
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = ({userName}) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [whiteboardActive, setWhiteboardActive] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // If the user has not joined the call yet, show a loading state
  if (callingState !== CallingState.JOINED) {
    navigate('/');
  }

  const toggleWhiteboard = () => {
    setWhiteboardActive(!whiteboardActive);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <StreamTheme>
      <div className={`call-room-container ${whiteboardActive ? 'whiteboard-active' : ''}`}>
        <div className="content-layout">
          <div className="participants-layout">
            <PaginatedGridLayout participantsBarPosition="bottom" />
          </div>

          {whiteboardActive && <Whiteboard />}
        </div>

        <div className="controls-layout">
          <button className="imgb" onClick={toggleWhiteboard}>
            {whiteboardActive ? 'Back to Video' : 'ImagiBoard'}
          </button>
          <CallControls />
          <button className="imgb" onClick={toggleDrawer}>Chat Room</button>
        </div>

        {/* Drawer */}
        <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
          <button className="close-btn" onClick={toggleDrawer}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="drawer-content">
            <VideoChatUI socket={socket} userName={userName}/> {/* Add the chat UI here */}
          </div>
        </div>

        {/* Backdrop (for when drawer is open) */}
        {drawerOpen && <div className="backdrop" onClick={toggleDrawer}></div>}
      </div>
    </StreamTheme>
  );
};
