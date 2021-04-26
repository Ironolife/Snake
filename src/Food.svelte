<script lang="ts">
  import { scale } from 'svelte/transition';
</script>

<div class="food" transition:scale />

<style>
  .food {
    background-color: deeppink;
  }
</style>
