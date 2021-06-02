module.exports = {
	title: '面试题集合 🍀',
	lang: 'zh-cn',
	description: '收集前后端常见面试题，以及自己学习 vue、react 源码过程的笔记',
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
}

function getGuideSidebar() {
	return [
		{
			text: 'js面试题',
			children: [
				{
					text: '基础中的基础',
					link: '/js/index',
				},
				{
					text: '数组',
					link: '/js/array',
				},
				{
					text: '对象',
					link: '/js/object',
				},
				{
					text: '函数',
					link: '/js/function',
				},
				{
					text: '事件循环',
					link: '/js/eventLoop',
				},

				{ text: '正则表达式', link: '/js/regexp' },
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
		},
		{
			text: 'css 面试题',
			link: '/css/index',
		},
		{
			text: '小程序',
			link: '/miniProgame',
		},
		{
			text: '移动端开发',
			link: '/h5Mobile',
		},
	]
}
