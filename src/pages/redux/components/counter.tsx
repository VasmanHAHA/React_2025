import { Button } from "@mantine/core";
import classes from './../classes.redux.page.module.css'
import { CounterId,  selectCounter, decrementAction, incrementAction } from "@/shared/store/slices/counters.slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/redux";

interface CounterProps {
    counterId: CounterId;
}


export function Counter(props: CounterProps) {
    const { counterId } = props;
    const dispatch = useAppDispatch();
    const counterState = useAppSelector((state) => selectCounter(state, counterId))

    

    return (
        <div className={classes.counter}>
            <Button onClick={() => {
                dispatch(incrementAction({ counterId }))
            }
            }> Increment</Button>
            <Button onClick={() => {
                dispatch(decrementAction({ counterId }))
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