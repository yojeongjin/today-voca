import { useState } from 'react';

export function useStep<T extends readonly string[]>(steps: T) {
  const [stepIndex, setStepIndex] = useState(0);

  return {
    step: steps[stepIndex],
    stepIndex,
    isFirst: stepIndex === 0,
    isLast: stepIndex === steps.length - 1,
    next: () => setStepIndex(i => Math.min(i + 1, steps.length - 1)),
    back: () => setStepIndex(i => Math.max(i - 1, 0)),
    goTo: (index: number) => setStepIndex(index),
  };
}
