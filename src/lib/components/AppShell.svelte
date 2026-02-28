<script>
  import TopBar from './TopBar.svelte';
  import SideNav from './SideNav.svelte';
  import Toasts from './Toasts.svelte';
  let navOpen = false;
</script>

<div class="wrap">
  <TopBar on:toggleNav={() => (navOpen = !navOpen)} />
  <div class="grid">
    <aside class:open={navOpen}>
      <SideNav on:navigate={() => (navOpen = false)} />
    </aside>
    <main class="fade-in">
      <slot />
      <div class="footer small">Gestió BBDD Futbol · UI demo (CRUD local) · Estil “Apple-ish”</div>
    </main>
  </div>
  <Toasts />
</div>

<style>
  .wrap{ min-height:100%; }
  .grid{ display:grid; grid-template-columns: 320px 1fr; gap: 18px; max-width: 1200px; margin: 18px auto 60px; padding: 0 16px; }
  aside{ position: sticky; top: 74px; align-self: start; }
  main{ min-height: calc(100vh - 140px); }
  .footer{ margin-top: 18px; padding: 14px 2px; opacity: .8; }
  @media (max-width: 980px){
    .grid{ grid-template-columns: 1fr; }
    aside{ position: fixed; left: 16px; right: 16px; top: 74px; z-index: 50; transform: translateY(-12px); opacity: 0; pointer-events: none; transition: opacity .18s ease, transform .18s ease; }
    aside.open{ opacity: 1; pointer-events: auto; transform: translateY(0); }
  }
</style>
