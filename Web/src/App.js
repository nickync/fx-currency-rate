import './App.css';
import CurrencyPanel from './component/CurrencyPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header';
import Footer from './component/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. rolling rate card, 2. info, data source 

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          {["/", "/home"].map((path, index) => <Route path={path} key={index} element={ <CurrencyPanel />} />)}
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
