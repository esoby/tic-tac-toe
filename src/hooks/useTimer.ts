import { useState, useEffect } from "react";

const useTimer = (initialTime: number, gameOver: boolean, onTimeExpired: () => void) => {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    if (!gameOver && timer === 0) {
      onTimeExpired();
    } else if (!gameOver && timer > 0) {
      const id = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [timer, gameOver, onTimeExpired]);

  const resetTimer = () => setTimer(initialTime);

  return { timer, resetTimer };
};

export default useTimer;
