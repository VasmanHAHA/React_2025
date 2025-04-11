import { CounterId, DecrementAction, IncrementAction, store } from "@/shared/store/store";
import { Button } from "@mantine/core";
import classes from './../classes.redux.page.module.css'

interface CounterProps {
    counterId: CounterId;
}


export function Counter(props: CounterProps) {
    const { counterId } = props;



    return (
        <section className={classes.counterSection}>
            <Button onClick={() => {
                store.dispatch({ type: "increment", payload: { counterId } } satisfies IncrementAction)
            }
            }> Increment</Button>
            <Button onClick={() => {
                store.dispatch({ type: "decrement", payload: { counterId } } satisfies DecrementAction)
            }
            }

            > Decrement</Button>
            <div> counter: {counterState?.counter ?? 0}</div>
        </section>
    )

}

// Древний подход:
// import { useSyncExternalStore } from "react";

// const counterState = useSyncExternalStore(
//     (onStoreChange) => store.subscribe(onStoreChange),
//     () => store.getState().counters[counterId],
// );
// const counterState = selectCounter(store.getState(), counterId);