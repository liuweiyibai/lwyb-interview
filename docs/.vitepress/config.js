module.exports = {
  title: '面试题集合',
  description: '收集前后端常见面试题，以及自己学习 vue、react 源码过程的笔记',
  themeConfig: {
    repo: 'vuejs/vitepress',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
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
        { text: '手写js 中 bind', link: '/js/bind' },
        { text: '手写js 中 call 和 apply', link: '/js/call_apply' },
        { text: 'Configuration', link: '/guide/configuration' },
        { text: 'Asset Handling', link: '/guide/assets' },
        { text: 'Markdown Extensions', link: '/guide/markdown' },
        { text: 'Using Vue in Markdown', link: '/guide/using-vue' },
        { text: 'Deploying', link: '/guide/deploy' },
      ],
    },
    {
      text: 'Advanced',
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
