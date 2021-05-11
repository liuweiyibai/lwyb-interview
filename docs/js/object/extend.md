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
