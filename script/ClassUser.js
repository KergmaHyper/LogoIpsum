class User {
    #name;
    #age;

    constructor(nm, a) {
        this.#name = nm;
        this.#age = a;
    }

    set name(nm) { this.#name = nm; }
    get name() { return this.#name; }

    set age(a) { this.#age = a; }
    get age() { return this.#age; }

    get copy() { return new User(this.#name, this.#age); }

    checking() { console.log(this.name); }

    static check(params, user) {
        let acOp = " access opened. Age: ";
        let acFo = " access forbiden. Age low: ";
        return params[0] + "'" + user.name + "'" + ((user.age > 18) ? acOp : acFo) + user.age + params[1];
    }

    static clone(user) {
        return new User(user.name, user.age);
    }
}


// const user1 = new User("Tom", 14);
// const user2 = new User("Pol", 37);




// var check1 = User.check`User: ${user1}`;
// var check2 = User.check`User: ${user2}`;

// console.log("check1", check1);
// console.log("check2", check2);

