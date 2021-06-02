module.exports = {
  title: '面试题集合 🍀',
  lang: 'zh-cn',
  description: '收集前后端常见面试题，以及自己学习 vue、react 源码过程的笔记',
  // base: '/interview/',
  head: [['link', { rel: 'icon', href: 'logo.webp' }]],
  themeConfig: {
    repo: 'liuweiyibai/lwyb-interview',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: '上次更新时间',
    sidebarDepth: 0,
    sidebar: {
      '/': getGuideSidebar(),
    },
  },
};

function getGuideSidebar() {
  return [
    {
      text: 'js面试题',
      link: '/js/',
      children: [
        {
          text: '数组',
          link: '/js/array/index',
          children: [
            { text: '手写 js forEach 等方法', link: '/js/array/foreach' },
          ],
        },
        {
          text: '对象',
          children: [
            { text: '手写 js 对象中的 create 函数', link: '/js/object/create' },
            { text: '手写 js new 操作符', link: '/js/object/new' },
            { text: 'js 继承实现', link: '/js/object/extend' },
          ],
        },
        // { text: '手写 js 中 call、apply 和 bind', link: '/js/call_apply' },
        { text: '手写 js 中 Promise api', link: '/js/promise' },
        { text: '正则相关面试题', link: '/js/regexp' },
        { text: '定时器相关', link: '/js/setTimeout' },
        { text: 'js 中的数据类型和类型判断', link: '/js/typeof' },
        { text: 'js 函数柯里化', link: '/js/curry' },
        { text: 'js 事件循环面试题', link: '/js/eventLoop' },
      ],
    },
    {
      text: 'vue 相关面试题',
      link: '/vue/index',
      children: [
        { text: 'vue 基础面试题', link: '/vue/base' },
        { text: 'vue 高阶面试题', link: '/vue/high' },
      ],
    },
    {
      text: 'react 相关面试题',
      children: [
        {
          text: 'react 基础面试题',
          link: '/react/base',
        },
      ],
    },
    {
      text: 'babel 面试题',
      link: '/babel',
    },
    {
      text: 'webpack 面试题',
      link: '/webpack',
    },
    {
      text: '算法',
      link: '/algorithm/index',
      children: [
        {
          text: '排序',
          link: '/algorithm/sort',
        },
      ],
    },
    {
      text: 'HTTP 面试题',
      link: '/http/index',
      children: [
        {
          text: '常见 HTTP 状态码',
          link: '/http/statusCode',
        },
        {
          text: 'axios 相关',
          link: '/http/axios',
        },
      ],
    },
    {
      text: 'css 面试题',
      link: '/css/index',
    },
    {
      text: '小程序',
      link: '/mini_progame',
    },
    {
      text: '移动端开发',
      link: '/h5_mobile',
    },
  ];
}
