import React from "react";
import { Microscope, ArrowLeft } from "lucide-react";

export const NotFoundHero: React.FC = () => (
  <div className="container bg-[#0C2430]  mx-auto px-4 pt-16 text-center">
    <div className="mb-8 animate-bounce">
      <Microscope className="w-24 h-24 mx-auto text-[#4C8CA5]" />
    </div>
    <h1 className="text-6xl font-bold text-white -900 mb-4">404</h1>
    <p className="text-xl text-white -600 mb-8">
      Oops! Looks like this experiment didn't yield the expected results.
    </p>
    <button
      className="inline-flex items-center px-6 py-3 bg-[#4C8CA5] text-white font-semibold
       rounded-lg shadow-md hover:bg-[#D98E04] transition duration-300 ease-in-out transform hover:-translate-y-1"
      // onClick={() => window.location.href = '/'}
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Return to the Lab
    </button>
  </div>
);
