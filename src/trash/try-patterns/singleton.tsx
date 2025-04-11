import { Button } from "@mantine/core";

class MySingleton {
    static #instance: MySingleton
    public name = 'Billy';
    /**
 * Конструктор Одиночки всегда должен быть скрытым, чтобы предотвратить
 * создание объекта через оператор new.
 */
    private constructor() {

    }

    public static get instance(): MySingleton {
        if (!MySingleton.#instance) {
            MySingleton.#instance = new MySingleton();
        }

        return MySingleton.#instance;
    }

    public callMe() {
        console.log(`Hellow ${this.name}`)
    }
}


export function SingletonComponent() {
    const s1 = MySingleton.instance;
    const s2 = MySingleton.instance;

    if (s1 === s2) {
        console.log(
            'Singleton works, both variables contain the same instance.'
        );
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }

    return (
        <Button
            onClick={() => s1.callMe()}
        > {s1.name}</Button>


    )

}