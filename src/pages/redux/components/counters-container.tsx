import { Counter } from "./counter";
import classes from './../classes.redux.page.module.css'


interface CountersContainerProps {
}

export function CountersContainer(props: CountersContainerProps) {

    return (
        <section className={classes.countersContainer}>
            <Counter counterId="id1" />
            <Counter counterId="id2" />
            <Counter counterId="id3" />
        </section>
    )

}