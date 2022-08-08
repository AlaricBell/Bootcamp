import React, { useEffect } from 'react';

/**
 * Custom React hook that detects clicks outside of a specified HTML element.
 */
const useClickOutside = (ref: React.RefObject<HTMLElement>, onClickOutside: () => void): void => {
  useEffect(() => {
    const handleEvent = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      onClickOutside();
    };

    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('touchstart', handleEvent);

    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('touchstart', handleEvent);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;