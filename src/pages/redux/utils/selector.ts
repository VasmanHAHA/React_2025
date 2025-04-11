import { AppState, CounterId } from "@/shared/store/store";

export const selectCounter = (State: AppState, counterId: CounterId) => State.counters[counterId];
