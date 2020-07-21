import { AUTH_USER, NOT_AUTH_USER } from './types';

export const authUser = ({ id, username }) => ({
  type: AUTH_USER,
  payload: { id, username },
});

export const notAuthUser = {
  type: NOT_AUTH_USER,
};
