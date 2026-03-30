import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Mic, HelpCircle, Lock } from 'lucide-react'; 
import itcLogo from './assets/itcLogo.png'; 
import speakerAvatar from './assets/itcLogo.png'; 
import questionMarkImg from './assets/itcLogo.png';
import anis from "./assets/anis.png" 

const SpeakerCard = ({ name, time, theme, onAskClick, isActive }) => (
  <div className={`relative transition-all duration-500 ${
    isActive 
      ? "bg-gradient-to-b from-[#446fcb] to-[#2740b3] shadow-2xl scale-100 opacity-100" 
      : "bg-gray-800/50 grayscale opacity-60 scale-95 pointer-events-none"
  } rounded-2xl p-6 border border-white/10 flex flex-col gap-4 font-mono`}>
    
   
    {!isActive && (
      <div className="absolute top-4 right-4 text-white/30">
        <Lock size={20} />
      </div>
    )}

    <div className="flex items-center gap-4">
      <img 
        src={anis} 
        alt={name} 
        className="w-20 h-16 rounded-xl object-cover border-2 border-white/20 flex-shrink-0 shadow-lg"
      />
      <h3 className="text-white text-2xl font-bold tracking-tight ">
        {name}
      </h3>
    </div>
    
    <div className="text-white space-y-1 text-lg">
      <p className="font-bold">{time}</p>
      <p className="opacity-80">Theme : {theme}</p>
    </div>

    <button 
      onClick={onAskClick} 
      disabled={!isActive}
      className={`w-full font-bold py-3 rounded-xl shadow-lg uppercase tracking-[0.2em] text-lg transition-all ${
        isActive 
          ? "bg-[#c31d10] hover:bg-[#8e1610] text-white active:scale-[0.98]" 
          : "bg-gray-600 text-gray-400 cursor-not-allowed"
      }`}
    >
      {isActive ? "Ask" : "Locked"}
    </button>
  </div>
);

const Welcome = () => {
  const navigate = useNavigate(); 
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const speakers = [
    { name: "Speaker 1", time: "1:34 - 2:47", theme: "Tech Innovation" },
    { name: "Speaker 2", time: "09:00 - 10:00", theme: "AI Future" },
    { name: "Speaker 3", time: "10:00 - 11:00", theme: "Cyber Security" },
    { name: "Speaker 4", time: "11:00 - 12:00", theme: "Cloud Systems" },
  ];

  const isSpeakerActive = (timeRange) => {
    const [start, end] = timeRange.split(' - ');
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    
    const startTime = startH * 60 + startM;
    const endTime = endH * 60 + endM;

    return now >= startTime && now < endTime;
  };

  const handleAsk = (speaker) => {
    navigate('/ask', { state: { speakerName: speaker.name } });
  };

  return (
    <div className="min-h-screen bg-[#1e2d79] relative overflow-hidden flex flex-col items-center p-6 md:p-12 font-mono">
      <div className="absolute inset-0 pointer-events-none opacity-10 select-none">
        <Mic className="absolute top-10 left-10 text-white w-24 h-24 -rotate-12" />
        <img src={questionMarkImg} className="absolute top-40 right-80 w-32 opacity-70 rotate-12" alt="" />
        <HelpCircle className="absolute top-40 right-10 text-white w-32 h-32 rotate-12" />
        <img src={questionMarkImg} className="absolute top-80 left-[90px] w-32 opacity-70 rotate-12" alt="" />
        <Mic className="absolute bottom-20 left-20 text-white w-20 h-20 rotate-45" />
        <HelpCircle className="absolute bottom-10 right-[7%] text-white w-28 h-28 -rotate-12" />
      </div>

      <div className="relative z-10 mb-12 transform hover:scale-105 transition-transform duration-300 text-center">
        <img 
          src={itcLogo} 
          alt="ITC 7 Talks Logo" 
          className="h-32 md:h-44 w-auto mx-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
        />
       
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {speakers.map((speaker, index) => {
          const active = isSpeakerActive(speaker.time);
          return (
            <SpeakerCard 
              key={index} 
              {...speaker} 
              isActive={active}
              onAskClick={() => active && handleAsk(speaker)} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default Welcome;