# Resume

## 专业技能

- 掌握 Vue.js、React 等前端框架开发，并且有多个 PC、H5 项目开发经验，具备一定的框架设计能力。
- 对页面布局、Web 语义化有深刻理解；熟练掌握 CSS，熟悉响应式布局以及流式布局。
- 熟悉 JavaScript，对 JavaScript 闭包、原型链等概念有清晰认知。了解 TypeScript，熟悉 ES6+ 语法。
- 熟悉 Webpack、Rollup、Vite、Parcel 等工程化工具，可以搭建前端项目脚手架。
- 熟悉 HTTP、TCP/IP 等前后端通信协议，掌握 Ajax、Fetch 等前后端通信方法，JSON 等数据交换格式。
- 熟悉项目版本管理工具 Git / Svn 等；熟悉 Git 开发流程、协作开发。
- 掌握小程序开发，了解 Taro.js 、uni-app 等多端开发工具，快速开始小程序开发。
- 熟悉基于 Node.js 的全栈式解决方案、SSR 方案，能够根据业务需求进行技术选型。

## 工作经历

- 云和互动

  负责前端项目的技术选型、架构设计、前端工程化流程、前端代码规范等。开发电信、汽车业务落地页模板，抽象公共功能组件、业务组件、持续维护开发等。并且对前端新技术进行预研，保持前端开发技术的先进性。

- 胜顶

  负责自有电管家 APP 和 PC 端平台开发、对接、部署、维护和优化工作。持续优化产品性能、用户体验、交互效果及各种主流浏览器的兼容适配工作。同时负责自有域名管理，DNS 解析配置，网关代理，静态资源服务装配等工作。

## 项目经历

- 联通广告落地页

  联通、移动号卡下单购号的落地页，可根据后台配置不同模板、不同归属地、卡种进行动态变化页面结构，表单结构。

  1. 为提升首屏加载效率，以及提高页面 SEO，采用 Vue + Nuxt 的服务端渲染方案。
  2. 采用组件化开发，基于功能和业务小粒度的进行组件拆分。实现了级联选择、AutoComplete、号池等组件。
  3. 使用 mixin 完成按需加载高德地图 JavaScript SDK 实现定位、隐藏页面模块功能，实现公共逻辑复用。
  4. 使用 Sentry 搭建前端程序监控，对代码错误、未知 bug 等问题做跟踪收集。
  <!-- 5. 后续部署，日志 Logger 集成，使用 Nginx 对旧链接进行重定向。 -->

- 广告投放平台

  广告投放平台，包括落地页制作、广告投放、数据采集监测、广告媒体对接、用户和权限管理等功能。主要负责项目搭建，角色权限模块，业务组件、功能组件封装抽象，提高开发效率，保证系统的稳定性。

  1. 使用 Vue + Element 搭建项目，实现 env 划分、路由懒加载、组件自动注册、HTTP 请求封装等基础功能。
  2. 基于 RBAC 模型设计权限系统，通过角色控制视图，封装权限指令。实现基于角色控制页面、按钮等细粒度权限的划分。
  3. 封装基于配置的表格、表单组件等通用组件，提升开发效率，减少重复工作。
  4. 配置第三方依赖 cdn 加载、gzip 优化方案。减少入口文件体积，减少页面白屏时间。
  5. 使用 Git Hooks 结合 Huskey 等工具实现代码风格统一，解决多人开发时代码习惯差异的问题。

- 用电安全平台

  用电安全平台是通过自研智能硬件配合云平台监控多种电气数据进行在线诊断与分析的平台。采用前后端分离模式开发。主要负责与接口对接，并且通过开发工具、改进流程，保证前端业务开发的高效性。

- 用电安全管家

  用电安全管家是通过自研智能硬件配合云平台监控，用于对设备状态的实时监控与远程控制的App。 使用 Vue 开发的 Hybrid App，主要负责，设备管理与数据分析、广告管理、运营维修管理等模块的开发。包括页面的布局设计和数据渲染，完成与后端的接口对接，解决不同浏览器或者不同手机端页面兼容性问题。

## 简历句子

● 基于 RBAC 模型设计权限系统，通过 json 结构数据动态创建角色控制视图，封装权限指令，动态生成权限配置文件。
● 实现基于配置的表格、表单渲染，提升开发效率，减少重复工作。
● 封装 http 请求接口公共 api，提供全局用户认证、增加接口缓存、参数处理等功能。
● 使用 less 开发样式，样式文件大小减少了近 60％。响应式页面设计，兼容移动端显示，提升用户体验。
● 实现分步计算动态表单数据，提升渲染效率，页面无明显卡顿

● ssr 服务端渲染，减少产物构建体积，按需引入依赖等方式优化，实现页面直出
● 通过 nuxt 提供的 store 服务端初始化方案，结合 vuex getters 等 api 做二次计算，实现数据的全局共享与容错处理
● 尽量最小粒度拆分组件，利用 mixins 和 指令等方式封装通用逻辑
● 样式上利用 scss 的变量、mixin 提炼通用样式，提高样式开发效率，减少产物体积