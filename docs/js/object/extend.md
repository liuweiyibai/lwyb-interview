# 继承

1. 原型链继承

   ```js
   function Parent(name){
     this.name = name
     this.blood = ["a",'b']
   }
   Parent.prototype.run = functino(){
     log('running~~')
   }
   function Children(subName){
     this.subName = subName
   }
   Children.prototype.constructor = Children
   // 将父类构造函数的实例赋值给子类的原型
   Children.prototype = new Parent()
   // 给子类添加方法需要在上述方法后
   // 创建子类时无法向父类构造函数传参
   ```

2. 组合继承
   缺点就是会多调用一次父类构造函数

3. 组合寄生继承

   组合寄生继承是在子类构造函数中通过 call 调用超类一次，再通过 [`Object.create`](/js/object/create) 创建子类的原型

   ```js
   function Parent(name) {
     this.name = name;
   }
   Parent.prototype.say = function () {
     console.log(this.name);
   };
   function init(subType, superType) {
     // proto.__proto__ = superType.prototype
     var proto = Object.create(superType.prototype);
     // 原型链查找，将父类的原型另存并且赋值给子类
     proto.constructor = subType;
     subType.prototype = proto;
   }
   function Child(name, age) {
     Parent.call(this, name);
     this.age = age;
   }
   init(Child, Parent);
   ```
