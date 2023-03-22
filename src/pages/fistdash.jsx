import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllDoctors } from '../redux/action/action'

export default function Firstdash() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllDoctors())
    //eslint-disable-next-line
  }, [])
  const { doctors } = useSelector((state) => state.app)

  function Click(id) {
    navigate(`/dashboard/${id}`)
  }

  return (
    <div>
      Dashboard
      <div className='mains'>
        <div className='chat'>
          {doctors.map((doc, idx) => {
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
                <p onClick={() => Click(doc.id)} className='kk'>
                  {doc.username}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
