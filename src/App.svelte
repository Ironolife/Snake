<script lang="ts">
  import Board from './Board.svelte';
  import { gameState, score } from './store';
</script>

<main>
  <header>
    <div>Snake</div>
    <div class="spacer" />
    <div>{$score}</div>
  </header>
  <Board />
  <footer>
    {#if $gameState === 'won'}
      <div>You Won!</div>
    {:else if $gameState === 'lost'}
      <div>You Lost!</div>
    {/if}
  </footer>
</main>

<style>
  main {
    max-width: 640px;
    margin: 0 auto;
    position: relative;
  }
  header,
  footer {
    display: flex;
    margin: 16px 0;
    color: limegreen;
    font-size: 32pt;
    font-weight: 700;
  }
  footer {
    justify-content: center;
  }
  .spacer {
    flex: 1;
  }
</style>
