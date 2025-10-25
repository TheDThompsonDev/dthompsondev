import { useState, useCallback } from 'react';

interface UseUndoRedoOptions<T> {
  initialState: T;
  maxHistorySize?: number;
}

export function useUndoRedo<T>({ initialState, maxHistorySize = 50 }: UseUndoRedoOptions<T>) {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const state = history[currentIndex];

  const pushState = useCallback((newState: T) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(newState);
      
      if (newHistory.length > maxHistorySize) {
        newHistory.shift();
        return newHistory;
      }
      
      return newHistory;
    });
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex >= maxHistorySize ? maxHistorySize - 1 : newIndex;
    });
  }, [currentIndex, maxHistorySize]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, history.length]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const reset = useCallback((newInitialState: T) => {
    setHistory([newInitialState]);
    setCurrentIndex(0);
  }, []);

  return {
    state,
    pushState,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
  };
}