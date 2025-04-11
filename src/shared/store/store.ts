import { configureStore } from '@reduxjs/toolkit';

interface State {
  counter: number;
}

export interface IncrementAction {
  type: 'increment';
}

export interface DecrementAction {
  type: 'decrement';
}

export type Action = IncrementAction | DecrementAction;

const initialState: State = {
  counter: 0,
};

const reducer = (state = initialState, action: Action): State => {

  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 };
    case 'decrement':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer,
});
