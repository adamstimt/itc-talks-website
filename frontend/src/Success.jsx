import React from 'react';
import { Mic } from 'lucide-react';
import itcLogo from './assets/itcLogo.png'; 
import questionMarkImg from './assets/itcLogo.png'; 
import { BsArrowReturnLeft } from "react-icons/bs";

const Success = () => {
  return (
    <div className="min-h-screen bg-[#1e2d79] relative overflow-hidden flex flex-col items-center justify-center p-6 font-['IBM_Plex_Mono']">
      
      {/* Background Decorative Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none">
        <Mic className="absolute top-20 left-10 text-white w-24 h-24 -rotate-12" />
        <img src={questionMarkImg} className="absolute top-40 right-10 w-32 opacity-70 rotate-12" alt="" />
        <Mic className="absolute bottom-20 left-20 text-white w-20 h-20 rotate-45" />
        <img src={questionMarkImg} className="absolute bottom-10 right-[15%] w-28 opacity-70 -rotate-12" alt="" />
      </div>

       <div className="relative z-10 mb-12 transform hover:scale-105 transition-transform duration-300">
             <img 
               src={itcLogo} 
               alt="ITC 7 Talks Logo" 
               className="h-32 md:h-44 w-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
             />
           </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-[40px] md:text-[64px] font-[700] leading-[140%] uppercase tracking-widest  drop-shadow-lg">
          YOUR QUESTION HAS BEEN <br className="hidden md:block" /> SENT !
        </h1>
      </div>

      <button 
  onClick={() => window.location.href = '/'}
  className="relative z-10 mt-12 flex items-center gap-2 text-[23px] text-white/60 hover:text-white underline font-[700] uppercase tracking-widest  transition-all group"
>
  Go Back
  <BsArrowReturnLeft className="text-[22px]  font-bold text-[600] group-hover:-translate-x-2 transition-transform" />
</button>
    </div>
  );
};

export default Success;