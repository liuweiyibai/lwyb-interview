# CSS 面试题

1. 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

   display: none - 不占空间，不能点击，会引起回流，子元素不影响
   visibility: hidden - 占据空间，不能点击，引起重绘，子元素可设置 visible 进行显示
   opacity: 0 - 占据空间，可以点击，引起重绘，子元素不影响

2. 清除浮动

   伪元素清除浮动、格式化上下文

3. 介绍下 BFC 及其应用

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

4. 实现垂直居中的方法

   1. flex 布局和 grid 布局
   2. 定位 + transform 适合不确定宽高的情况
   3. display:table 和 vertical-align: middle;

5. CSS 有哪些样式可以给子元素继承?

   可继承的:
   font-size、font-weight、line-height、color、cursor 等

   不可继承的一般是会改变盒子模型的:
   display、margin、border、padding、height 等

6. 什么是 CSS 盒模型
   在网页中，一个元素在网页中实际的空间大小，实际上是由：内容`content` + 外边距`margin` + 内边距`padding` + 边框`border` 构成

7. box-sizing 常用的属性有哪些? 分别有啥作用?

   box-sizing 有两个值: content-box(W3C 标准盒模型), border-box(怪异模型)。
   主要是改变盒子模型大小的计算形式：padding + width + border 或者 将 padding 和 border 直接计算在 width 中。

8. 实现垂直居中的方式

   flex 、grid、定位 + transform、display:table + vertical:align

9. display:none 和 visibility:hidden 的区别？

10. display:none 隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素按照排列书序占据它的位置，但是会在 dom 树上存在。
11. visibility: hidden 隐藏对应的元素，但是在文档布局中仍保留原来的空间。

12. CSS 属性是否区分大小写？

不区分

12. CSS 选择器有哪些？哪些属性可以继承？

    1. CSS 选择符：id 选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul > li）、后代选择器（li a）、通配符选择器（\*）、属性选择器（a[rel="external"]）、伪类选择器（a:hover, li:nth-child）
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

    文本缩放

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

30. 画一个三角形、扇形，将一个圆分为四部分，对角部分是相同颜色，相邻部分为不同颜色

31. 项目怎么做的移动端适配？ flexible 原理（1px 问题，通过 viewport）

32. 全屏滚动的原理是什么？用到了 CSS 的哪些属性？

    定位实现全屏滚动效果

33. 什么是响应式设计？响应式设计的基本原理是什么？

    媒体查询

34. css 实现视差滚动效果

    用 CSS 实现视差滚动的原理就是利用 3d 空间的 z 轴距离产生的近大远小，让元素之间的滚动距离产生差距。 perspective 的属性值确定观察的 z 轴坐标，比如我们设 perspective: 1px ，最后所有的透视效果都是以和 z = 1px 的位置观察的效果是相同的。

35. css 伪类和伪元素

    伪类，就像 :hover :visite :active 等，在某些鼠标行为下激活的样式
    伪元素:after :before 这种，在元素子元素前后增加元素，默认行内元素

36. position:fixed;在 android 下无效怎么处理？

    因为移动端浏览器默认的 viewport 叫做 layout viewport。在移动端显示时，因为 layout viewport 的宽度大于移动端屏幕的宽度，所以页面会出现滚动条左右移动，fixed 的元素是相对 layout viewport 来固定位置的，而不是移动端屏幕来固定位置的
    ，所以会出现感觉 fixed 无效的情况。如果想实现 fixed 相对于屏幕的固定效果，我们需要改变的是 viewport 的大小为 ideal viewport，可以如下设置：

    ```html
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
    />
    ```

37. 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

    和屏幕刷新率有关，多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为 1/60＊1000ms ＝ 16.7ms

38. li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

    inline 元素直接的空格也会被移动端浏览器渲染为块级，可以使用给父元设置如下样式

    ```css
    .wrap ul {
      letter-spacing: -5px;
    }

    /* 之后记得设置 li 内字符间隔 */
    .wrap ul li {
      letter-spacing: normal;
    }
    ```

39. display:inline-block 什么时候会显示间隙？
    当对两个或者两个以上的相同元素用 display:inline-block；他们之间会默认有一个空格（4px）；

40. 有一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一个填满剩下的高度

    定位还有 flex1 和 定位+margin

41. flex 1 具体是什么意思

    首先明确一点是， flex 是 flex-grow、flex-shrink、flex-basis 的缩写。

    flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

    flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

    flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。

    当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：

    ```css
    .item {
      flex: 1;
    }
    /*等同于*/
    .item {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0%;
    }
    ```
