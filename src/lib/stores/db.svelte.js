import { writable, get } from 'svelte/store';
import { toasts } from './toast.svelte.js';

const KEY = 'bbdd_futbol_v2';

const seed = {
  jugadors: [
    { idjugador: 1, nom: 'Marc', cognom1: 'Soler', cognom2: 'Vidal', anynaixement: 2006, edadactual: 19, paisorigen: 'ES', actius: 'Sí', idequip: 1, idposicio: 9 },
    { idjugador: 2, nom: 'Nil', cognom1: 'Ribas', cognom2: 'Pujol', anynaixement: 2005, edadactual: 20, paisorigen: 'ES', actius: 'Sí', idequip: 2, idposicio: 4 }
  ],
  equips: [
    { idequip: 1, nomequip: 'Palamós CF', provincia: 'Girona', actiu: 'Sí', identrenador: 10 },
    { idequip: 2, nomequip: 'UE Figueres', provincia: 'Girona', actiu: 'Sí', identrenador: 11 }
  ],
  entrenadors: [
    { identrenador: 10, nom: 'Joan', cognom1: 'Costa', cognom2: 'Serra' },
    { identrenador: 11, nom: 'Pau', cognom1: 'Casals', cognom2: 'Ferrer' }
  ],
  meta: { updatedAt: new Date().toISOString() }
};

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(!raw) return seed;
    return JSON.parse(raw);
  }catch{
    return seed;
  }
}
function save(state){
  localStorage.setItem(KEY, JSON.stringify({ ...state, meta: { updatedAt: new Date().toISOString() } }));
}

function createDB(){
  const store = writable(typeof window !== 'undefined' ? load() : seed);

  function reset(){ store.set(seed); save(seed); toasts.push('Seed carregat (demo)', 'ok'); }

  function upsert(table, row, keyField){
    store.update((s) => {
      const list = [...s[table]];
      const idx = list.findIndex((x) => String(x[keyField]) === String(row[keyField]));
      if(idx >= 0) list[idx] = row; else list.push(row);
      const next = { ...s, [table]: list };
      save(next);
      return next;
    });
  }

  function remove(table, keyField, keyValue){
    store.update((s) => {
      const next = { ...s, [table]: s[table].filter(x => String(x[keyField]) !== String(keyValue)) };
      save(next);
      return next;
    });
  }

  function exportJSON(){ return JSON.stringify(get(store), null, 2); }

  function importJSON(jsonText){
    try{
      const parsed = JSON.parse(jsonText);
      store.set(parsed); save(parsed); toasts.push('Import OK', 'ok');
    }catch{ toasts.push('JSON invàlid', 'danger'); }
  }

  return { subscribe: store.subscribe, reset, upsert, remove, exportJSON, importJSON };
}
export const db = createDB();
