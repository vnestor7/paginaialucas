import { base } from '$app/paths';

<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Home, Users, Shield, Trophy, Mail, Database } from 'lucide-svelte';
  const dispatch = createEventDispatcher();

  const items = [
    { href: '/', label: 'Inici', icon: Home, desc: 'Resum i accions ràpides' },
    { href: '/jugadors', label: 'Jugadors', icon: Users, desc: 'Llista + CRUD' },
    { href: '/equips', label: 'Equips', icon: Trophy, desc: 'Llista + CRUD' },
    { href: '/entrenadors', label: 'Entrenadors', icon: Shield, desc: 'Llista + CRUD' },
    { href: '/contacte', label: 'Contacte', icon: Mail, desc: 'Formulari i info' }
  ];

function nav(href) {
  goto(`${base}${href}`);
  dispatch('navigate');
}
</script>

<nav class="card nav">
  <div class="head">
    <div class="pill"><Database size="16" /> Explorador modern</div>
    <div class="small">Adéu frameset 👋</div>
  </div>

  <div class="list">
    {#each items as it}
      <button class="item {($page.url.pathname === it.href) ? 'active' : ''}" on:click={() => nav(it.href)} type="button">
        <span class="ic"><svelte:component this={it.icon} size="18" /></span>
        <span class="txt">
          <span class="lbl">{it.label}</span>
          <span class="desc">{it.desc}</span>
        </span>
<span class="dot"></span>
      </button>
    {/each}
  </div>

  <div class="foot"><div class="hint">Dades demo guardades a <span class="kbd">localStorage</span></div></div>
</nav>

<style>
  .nav{ padding: 14px; }
  .head{ display:flex; justify-content:space-between; align-items:flex-start; gap: 10px; margin-bottom: 12px; }
  .list{ display:flex; flex-direction:column; gap: 8px; }
  .item{ width:100%; text-align:left; border:1px solid transparent; background: transparent; padding: 10px 10px; border-radius: 16px; display:flex; gap: 10px; align-items:center; cursor:pointer; transition: background .18s ease, border-color .18s ease, transform .08s ease; }
  .item:hover{ background: rgba(255,255,255,.06); border-color: var(--stroke); }
  .item:active{ transform: scale(.995); }
  .item.active{ background: linear-gradient(180deg, rgba(138,180,255,.18), rgba(255,255,255,.06)); border-color: rgba(138,180,255,.35); }
  .ic{ width:38px; height:38px; border-radius: 14px; border:1px solid var(--stroke); display:grid; place-items:center; background: rgba(0,0,0,.18); }
  [data-theme="light"] .ic{ background: rgba(255,255,255,.65); }
  .txt{ display:flex; flex-direction:column; min-width: 0; }
  .lbl{ font-weight: 650; }
  .desc{ font-size: 12px; color: var(--muted); margin-top: 2px; }
  .dot{ margin-left:auto; width: 10px; height: 10px; border-radius: 999px; background: rgba(255,255,255,.10); border:1px solid var(--stroke); }
  .item.active .dot{ background: rgba(138,180,255,.55); border-color: rgba(138,180,255,.45); }
  .foot{ margin-top: 12px; padding-top: 12px; }
</style>
