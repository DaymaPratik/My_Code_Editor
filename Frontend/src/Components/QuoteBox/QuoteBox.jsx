import React, { useState } from "react";
import QuoteCard from "../QuoteCard/Quote";

function QuoteBox() {
  const [quote, setQuote] = useState([
    {
      quote: "Code is like humor. When you have to explain it, it’s bad.",
      author: "Cory House",
    },
    {
      quote: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
    },
    {
      quote: "Simplicity is the soul of efficiency.",
      author: "Austin Freeman",
    },
    {
      quote: "Code never lies, comments sometimes do.",
      author: "Ron Jeffries",
    },
    {
      quote: "In order to be irreplaceable, one must always be different.",
      author: "Jim Highsmith",
    },
    {
      quote: " Good code is its own best documentation.",
      author: "Steve McConnellE",
    },
  ]);
  return (
    <>
      <div className="bg-[#000000b8]">
        <h1
          className="text-center text-[20px] min-[400px]:text-[25px] min-[600px]:text-[30px] min-[768px]:text-[35px] min-[1024px]:text-[45px] shadow-[0px_0px_10px_3px_#ff0000]
    font-black bg-clip-text text-transparent bg-gradient-to-br py-2 from-[#ffffff] from-[20%] via-[#ff0000] via-[60%] to-[#74effa] to-[20%]"
        >
          Lets Get Motivated
        </h1>
      </div>
      <section
        className="flex flex-wrap items-center justify-center text-[17px] min-[600px]:text-[20px] min-[1256px]:text-[25px]   
    gap-10  p-5 min-[1256px]:p-10 h-fit min-h-[100vh] w-[100%] 
    bg-[#00000061] "
      >
        <QuoteCard quote={quote} />
      </section>
    </>
  );
}

export default QuoteBox;
