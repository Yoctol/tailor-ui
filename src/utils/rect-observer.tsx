const props: Array<keyof DOMRect> = [
  'width',
  'height',
  'top',
  'right',
  'bottom',
  'left',
];

const rectChanged = (a?: DOMRect, b?: DOMRect) => {
  if (!a || !b) {
    return false;
  }

  return props.some(prop => a[prop] !== b[prop]);
};

interface IObservedNode {
  rect?: DOMRect;
  callbacks: Array<(rect: DOMRect) => void>;
}

const observedNodes = new Map<HTMLElement, IObservedNode>();

let rafId: number;

function run() {
  observedNodes.forEach((state, node) => {
    const newRect = node.getBoundingClientRect() as DOMRect;

    const hasRectChanged = rectChanged(newRect, state.rect);

    if (hasRectChanged || (!state.rect && newRect)) {
      state.callbacks.forEach(cb => cb(newRect));
    }

    // eslint-disable-next-line no-param-reassign
    state.rect = newRect;
  });

  rafId = requestAnimationFrame(run);
}

function createRectObserver(node: HTMLElement, cb: (rect: DOMRect) => void) {
  return {
    observe() {
      const wasEmpty = observedNodes.size === 0;

      if (observedNodes.has(node)) {
        (observedNodes.get(node) as IObservedNode).callbacks.push(cb);
      } else {
        observedNodes.set(node, {
          rect: undefined,
          callbacks: [cb],
        });
      }

      if (wasEmpty) {
        run();
      }
    },

    unobserve() {
      const state = observedNodes.get(node);

      if (state) {
        const index = state.callbacks.indexOf(cb);
        if (index >= 0) {
          state.callbacks.splice(index, 1);
        }

        if (!state.callbacks.length) {
          observedNodes.delete(node);
        }

        if (!observedNodes.size) {
          cancelAnimationFrame(rafId);
        }
      }
    },
  };
}

export { createRectObserver };
