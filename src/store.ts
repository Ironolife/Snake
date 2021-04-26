import { Writable, writable } from 'svelte/store';
import type { GameState } from './types';

export const gameState: Writable<GameState> = writable('stop');
export const score: Writable<number> = writable(0);
