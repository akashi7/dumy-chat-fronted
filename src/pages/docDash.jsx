import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getConvo } from '../redux/action/action'

export default function DocDash() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getConvo())
    //eslint-disable-next-line
  }, [])

  const { convo } = useSelector((state) => state.app)

  function gotToChat(id) {
    navigate(`/dashboard/${id}`)
  }

  return (
    <div>
      Dash
      <div className='chat'>
        {convo.map((conv, idx) => {
          return (
            <div
              key={idx}
              style={{
                margin: '5px',
                padding: '5px',
                backgroundColor: 'brown',
                color: 'white',
              }}
            >
              <p className='kk' onClick={() => gotToChat(conv.id)}>
                {' '}
                {conv.patient}{' '}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
