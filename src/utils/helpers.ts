import { ref, customRef } from "vue";

export function throttle(func: (...args: any) => void, timeFrame: number) {
  let lastTime = 0;
  return function (...args: any) {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}

export const debounce = (fn: (value: any) => void, delay = 0, immediate = false) => {
  let timeout: any;
  return (...args: any) => {
    if (immediate && !timeout) fn.apply(this, args);
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export const useDebouncedRef = (initialValue: any, delay: number, immediate?: boolean) => {
  const state = ref(initialValue);
  const debouncedRef = customRef((track, trigger) => ({
    get() {
      track();
      return state.value;
    },
    set: debounce(
      (value) => {
        state.value = value;
        trigger();
      },
      delay,
      immediate
    ),
  }));
  return debouncedRef;
};
