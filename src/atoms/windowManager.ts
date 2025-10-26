import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const isLogInedAtom = atomWithStorage('isLogIned', 'false');
export const focusAtom = atom('Discover');
export const layerAtom = atom(0);
export const tabDownInterruptAtom = atom('empty');
export const backUpFocusAtom = atom('Discover');
export const startOptionAtom = atom(false);
