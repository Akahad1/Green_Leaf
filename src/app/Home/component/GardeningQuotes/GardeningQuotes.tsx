"use client";

import { useEffect } from "react";

const GardeningQuotes = () => {
  // Array of inspiring gardening quotes
  const quotes = [
    "To plant a garden is to believe in tomorrow. – Audrey Hepburn",
    "Gardening adds years to your life and life to your years. – Unknown",
    "The love of gardening is a seed once sown that never dies. – Gertrude Jekyll",
    "A garden is a friend you can visit anytime. – Unknown",
    "Where flowers bloom, so does hope. – Lady Bird Johnson",
  ];

  // State to manage the current quote
  //   const [currentQuote, setCurrentQuote] = useState("");

  // Function to select a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    console.log(randomIndex);
    // setCurrentQuote(quotes[randomIndex]);
  };

  // UseEffect to load a random quote when the component mounts
  useEffect(() => {
    getRandomQuote();
    const interval = setInterval(getRandomQuote, 10000); // Change quote every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-green-50 text-center py-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold text-green-800 mb-4">
        Inspiring Gardening Quote
      </h2>
      {/* <p className="italic text-lg text-gray-600">{currentQuote}</p> */}
    </div>
  );
};

export default GardeningQuotes;
