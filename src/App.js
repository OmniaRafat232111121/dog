import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SingleDog from './pages/SingleDog';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:name" element={<SingleDog/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
