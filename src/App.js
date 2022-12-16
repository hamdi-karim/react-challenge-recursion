import React, { useState, useEffect } from 'react';
import './style.css';

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}

export default function App() {
  const [squaresClicked, setSquaresClicked] = useState([]);

  const onClickSquare = (index) => {
    if (squaresClicked.includes(index)) {
      return;
    }
    setSquaresClicked(squaresClicked.concat(index));
    //console.log(squaresClicked.length);
  };
  //console.log(squaresClicked);

  useEffect(() => {
    const removeLastElement = async (currentArray) => {
      if (currentArray.length === 0) {
        return;
      }

      const newArray = [...currentArray];
      newArray.pop();

      await delay();
      setSquaresClicked(newArray);
      removeLastElement(newArray);
    };

    if (squaresClicked.length === 6) {
      removeLastElement(squaresClicked);
    }
  }, [squaresClicked]);

  return (
    <>
      {[...Array(6)].map((_, index) => (
        <Square
          key={index}
          onClickSquare={() => onClickSquare(index)}
          backgroundColor={
            squaresClicked.includes(index) ? 'green' : 'transparent'
          }
        />
      ))}
    </>
  );
}

const Square = ({ onClickSquare, backgroundColor }) => {
  const handleSquareClick = () => {
    onClickSquare();
  };

  return (
    <div
      style={{
        width: '50px',
        border: '1px solid black',
        height: '50px',
        backgroundColor,
      }}
      onClick={handleSquareClick}
    ></div>
  );
};
