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
  <div class="board">
    <Board />
  </div>
  {#if $gameState === 'won' || $gameState === 'lost'}
    <EndDialog message={`You ${$gameState}!`} />
  {/if}
  <footer>
    <a href="https://github.com/Ironolife" target="_blank" rel="noreferrer"
      >Made with <span style="color: deeppink">❤</span> by Ironolife © 2021</a
    >
  </footer>
</main>

<style lang="scss">
  :global(:root) {
    @media screen and (max-width: 640px) {
      font-size: 0.8rem;
    }
  }
  main {
    height: 100%;
    max-width: 640px;
    margin: 0 auto;
    padding: 0 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    > header {
      flex-shrink: 0;
      display: flex;
      margin: 16px 0;
      color: limegreen;
      font-size: 2.5rem;
      font-weight: 700;
      > .spacer {
        flex: 1;
      }
    }
    > .board {
      flex: 1 0 auto;
      display: grid;
      place-items: center;
    }
    > footer {
      flex-shrink: 0;
      margin: 16px 0;
      text-align: center;
      > a {
        color: limegreen;
        font-size: 1.5rem;
        font-weight: 700;
      }
    }
  }
</style>
