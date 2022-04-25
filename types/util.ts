import type { Dispatch, SetStateAction } from 'react';

export type Nullable<T> = T | null;

export type SetStateCallback<S> = Dispatch<SetStateAction<S>>;

export type FetchDataCallback<T = unknown> = () => Promise<T>;
