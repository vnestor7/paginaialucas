<script>
  import { ArrowUpDown, Pencil, Trash2, Plus } from 'lucide-svelte';

  export let title = 'Taula';
  export let subtitle = '';
  export let columns = [];
  export let rows = [];
  export let keyField = 'id';
  export let onCreate = () => {};
  export let onEdit = (row) => {};
  export let onDelete = (row) => {};

  let q = '';
  let sortKey = '';
  let sortDir = 1;

  $: filtered = rows.filter((r) => {
    if(!q.trim()) return true;
    const s = Object.values(r).join(' ').toLowerCase();
    return s.includes(q.toLowerCase());
  });

  $: sorted = (() => {
    if(!sortKey) return filtered;
    return [...filtered].sort((a,b) => {
      const A = String(a[sortKey] ?? '');
      const B = String(b[sortKey] ?? '');
      return A.localeCompare(B, undefined, { numeric: true }) * sortDir;
    });
  })();

  function toggleSort(k){ if(sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = 1; } }
</script>

<section class="card box fade-in">
  <div class="top">
    <div>
      <h1 class="title">{title}</h1>
      {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
    </div>

    <div class="actions">
      <input class="input" placeholder="Cerca..." bind:value={q} />
      <button class="btn primary" on:click={onCreate} type="button"><Plus size="16" /> Crear</button>
    </div>
  </div>

  <hr class="sep" />

  <div class="tableWrap">
    <table>
      <thead>
        <tr>
          {#each columns as c}
            <th>
              <button class="th" type="button" on:click={() => toggleSort(c.key)}>
                <span>{c.label}</span><ArrowUpDown size="14" />
              </button>
            </th>
          {/each}
          <th class="right">Accions</th>
        </tr>
      </thead>
      <tbody>
        {#if sorted.length === 0}
          <tr><td colspan={columns.length + 1} class="empty">Cap resultat.</td></tr>
        {:else}
          {#each sorted as r (r[keyField])}
            <tr>
              {#each columns as c}
                <td><span class="cell">{r[c.key]}</span></td>
              {/each}
              <td class="right">
                <div class="rowActions">
                  <button class="btn" on:click={() => onEdit(r)} type="button" title="Editar"><Pencil size="16" /></button>
                  <button class="btn danger" on:click={() => onDelete(r)} type="button" title="Eliminar"><Trash2 size="16" /></button>
                </div>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</section>

<style>
  .box{ padding: 16px; }
  .top{ display:flex; align-items:flex-start; justify-content:space-between; gap: 14px; flex-wrap: wrap; }
  .actions{ display:flex; align-items:center; gap: 10px; width: min(520px, 100%); }
  .tableWrap{ overflow:auto; border-radius: 18px; border:1px solid var(--stroke); background: rgba(0,0,0,.12); }
  [data-theme="light"] .tableWrap{ background: rgba(255,255,255,.55); }
  table{ width:100%; border-collapse: collapse; min-width: 860px; }
  th, td{ padding: 12px 12px; border-bottom:1px solid rgba(255,255,255,.08); }
  [data-theme="light"] th, [data-theme="light"] td{ border-bottom:1px solid rgba(10,16,34,.08); }
  thead th{ position: sticky; top:0; background: rgba(0,0,0,.22); backdrop-filter: blur(12px); }
  [data-theme="light"] thead th{ background: rgba(255,255,255,.78); }
  .th{ width:100%; display:flex; align-items:center; justify-content:space-between; gap: 10px; border:0; background: transparent; cursor:pointer; color: var(--muted); padding: 2px 0; }
  .th:hover{ color: var(--text); }
  tbody tr:hover td{ background: rgba(255,255,255,.05); }
  .cell{ font-size: 13px; color: var(--text); }
  .right{ text-align:right; }
  .rowActions{ display:flex; justify-content:flex-end; gap: 8px; }
  .empty{ text-align:center; padding: 24px; color: var(--muted); }
</style>
