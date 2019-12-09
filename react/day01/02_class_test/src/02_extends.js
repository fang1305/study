// function  P1(xx) {
//     // 类似继承this.prototype = P2.prototype
//     // 玩的就是原型链
// }

class Person {
    age = 100;
    // 构造器
    constructor(props) {
        this.age = props.age;
        console.log('触发了Person');
    }
}
class Boy extends Person {
    name = 'jack';
    // 构造器  -- 子构造器
    constructor(props) {
        super(props); // 初始化父类的构造器
        this.name = props.name;
        console.log('触发了子构造器');
    }
}

let p = new Boy({
    name: 'mick',
    age: 18
});
console.log(p);
