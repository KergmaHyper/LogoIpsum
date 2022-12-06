const loadJS = "./script/ClassUser.js";

let button = document.createElement("button");
button.textContent = "Press ME!";
button.classList.add("button", "b-orange");
// button.classList.add();
let cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "./css/style.css";
document.head.append(cssLink);


const load2load = function (src, callback) {
    console.log(`start loading script from ${src}`);
    let script = document.createElement("script");
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}

const onFocus = function (e, r) {
    console.log(`class is added to: ${e.target} ${e.target.value}`);
    e.target.classList.add("inputActive");
    e.target.nextSibling.classList.add("inputAgeActive");
}

const onBlur = function (e, r) {
    console.log(`class is removed from: ${e.target} ${e.target.value}`);
    e.target.classList.remove("inputActive");
    e.target.nextSibling.classList.remove("inputAgeActive");
}


const runOnLoad = function () {

    const users = [];
    users.push(new User("Tom", 14));
    users.push(new User("Pol", 37));
    users.unshift(new User("Lora", 19));
    users.push(new User("Sam", 23));
    users.push(new User("Bob", 16));
    users.push(new User("Frodo", 21));
    users.push(new User("Bob", 13));
    users.push(new User("Alice", 21));
    users.unshift(new User("Alice", 18));

    console.log("===========================");
    users.forEach(x => { console.log(x.name + ":" + x.age); });

    users.sort(function (a, b) {
        let res = a.name.localeCompare(b.name);
        if (res == 0) res = a.age - b.age;
        return res;
    });




    console.log("===========================");


    let divMain = document.createElement("div");
    document.body.append(divMain);
    divMain.id = "divMain";

    let divSub = document.createElement("div");
    // document.body.append(divSub);
    divSub.id = "divSub";
    divMain.appendChild(divSub);
    divMain.appendChild(button);
    //divMain.classList.add("container", "flex-container");
    //  divSub.classList.add("flex-element");

    users.forEach(user => {
        let divInput = document.createElement("div");
        let inputName = document.createElement("input");
        let inputAge = document.createElement("input");
        inputName.type = "text";
        inputName.value = user.name;
        inputAge.value = user.age;
        divMain.appendChild(divInput);
        divInput.appendChild(inputName);
        divInput.appendChild(inputAge);
        divInput.classList.add("divInput");

        inputName.classList.add("inputName", "input");
        inputName.addEventListener("focus", onFocus);
        inputName.addEventListener("blur", onBlur);

        inputAge.classList.add("inputAge", "input");
    });

    users[Symbol.iterator] = function () {
        const oldThis = this;
        return {
            current: 0,
            end: oldThis.length,
            next() {
                if (this.current < this.end) return { value: oldThis[this.current++], done: false };
                else return { done: true };
            }
        }
    };

    users.interies = function () {
        return this[Symbol.iterator];
    }

    users.getUser = function* () {
        for (let i = 0; i < this.length; i++) {
            yield this[i];
        }
    }


    const curUser = users.getUser();
    while (!(item = curUser.next()).done) {
        console.log(item.value);
    }

    //console.log(users);

};

load2load(loadJS, script => { runOnLoad(); });



