'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isEqualPressed, setisEqualPressed] = useState(false);

  const generateAiSuggestion = (currentInput: string) => {
    if (isEqualPressed) {
      return;
    }

    const trimmedInput = currentInput.replace(/^0+/, '');

    if (trimmedInput) {
      const lastChar = trimmedInput.slice(-1);

      if (!isNaN(Number(lastChar))) {
        setAiSuggestion(lastChar);
      } else {
        setAiSuggestion('');
      }
    } else {
      setAiSuggestion('Start by typing a number!');
    }
  };

  const handleClick = (value: string) => {
    setDisplay((prev) => {
      const newDisplay = prev === '0' ? value : prev + value;

      generateAiSuggestion(newDisplay);

      return newDisplay;
    });
    if (isEqualPressed) {
      setisEqualPressed(false);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setAiSuggestion('');
    setisEqualPressed(false);
  };

  const handleBackspace = () => {
    setDisplay((prev) => {
      if (prev.length === 1) {
        return '0';
      }
      return prev.slice(0, -1);
    });
  };

  const handleCalculate = () => {
    try {
      const result = eval(display).toString();
      setDisplay(result);
      setisEqualPressed(true);

      generateAiSuggestion(result);
      setAiSuggestion('');
    } catch (error) {
      setDisplay('Error');
      setAiSuggestion('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl w-72 h-96 p-6">
      <div
        className="bg-gray-100 rounded-lg p-4 mb-4 text-right text-2xl font-semibold h-16 flex items-center justify-end"
        style={{ overflow: 'auto' }}
      >
        {aiSuggestion && (
          <div className="font-semibold text-black/50">{aiSuggestion}</div>
        )}{' '}
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          '7',
          '8',
          '9',
          '/',
          '4',
          '5',
          '6',
          '*',
          '1',
          '2',
          '3',
          '-',
          '0',
          '.',
          '=',
          '+',
        ].map((btn) => (
          <button
            key={btn}
            onClick={() => (btn === '=' ? handleCalculate() : handleClick(btn))}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            {btn}
          </button>
        ))}
        <div className="col-span-4 flex justify-between gap-4 items-center mt-2">
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Clear
          </button>
          {/* Backspace Button */}
          <button
            onClick={handleBackspace}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Backspace
          </button>
        </div>
      </div>
    </div>
  );
}
