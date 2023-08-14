import {atomWithStorage} from 'jotai/utils'

export const userAtom = atomWithStorage('current-user', null);
export const isAuthenticatedAtom = atomWithStorage('is-authenticated', false);
