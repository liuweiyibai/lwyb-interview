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

18. 为什么要初始化 CSS 样式

    因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异。

19. 移动端的布局用过媒体查询吗？

    CSS3 中出现的 CSS 特性，根据 CSS 每天查询实现在不同屏幕大小下，采用不同的样式，以适配不同的设备。

20. CSS 优化、提高性能的方法有哪些？

    避免过度约束
    避免后代选择符
    避免链式选择符
    使用紧凑的语法
    避免不必要的命名空间
    避免不必要的重复
    最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么
    避免！important，可以选择其他选择器
    尽可能的精简规则，你可以合并不同类里的重复规则

21. 浏览器是怎样解析 CSS 选择器的？

    CSS 选择器的解析是从右向左解析的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。

22. 怎么让 Chrome 支持小于 12px 的文字？

    ```CSS
    p{font-size:10px;-webkit-transform:scale(0.8);}
    ```

23. 让页面里的字体变清晰，变细用 CSS 怎么做？

    -webkit-font-smoothing 在 window 系统下没有起作用，但是在 IOS 设备上起作用-webkit-font-smoothing：antialiased 是最佳的，灰度平滑。

24. 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

    多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为 1/60＊1000ms ＝ 16.7ms。

25. png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过 webp？

    1. png 压缩比高，色彩好。大多数地方都可以用。
    2. jpg 是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在 www 上，被用来储存和传输照片的格式。
    3. gif 是一种位图文件格式，以 8 位色重现真色彩的图像。可以实现动画效果。
    4. webp 压缩率只有 jpg 的 2/3，大小比 png 小了 45%。缺点是压缩的时间更久了，兼容性不好。

26. 阐述一下 CSS Sprites

    将一个页面涉及到的所有图片都包含到一张大图中去，然后利用 CSS 的 background-image，background-repeat，background-position 的组合进行背景定位。利用 CSS Sprites 能很好地减少网页的 http 请求，从而提高页面的性能；CSS Sprites 能减少图片的字节。

27. style 标签写在 body 后与 body 前有什么区别？

    页面加载自上而下 当然是先加载样式。写在 body 标签后由于浏览器以逐行方式对 HTML 文档进行解析，当解析到写在尾部的样式表（外联或写在 style 标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在 windows 的 IE 下可能会出现 FOUC 现象（即样式失效导致的页面闪烁问题）

28. li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

    行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为 0，就没有空格了。
    解决方法：
    可以将 li 代码全部写在一排
    浮动 li 中 float：left
    在 ul 中用 font-size：0（谷歌不支持）；可以使用 letter-space：-3px

29. display:inline-block 什么时候会显示间隙？

    有空格时候会有间隙。解决：移除空格。margin 正值的时候 解决：margin 使用负值
    使用 font-size 时候 解决：font-size:0、letter-spacing、word-spacing
