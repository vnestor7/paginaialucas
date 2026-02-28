<script>
  export let open = false;
  export let title = 'Modal';
</script>

{#if open}
  <div class="backdrop" on:click|self={() => (open = false)}>
    <div class="modal card fade-in" role="dialog" aria-modal="true" aria-label={title}>
      <div class="head">
        <div class="title">{title}</div>
        <button class="btn" on:click={() => (open = false)}>Tancar</button>
      </div>
      <div class="body"><slot /></div>
    </div>
  </div>
{/if}

<style>
  .backdrop{ position: fixed; inset: 0; background: rgba(0,0,0,.45); display:grid; place-items:center; padding: 16px; z-index: 200; }
  [data-theme="light"] .backdrop{ background: rgba(10,16,34,.25); }
  .modal{ width: min(720px, 100%); padding: 14px; border-radius: 26px; }
  .head{ display:flex; align-items:center; justify-content:space-between; gap: 10px; margin-bottom: 10px; }
  .body{ padding: 4px 2px 2px; }
</style>
