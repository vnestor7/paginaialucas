<script context="module">
  export const prerender = true;
</script>

<script>
  import '../app.css';
  import AppShell from '$lib/components/AppShell.svelte';
</script>

<AppShell>
  <slot />
</AppShell>
