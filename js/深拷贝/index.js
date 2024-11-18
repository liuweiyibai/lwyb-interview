/**
 *
 * @param {*} obj
 * @returns
 * @summary 深拷贝只处理引用数据类型
 */
function deepCopy(obj) {
  if (obj === null) return obj;
  if (!(obj instanceof Object)) return obj;

  let copied = Array.isArray(obj) ? [] : {};
}

function isArray() {}
