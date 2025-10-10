import Home from './pages/home';
import Simplify from './pages/simplify';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simplify" element={<Simplify />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
