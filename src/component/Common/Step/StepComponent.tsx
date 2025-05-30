import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

interface StepProps {
  stepKey: string;
  children: ReactNode;
}

export default function StepComponent({ stepKey, children }: StepProps) {
  return (
    <AnimatePresence mode="wait">
      <MotionBase
        key={stepKey}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </MotionBase>
    </AnimatePresence>
  );
}

const MotionBase = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 720px;
  min-width: 280px;
  height: calc(var(--vh, 1vh) * 100);
  // border: 1px solid black;
`;
