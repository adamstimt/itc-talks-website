import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mic, Check, X } from "lucide-react";
import itcLogo from "./assets/itcLogo.png";

export default function Moderator() {
  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch both the counts and the specific list
      const [statsRes, listRes] = await Promise.all([
        axios.get("http://localhost:5000/api/questions/stats"),
        axios.get(`http://localhost:5000/api/questions/list/${activeTab}`)
      ]);
      setStats(statsRes.data);
      setQuestions(listRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/questions/update-status/${id}`, {
        status: newStatus
      });
      loadData(); // Refresh everything
    } catch (err) {
      alert("Error updating status");
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2d79] relative overflow-hidden flex flex-col items-center p-6 font-['IBM_Plex_Mono']">
      {/* Background Microphones */}
      <div className="absolute inset-0 pointer-events-none opacity-10 select-none">
        <Mic className="absolute top-20 left-10 text-white w-24 h-24 -rotate-12" />
        <Mic className="absolute bottom-20 right-10 text-white w-28 h-28 rotate-12" />
      </div>

  <div className="relative z-10 mb-12 transform hover:scale-105 transition-transform duration-300">
        <img 
          src={itcLogo} 
          alt="ITC 7 Talks Logo" 
          className="h-32 md:h-44 w-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
        />
      </div>
      <h1 className="text-white text-3xl font-bold uppercase mb-10 relative z-10">
        Submitted Questions
      </h1>

      <div className="flex gap-6 mb-12 relative z-10 h-20" >
        <StatButton 
          label="Questions" 
          count={stats.pending} 
          active={activeTab === 'pending'} 
          onClick={() => setActiveTab('pending')}
          activeColor="bg-[#c31d10]"
          textColor="text-[#c31d10]"
        />
        <StatButton 
          label="Approved" 
          count={stats.approved} 
          active={activeTab === 'approved'} 
          onClick={() => setActiveTab('approved')}
          activeColor="bg-green-600"
          textColor="text-green-600"
        />
        <StatButton 
          label="Rejected" 
          count={stats.rejected} 
          active={activeTab === 'rejected'} 
          onClick={() => setActiveTab('rejected')}
          activeColor="bg-red-700"
          textColor="text-red-700"
        />
      </div>

<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full max-w-7xl relative z-10">
  {questions.map((q) => (
    <div 
      key={q._id} 
      className="bg-white p-3 rounded-[15px] flex flex-col justify-between shadow-xl min-h-[160px] max-h-[220px] overflow-hidden border-2 border-transparent hover:border-white/20 transition-all"
    >
      <div className="w-full overflow-hidden">
        <p className="text-[#1e2d79] font-[700] text-[14px] uppercase border-b border-blue-100 pb-1 mb-2 truncate w-full text-center">
          {q.name}
        </p>
        
        <p className="text-gray-800 text-[13px] font-[500] leading-tight break-all line-clamp-5 w-full">
          {q.text}
        </p>
      </div>
      
      <div className="flex justify-between mt-auto pt-2 border-t border-gray-100">
        <button 
          onClick={() => updateStatus(q._id, "rejected")} 
          className="bg-red-50 p-2 rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
          title="Reject"
        >
          <X size={18} strokeWidth={3} />
        </button>
        
        <button 
          onClick={() => updateStatus(q._id, "approved")} 
          className="bg-green-50 p-2 rounded-lg text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
          title="Approve"
        >
          <Check size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}


const StatButton = ({ label, count, active, onClick, activeColor, textColor }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center px-6 py-2 rounded-[12px] min-w-[120px] shadow-lg transition-all ${
      active ? `${activeColor} text-white scale-105` : `bg-white ${textColor}`
    }`}
  >
    <span className="text-[10px] font-bold uppercase">{label}</span>
    <span className="text-xl font-black">{count}</span>
  </button>
);