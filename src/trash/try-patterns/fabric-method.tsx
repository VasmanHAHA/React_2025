/**
 * Интерфейс Продукта объявляет операции, которые должны выполнять все
 * конкретные продукты.
 */
interface Product {
    operation: () => string;
}

/**
 * Конкретные Продукты предоставляют различные реализации интерфейса Продукта.
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

/**
 * Класс Создатель объявляет фабричный метод, который должен возвращать объект
 * класса Продукт. Подклассы Создателя обычно предоставляют реализацию этого
 * метода.
 */

export abstract class Creator {
    /**
     * Обратите внимание, что Создатель может также обеспечить реализацию
     * фабричного метода по умолчанию.
     */
    public abstract factoryMethod(): Product;

    /**
     * Также заметьте, что, несмотря на название, основная обязанность Создателя
     * не заключается в создании продуктов. Обычно он содержит некоторую базовую
     * бизнес-логику, которая основана на объектах Продуктов, возвращаемых
     * фабричным методом. Подклассы могут косвенно изменять эту бизнес-логику,
     * переопределяя фабричный метод и возвращая из него другой тип продукта.
     */
    public someOperation(): string {
        // Вызываем фабричный метод, чтобы получить объект-продукт.
        const product = this.factoryMethod();
        // Далее, работаем с этим продуктом.
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

/**
 * Конкретные Создатели переопределяют фабричный метод для того, чтобы изменить
 * тип результирующего продукта.
 */
class ConcreteCreator1 extends Creator {
    /**
     * Обратите внимание, что сигнатура метода по-прежнему использует тип
     * абстрактного продукта, хотя фактически из метода возвращается конкретный
     * продукт. Таким образом, Создатель может оставаться независимым от
     * конкретных классов продуктов.
     */
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

/**
 * Клиентский код работает с экземпляром конкретного создателя, хотя и через его
 * базовый интерфейс. Пока клиент продолжает работать с создателем через базовый
 * интерфейс, вы можете передать ему любой подкласс создателя.
 */


export function FabricMethodComponent() {
    const product1Creator = new ConcreteCreator1();
    const product1 = product1Creator.factoryMethod();
    const product1_2 = product1Creator.factoryMethod();
    const product2Creator = new ConcreteCreator2();

    console.log(product1 === product1_2);

    console.log(product1Creator.someOperation());
    console.log(product2Creator.someOperation());


    return (<div />)
}