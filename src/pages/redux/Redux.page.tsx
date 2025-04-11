import { Header } from "@/shared/widgets/header/header";
import classes from './classes.redux.page.module.css'
import { Counter } from "./components/counter";


export function ReduxPage() {

  return (
    <>
      <Header />
      <section className={classes.countersContainer}>
      <Counter counterId="id1" />
      <Counter counterId="id2" />
      <Counter counterId="id3" />
      </section>

    </>
  );
}