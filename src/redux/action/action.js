import io from 'socket.io-client';
import { ALL_DOCTORS, CONVO, ROOM, SET_UP_SOCKET } from '../action/types';


const url = `http://localhost:5000`

export const setUpSocket = () => async (dispatch, getState) => {

  const token = localStorage.getItem('tok');
  const { app } = getState();
  const { socket } = app;

  if (token && !socket) {
    const newSocket = io(`http://localhost:5000`, { query: { token } });
    newSocket.on('connect', () => {
      console.log('connected');
    });

    newSocket.on('disconnect', () => {
      console.log('disconnected');
    });

    dispatch({
      type: SET_UP_SOCKET,
      payload: newSocket
    });

  }
};


export const getAllDoctors =()=>async(dispatch, getState)=>{
  const token = localStorage.getItem('tok');

  try {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await (await fetch(`${url}/api/patient/all-doctors`, config)).json();
    console.log({res})
    dispatch({
      type: ALL_DOCTORS,
      payload: res.data
    })
    
  } catch (error) {
    console.log(error);
  }
  
}


export const getRoomInfo=(recId,f)=>async(dispatch, getState)=>{
  const token = localStorage.getItem('tok');
  try {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await (await fetch(`${url}/api/room/get-room?id=${recId}&&type=${f?"room":""}`, config)).json();
    localStorage.setItem('room',res.data.chatRoom)
    dispatch({
      type: ROOM,
      payload: res.data.messages
    })
    
  } catch (error) {
    console.log(error);
  }
}


export const getMessage=()=>async(dispatch,getState)=>{
  const { app } = getState();
  const { socket ,rooms} = app;

  if (socket) {
    socket.on("Message", (message) => {
      console.log({message},{rooms})
      const newMessages = [...rooms, message];
      dispatch({
        type: ROOM,
        payload: newMessages
      });
    });
  }
}

export const getConvo=()=>async(dispatch,getState)=>{
  const token = localStorage.getItem('tok');

  try {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await (await fetch(`${url}/api/room/convo`, config)).json();
    dispatch({
      type: CONVO,
      payload: res.data
    })
    
  } catch (error) {
    console.log(error);
  }
}