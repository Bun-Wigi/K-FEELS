import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authpage from './Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Authpage />} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;