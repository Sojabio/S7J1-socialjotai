// import {atomWithStorage} from 'jotai/utils'

// export const userAtom = atomWithStorage('current-user', null);
// export const isAuthenticatedAtom = atomWithStorage('is-authenticated', false);

import { atom } from 'jotai';

const initialLoginState = {
  isLoggedIn: false,
  userId: null,
  username: '',
  token: null,
};

export const authAtom = atom(initialLoginState);
