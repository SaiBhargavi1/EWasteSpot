
// Credits.tsx
import React, { useEffect, useState } from 'react';
import { getUserName, getCredits, setCredits, getUserID } from '../sign-in/auth';
import './Credits.css';
import tick from "../../assets/tick.png";

const Credits = () => {
  const [credits, setCreditsState] = useState<number>(0);
  const [transactionNumber, setTransactionNumber] = useState<string>('');
  const [transactionSuccess, setTransactionSuccess] = useState<boolean>(false); // New state for transaction success

  useEffect(() => {
    // Load user's credits when the component mounts
    const userId = getUserID();
    const storedCredits = userId ? getCredits(userId) : null;
    if (storedCredits !== null) {
      setCreditsState(storedCredits);
    }
  }, []);

  const handleTransaction = () => {
    // Add credits on valid transaction number
    if (transactionNumber === '12345') {
      const newCredits = credits + 100;
      setCreditsState(newCredits);
      const userId = getUserID();
      if (userId) {
        setCredits(userId, newCredits); // Update credits in local storage
      }
      setTransactionSuccess(true); // Set transaction success to true
      setTransactionNumber(''); // Clear transaction number field after successful transaction
    } else {
      alert('Invalid transaction number');
      setTransactionSuccess(false); // Set transaction success to false if transaction fails
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-10">
      <div className="text-black section-subtitle text-center font-bold text-2xl md:text-4xl 2xl:text-6xl uppercase tracking-widest teamHeadingText">
        <h1>Welcome, {getUserName() || 'Guest'}</h1>
      </div>
      <div className="text-black text-center text-xl md:text-3xl mt-4 mb-4">
        <p>Your current credits: {credits}</p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-800 font-semibold mb-2 text-xl"
        >
          Transaction Number
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="email-field"
          value={transactionNumber}
          onChange={(e) => setTransactionNumber(e.target.value)} 
        />
      </div>
      <button
        type="submit"
        className="bg-emerald-500 text-white font-bold py-3 px-6 btn btn-secondary hover:bg-white-700" 
        onClick={handleTransaction}
      >
        Add Credits
      </button>
      {transactionSuccess && <img src="../../assets/tick.png" alt="Transaction Successful" />}

    </div>
  );
};

export default Credits;
