import Home from './pages/home';
import Simplify from './pages/simplify';
import Summary from './pages/summary';
import { createContext, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

export const SessionIdContext = createContext();

function App() {

  const [sessionId, setSessionId] = useState(null);

  useEffect(()=>{
      const currSession = uuid();
      setSessionId(currSession);
  }, [])

  if(!sessionId) return <p>The sessionId is beig initialized...</p>

  return (
    <>
      <SessionIdContext.Provider value={sessionId}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simplify" element={<Simplify />} />
            <Route path='/summary' element={<Summary />} />
          </Routes>
        </BrowserRouter>
      </SessionIdContext.Provider>
    </>
  )
}

export default App
