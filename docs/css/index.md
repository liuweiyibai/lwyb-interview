# 总结常见 css 面试题

1. 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

   display: none - 不占空间，不能点击，会引起回流，子元素不影响
   visibility: hidden - 占据空间，不能点击，引起重绘，子元素可设置 visible 进行显示
   opacity: 0 - 占据空间，可以点击，引起重绘，子元素不影响

2. 介绍下 BFC 及其应用

   BFC（Block Format Context）块级格式化上下文，是页面盒模型中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。

   创建 BFC 的方式有：

   html 根元素
   float 浮动
   绝对定位
   overflow 不为 visible
   display 为表格布局或者弹性布局；
   BFC 主要的作用是：

   清除浮动
   防止同一 BFC 容器中的相邻元素间的外边距重叠问题

3. 实现垂直居中的方法

    1. flex 布局和grid布局
    2. 定位
    3. display:table 和 vertical-align: middle;
