# 常见 HTML 面试题

1. 说说你对网页标准和 W3C 重要性的理解

   web 语义化，利于搜索引擎爬取，提高 seo 优化

2. 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

   行内元素：`a、b、span、img、input、strong、select、label、em、button、textarea`
   块级元素：`div、header、footer、section、aside、ul、li、dl、dt、dd、p、h1-h6、blockquote`
   空元素：即系没有内容的 HTML 元素，例如：`br、meta、hr、link、input、img`

3. HTML5 的离线储存怎么使用，工作原理能不能解释一下？

   网站需要开启 https，并且提供不同系统下的 icon
   pwa 渐进式 web 引用，根据清单文件缓存 web 文件，service_worker 缓存

4. 浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢

   比较缓存文件清单

5. data-属性的作用

   html 自定义属性，可以被 getAttribute 获取到，可以有属性选择器实现 css 私有化

6. html5 中表单新增的 autocomplete 属性作用是啥

   autocomplete 属性规定输入字段是否应该启用自动完成功能，默认为启用，设置为 autocomplete=off 可以关闭该功能。自动完成允许浏览器预测对字段的输入。基于用户以前输入过的值给出提示。

7. iframe 有那些缺点？

   增加 http 请求；seo 不友好；可能会展示出多个嵌套滚动条，影响视觉效果

8. Doctype 作用? 严格模式与混杂模式如何区分？它们有何意义?

   告诉浏览器解析时到底使用什么规范来解析文档。

9. Canvas 和 SVG 有什么区别？

   从图像类别区分，Canvas 是基于像素的位图，而 SVG 却是基于矢量图形。
   从操作对象上说，Canvas 是基于 HTML canvas 标签，通过宿主提供的 JavaScript API 对整个画布进行操作的，而 SVG 则是基于 XML 元素的。

10. 如何在页面上实现一个圆形的可点击区域？

    1. 第一种 使用 image map

       ```html
       <img id="blue" class="click-area" src="blue.gif" usemap="#Map" />
       <map name="Map" id="Map" class="click-area">
         <area shape="circle" coords="50,50,50" />
       </map>
       <style>
         #blue {
           cursor: pointer;
           width: 100px;
           height: 100px;
         }
       </style>
       ```

    2. 第二种 使用 CSS border-radius

       ```html
       <div id="red" class="click-area"></div>
       <style>
         #red {
           cursor: pointer;
           background: red;
           width: 100px;
           height: 100px;
           border-radius: 50%;
         }
       </style>
       ```

    3. 第三种 使用 js 检测鼠标位置

       ```html
       <div id="yellow" class="click-area"></div>
       <script>
         $('#yellow').on('click', function (e) {
           var r = 50;
           var x1 = $(this).offset().left + $(this).width() / 2;
           var y1 = $(this).offset().top + $(this).height() / 2;
           var x2 = e.clientX;
           var y2 = e.clientY;
           var distance = Math.abs(
             Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
           );
           if (distance <= 50) alert('Yes!');
         });
       </script>
       ```

11. 网页验证码是干嘛的，是为了解决什么安全问题？

    验证码的作用在于区分人和机器，防止被暴力破解，提高破解密码的难度，有效防止垃圾注册、恶意登录、删单刷票、论坛灌水等行为

12. 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

    cookie 大小限制，超时时间，请求携带
    session 生命周期页面关闭；storage 不会清除

13. 浏览器渲染过程

    1. 浏览器采用流式布局模型
    2. 解析 html 文件为 domtree，css 文件解析为 cssom，dom 和 cssom 就组成了 renderTree 渲染树。
    3. 有了渲染树，我们就知道所有节点的样式，然后计算它们在也页面上的大小和位置，最后绘制到页面上。
    4. 由于浏览器使用流式布局，对 Render Tree 的计算通常只需要遍历一次就可以完成，但 table 及其内部元素除外，他们可能需要多次计算，通常要花 3 倍于同等元素的时间，这也是为什么要避免使用 table 布局的原因之一；

14. 什么是回流和重绘

    - **重绘**

      节点的集合属性发生改变或由于发生样式改变而不影响布局的，称为重绘，例如 outline visibility color background-color 等，重绘的代价高昂的，因此浏览器必须验证 DOM 树上其他节点元素的可见性。

    - **回流**
      布局或者几何属性需改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或者是整个页面）的布局更新。一个元素的回流可能导致其所有子元素以及 dom 结构上紧跟其后的节点、祖先节点的随后的回流。大部分的回流将导致页面的重新渲染。回流必定发生重绘，重绘不一定会引发回流。

15. 哪些操作会引起页面回流（Reflow）
16. 那些操作会引起页面重排
17. 回流和重排的区别，哪个性能损耗多一些，如何进行优化

    现代浏览器大多是通过队列机制来批量更新布局的，浏览器会把修改操作放在队列中，至少一个浏览器刷新(16.6ms)才会清空队列，触发回流和重绘来确保返回正确的值。

    例如: offsetTop clientTop scrollTop getComputedStyle() width height getBoundingClientRect() 。 需要避免频繁使用这些属性，这些属性都会强制渲染刷新队列。

18. 什么是 webp

    webp 谷歌开发的图片文件格式，在相同质量的情况下体积更小
    通过 Image 对象，设置 src 为 webp 格式图片，如果可以获取到图片的宽高信息，则支持

19. 导入样式使用中 link 和 @import 的区别是？

    1. link 属于 HTML 标签中的属性，而 @import 是 CSS 提供的;
    2. 功能不同，link 还可以定义 rss、rel 连接属性，引入网站图标
    3. 页面被加载的时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载;
    4. import 只在 IE5 以上才能识别，而 link 是 HTML 标签，无兼容问题;
    5. link 方式的样式的权重 高于 @import 的权重;

20. 简述浏览器渲染原理

    浏览器在接收到 html 文件后，从上到下解析，head 标签中解析样式，解析生成 cssom 树和 dom 树，两棵树组合成为渲染树，渲染树会渲染 dom 树中除了 display:none 的所有元素，然后布局，然后，然后转化到屏幕上。还有就是资源的加载顺序

    [简述浏览器渲染原理](https://blog.csdn.net/xcg132566/article/details/108004965)

21. html5 的 form 的 autocomplete 功能
22. 多标签间通信
