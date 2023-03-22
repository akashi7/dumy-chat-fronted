import { ALL_DOCTORS, CONVO, ROOM, SET_UP_SOCKET } from '../action/types';

const initialState = {
  socket: null,
  doctors: [],
  rooms: [],
  convo: []
};

export const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_UP_SOCKET:
      return {
        ...state,
        socket: payload
      };
    case ALL_DOCTORS:
      return {
        ...state,
        doctors: payload
      }
    case ROOM:
      return {
        ...state,
        rooms: payload
      }
    case CONVO:
      return {
        ...state,
        convo: payload
      }
    default:
      return state;
  }

};