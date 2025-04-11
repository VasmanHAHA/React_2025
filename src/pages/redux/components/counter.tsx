import { CounterId, DecrementAction, IncrementAction, selectCounter, useAppDispatch, useAppSelector } from "@/shared/store/store";
import { Button } from "@mantine/core";
import classes from './../classes.redux.page.module.css'

interface CounterProps {
    counterId: CounterId;
}


export function Counter(props: CounterProps) {
    const { counterId } = props;
    const dispatch = useAppDispatch();
    const counterState = useAppSelector((state) => selectCounter(state, counterId))

    console.log(`counter = ${counterId} rendered`)

    return (
        <div className={classes.counter}>
            <Button onClick={() => {
                dispatch({ type: "increment", payload: { counterId } } satisfies IncrementAction)
            }
            }> Increment</Button>
            <Button onClick={() => {
                dispatch({ type: "decrement", payload: { counterId } } satisfies DecrementAction)
            }
            }

            > Decrement</Button>
            <div> counter: {counterState?.counter ?? 0}</div>
        </div>
    )

}

// Древний подход:
// import { useSyncExternalStore } from "react";

// const counterState = useSyncExternalStore(
//     (onStoreChange) => store.subscribe(onStoreChange),
//     () => store.getState().counters[counterId],
// );
// const counterState = selectCounter(store.getState(), counterId);