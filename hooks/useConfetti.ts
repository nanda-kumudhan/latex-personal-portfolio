import { useCallback } from 'react';

export const useConfetti = () => {
  const fire = useCallback(() => {
    let confettiFn: any = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      confettiFn = require('canvas-confetti');
    } catch (_e) {
      confettiFn = null;
    }
    if (!confettiFn) {
      return; // silent fallback
    }
    const count = 120;
    const defaults = { origin: { y: 0.7 } };

    function fireParticle(particleRatio: number, opts: any) {
      confettiFn({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fireParticle(0.25, { spread: 26, startVelocity: 45 });
    fireParticle(0.2, { spread: 60 });
    fireParticle(0.35, { spread: 100, decay: 0.9, scalar: 0.8 });
    fireParticle(0.1, { spread: 120, startVelocity: 30, decay: 0.92 });
    fireParticle(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return fire;
};

export default useConfetti;