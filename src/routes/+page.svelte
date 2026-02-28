<script>
  import { db } from '$lib/stores/db.svelte.js';
  import { toasts } from '$lib/stores/toast.svelte.js';
  import Modal from '$lib/components/Modal.svelte';
  import { Download, Upload, RotateCcw } from 'lucide-svelte';

  let open = false;
  let exportText = '';
  let importText = '';

  $: counts = $db ? {
    jugadors: $db.jugadors.length,
    equips: $db.equips.length,
    entrenadors: $db.entrenadors.length,
    updatedAt: $db.meta.updatedAt
  } : { jugadors:0, equips:0, entrenadors:0, updatedAt:'' };

  function doExport(){ exportText = db.exportJSON(); open = true; }
  function doImport(){ db.importJSON(importText); open = false; }
</script>

<section class="card hero fade-in">
  <div class="left">
    <h1 class="title">Benvingut 👋</h1>
    <p class="subtitle">
      Versió “pro” del projecte: app SPA amb navegació, taules modernes, cerca, CRUD i persistència local.
    </p>

    <div class="stats">
      <div class="stat card"><div class="k">Jugadors</div><div class="v">{counts.jugadors}</div></div>
      <div class="stat card"><div class="k">Equips</div><div class="v">{counts.equips}</div></div>
      <div class="stat card"><div class="k">Entrenadors</div><div class="v">{counts.entrenadors}</div></div>
    </div>

    <div class="row">
      <button class="btn primary" on:click={() => { db.reset(); }} type="button"><RotateCcw size="16" /> Reset seed</button>
      <button class="btn" on:click={doExport} type="button"><Download size="16" /> Export JSON</button>
      <button class="btn" on:click={() => { open = true; exportText = ''; }} type="button"><Upload size="16" /> Import JSON</button>
    </div>

    <div class="hint">Última actualització: <span class="kbd">{counts.updatedAt}</span></div>
  </div>

  <div class="right">
    <div class="big card">
      <div class="pill">Look & feel premium</div>
      <ul>
        <li>Dark mode + glass</li>
        <li>Responsive</li>
        <li>Taules amb cerca i sort</li>
        <li>Modals + toasts</li>
        <li>Persistència localStorage</li>
      </ul>
     <button
  class="btn primary"
  type="button"
  on:click={() => {
    console.log("Toast click OK");
    toasts.push("UI pro activada 🔥", "ok");
  }}
>
  Prova un toast
</button>
    </div>
  </div>
</section>

<Modal bind:open title="Export / Import JSON">
  {#if exportText}
    <div class="small">Copia aquest JSON:</div>
    <textarea class="input area" rows="12" readonly>{exportText}</textarea>
  {:else}
    <div class="small">Enganxa un JSON exportat:</div>
<textarea class="input area" rows="12" bind:value={importText} placeholder="&#123;&#125;"></textarea>
    <div class="row" style="justify-content:flex-end;">
      <button class="btn primary" on:click={doImport} type="button">Importar</button>
    </div>
  {/if}
</Modal>

<style>
  .hero{ padding: 18px; display:grid; grid-template-columns: 1.25fr .75fr; gap: 16px; }
  .stats{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 14px 0; }
  .stat{ padding: 14px; border-radius: 20px; }
  .k{ color: var(--muted); font-size: 12px; }
  .v{ font-size: 26px; font-weight: 750; letter-spacing: -0.03em; margin-top: 6px; }
  .row{ display:flex; gap: 10px; flex-wrap: wrap; margin-top: 12px; }
  .big{ padding: 16px; border-radius: 26px; }
  ul{ margin: 10px 0 14px; color: var(--muted); }
  li{ margin: 8px 0; }
  .area{ margin-top: 10px; font-family: var(--mono); font-size: 12px; }
  @media (max-width: 980px){ .hero{ grid-template-columns: 1fr; } }
</style>
