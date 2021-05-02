class Foo {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`Hello ${this.name}`);
    }
}

const f = new Foo("Daisy");
f.say();
