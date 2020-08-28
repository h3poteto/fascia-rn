import {Action, Dispatch} from 'redux';
import axios from 'axios';

export const RequestUpdateSession = 'RequestUpdateSession' as const;
export const ReceiveUpdateSession = 'ReceiveUpdateSession' as const;

export const requestUpdateSession = () => ({
  type: RequestUpdateSession,
});

export const receiveUpdateSession = () => ({
  type: ReceiveUpdateSession,
});

export const updateSession = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(requestUpdateSession());
    axios.patch<{}>('https://fascia.io/session').then(() => {
      dispatch(receiveUpdateSession());
    });
  };
};

type Actions = ReturnType<
  typeof requestUpdateSession | typeof receiveUpdateSession
>;

export default Actions;
