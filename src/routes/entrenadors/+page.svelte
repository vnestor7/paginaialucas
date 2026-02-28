<script>
  import DataTable from '$lib/components/DataTable.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { db } from '$lib/stores/db.svelte.js';
  import { toasts } from '$lib/stores/toast.svelte.js';

  const columns = [
    { key: 'identrenador', label: 'identrenador' },
    { key: 'nom', label: 'nom' },
    { key: 'cognom1', label: 'cognom1' },
    { key: 'cognom2', label: 'cognom2' }
  ];

  let open = false;
  let form = empty();

  function empty(){ return { identrenador:'', nom:'', cognom1:'', cognom2:'' }; }
  function create(){ form = empty(); open = true; }
  function edit(row){ form = { ...row }; open = true; }

  function save(){
    if(!String(form.identrenador).trim()){ toasts.push('Falta identrenador', 'warn'); return; }
    db.upsert('entrenadors', normalize(form), 'identrenador');
    toasts.push('Entrenador guardat', 'ok');
    open = false;
  }
  function del(row){ db.remove('entrenadors', 'identrenador', row.identrenador); toasts.push('Entrenador eliminat', 'danger'); }
  function normalize(x){ return { ...x, identrenador: Number(x.identrenador) }; }
</script>

<DataTable
  title="Taula d'Entrenadors"
  subtitle="Gestió pro amb modals + toasts"
  {columns}
  rows={$db.entrenadors}
  keyField="identrenador"
  onCreate={create}
  onEdit={edit}
  onDelete={del}
/>

<Modal bind:open title="Entrenador">
  <div class="grid">
    <label>identrenador<input class="input" bind:value={form.identrenador} placeholder="10" /></label>
    <label>nom<input class="input" bind:value={form.nom} placeholder="Nom" /></label>
    <label>cognom1<input class="input" bind:value={form.cognom1} placeholder="Cognom" /></label>
    <label>cognom2<input class="input" bind:value={form.cognom2} placeholder="Cognom 2" /></label>
  </div>

  <div class="row">
    <button class="btn primary" on:click={save} type="button">Guardar</button>
    <button class="btn" on:click={() => (open = false)} type="button">Cancel·lar</button>
  </div>
</Modal>

<style>
  .grid{ display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  label{ display:flex; flex-direction:column; gap: 6px; font-size: 12px; color: var(--muted); }
  .row{ display:flex; justify-content:flex-end; gap: 10px; margin-top: 12px; }
  @media (max-width: 720px){ .grid{ grid-template-columns: 1fr; } }
</style>
