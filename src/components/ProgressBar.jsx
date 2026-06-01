import { useLayoutEffect, useRef } from 'react';

// useLayoutEffect measures the container, then fills it proportionally to the step.

function ProgressBar({ step }) {
  const containerRef = useRef();
  const fillRef = useRef();

  useLayoutEffect(() => {
    const width = containerRef.current.getBoundingClientRect().width;
    fillRef.current.style.width = `${(step / 3) * width}px`;
  }, [step]);

  return (
    <div
      ref={containerRef}
      style={{ height: 6, background: '#2a2e2c', borderRadius: 3, margin: '12px 0' }}
    >
      <div
        ref={fillRef}
        style={{ height: '100%', background: '#8ad08a', borderRadius: 3, transition: 'width 0.3s' }}
      />
    </div>
  );
}

export default ProgressBar;
