import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { Mic, HelpCircle } from 'lucide-react';
import itcLogo from './assets/itcLogo.png'; 
import speakerAvatar from './assets/itcLogo.png'; 
import questionMarkImg from './assets/itcLogo.png'; 
import questionMarkImg2 from "./assets/questionmark.png"; 

export default function AskQuestion() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 

  const submitQuestion = async () => {
    if (!name.trim() || !text.trim()) {
      alert("Please enter your name and question");
      return;
    }

    try {
      setLoading(true);
      
     
      await axios.post("http://localhost:5000/api/questions/ask", {
        name,
        text,
      });

   
      navigate("/success"); 
      
    } catch (err) {
      console.error(err);
     
      navigate("/echec"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2d79] relative overflow-hidden flex flex-col items-center p-6 font-['IBM_Plex_Mono']">
      
     
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none">
        <Mic className="absolute top-10 left-10 text-white w-24 h-24 -rotate-12" />
        <img src={questionMarkImg} className="absolute top-40 right-80 w-32 opacity-70 rotate-12" alt="" />
        <HelpCircle className="absolute top-40 right-10 text-white w-32 h-32 rotate-12" />
        <img src={questionMarkImg} className="absolute top-80 left-[90px] w-32 opacity-70 rotate-12" alt="" />
        <Mic className="absolute bottom-20 left-20 text-white w-20 h-20 rotate-45" />
        <HelpCircle className="absolute bottom-10 right-[7%] text-white w-28 h-28 -rotate-12" />
      </div>

    
       <div className="relative z-10 mb-12 transform hover:scale-105 transition-transform duration-300">
             <img 
               src={itcLogo} 
               alt="ITC 7 Talks Logo" 
               className="h-32 md:h-44 w-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
             />
           </div>

   
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
       
        <div className="flex items-center gap-6 mb-10">
          <h1 className="text-white text-[32px] md:text-[42px] tracking-widest font-[700] leading-[110%] uppercase text-center md:text-left">
            ASK OUR<br/>SPEAKER
          </h1>
          
          <img 
            src={questionMarkImg2} 
            alt="Question Mark" 
            className="w-16 h-20 object-contain" 
          />
        </div>

     
        <div className="w-full space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded-[15px] bg-white text-[#1e2d79] font-[700] placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all shadow-lg text-[18px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="What's on your mind..."
            className="w-full p-4 rounded-[15px] bg-white text-[#1e2d79] font-[700] placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all shadow-lg min-h-[140px] text-[18px]"
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

        
          <button
            onClick={submitQuestion}
            disabled={loading}
            className={`w-full p-4 rounded-[12px] text-white font-[700] text-[20px] uppercase tracking-widest shadow-xl transition-all active:scale-95 ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#c31d10] hover:bg-[#8e1610]"
            }`}
          >
            {loading ? "Sending..." : "SUBMIT"}
          </button>
        </div>
      </div>
    </div>
  );
}