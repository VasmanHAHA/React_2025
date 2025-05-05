import { AppState } from '../store';

interface CounterState {
  counter: number;
}

export type CounterId = string;

export type CountersState = Record<CounterId, CounterState | undefined>;

export interface DecrementAction {
  type: 'decrement';
  payload: {
    counterId: CounterId;
  };
}

export interface IncrementAction {
  type: 'increment';
  payload: {
    counterId: CounterId;
  };
}

const initialCounterState: CounterState = { counter: 0 };

const initialCountersState: CountersState = {};


type Action =
  | IncrementAction
  | DecrementAction

export const countersReducer = (state = initialCountersState, action: Action) => {
  switch (action.type) {
    case 'increment': {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter + 1,
        },
      };
    }
    case 'decrement': {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter - 1,
        },
      };
    }
    default:
      return state;
  }
};

export const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];