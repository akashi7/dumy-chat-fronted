import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMessage, getRoomInfo, setUpSocket } from '../redux/action/action'

export default function Dashboard() {
  const { id } = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setUpSocket())
    dispatch(getRoomInfo(id))
    //eslint-disable-next-line
  }, [id])

  const payload = jwtDecode(localStorage.getItem('tok'))
  console.log({ payload })
  const { socket, rooms } = useSelector((state) => state.app)

  const [message, setMessage] = useState('')

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', localStorage.getItem('room'))
    }
    return () => {
      if (socket) {
        socket.emit('leaveRoom', localStorage.getItem('room'))
      }
    }
  }, [socket])

  function submit(e) {
    e.preventDefault()
    if (socket) {
      socket.emit('sendMessage', {
        room: localStorage.getItem('room'),
        message,
      })
      setMessage('')
    }
  }

  useEffect(() => {
    if (socket) {
      dispatch(getMessage())
    }
    //eslint-disable-next-line
  }, [rooms])

  return (
    <div>
      chat
      <div className='mains'>
        <div>
          {rooms.map((msg, idx) => {
            return (
              <div key={idx}>
                {msg.userId === payload.id ? (
                  <p style={{ color: 'dodgerblue' }}> {msg.message} </p>
                ) : (
                  <p style={{ color: 'green' }}> {msg.message} </p>
                )}
              </div>
            )
          })}
        </div>
        <footer>
          <form onSubmit={submit}>
            <input
              placeholder='message'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button>send</button>
          </form>
        </footer>
      </div>
    </div>
  )
}
