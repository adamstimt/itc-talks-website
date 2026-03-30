import { useEffect, useState } from "react";
import axios from "axios";
import { Mic, HelpCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import itcLogo from "./assets/itcLogo.png"; 
import sevenLogo from "./assets/seven.png"; 

export default function Speaker() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null); 
  const questionsPerPage = 12;

  const loadQuestions = async () => {
    try {
      const res = await axios.get("https://itc-talks.onrender.com/api/questions/approved");
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    loadQuestions();
    const interval = setInterval(loadQuestions, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  return (
    <div className="min-h-screen bg-[#1e2d79] relative overflow-hidden flex flex-col items-center p-4 md:p-6 font-['IBM_Plex_Mono']">
      
      {/* Background Icons - Adjusted opacity for better mobile readability */}
      <div className="absolute inset-0 pointer-events-none opacity-10 md:opacity-20 select-none">
        <Mic className="absolute top-10 left-5 text-white w-16 h-16 md:w-24 md:h-24 -rotate-12" />
        <HelpCircle className="absolute top-20 right-5 text-white w-20 h-20 md:w-32 md:h-32 rotate-12" />
        <Mic className="absolute bottom-[100px] left-10 text-white w-16 h-16 md:w-20 md:h-20 rotate-45" />
        <HelpCircle className="absolute bottom-[120px] right-[5%] text-white w-20 h-20 md:w-28 md:h-28 -rotate-12" />
      </div>

      {/* Logo Header - Responsive height */}
      <div className="relative z-10 mb-6 md:mb-12 transform hover:scale-105 transition-transform duration-300">
        <img 
          src={itcLogo} 
          alt="ITC 7 Talks Logo" 
          className="h-20 md:h-44 w-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
        />
      </div>

      <h1 className="relative z-10 text-white text-[20px] md:text-[32px] font-[700] uppercase mb-8 md:mb-12 tracking-widest text-center px-4">
        CHOOSE WHAT TO ANSWER !
      </h1>

      {/* Main Container - Adjusted gap for mobile */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center gap-4 md:gap-8">
        
        {/* Navigation Buttons - Hidden or smaller on mobile if needed */}
        <div className="flex gap-4 md:contents order-2 md:order-none mt-6 md:mt-0">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))} 
            className="bg-[#c31d10] p-3 md:p-4 rounded-xl text-white disabled:opacity-30 active:scale-90 transition-transform"
            disabled={currentPage === 0}
          >
            <ChevronLeft size={30} className="md:w-[40px]" />
          </button>
        </div>

        {/* Grid - Standardized mobile dimensions */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 w-full order-1 md:order-none">
          {currentQuestions.map((q) => (
            <div
              key={q._id}
              onClick={() => setSelectedQuestion(q)}
              className="relative bg-white rounded-[20px] md:rounded-[25px] p-5 flex flex-col items-center shadow-2xl cursor-pointer hover:scale-105 transition-all min-h-[200px] md:min-h-[240px]"
            >
              {/* Profile Icon */}
              <div className="absolute -top-6 md:-top-7 left-1/2 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 bg-[#1E2D79] rounded-full p-1 shadow-md flex items-center justify-center">
                <img 
                  src={sevenLogo} 
                  alt="seven" 
                  className="w-full h-full object-contain rounded-full" 
                />
              </div>

              <h3 className="text-[#1e2d79] font-[700] text-[14px] md:text-[16px] mt-6 mb-2 border-b-2 border-[#1e2d79]/10 w-full text-center pb-1 truncate uppercase">
                {q.name}
              </h3>

              <div className="flex-1 flex items-start justify-center w-full overflow-hidden mt-2 px-1">
                <p className="text-[14px] md:text-[16px] text-center font-[700] leading-[1.4] break-words w-full line-clamp-4 md:line-clamp-6">
                  {q.text}
                </p>
              </div>

              {/* Responsive Bottom Bar */}
              <div className="w-[calc(100%+40px)] mx-[-20px] mb-[-20px] mt-4">
                <div className="bg-[#c31d10] text-white flex justify-between items-center px-5 py-2 md:py-3 rounded-b-[20px] md:rounded-b-[25px]">
                  <span className="font-[700] text-[13px] md:text-[15px] ml-2 tracking-[2px]">
                    REPLY
                  </span>
                  <ChevronRight size={20} md:size={22} strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 md:contents order-3 md:order-none">
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))} 
            className="bg-[#c31d10] p-3 md:p-4 rounded-xl text-white disabled:opacity-30 active:scale-90 transition-transform"
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRight size={30} className="md:w-[40px]" />
          </button>
        </div>
      </div>

      {/* Modal - Better sizing for small screens */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e2d79]/95 backdrop-blur-md p-4 md:p-6">
          <button 
            onClick={() => setSelectedQuestion(null)}
            className="absolute top-5 right-5 md:top-10 md:right-10 text-white active:scale-90 transition-all z-50"
          >
            <X size={40} md:size={60} />
          </button>

          <div className="relative bg-white w-full max-w-3xl rounded-[30px] md:rounded-[40px] p-6 md:p-12 flex flex-col items-center shadow-2xl animate-in zoom-in duration-300">
            
            <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 w-20 h-20 md:w-28 md:h-28 bg-[#1E2D79] rounded-full p-2 shadow-2xl flex items-center justify-center">
              <img src={sevenLogo} alt="seven" className="w-full h-full object-contain rounded-full" />
            </div>

            <h2 className="text-[#1e2d79] font-[700] text-[24px] md:text-[36px] mt-8 md:mt-12 mb-4 md:mb-6 border-b-4 border-[#1e2d79]/10 pb-2 w-full text-center uppercase">
              {selectedQuestion.name}
            </h2>
            
            <div className="flex-1 flex items-center justify-center w-full py-4 md:py-8 overflow-y-auto max-h-[40vh] md:max-h-none">
              <p className="text-gray-800 text-[22px] md:text-[40px] font-[700] text-center leading-tight break-words w-full px-2 md:px-4">
                {selectedQuestion.text}
              </p>
            </div>

            <div className="w-[calc(100%+48px)] md:w-[calc(100%+96px)] mx-[-24px] md:mx-[-48px] mb-[-24px] md:mb-[-48px] mt-6 md:mt-8">
              <div className="bg-[#c31d10] text-white flex justify-center items-center px-6 py-5 md:py-8 rounded-b-[30px] md:rounded-b-[40px]">
                <span className="font-[700] text-[16px] md:text-[24px] uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center">
                  Answering Now
                  <span className="flex ml-2 md:ml-4 gap-1">
                    <span className="animate-bounce [animation-delay:-0.3s]">.</span>
                    <span className="animate-bounce [animation-delay:-0.15s]">.</span>
                    <span className="animate-bounce">.</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination dots - Scaled for mobile */}
      <div className="mt-8 md:mt-12 flex gap-2 md:gap-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${currentPage === i ? 'bg-[#c31d10] scale-125 shadow-lg' : 'bg-white/30'}`} 
          />
        ))}
      </div>
    </div>
  );
}