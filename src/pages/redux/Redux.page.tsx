import { Header } from "@/shared/widgets/header/header";
import { Button } from "@mantine/core";
import classes from './classes.redux.page.module.css'
import { DecrementAction, IncrementAction, store } from "@/shared/store/store";
import { useEffect, useSyncExternalStore } from "react";

export function ReduxPage() {
  // const count = store.getState().counter;

  // useEffect(()=> {
  //   console.log(count);
  // }, [count])

  const count = useSyncExternalStore(
    (onStoreChange) => store.subscribe(onStoreChange),
    () => store.getState().counter,
  );

  return (
    <>
      <Header />
      <section className={classes.counterSection}>
        <Button onClick={() => {
          store.dispatch({ type: "increment" } satisfies IncrementAction)
        }
        }> Increment</Button>
        <Button onClick={() => {
          store.dispatch({ type: "decrement" } satisfies DecrementAction)
        }
        }

        > Decrement</Button>
        <div> counter: {count}</div>
      </section>

    </>
  );
}