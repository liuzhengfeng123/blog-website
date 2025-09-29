// eslint-disable-next-line no-unused-vars
type AnyFunction = (...args: any[]) => any

export function throttle<T extends AnyFunction>(
  fn: T,
  delay = 200
) {
  let timer:any = null
  return function (this: void, ...args: Parameters<T>):ReturnType<T> | undefined {
    if (timer) return
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}
