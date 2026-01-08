export function debounce(func: any, delay: number) {
  let timer = 0 as any;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log('防抖函数');
      func();
    }, delay);
  };
}
