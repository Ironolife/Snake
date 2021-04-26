<script lang="ts">
  import Board from './Board.svelte';
  import EndDialog from './EndDialog.svelte';
  import { gameState, score } from './store';
</script>

<main>
  <header>
    <div>Snake</div>
    <div class="spacer" />
    <div>{$score}</div>
  </header>
  <Board />
  {#if $gameState === 'won' || $gameState === 'lost'}
    <EndDialog message={`You ${$gameState}!`} />
  {/if}
  <footer>
    <a href="https://github.com/Ironolife" target="_blank" rel="noreferrer"
      >Made with <span style="color: deeppink">❤</span> by Ironolife © 2021</a
    >
  </footer>
</main>

<style>
  main {
    max-width: 640px;
    margin: 0 auto;
    position: relative;
  }
  header {
    display: flex;
    margin: 32px 0;
    color: limegreen;
    font-size: 32pt;
    font-weight: 700;
  }
  footer {
    margin-top: 32px;
    text-align: center;
  }
  footer > a {
    color: limegreen;
    font-size: 16pt;
  }
  .spacer {
    flex: 1;
  }
</style>
