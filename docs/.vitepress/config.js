module.exports = {
  title: '面试题集合',
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
      text: 'js 面试题',
      children: [
        { text: '手写 js 中 bind', link: '/js/bind' },
        { text: '手写 js 中 call 和 apply', link: '/js/call_apply' },
        { text: '手写 js 中 Promise api', link: '/js/promise' },
        { text: '手写 js 中数组 forEach', link: '/js/array/foreach' },
        { text: '手写 js new 操作符', link: '/js/new' },
      ],
    },
    {
      text: 'css 面试题',
      children: [
        { text: 'Frontmatter', link: '/guide/frontmatter' },
        { text: 'Global Computed', link: '/guide/global-computed' },
        { text: 'Global Component', link: '/guide/global-component' },
        { text: 'Customization', link: '/guide/customization' },
        {
          text: 'Differences from Vuepress',
          link: '/guide/differences-from-vuepress',
        },
      ],
    },
    {
      text: 'html 面试题',
    },
  ];
}

function getConfigSidebar() {
  return [
    {
      text: 'App Config',
      children: [{ text: 'Basics', link: '/config/basics' }],
    },
    {
      text: 'Theme Config',
      children: [
        { text: 'Homepage', link: '/config/homepage' },
        { text: 'Algolia Search', link: '/config/algolia-search' },
        { text: 'Carbon Ads', link: '/config/carbon-ads' },
      ],
    },
  ];
}
