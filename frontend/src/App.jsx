import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import AskQuestion from './AskQuestion';
import Speaker from './Speaker';
import Success from './Success'; 
import Echec from './Echec';
import Moderator from './Moderator';



function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Welcome />} />
        
       
        <Route path="/ask" element={<AskQuestion />} />
        
      
        <Route path="/ask" element={<AskQuestion />} />
         <Route path="/success" element={<Success />} />
       <Route path="/echec" element={<Echec />} />

       {/* Admin Side */}
        <Route path="/moderator" element={<Moderator />} />
        
       {/* speaker page */}
         <Route path="/speaker" element={<Speaker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;