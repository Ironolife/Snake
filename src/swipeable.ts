import type { Position } from './types';

const swipeable = (node: Node) => {
  let touchOrigin: Position | null = null;

  const handleTouchMove = (event: TouchEvent) => {
    if (!touchOrigin) return;

    const { clientX, clientY } = event.touches[0];
    const [originX, originY] = touchOrigin;

    const xDiff = originX - clientX;
    const yDiff = originY - clientY;

    if (Math.abs(yDiff) > Math.abs(xDiff)) {
      if (yDiff > 0) {
        node.dispatchEvent(new CustomEvent('swipe', { detail: 'up' }));
      } else {
        node.dispatchEvent(new CustomEvent('swipe', { detail: 'down' }));
      }
    } else {
      if (xDiff > 0) {
        node.dispatchEvent(new CustomEvent('swipe', { detail: 'left' }));
      } else {
        node.dispatchEvent(new CustomEvent('swipe', { detail: 'right' }));
      }
    }

    touchOrigin = null;
  };

  const handleTouchEnd = () => {
    node.removeEventListener('touchmove', handleTouchMove);
  };

  const handleTouchStart = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    touchOrigin = [clientX, clientY];
    node.addEventListener('touchmove', handleTouchMove);
  };

  node.addEventListener('touchstart', handleTouchStart);

  return {
    destroy() {
      node.removeEventListener('touchstart', handleTouchStart);
    },
  };
};

export default swipeable;
