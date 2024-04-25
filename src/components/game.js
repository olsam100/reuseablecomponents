import React, { useEffect, useState } from 'react';
import NumberCom from './number';

const Starsdisplay = ({ count }) => {
  return (
    <>
      {utils.range(1, count).map((starId) => {
        return <div key={starId} className='star' />;
      })}
    </>
  );
};

const PlayAgain = ({ resetGame, gameStatus }) => {
  return (
    <div
      className='game-done'
      style={{ color: gameStatus === 'lost' ? 'red' : 'green' }}
    >
      <div className='message'>
        {gameStatus === 'lost' ? 'Game over' : 'Game Won'}
      </div>
      <button onClick={resetGame}>Play Again</button>
    </div>
  );
};

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidateNumbers, setCandidateNumbers] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNumbers.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      //the line below cleans up the effect
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidateNumber) => {
    if (utils.sum(newCandidateNumber) !== stars) {
      setCandidateNumbers(newCandidateNumber);
    } else {
      const newAvailableNumber = availableNumbers.filter(
        (n) => !newCandidateNumber.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNumber, 9));
      setAvailableNumbers(newAvailableNumber);
      setCandidateNumbers([]);
    }
  };
  return {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setGameState,
  };
};

const Game = ({ startNewGame }) => {
  const {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setGameState,
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNumbers) > stars;

  const gameStatus =
    availableNumbers.length === 0
      ? 'won'
      : secondsLeft === 0
      ? 'lost'
      : 'active';

  const numberStatus = (number) => {
    if (!availableNumbers.includes(number)) {
      return 'used';
    }
    if (candidateNumbers.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used') {
      return;
    }
    const newCandidateNumber =
      currentStatus === 'available'
        ? candidateNumbers.concat(number)
        : candidateNumbers.filter((cn) => cn !== number);
    setGameState(newCandidateNumber);
  };

  return (
    <div className='game'>
      <div className='help'>
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className='body'>
        <div className='left'>
          {gameStatus !== 'active' ? (
            <PlayAgain resetGame={startNewGame} gameStatus={gameStatus} />
          ) : (
            <Starsdisplay count={stars} />
          )}
        </div>
        <div className='right'>
          {utils.range(1, 9).map((number) => {
            return (
              <NumberCom
                key={number}
                number={number}
                status={numberStatus(number)}
                colors={colors}
                onClick={onNumberClick}
              />
            );
          })}
        </div>
      </div>
      <div className='timer'>Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default Game;

// const StarMatch = () => {
//     return
// }

const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
export const utils = {
  // Sum an array
  sum: (arr) => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};
