# HTML

1. src 和 href 属性区别？

   src 表示对外部资源的引用，src 会将指向资源下载并且应用到文档里，当浏览器解析到当前元素时，会暂停其他资源的下载和处理，直至将该资源下载、解析完毕。

   href 表示超文本引用，它指向一些网络资源，建立链接关系。当浏览器识别到这里的时候，就会自行下载资源，不会对当前文档停止处理。

2. script 中 defer 和 async 属性？

   如果没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本。

   defer 和 async 属性都是去异步加载外部的 JavaScript 脚本文件，它们的下载都不会阻塞页面的解析。

   1. defer 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），如果有多个 defer 脚本，会按照它们在页面出现的顺序加载。在 window.onload 之前执行；如果依赖其他脚本和 DOM 结果，使用 defer

   2. async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。多个 async 脚本不能保证加载顺序。如果与 DOM 和其他脚本依赖不强时，使用 async。

3. 对 HTML 语义化的理解？

   语义化是指根据页面所表现的内容使用某个语义标签去做。其优点是利于搜索引擎爬取。另外还和一些屏幕录制、读屏软件等根据文章自动生成目录。

   对开发者友好，语义化标签使代码增加可读性、结构清晰。

4. DOCTYPE 文档类型的作用？严格模式与混杂模式如何区分？它们有何意义?

   告诉浏览器用什么文件类型来解析次文档。

   严格模式就是一些标签嵌套相关，对语法要求严格一些。

5. HTML5 有哪些更新？

   新增媒体标签、语义化标签，表单类型、DOM 查询操作、web 存储、还有新增的一些 navigator 接口：比如定位、webrtc 等

6. img 标签中 srcset 属性？

   在不同屏幕分辨率下显示的图片。

7. 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

   行内元素：`a、b、span、img、input、strong、select、label、em、button、textarea`
   块级元素：`div、header、footer、section、aside、ul、li、dl、dt、dd、p、h1-h6、blockquote`
   空元素：即系没有内容的 HTML 元素，例如：`br、meta、hr、link、input、img`

8. iframe 有那些优点和缺点？
9. HTML5 的离线储存怎么使用，工作原理能不能解释一下？

   网站需要开启 https，并且提供不同系统下的 icon

   pwa 渐进式 web 引用，根据清单文件缓存 web 文件，serviceWorker 缓存，通过 serviceWorker 加载管理文件。

10. data-属性的作用

    html 自定义属性，可以被 getAttribute 获取到，可以有属性选择器实现 css 私有化

11. html5 中表单新增的 autocomplete 属性作用是啥

    autocomplete 属性规定输入字段是否应该启用自动完成功能，默认为启用，设置为 autocomplete=off 可以关闭该功能。自动完成允许浏览器预测对字段的输入。基于用户以前输入过的值给出提示。

12. Canvas 和 SVG 有什么区别？

    从图像类别区分，Canvas 是基于像素的位图，而 SVG 却是基于矢量图形。

    从操作对象上说，Canvas 是基于 HTML canvas 标签，通过宿主提供的 JavaScript API 对整个画布进行操作的，而 SVG 则是基于 XML 元素的。

13. 如何在页面上实现一个圆形的可点击区域？

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

14. 网页验证码是干嘛的，是为了解决什么安全问题？

    验证码的作用在于区分人和机器，防止被暴力破解，提高破解密码的难度，有效防止垃圾注册、恶意登录、删单刷票、论坛灌水等行为

15. 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

    cookie 大小限制，超时时间，请求携带
    session 生命周期页面关闭；storage 不会清除

16. 浏览器渲染过程

    1. 浏览器采用流式布局模型
    2. 解析 html 文件为 domtree，css 文件解析为 cssom，dom 和 cssom 就组成了 renderTree 渲染树。
    3. 有了渲染树，我们就知道所有节点的样式，然后计算它们在也页面上的大小和位置，最后绘制到页面上。
    4. 由于浏览器使用流式布局，对 Render Tree 的计算通常只需要遍历一次就可以完成，但 table 及其内部元素除外，他们可能需要多次计算，通常要花 3 倍于同等元素的时间，这也是为什么要避免使用 table 布局的原因之一；

17. 什么是回流和重绘

    - **重绘**

      节点的集合属性发生改变或由于发生样式改变而不影响布局的，称为重绘，例如 outline visibility color background-color 等，重绘的代价高昂的，因此浏览器必须验证 DOM 树上其他节点元素的可见性。

    - **回流**
      布局或者几何属性需改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或者是整个页面）的布局更新。一个元素的回流可能导致其所有子元素以及 dom 结构上紧跟其后的节点、祖先节点的随后的回流。大部分的回流将导致页面的重新渲染。回流必定发生重绘，重绘不一定会引发回流。

18. 哪些操作会引起页面回流（Reflow）
19. 那些操作会引起页面重排
20. 回流和重排的区别，哪个性能损耗多一些，如何进行优化

    现代浏览器大多是通过队列机制来批量更新布局的，浏览器会把修改操作放在队列中，至少一个浏览器刷新(16.6ms)才会清空队列，触发回流和重绘来确保返回正确的值。

    例如: offsetTop clientTop scrollTop getComputedStyle() width height getBoundingClientRect() 。 需要避免频繁使用这些属性，这些属性都会强制渲染刷新队列。

21. 什么是 webp

    webp 谷歌开发的图片文件格式，在相同质量的情况下体积更小
    通过 Image 对象，设置 src 为 webp 格式图片，如果可以获取到图片的宽高信息，则支持

22. 导入样式使用中 link 和 `@import` 的区别是？

    1. link 属于 HTML 标签中的属性，而 `@import` 是 CSS 提供的;
    2. 功能不同，link 还可以定义 rss、rel 连接属性，引入网站图标
    3. 页面被加载的时，link 会同时被加载，而 `@import` 引用的 CSS 会等到页面被加载完再加载;
    4. import 只在 IE5 以上才能识别，而 link 是 HTML 标签，无兼容问题;
    5. link 方式的样式的权重高于 `@import` 的权重;

23. 简述浏览器渲染原理

    浏览器在接收到 html 文件后，从上到下解析，head 标签中解析样式，解析生成 cssom 树和 dom 树，两棵树组合成为渲染树，渲染树会渲染 dom 树中除了 display:none 的所有元素，然后布局，然后，然后转化到屏幕上。还有就是资源的加载顺序

    [简述浏览器渲染原理](https://blog.csdn.net/xcg132566/article/details/108004965)

24. 多标签间通信

    localstorage 事件监听、sharedWorker、webSocket 通过服务端帮助

25. 什么是 Web Worker

    Web Worker 是为了解决 js 单线程问题的，因为 js 的 ui 和计算是同一个进程，如果计算量比较大就会阻塞 ui 的渲染,所以会引入 Web Worker 来解决这个问题。Web Worker 会独立一个上下文运行一个文件。Web Worker 使用起来非常简单，在“主线程”中执行 new Worker 返回一个 Web Worker 实例，通过监听 onmessage 事件获取消息，通过 postMessage 发送消息：“主线程”和 Worker 之间通过 postMessage 发送消息，通过监听 onmessage 事件来接收消息，从而实现二者的通信。

## DOM 和事件相关

1. 什么是事件代理？

   事件委托，是指通过事件冒泡将子元素事件委托到父元素上，其优点是减少内存消耗和 过多的 DOM 操作。

2. addEventListener 默认是捕获还是冒泡

   默认是冒泡，可以通过其第三个参数来控制事件是在捕获还是冒泡阶段触发。

3. document.write 和 innerHTML 的区别

   1. document.write 可以重绘整个页面

   2. innerHTML 只能重绘页面的一部分
