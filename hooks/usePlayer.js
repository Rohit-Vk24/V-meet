import { useState } from 'react'
import { cloneDeep } from 'lodash'
import { useSocket } from '@/context/socket'
import { useRouter } from 'next/router'

const usePlayer = (myId, roomId, peer) => {
    const socket = useSocket()
    const [players, setPlayers] = useState({})
    const router = useRouter()
    const playersCopy = cloneDeep(players)

    const playerHighlighted = playersCopy[myId]
    delete playersCopy[myId]

    const nonHighlightedPlayers = playersCopy

    const addPlayer = (playerId) => {
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            if (!copy[playerId]) {
                copy[playerId] = {
                    muted: false,
                    playing: true,
                }
            }
            return {...copy}
        })
    }

    const leaveRoom = () => {
        socket.emit('user-leave', myId, roomId)
        console.log("leaving room", roomId)
        peer?.disconnect();
        router.push('/')
    }

    const toggleAudio = () => {
        console.log("I toggled my audio")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            if (copy[myId]) {
                copy[myId].muted = !copy[myId].muted
            } else {
                console.error(`Player with ID ${myId} not found`)
            }
            return {...copy}
        })
        socket.emit('user-toggle-audio', myId, roomId)
    }

    const toggleVideo = () => {
        console.log("I toggled my video")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            if (copy[myId]) {
                copy[myId].playing = !copy[myId].playing
            } else {
                console.error(`Player with ID ${myId} not found`)
            }
            return {...copy}
        })
        socket.emit('user-toggle-video', myId, roomId)
    }

    return { players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom, addPlayer }
}

export default usePlayer;
