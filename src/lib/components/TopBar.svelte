<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { Sun, Moon, PanelLeft, Sparkles } from 'lucide-svelte';
  const dispatch = createEventDispatcher();
  let theme = 'dark';
  onMount(() => {
    const saved = localStorage.getItem('theme');
    theme = saved || 'dark';
    document.documentElement.dataset.theme = theme === 'light' ? 'light' : '';
  });
  function toggleTheme(){
    theme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme === 'light' ? 'light' : '';
  }
</script>

<header class="top card">
  <button class="btn icon" on:click={() => dispatch('toggleNav')} aria-label="Menu">
    <PanelLeft size="18" />
  </button>

  <div class="brand">
    <div class="logo"><Sparkles size="18" /></div>
    <div>
      <div class="t">Gestió BBDD Futbol</div>
      <div class="s">Dashboard + CRUD · SvelteKit</div>
    </div>
  </div>

  <div class="right">
    <span class="pill small">IA upgrade mode <span class="kbd">ON</span></span>
    <button class="btn icon" on:click={toggleTheme} aria-label="Theme">
      {#if theme === 'light'} <Moon size="18" /> {:else} <Sun size="18" /> {/if}
    </button>
  </div>
</header>

<style>
  .top{ max-width: 1200px; margin: 16px auto 0; padding: 12px 12px; display:flex; align-items:center; gap: 12px; position: sticky; top: 10px; z-index: 60; }
  .icon{ width:42px; height:42px; display:grid; place-items:center; }
  .brand{ display:flex; align-items:center; gap: 12px; flex:1; min-width: 0; }
  .logo{ width:42px; height:42px; border-radius: 14px; border:1px solid var(--stroke); background: radial-gradient(120% 120% at 30% 20%, rgba(138,180,255,.25), rgba(255,255,255,.06)); display:grid; place-items:center; }
  .t{ font-weight: 650; letter-spacing: -0.02em; }
  .s{ font-size: 12px; color: var(--muted); margin-top: 2px; }
  .right{ display:flex; align-items:center; gap: 10px; }
  @media (max-width: 520px){ .pill{ display:none; } .s{ display:none; } }
</style>
