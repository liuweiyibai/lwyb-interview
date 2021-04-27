import{o as n,c as s,d as a}from"./app.6ada74fe.js";const t='{"title":"实现 js 中的 new 操作符","description":"","frontmatter":{},"relativePath":"js/new.md","lastUpdated":1619357941308}',p={},o=a('<h1 id="实现-js-中的-new-操作符"><a class="header-anchor" href="#实现-js-中的-new-操作符" aria-hidden="true">#</a> 实现 js 中的 new 操作符</h1><p><a href="https://juejin.cn/post/6844903704663949325#heading-6" target="_blank" rel="noopener noreferrer">参考地址</a></p><div class="language-js"><pre><code><span class="token comment">/**\n * new1(ctor,...otherArgs)\n * @param {*} ctor 构造函数\n * @returns 返回实例\n */</span>\n<span class="token keyword">function</span> <span class="token function">new1</span><span class="token punctuation">(</span><span class="token parameter">ctor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> ctor <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment">// 指向构造函数</span>\n  new1<span class="token punctuation">.</span>target <span class="token operator">=</span> ctor<span class="token punctuation">;</span>\n\n  <span class="token comment">// var newObject = {}</span>\n  <span class="token comment">// newObject.__proto__ = ctor.prototype</span>\n  <span class="token keyword">var</span> newObjectPrototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>ctor<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token comment">// var args = [...arguments].slice(1)</span>\n  <span class="token comment">// var args = Array.from(arguments).slice(1)</span>\n\n  <span class="token comment">// 通过 apply 改变指向</span>\n  <span class="token comment">// 如果构造函数中返回非null的对象，直接返回这个对象</span>\n  <span class="token keyword">var</span> newResult <span class="token operator">=</span> <span class="token function">ctor</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>newObjectPrototype<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">var</span> isObject <span class="token operator">=</span> <span class="token keyword">typeof</span> newResult <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span> newResult <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n  <span class="token keyword">var</span> isFunction <span class="token operator">=</span> <span class="token keyword">typeof</span> newResult <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>isObject <span class="token operator">||</span> isFunction<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> newResult<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment">// 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。</span>\n  <span class="token keyword">return</span> newObjectPrototype<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div>',3);p.render=function(a,t,p,e,c,r){return n(),s("div",null,[o])};export default p;export{t as __pageData};
