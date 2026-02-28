<script>
  import { toasts } from '$lib/stores/toast.svelte.js';
  import { Mail, Phone, Send } from 'lucide-svelte';
  let nom = ''; let email = '';
  function submit(){
    if(!nom.trim() || !email.trim()){ toasts.push('Omple nom i correu', 'warn'); return; }
    toasts.push(`Enviat ✅ (${nom})`, 'ok');
    nom = ''; email = '';
  }
</script>

<section class="card box fade-in">
  <h1 class="title">Contacte</h1>
  <p class="subtitle">Informació + formulari amb look modern.</p>

  <div class="info">
    <div class="card item">
      <div class="pill"><Mail size="16" /> Email</div>
      <div class="val">vimasp@inspalamos.cat</div>
      <div class="hint">Demo · canvia-ho si cal</div>
    </div>

    <div class="card item">
      <div class="pill"><Phone size="16" /> Telèfon</div>
      <div class="val">+34 692 12 52 77</div>
      <div class="hint">Demo · canvia-ho si cal</div>
    </div>
  </div>

  <hr class="sep" />

  <div class="card form">
    <div class="small">Prefereixes que nosaltres contactem amb tu?</div>
    <div class="grid">
      <input class="input" placeholder="Nom" bind:value={nom} />
      <input class="input" placeholder="Correu electrònic" bind:value={email} />
      <button class="btn primary" on:click={submit} type="button"><Send size="16" /> Enviar</button>
    </div>
    <div class="hint">Això és UI demo (no envia correus de veritat).</div>
  </div>
</section>

<style>
  .box{ padding: 16px; }
  .info{ display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
  .item{ padding: 14px; border-radius: 24px; }
  .val{ font-size: 18px; font-weight: 700; margin-top: 10px; }
  .form{ padding: 14px; border-radius: 24px; }
  .grid{ display:grid; grid-template-columns: 1fr 1fr auto; gap: 10px; margin-top: 10px; }
  @media (max-width: 820px){ .info{ grid-template-columns: 1fr; } .grid{ grid-template-columns: 1fr; } }
</style>
