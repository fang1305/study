function obj(params) {

}
obj.prototype.age = 1; // 实例属性
let o = new obj();

obj.staticTest = 'abc'; // 静态属性


// es6中通过class写法
// 实例可以访问静态属性( 先有静态 )
// 静态无法访问实例
class obj1 {
    // 静态属性
    static staticAge = 999
    static staticFn = function (params) {
        console.log(this) // 静态函数对象
        console.log('静态函数')
    }
    // 实例
    myAge = 123;
    // 箭头函数才向上用别人的this
    myFn() {
        // 上下文 this 与 function一致,用的是自己的
        console.log('实例函数', this.myAge);
    }
}

let o1 = new obj1();
// console.log(o1);
// console.log(obj1.staticAge);
obj1.staticFn();
// o1.myFn();