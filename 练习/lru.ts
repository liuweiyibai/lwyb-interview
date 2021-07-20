class Lru {
  max: number;
  cache: {};
  keys: string[];
  constructor(max: number) {
    this.max = max;
    this.cache = {};
    this.keys = [];
  }
  get = (key: string) => {
    if (this.cache[key]) {
      this.remove(this.keys, key);
      this.keys.push(key);
      return this.cache[key];
    }
    return null;
  };

  set = (key: string, value: any) => {
    this.keys.push(key);
    if (this.keys.length > this.max) {
      delete this.cache[this.keys[0]];
      this.keys.unshift();
    }
    this.cache[key] = value;
  };
  remove = (arr: string[], key: string) => {
    if (arr.length) {
      const index = arr.indexOf(key);
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
  };
}
