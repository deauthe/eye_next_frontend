import { create } from 'zustand';
import { useHistoryPanel } from './useHistoryPanel';
import { useEffect, useRef } from 'react';

interface PlaybackState {
  isPlaying: boolean;
  speed: number;
  direction: 'forward' | 'backward';
  start: () => void;
  pause: () => void;
  setSpeed: (speed: number) => void;
  setDirection: (direction: 'forward' | 'backward') => void;
  stepForward: () => void;
  stepBackward: () => void;
}

export const usePlaybackStore = create<PlaybackState>((set, get) => ({
  isPlaying: false,
  speed: 1,
  direction: 'forward',
  
  start: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setSpeed: (speed) => set({ speed }),
  setDirection: (direction) => set({ direction }),
  
  stepForward: () => {
    const { snapshots, currentIndex, goToSnapshot } = useHistoryPanel.getState();
    if (currentIndex < snapshots.length - 1) {
      goToSnapshot(currentIndex + 1);
    } else {
      get().pause();
    }
  },
  
  stepBackward: () => {
    const { currentIndex, goToSnapshot } = useHistoryPanel.getState();
    if (currentIndex > 0) {
      goToSnapshot(currentIndex - 1);
    } else {
      get().pause();
    }
  },
}));

export const useHistoryPlayback = () => {
  const intervalRef = useRef<number>();
  const { 
    isPlaying, 
    speed, 
    direction,
    stepForward,
    stepBackward,
    pause 
  } = usePlaybackStore();

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        if (direction === 'forward') {
          stepForward();
        } else {
          stepBackward();
        }
      }, 1000 / speed) as unknown as number;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, direction]);

  return usePlaybackStore;
};
