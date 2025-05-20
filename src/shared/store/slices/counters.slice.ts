import { createAction, createReducer } from '@reduxjs/toolkit';
import { AppState } from '../redux';

interface CounterState {
  counter: number;
}

export type CounterId = string;

export type CountersState = Record<CounterId, CounterState | undefined>;


const initialCounterState: CounterState = { counter: 0 };

const initialCountersState: CountersState = {};

export const incrementAction = createAction<{
  counterId: CounterId;
}>('counters/increment');

export const decrementAction = createAction<{
  counterId: CounterId;
}>('counters/decrement');

export const countersReducer = createReducer(initialCountersState, (builder) => {
  builder
    .addCase(incrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) {
        state[counterId] = { ...initialCounterState };
      }
      state[counterId].counter += 1;
    })
    .addCase(decrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) {
        state[counterId] = { ...initialCounterState };
      }
      state[counterId].counter -= 1;
    })
}
);

// export const countersReducer = (state = initialCountersState, action: Action) => {
//   switch (action.type) {
//     case 'increment': {
//       const { counterId } = action.payload;
//       const currentCounter = state[counterId] ?? initialCounterState;
//       return {
//         ...state,
//         [counterId]: {
//           ...currentCounter,
//           counter: currentCounter.counter + 1,
//         },
//       };
//     }
//     case 'decrement': {
//       const { counterId } = action.payload;
//       const currentCounter = state[counterId] ?? initialCounterState;
//       return {
//         ...state,
//         [counterId]: {
//           ...currentCounter,
//           counter: currentCounter.counter - 1,
//         },
//       };
//     }
//     default:
//       return state;
//   }
// };

export const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];
