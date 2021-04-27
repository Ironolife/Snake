<script lang="ts">
  import Food from './Food.svelte';
  import Snake from './Snake.svelte';
  import { gameState, score } from './store';
  import swipeable from './swipeable';
  import type { Direction, Position } from './types';

  const WIDTH = 15;
  const HEIGHT = 15;
  const INITIAL_SPEED = 180;

  let speed = INITIAL_SPEED;
  let direction: Direction | null = 'right';
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
    [4, 7],
    [3, 7],
    [2, 7],
  ];

  $: snakeIndices = snake.map(positionToIndex);

  let foodIndex: number | null = positionToIndex([7, 7]);

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

    speed = INITIAL_SPEED * Math.pow(0.95, Math.min($score, 15));
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

  const changeDirection = (direction: Direction) => {
    nextDirection = direction;

    if ($gameState === 'stop' && nextDirection) {
      gameState.set('play');

      setTimeout(() => nextState(), speed);
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'w': {
        if (direction !== 'down') {
          changeDirection('up');
        }
        break;
      }
      case 'ArrowDown':
      case 's': {
        if (direction !== 'up') {
          changeDirection('down');
        }
        break;
      }
      case 'ArrowLeft':
      case 'a': {
        if (direction !== 'right') {
          changeDirection('left');
        }
        break;
      }
      case 'ArrowRight':
      case 'd': {
        if (direction !== 'left') {
          changeDirection('right');
        }
        break;
      }
    }
  };

  const handleSwipe = ({ detail }: { detail: Direction }) => {
    switch (detail) {
      case 'up': {
        if (direction !== 'down') changeDirection('up');
        break;
      }
      case 'down': {
        if (direction !== 'up') changeDirection('down');
        break;
      }
      case 'left': {
        if (direction !== 'right') changeDirection('left');
        break;
      }
      case 'right': {
        if (direction !== 'left') changeDirection('right');
        break;
      }
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="grid"
  class:blur={$gameState === 'won' || $gameState === 'lost'}
  use:swipeable
  on:swipe={handleSwipe}
>
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

<style lang="scss">
  .grid {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(15, 1fr);
    gap: 8px;
    transition: filter 700ms;
    &.blur {
      filter: blur(8px) opacity(0.5);
    }
    > .cell {
      position: relative;
      padding-top: 100%;
      background-color: #333333;
      border-radius: 2px;
    }
    :global(.cell > div) {
      position: absolute;
      border-radius: 2px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
