<script>
  import DataTable from '$lib/components/DataTable.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { db } from '$lib/stores/db.svelte.js';
  import { toasts } from '$lib/stores/toast.svelte.js';

  const columns = [
    { key: 'idjugador', label: 'idjugador' },
    { key: 'nom', label: 'nom' },
    { key: 'cognom1', label: 'cognom1' },
    { key: 'cognom2', label: 'cognom2' },
    { key: 'anynaixement', label: 'anynaixement' },
    { key: 'edadactual', label: 'edadactual' },
    { key: 'paisorigen', label: 'paisorigen' },
    { key: 'actius', label: 'actius' },
    { key: 'idequip', label: 'idequip' },
    { key: 'idposicio', label: 'idposicio' }
  ];

  let open = false;
  let form = empty();

  function empty(){ return { idjugador:'', nom:'', cognom1:'', cognom2:'', anynaixement:'', edadactual:'', paisorigen:'', actius:'Sí', idequip:'', idposicio:'' }; }
  function create(){ form = empty(); open = true; }
  function edit(row){ form = { ...row }; open = true; }

  function save(){
    if(!String(form.idjugador).trim()){ toasts.push('Falta idjugador', 'warn'); return; }
    db.upsert('jugadors', normalize(form), 'idjugador');
    toasts.push('Jugador guardat', 'ok');
    open = false;
  }
  function del(row){ db.remove('jugadors', 'idjugador', row.idjugador); toasts.push('Jugador eliminat', 'danger'); }

  function normalize(x){
    return { ...x,
      idjugador: Number(x.idjugador),
      anynaixement: Number(x.anynaixement),
      edadactual: Number(x.edadactual),
      idequip: Number(x.idequip),
      idposicio: Number(x.idposicio)
    };
  }
</script>

<DataTable
  title="Taula de Jugadors"
  subtitle="Cerca, ordena i gestiona registres (CRUD local)"
  {columns}
  rows={$db.jugadors}
  keyField="idjugador"
  onCreate={create}
  onEdit={edit}
  onDelete={del}
/>

<Modal bind:open title="Jugador">
  <div class="grid">
    <label>idjugador<input class="input" bind:value={form.idjugador} placeholder="1" /></label>
    <label>nom<input class="input" bind:value={form.nom} placeholder="Nom" /></label>
    <label>cognom1<input class="input" bind:value={form.cognom1} placeholder="Cognom" /></label>
    <label>cognom2<input class="input" bind:value={form.cognom2} placeholder="Cognom 2" /></label>
    <label>anynaixement<input class="input" bind:value={form.anynaixement} placeholder="2006" /></label>
    <label>edadactual<input class="input" bind:value={form.edadactual} placeholder="19" /></label>
    <label>paisorigen<input class="input" bind:value={form.paisorigen} placeholder="ES" /></label>
    <label>actius
      <select class="input" bind:value={form.actius}><option>Sí</option><option>No</option></select>
    </label>
    <label>idequip<input class="input" bind:value={form.idequip} placeholder="1" /></label>
    <label>idposicio<input class="input" bind:value={form.idposicio} placeholder="9" /></label>
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
