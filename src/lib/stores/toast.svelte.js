import { writable } from 'svelte/store';

function createToasts(){
  const { subscribe, update } = writable([]);
  function push(message, type = 'info'){
    const id = crypto.randomUUID();
    update((t) => [...t, { id, message, type }]);
    setTimeout(() => dismiss(id), 2600);
  }
  function dismiss(id){ update((t) => t.filter(x => x.id !== id)); }
  return { subscribe, push, dismiss };
}
export const toasts = createToasts();
