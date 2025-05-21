import { fruits } from '@/store/lists/fruits';
import React, { useState, useEffect, useCallback } from 'react';


interface FruitSpinnerProps {
  isSpinning: boolean;
  interval?: number;
  onSpinEnd?: (finalFruit: typeof fruits[0]) => void;
}

const FruitSpinner = ({ 
  isSpinning, 
  interval = 100,
  onSpinEnd 
}: FruitSpinnerProps) => {
  const [currentFruit, setCurrentFruit] = useState(fruits[0]);

  // Function to get a random fruit
  const getRandomFruit = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * fruits.length);
    return fruits[randomIndex];
  }, []);

  useEffect(() => {
    let spinInterval: NodeJS.Timeout;

    if (isSpinning) {
      spinInterval = setInterval(() => {
        setCurrentFruit(getRandomFruit());
      }, interval);

      // Cleanup on unmount or when spinning stops
      return () => {
        clearInterval(spinInterval);
      };
    } else {
      // When spinning stops, notify parent of final fruit
      if (onSpinEnd) {
        onSpinEnd(currentFruit);
      }
    }
  }, [isSpinning, interval, getRandomFruit, onSpinEnd, currentFruit]);

  return (
    <div>
      {currentFruit.character}
    </div>
  );
};

export default FruitSpinner;