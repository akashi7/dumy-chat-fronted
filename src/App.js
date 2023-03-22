import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Firstdash from './pages/fistdash';
import DocDash from './pages/docDash';
import DocChat from './pages/docChat';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}  />
      <Route path='/dashboard/:id' element={<Dashboard/>}  />
      <Route path='/dash' element={<Firstdash/>}  />
      <Route path='/doc/dash' element={<DocDash/>}  />
      <Route path='/doc/chat' element={<DocChat/>}  />

    </Routes>
  );
}

export default App;
