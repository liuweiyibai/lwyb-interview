# 总结常见 CSS 面试题

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

   1. flex 布局和 grid 布局
   2. 定位
   3. display:table 和 vertical-align: middle;

4. CSS 有哪些样式可以给子元素继承?

   可继承的:
   font-size、font-weight、line-height、color、cursor 等

   不可继承的一般是会改变盒子模型的:
   display、margin、border、padding、height 等

5. 什么是 CSS 盒模型
   在网页中，一个元素在网页中实际的空间大小，实际上是由：内容`content` + 外边距`margin` + 内边距`padding` + 边框`border` 构成

6. box-sizing 常用的属性有哪些? 分别有啥作用?

   box-sizing 有两个值: content-box(W3C 标准盒模型), border-box(怪异模型)。
   主要是改变盒子模型大小的计算形式：padding + width + border 或者 将 padding 和 border 直接计算在 width 中。

7. 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

   行内元素：`a、b、span、img、input、strong、select、label、em、button、textarea`
   块级元素：`div、header、footer、section、aside、ul、li、dl、dt、dd、p、h1-h6、blockquote`
   空元素：即系没有内容的 HTML 元素，例如：`br、meta、hr、link、input、img`

8. 实现垂直居中的方式

   flex 、grid、定位 + transform、display:table

9. display:none 和 visibility:hidden 的区别？

   1. display:none 隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素按照排列书序占据它的位置，但是会在 dom 树上存在。
   2. visibility: hidden 隐藏对应的元素，但是在文档布局中仍保留原来的空间。

10. CSS 中 link 和@import 的区别是？

    1. link 属于 HTML 标签中的属性，而@import 是 CSS 提供的;
    2. 页面被加载的时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载;
    3. import 只在 IE5 以上才能识别，而 link 是 HTML 标签，无兼容问题;
    4. link 方式的样式的权重 高于@import 的权重;

11. CSS 属性是否区分大小写？

    不区分

12. CSS 选择器有哪些？哪些属性可以继承？

    1. CSS 选择符：id 选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul > li）、后代选择器（li a）、通配符选择器（\*）、属性选择器（a[rel=”external”]）、伪类选择器（a:hover, li:nth-child）
    2. 可继承的属性：font-size, font-family, color
    3. 不可继承的样式：border, padding, margin, width, height
    4. 优先级（就近原则）：!important > [ id > class > tag ] && !important 比内联优先级高

13. CSS 优先级算法如何计算？

    元素选择符： 1
    class 选择符： 10
    id 选择符：100
    元素标签：1000
    !important 声明的样式优先级最高，如果冲突再进行计算。
    如果优先级相同，则选择最后出现的样式。
    继承得到的样式的优先级最低。

14. CSS3 新增伪类有那些?

    p:first-of-type 选择属于其父元素的首个元素
    p:last-of-type 选择属于其父元素的最后元素
    p:only-of-type 选择属于其父元素唯一的元素
    p:only-child 选择属于其父元素的唯一子元素
    p:nth-child(2) 选择属于其父元素的第二个子元素
    :enabled :disabled 表单控件的禁用状态。
    :checked 单选框或复选框被选中。

15. position 的值？

    static（默认）：按照正常文档流进行排列；
    relative（相对定位）：不脱离文档流，参考自身静态位置通过 top, bottom, left, right 定位；
    absolute(绝对定位)：参考距其最近一个不为 static 的父级元素通过 top, bottom, left, right 定位；
    fixed(固定定位)：所固定的参照对像是可视窗口。

16. 请解释一下 CSS3 的 flexbox（弹性盒布局模型）,以及适用场景？

    该布局模型的目的是提供一种更加高效的方式来对容器中的条目进行布局、对齐和分配空间。在传统的布局方式中，block 布局是把块在垂直方向从上到下依次排列的；而 inline 布局则是在水平方向来排列。弹性盒布局并没有这样内在的方向限制，可以由开发人员自由操作。
    试用场景：弹性布局适合于移动前端开发，在 Android 和 ios 上也完美支持。

17. 用纯 CSS 创建一个三角形的原理是什么？

    首先，需要把元素的宽度、高度设为 0。然后设置边框样式。

    ```css
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 40px solid #ff0000;
    ```
