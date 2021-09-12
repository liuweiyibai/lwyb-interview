### 常用函数

- createStore(reducer, initialState); 作用是创建一个 Redux store 来存放所有的 state
  - reducer:是一个函数。参数：state 和 action 返回一个新的 state
- combineReducers 函数，合并多个 reducer，返回一个 rootReducer
  - 定义一个 reducer，它的功能是根据当前触发的 action 对当前应用的状态（state）进行迭代，这里我们并没有直接修 state，而是返回了一个新的状态。
- 定义 initialState 是为了 Redux 初始化并确定每个 reducer 的结构。而当初始化完成后，每次响应 action 时，reducer 将获得上一次计算出的 state 作为参数，这时 initialState 将不再发挥作用。
- 中间件的定义：中间件就是一个函数，对 store.dispatch 方法进行改造，在发出 Action 之前和执行 Reducer 这个过程中添加其他功能。

```js
// 使用redux-actions库
// 创建对象
const loginState = () => ({});
// 定义一个 reducer，reducer 中响应action的触发
const loginResponse = handleActions(
  {
    ADD_TODO(state, action) {
      // 返回个新的state
      return { ...state, loading: true };
    },
  },
  loginState
);

// 不使用库,当用户在组件中dispatch了一个action之后，reducer 中会判断是哪个action，然后对应着执行。
function previewList(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
  }
}
```

#### 定义函数来生成 Action,我们叫做 ActionCreator，下面这个函数就是一个 ActionCreator

```js
// 下面这个常量是action中的type字段，它用来标识 Redux 应用中一个独立的 action。
const ADD_TODO = 'ADD_TOTO';
function addTo(text) {
  // 每次调用addTo时,都会返回一个action对象.
  return {
    type: ADD_TODO,
    text,
  };
}
// 我们在组件中dispatch这个 addTo 方法，传入参数，然后reducer中进行匹配type，返回新对象
```

#### reducer 函数

- reducer 本质上是一个函数，其函数签名为 reducer(previousState, action) => newState。
- reducer 的职责就是根据 previousState 和 action 计算出新的 newState。

```js
fuction reducer(state, action){
  switch(action.type){
    case "foo":
      return Object.assign({},state, action.data);
    default:
      return state;
  }
}
```

#### createStore 生成 store 对象

- store 作用就是存储 state，并且监听其变化。state 就是 reducer 函数中 return 的初始值

```js
import { createStore } from 'redux';
const store = createStore(reducers, init);
// init 值就是我们在store 中存储的一个 state。
```

#### react-redux 库，redux 官方的和 react 绑定

> 因为 redux 不是只为 react 设计的, 只是因为 redux 适合于 react
> react-redux 为我们提供了 React 与 Redux 之间的绑定，主要为我们提供了 Provider 和 connect 方法。

- 该库提供了 Provider 组件，接受一个 store 作为 prop
- 该库提供了 connect 方法，在整个 react 应用任意组件中获取 store 中数据的功能。
- 所有使用 connect 方法的组件都可以感知 Redux 中数据的变化

#### middleware 就是为了增强 dispatch 出现的

- Redux 提供了 applyMiddleware 方法来加载 middleware。
- ...state 可以理解为遍历 state，...拓展运算符内部调用 Iterator 的接口
- middleware 运行原理:《深入 react 学习》5 章中

#### redux-thunk 是 redux 中的异步操作的解决方案

- thunk 函数原理

```js
var readFileThunk = Thunk(fileName);
readFileThunk(callback);
var Thunk = function(fileName) {
 return function(callback) {
   return fs.readFile(fileName, callback);
};
```

### react-router 和 redux 和 react-router-redux

- 我们在 SPA 应用中做的路由跳转操作，在当前操作中所停留的位置会被保存到 redux 中
- react-router-redux 来帮我们沟通 react-router 和 redux。
- 主要是将 router 中的信息绑定到 store 中。
- react-router-redux 提供了简单直白的 API——syncHistoryWithStore 来完成与 Redux 和 store 的绑定工作。生成新的 history 传入路由组件中。
- 用 redux 的方式改变路由，在 redux 中改变路由也是需要分发 action 的，所以需要通过中间件对 redux 中 store 进行增强，以便 action 能被正确识别
- 组件中更新路由最合理的方式是通过 action 来分发路由。
- 由于 React Router 本身是一个独立的路由处理库，要想把 React Router 中维持的状态暴露给 redux 应用，或是在 Redux 应用中修改 React Router 的状态，我们需要某种手段将这二者结合起，这就要说到 react-router-redux 中提供{routerMiddleware}

```js
import { browserHistory } from 'react-router';
// 实际上是 middleware 工厂，使用时我们传入一个history对象，返回一个真正的Redux middleware，在createStore 时调用
import { routerMiddleware } from 'react-router-redux';
export default routerMiddleware(browserHistory);

// 这样设置以后，我们可以通过如下的方式来分发路由：
// 引入了新的 middleware 之后，就可以像下面这样简单修改当前路由了
import { push } from 'react-router-redux';
// 切换路由到 /home
store.dispatch(push('/home'));
```

### compose 函数实现原理，是函数式编程中的组合函数

```js
function compose(...funcs) {
  return (arg) => funcs.reduceRight((composed, f) => f(composed), arg);
}
```

### redux-actions 是一个简化 action 和 reducer 创建的一个封装库

- createAction 就是用来创建 action 的函数
- handleAction 是用来触发 action 的

### redux-composable-fetch 异步发送 http 请求的中间件

```js
import createFetchMiddleware from 'redux-composable-fetch';
// 创建一个请求 middleware 的示例
const FetchMiddleware = createFetchMiddleware();
const finalCreateStore = compose(
  applyMiddleware(
    ThunkMiddleware,
    // 将请求 middleware 注入 store 增强器中
    FetchMiddleware
  )
)(createStore);
```
