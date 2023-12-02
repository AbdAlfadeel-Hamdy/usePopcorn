import { useEffect } from 'react';

export const useKey = (key: string, action: () => void) => {
  useEffect(() => {
    const callback: EventListener = (e: Event) => {
      if ('code' in e && (e.code as string).toLowerCase() === key.toLowerCase())
        action();
    };
    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [key, action]);
};
