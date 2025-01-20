# 对Object便捷操作以及函数式处理


> FuncNext 1.1.4

## 安装
```bash
npm install func-next --save-dev
```

---

## 介绍
是一个 JavaScript 类。它提供了一些方法，可以对一个对象进行一系列的操作，包括：
- 深拷贝对象
- 排除指定的属性
- 执行一系列函数
- 覆盖或追加对象的属性
- 选择指定的属
- 删除指定的属性
- 将日期转换为时间戳
- 将日期转换为任意格式
- 对对象的每个属性执行指定的函数
- 这个类的作用是提供一种方便的方式来操作对象, 可以用于数据处理、数据转换等场景。使用这个类可以避免手动编写大量的代码来完成这些操作，提高开发效率。

如果要使用这个类，可以通过 import 语句将它引入到你的代码中，然后创建一个 FuncNext 的实例，调用它提供的方法来对对象进行操作。

---

## 使用方法

```javascript
import FuncNext from 'func-next';

const obj = {
  name: 'Alice',
  age: 20,
  gender: 1,
  bornDate: '2003-06-03'
};

// 深拷贝
const newObj = FuncNext.of(obj).out()

// 对象每个键设为指定值
const newObj = FuncNext.of(obj).map(x => null).out()
// newObj = { name: null, age: null, gender: null, bornDate: null }

// 保护(排除)指定键
const newObj = FuncNext.of(obj).exclude('name').map(x => null).out()
// newObj = { name: 'Alice', age: null, gender: null, bornDate: null };
const newObj = FuncNext.of(obj).exclude('name', 'age').map(x => null).out()
// newObj = { name: 'Alice', age: 20, gender: null, bornDate: null }

// 覆盖或新增
//! 受保护的键不会被修改
const newObj = FuncNext.of(obj).coverOrAppend({name:'jack', address: 'xxx'}).out()
// newObj = { name: 'jack', age: 20, gender: 1, bornDate: '2003-06-03', address: 'xxx' }

// 提取指定key组成新对象
//! 受保护的键也会被pick
const newObj = FuncNext.of(obj).pick('name', 'age').out()
// newObj = { name: 'Alice', age: 20 }

// 移除指定键
//! 受保护的键不会被移除
const newObj = FuncNext.of(obj).takeOut('name', 'age').out()
// newObj = { gender: 1, bornDate: '2003-06-03'}

// 把与日期有关的值都转为时间戳
//! 受保护的键不会被转换
const obj = {
  name: 'Alice',
  age: 20,
  bornDate: '2003-06-03',
  createTime: new Date()
};
const newObj = FuncNext.of(obj).dateToTimestamp().out()
// newObj = { name: 'Alice', age: 20, bornDate: 1054598400000, createTime: 1686479418509 }

// 把与日期有关的所有值都转换为自定义格式
//! 受保护的键除外
//* 结合dayjs等库使用，将是最佳实践
// 注意dateToAnyFormat接收一个T => R函数, 别忘了Return
const obj = {
  name: 'Alice',
  age: 20,
  bornDate: '2003-06-03',
  createTime: new Date()
};
const newObj = FuncNext.of(obj).dateToAnyFormat(x => null).out()
// newObj = { name: 'Alice', age: 20, bornDate: null, createTime: null }

// 遍历获取每个值
//！ 受保护的键不会被遍历
// 常用于修改, 别忘了return
// 接收一个(value, key) => newValue
const newObj = FuncNext.of(obj).map((value, key) => {
    if (key != 'name') return null
    return value
}).out()
// newObj = { name: 'Alice', age: null, gender: null, bornDate: null }

// 遍历获取每个值
//！受保护的键也会被遍历
// 用于消费，请勿用来修改值
// 接受一个Consumer函数, 即(value, key, isProtected:是否受保护) => void
FuncNext.of(obj)
    .exclude('gender')
    .each((value, key, isProtected) => {
        console.log(`值: ${value}, 键: ${key}, 是否受保护: ${isProtected}`)
    }).out()
// 值: Alice, 键: name, 是否受保护: false
// 值: 20, 键: age, 是否受保护: false
// 值: 1, 键: gender, 是否受保护: true
// 值: 2003-06-03, 键: bornDate, 是否受保护: false
```

---

## 注意

**`of()`和`out()`是 FuncNext 类中的两个起始方法。**

of() 方法用于创建一个 FuncNext 实例，它接受一个对象作为参数，并返回一个 FuncNext 实例，可以通过这个实例来对对象进行一系列的操作。

out() 方法用于获取操作后的结果，它会返回一个新的对象，这个对象是经过 FuncNext 实例中的所有操作后得到的结果。需要注意的是，out() 方法并不会修改原始对象，而是返回一个新的对象。

在 FuncNext 的链式调用中，通常会在 of() 方法后面调用一系列的方法来对对象进行操作，最后再调用 out() 方法来获取操作后的结果。

---

## 仓库地址
[![badge](https://img.shields.io/badge/github-FuncNext-%23036aa4)](https://github.com/bent2685/func-next)
