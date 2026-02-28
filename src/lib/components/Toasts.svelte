<script>
  import { toasts } from '$lib/stores/toast.svelte.js';
</script>

<div class="stack" aria-live="polite">
  {#each $toasts as t (t.id)}
    <div class="toast card {t.type}">
      <div class="msg">{t.message}</div>
    </div>
  {/each}
</div>

<style>
  .stack{ position: fixed; right: 18px; bottom: 18px; display:flex; flex-direction:column; gap: 10px; z-index: 999; width: min(360px, calc(100vw - 36px)); }
  .toast{ padding: 12px 14px; border-radius: 18px; animation: pop .22s ease both; }
  .msg{ font-size: 13px; color: var(--text); }
  .info{ border-color: rgba(138,180,255,.35); }
  .ok{ border-color: rgba(124,255,178,.35); }
  .warn{ border-color: rgba(255,211,124,.35); }
  .danger{ border-color: rgba(255,107,107,.35); }
  @keyframes pop{ from{ opacity:0; transform: translateY(10px) scale(.98);} to{ opacity:1; transform: translateY(0) scale(1);} }
</style>
