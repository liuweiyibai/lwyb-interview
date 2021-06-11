# 浏览器/html/css 面试题

1. 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？行内元素和块级元素有什么区别？

2. HTTPS 是如何实现加密

3. 浏览器是如何渲染页面的

4. 如何对网站的文件和资源进行优化

5. 你对网页标准和 W3C 重要性的理解

6. Http 和 https 的区别

7. http 的几种请求方法和区别

8. 前端需要注意哪些 SEO

9. 的 title 和 alt 有什么区别

10. 从浏览器地址栏输入 url 到显示页面的步骤

11. 如何进行网站性能优化

12. 语义化的理解

13. HTML5 的离线储存怎么使用，工作原理能不能解释一下？

14. 浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢

15. iframe 有那些缺点？

16. WEB 标准以及 W3C 标准是什么?

17. Doctype 作用? 严格模式与混杂模式如何区分？它们有何意义?

18. HTML 全局属性(global attribute)有哪些

19. Canvas 和 SVG 有什么区别？

20. 如何在页面上实现一个圆形的可点击区域？

    1. 第一种 使用 image map

       ```html
       <img id="blue" class="click-area" src="blue.gif" usemap="#Map" />
       <map name="Map" id="Map" class="click-area">
         <area shape="circle" coords="50,50,50" />
       </map>
       <s> #blue { cursor: pointer; width: 100px; height: 100px; } </s>
       ```

    2. 第二种 使用 CSS border-radius

       ```html
       <div id="red" class="click-area"></div>
       <s>
         #red { cursor: pointer; background: red; width: 100px; height: 100px;
         border-radius: 50%; }
       </s>
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
             Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
           );
           if (distance <= 50) alert('Yes!');
         });
       </script>
       ```

21. 网页验证码是干嘛的，是为了解决什么安全问题

22. 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

23. CSS 选择器有哪些？哪些属性可以继承？

24. CSS 优先级算法如何计算？

25. CSS3 有哪些新特性？

26. 请解释一下 CSS3 的 flexbox（弹性盒布局模型）,以及适用场景？

27. 用纯 CSS 创建一个三角形的原理是什么？

28. 常见的兼容性问题？

29. 为什么要初始化 CSS 样式

30. absolute 的 containing block 计算方式跟正常流有什么不同？

31. CSS 里的 visibility 属性有个 collapse 属性值？在不同浏览器下以后什么区别？

32. display:none 与 visibility：hidden 的区别？

33. position 跟 display、overflow、float 这些特性相互叠加后会怎么样？

34. 对 BFC 规范(块级格式化上下文：block formatting context)的理解？

    创建块级格式化上下文，内部的元素和外部元素不互相影响

35. 为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？

36. 上下 margin 重合的问题

37. 设置元素浮动后，该元素的 display 值是多少？

38. 移动端的布局用过媒体查询吗？

39. CSS 优化、提高性能的方法有哪些？

40. 浏览器是怎样解析 CSS 选择器的？

41. 在网页中的应该使用奇数还是偶数的字体？为什么呢？

42. margin 和 padding 分别适合什么场景使用？

43. 元素竖向的百分比设定是相对于容器的高度吗？

44. 全屏滚动的原理是什么？用到了 CSS 的哪些属性？

45. 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的 IE？

46. 视差滚动效果？

47. ::before 和 :after 中双冒号和单冒号有什么区别？解释一下这 2 个伪元素的作用

48. 让页面里的字体变清晰，变细用 CSS 怎么做？

49. position:fixed;在 android 下无效怎么处理？

50. 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

51. li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

52. display:inline-block 什么时候会显示间隙？

53. 有一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一个填满剩下的高度

54. png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过 webp？

55. style 标签写在 body 后与 body 前有什么区别？

56. CSS 属性 overflow 属性定义溢出元素内容区的内容会如何处理?

57. 阐述一下 CSS Sprites
58. 页面导入样式时，link 和@import 有什么区别
    1. 功能不同，link 还可以定义 rss、rel 连接属性，引入网站图标
    2. link 引入的 css 文件可以同时被加载，@import 引入的 css 将在页面加载完毕后被加载
    3. 兼容性区别，@import 不支持 ie5 以下
59. 常见的浏览器以及其内核

    - Trident：IE 浏览器内核；
    - Gecko：Firefox 浏览器内核；
    - Presto：Opera 浏览器内核；
    - Webkit：Safari 浏览器内核；
    - Blink：谷歌浏览器内核，属于 Webkit 的一个分支，与 Opera 一起在研发；

60. 浏览器渲染原理

    1. 浏览器采用流式布局模型
    2. 解析 html 文件为 domtree，css 文件解析为 cssom，dom 和 cssom 就组成了 renderTree 渲染树。
    3. 有了渲染树，我们就知道所有节点的样式，然后计算它们在也页面上的大小和位置，最后绘制到页面上。
    4. 由于浏览器使用流式布局，对 Render Tree 的计算通常只需要遍历一次就可以完成，但 table 及其内部元素除外，他们可能需要多次计算，通常要花 3 倍于同等元素的时间，这也是为什么要避免使用 table 布局的原因之一；

    - **重绘**

      节点的集合属性发生改变或由于发生样式改变而不影响布局的，称为重绘，例如 outline visibility color background-color 等，重绘的代价高昂的，因此浏览器必须验证 DOM 树上其他节点元素的可见性。

    - **回流**
      布局或者几何属性需改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或者是整个页面）的布局更新。一个元素的回流可能导致其所有子元素以及 dom 结构上紧跟其后的节点、祖先节点的随后的回流。大部分的回流将导致页面的重新渲染。
      回流必定发生重绘，重绘不一定会引发回流。

61. 哪些操作会引起页面回流（Reflow）
62. 那些操作会引起页面重排
63. 回流和重排的区别，哪个性能损耗多一些，如何进行优化

    现代浏览器大多是通过队列机制来批量更新布局的，浏览器会把修改操作放在队列中，至少一个浏览器刷新(16.6ms)才会清空队列，触发回流和重绘来确保返回正确的值。

    例如: offsetTop clientTop scrollTop getComputedStyle() width height getBoundingClientRect() 。 需要避免频繁使用这些属性，这些属性都会强制渲染刷新队列。

64. 多标签通信

    - websocket
    - localStorage 的 storage 事件
    - postMessage

65. 前端性能优化方向
    1. 减少 http 请求次数，文件合并，雪碧图、base64 图片
    2. 利用 cdn 加载第三方库文件
    3. 设置缓存策略，对于常用不变资源进行缓存
    4. 按需加载
    5. 通过用户行为对某些模块进行预加载
    6. 构建产物 gzip
    7. 将静态资源分配多个域名
66. 什么是 webp

    webp 谷歌开发的图片文件格式，在相同质量的情况下体积更小
    通过 Image 对象，设置 src 为 webp 格式图片，如果可以获取到图片的宽高信息，则支持
