import { useEffect, useState } from 'react';

function useKeyPressed(keyName = 'CapsLock') {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const state = event.getModifierState && event.getModifierState(keyName);
      if (typeof state === 'boolean') {
        setIsPressed(state);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyName]);

  return isPressed;
}

export default useKeyPressed;