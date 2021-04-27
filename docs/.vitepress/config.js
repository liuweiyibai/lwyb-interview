module.exports = {
  title: '面试题集合 🍀',
  lang: 'zh-cn',
  description: '收集前后端常见面试题，以及自己学习 vue、react 源码过程的笔记',
  base: '/interview/',
  head: [
    [
      'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
      { rel: 'icon', href: 'logo.webp' },
    ],
  ],
  themeConfig: {
    repo: 'liuweiyibai/lwyb-interview',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: '上次更新时间',
    // nav: [
    //   { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
    //   {
    //     text: 'Config Reference',
    //     link: '/config/basics',
    //     activeMatch: '^/config/',
    //   },
    //   {
    //     text: 'Release Notes',
    //     link: 'https://github.com/vuejs/vitepress/releases',
    //   },
    // ],

    sidebar: {
      // '/interview/': getGuideSidebar(),
      // '/config/': getConfigSidebar(),
      '/': getGuideSidebar(),
    },
  },
};

function getGuideSidebar() {
  return [
    {
      text: 'js面试题',
      children: [
        { text: '常见js面试题', link: '/js/' },
        { text: '手写 js 中 bind', link: '/js/bind' },
        { text: '手写 js 中 call 和 apply', link: '/js/call_apply' },
        { text: '手写 js 中 Promise api', link: '/js/promise' },
        { text: '手写 js 中数组 forEach', link: '/js/array/foreach' },
        { text: 'js 中的类型和类型判断', link: '/js/typeof' },
        { text: '手写 js 对象中的 create 函数', link: '/js/object/create' },
        { text: '定时器相关', link: '/js/setTimeout' },
        { text: '手写 js new 操作符', link: '/js/new' },
      ],
    },
    {
      text: 'vue 相关面试题',
      children: [
        { text: 'vue 基础面试题', link: '/vue/基础面试题' },
        { text: 'vue 高阶面试题', link: '/vue/原理相关面试题' },
      ],
    },
    {
      text: 'babel 面试题',
      children: [{ text: 'babel 常见面试问点', link: '/babel' }],
    },
    {
      text: '算法',
      children: [
        {
          text: '排序',
          link: '/算法/sort',
        },
      ],
    },
    {
      text: 'css 面试题',
      children: [{ text: 'Frontmatter', link: '/guide/frontmatter' }],
    },
    {
      text: 'html 面试题',
    },
  ];
}
