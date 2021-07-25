class Update {
  payload: any;
  nextUpdate: any;
  constructor(payload: any, nextUpdate?: any) {
    this.payload = payload;
    this.nextUpdate = nextUpdate;
  }
}

class UpdateQueue {
  baseState: any;
  firstUpdate: any;
  lastUpdate: any;
  constructor() {
    this.baseState = null;
    this.firstUpdate = null;
    this.lastUpdate = null;
  }
  enqueueUpdate(update: Update) {
    if (this.firstUpdate === null) {
      this.firstUpdate = this.lastUpdate = update;
    } else {
      // 上一个的下一个是当前传入的update
      this.lastUpdate.nextUpdate = update;
      this.lastUpdate = update;
    }
  }

  forceUpdate() {
    let currentState = this.baseState || {};
    let currentUpdate = this.firstUpdate;
    while (currentUpdate) {
      const nextState =
        typeof currentUpdate.payload === 'function'
          ? currentUpdate.payload(currentState)
          : currentUpdate.payload;
      currentState = { ...currentState, ...nextState };

      // 继续向下找链
      currentUpdate = currentUpdate.nextUpdate;
    }
    this.firstUpdate = this.lastUpdate = null;
    this.baseState = currentState;
    return currentState;
  }
}

// 单向链表
const queue = new UpdateQueue();
queue.enqueueUpdate(new Update({ name: 'hh' }));
queue.enqueueUpdate(new Update({ number: 0 }));
queue.enqueueUpdate(new Update((state: any) => ({ number: state.number + 1 })));
queue.enqueueUpdate(new Update((state: any) => ({ number: state.number + 1 })));
queue.forceUpdate();

console.log(queue.baseState);
