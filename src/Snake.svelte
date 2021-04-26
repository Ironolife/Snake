<script lang="ts">
  import { scale } from 'svelte/transition';
</script>

<div class="snake" transition:scale={{ duration: 150, opacity: 1 }} />

<style>
  .snake {
    background-color: lime;
  }
</style>
