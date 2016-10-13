export function containsNone(string, items) {
  return items.every(item => string.indexOf(item) === -1);
}

export function throttle(callback, wait, context = this) {
  let timeout = null;
  let callbackArgs = null

  const later = () => {
    callback.apply(context, callbackArgs)
    timeout = null
  }

  return function() {
    if (!timeout) {
      callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}
