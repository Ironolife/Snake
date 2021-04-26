<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Food from './Food.svelte';
  import Snake from './Snake.svelte';
  import { gameState, score } from './store';
  import type { Direction, Position } from './types';

  const WIDTH = 29;
  const HEIGHT = 29;

  let speed: number = 150;
  let direction: Direction | null = null;
  let nextDirection: Direction | null = null;

  const positionToIndex = ([x, y]: Position): number => {
    return WIDTH * y + x;
  };
  const IndexToPosition = (index: number): Position => {
    return [index % WIDTH, Math.floor(index / HEIGHT)];
  };

  const indices = Array(WIDTH * HEIGHT)
    .fill(null)
    .map((_, index) => index);

  let snake: Position[] = [
    [8, 14],
    [7, 14],
    [6, 14],
  ];

  $: snakeIndices = snake.map(positionToIndex);

  let foodIndex: number | null = positionToIndex([14, 14]);

  const getNewHead = (): Position => {
    const [x, y] = snake[0];

    switch (direction) {
      case 'up': {
        return [x, y - 1];
      }
      case 'down': {
        return [x, y + 1];
      }
      case 'left': {
        return [x - 1, y];
      }
      case 'right': {
        return [x + 1, y];
      }
    }
  };

  const getNewFood = () => {
    const emptyIndices = indices.filter(
      (index) => !snakeIndices.includes(index)
    );

    if (emptyIndices.length === 0) {
      foodIndex = null;
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    foodIndex = emptyIndices[randomIndex];

    speed = speed * 0.95;
    score.update((score) => score + 1);
  };

  const isLost = (newHead: Position): boolean => {
    const [x, y] = newHead;

    return (
      x < 0 ||
      x >= WIDTH ||
      y < 0 ||
      y >= HEIGHT ||
      snakeIndices.includes(positionToIndex(newHead))
    );
  };

  const nextState = () => {
    direction = nextDirection;

    const newHead = getNewHead();
    const newHeadIndex = positionToIndex(newHead);

    if (isLost(newHead)) {
      gameState.set('lost');
      return;
    }

    snake.unshift(newHead);

    if (newHeadIndex === foodIndex) {
      getNewFood();
    } else {
      snake.pop();
    }

    snake = snake;

    if (snakeIndices.length === indices.length) {
      gameState.set('won');
    }

    if ($gameState === 'play') {
      setTimeout(() => nextState(), speed);
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'w': {
        if (direction !== 'down') {
          nextDirection = 'up';
        }
        break;
      }
      case 'ArrowDown':
      case 's': {
        if (direction !== 'up') {
          nextDirection = 'down';
        }
        break;
      }
      case 'ArrowLeft':
      case 'a': {
        if (direction !== 'right') {
          nextDirection = 'left';
        }
        break;
      }
      case 'ArrowRight':
      case 'd': {
        if (direction !== 'left') {
          nextDirection = 'right';
        }
        break;
      }
    }

    if ($gameState === 'stop') {
      gameState.set('play');

      setTimeout(() => nextState(), speed);
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="grid">
  {#each Array(WIDTH * HEIGHT) as _, index}
    <div class="cell">
      {#if snakeIndices.includes(index)}
        <Snake />
      {:else if foodIndex === index}
        <Food />
      {/if}
    </div>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(29, 1fr);
    gap: 2px;
  }
  .cell {
    position: relative;
    padding-top: 100%;
    background-color: #333333;
    border-radius: 2px;
  }
  :global(.cell > div) {
    position: absolute;
    border-radius: 2px;
    inset: 0;
  }
</style>
