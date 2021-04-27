<script lang="ts">
  import { onMount } from 'svelte';

  import { fly } from 'svelte/transition';
  export let message: string;

  let restartButton: HTMLButtonElement;

  onMount(() => restartButton.focus());

  const handleClick = () => window.location.reload();
</script>

<div class="dialog" in:fly={{ y: 200, duration: 700 }}>
  <div class="message">{message}</div>
  <button bind:this={restartButton} type="button" on:click={handleClick}
    >Restart</button
  >
</div>

<style lang="scss">
  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .message {
      text-transform: capitalize;
      color: limegreen;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 32px;
    }
    > button {
      text-transform: uppercase;
      border-radius: 4px;
      background-color: limegreen;
      color: black;
      padding: 8px 24px;
      font-size: 16pt;
      font-weight: 700;
      border: none;
      &:hover {
        background-color: lighten($color: limegreen, $amount: 10%);
      }
      &:active {
        background-color: darken($color: limegreen, $amount: 10%);
      }
    }
  }
</style>
