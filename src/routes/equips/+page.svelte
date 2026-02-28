<script>
  import DataTable from '$lib/components/DataTable.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { db } from '$lib/stores/db.svelte.js';
  import { toasts } from '$lib/stores/toast.svelte.js';

  const columns = [
    { key: 'idequip', label: 'idequip' },
    { key: 'nomequip', label: 'nomequip' },
    { key: 'provincia', label: 'provincia' },
    { key: 'actiu', label: 'actiu' },
    { key: 'identrenador', label: 'identrenador' }
  ];

  let open = false;
  let form = empty();

  function empty(){ return { idequip:'', nomequip:'', provincia:'', actiu:'Sí', identrenador:'' }; }
  function create(){ form = empty(); open = true; }
  function edit(row){ form = { ...row }; open = true; }

  function save(){
    if(!String(form.idequip).trim()){ toasts.push('Falta idequip', 'warn'); return; }
    db.upsert('equips', normalize(form), 'idequip');
    toasts.push('Equip guardat', 'ok');
    open = false;
  }
  function del(row){ db.remove('equips', 'idequip', row.idequip); toasts.push('Equip eliminat', 'danger'); }
  function normalize(x){ return { ...x, idequip: Number(x.idequip), identrenador: Number(x.identrenador) }; }
</script>

<DataTable
  title="Taula d'Equips"
  subtitle="Gestió d'equips amb UI moderna"
  {columns}
  rows={$db.equips}
  keyField="idequip"
  onCreate={create}
  onEdit={edit}
  onDelete={del}
/>

<Modal bind:open title="Equip">
  <div class="grid">
    <label>idequip<input class="input" bind:value={form.idequip} placeholder="1" /></label>
    <label>nomequip<input class="input" bind:value={form.nomequip} placeholder="Nom equip" /></label>
    <label>provincia<input class="input" bind:value={form.provincia} placeholder="Girona" /></label>
    <label>actiu
      <select class="input" bind:value={form.actiu}><option>Sí</option><option>No</option></select>
    </label>
    <label>identrenador<input class="input" bind:value={form.identrenador} placeholder="10" /></label>
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
