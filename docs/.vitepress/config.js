module.exports = {
  title: '面试题集合 🍀',
  lang: 'zh-cn',
  description: '收集前后端常见面试题，以及自己学习 vue、react 源码过程的笔记',
  head: [['link', { rel: 'icon', href: '/logo.webp' }]],
  themeConfig: {
    repo: 'liuweiyibai/lwyb-interview',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 编辑',
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
      text: 'JavaScript 面试题',
      link: '/JavaScript/index',
      children: [
        {
          text: '数组',
          link: '/JavaScript/array',
        },
        { text: '对象', link: '/JavaScript/object' },
        { text: '函数', link: '/JavaScript/function' },
        { text: '事件循环', link: '/JavaScript/eventLoop' },
        { text: 'Promise', link: '/JavaScript/promise' },
        { text: '正则表达式', link: '/JavaScript/regexp' },
        { text: '手写代码', link: '/JavaScript/手写代码' },
      ],
    },
    {
      text: 'vue 相关面试题',
      link: '/vue',
      children: [
        {
          text: 'vue3 面试题',
          link: '/vue3/index',
        },
      ],
    },
    {
      text: 'react 相关面试题',
      link: '/react',
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
      text: '前端工程化',
      link: '/engineering',
    },
    {
      text: '算法',
      link: '/算法/index',
      children: [
        {
          text: '排序相关',
          link: '/算法/排序',
        },
      ],
    },
    {
      text: 'HTTP 面试题',
      link: '/http',
    },
    {
      text: 'css 面试题',
      link: '/css',
    },
    {
      text: '小程序',
      link: '/miniProgame',
    },
    {
      text: '移动端开发',
      link: '/h5Mobile',
    },
  ];
}
