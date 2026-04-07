import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, HelpCircle, Lock } from "lucide-react";

import itcLogo from "./assets/itcLogo.png";
import questionMarkImg from "./assets/itcLogo.png";

import speaker1 from "./assets/speaker1.webp";
import speaker2 from "./assets/speaker2.webp";
import speaker3 from "./assets/speaker3.png";
import speaker4 from "./assets/speaker4.webp";

const SpeakerCard = ({ name, time, theme, image, onAskClick, isActive }) => (
  <div
    className={`relative transition-all duration-500 ${
      isActive
        ? "bg-gradient-to-b from-[#446fcb] to-[#2740b3] shadow-2xl scale-100 opacity-100"
        : "bg-gray-800/50 grayscale opacity-60 scale-95 pointer-events-none"
    } rounded-2xl p-6 border border-white/10 flex flex-col gap-4 font-mono`}
  >
    {/* Lock icon */}
    {!isActive && (
      <div className="absolute top-4 right-4 text-white/30">
        <Lock size={20} />
      </div>
    )}

    {/* Speaker Info */}
    <div className="flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-xl object-cover border-2 border-white/20 flex-shrink-0 shadow-lg"
      />
      <h3 className="text-white text-2xl font-bold tracking-tight">{name}</h3>
    </div>

    <div className="text-white space-y-1 text-lg">
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
    {
      name: "Mohammed Brahimi",
      time: "09:45 - 11:45",
      theme: "AI Lifecycle",
      image: speaker1,
    },
    {
      name: "Younes Grar",
      time: "11:46 - 13:00",
      theme: "Digital Transformation in Algeria",
      image: speaker2,
    },
    {
      name: "Wanis Hadj Mohammed",
      time: "14:00 - 15:15",
      theme: "Sales and Marketing for Startups",
      image: speaker3,
    },
    {
      name: "Mohammed Mouzaoui",
      time: "15:16 - 16:30",
      theme: "Freelance",
      image: speaker4,
    },
  ];

  const isSpeakerActive = (timeRange) => {
    const [start, end] = timeRange.split(" - ");
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    const startTime = startH * 60 + startM;
    const endTime = endH * 60 + endM;

    return now >= startTime && now < endTime;
  };

  const handleAsk = (speaker) => {
    navigate("/ask", { state: { speakerName: speaker.name } });
  };

  return (
    <div className="min-h-screen bg-[#1e2d79] relative overflow-hidden flex flex-col items-center p-6 md:p-12 font-mono">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-10 select-none">
        <Mic className="absolute top-10 left-10 text-white w-24 h-24 -rotate-12" />
        <img
          src={questionMarkImg}
          className="absolute top-40 right-80 w-32 opacity-70 rotate-12"
          alt=""
        />
        <HelpCircle className="absolute top-40 right-10 text-white w-32 h-32 rotate-12" />
        <img
          src={questionMarkImg}
          className="absolute top-80 left-[90px] w-32 opacity-70 rotate-12"
          alt=""
        />
        <Mic className="absolute bottom-20 left-20 text-white w-20 h-20 rotate-45" />
        <HelpCircle className="absolute bottom-10 right-[7%] text-white w-28 h-28 -rotate-12" />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-12 transform hover:scale-105 transition-transform duration-300 text-center">
        <img
          src={itcLogo}
          alt="ITC 7 Talks Logo"
          className="h-32 md:h-44 w-auto mx-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
        />
      </div>

      {/* Speakers Grid */}
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
