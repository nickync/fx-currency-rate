import logo from './logo.svg';
import './App.css';
import CurrencyPanel from './component/CurrencyPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header';
import Conversion from './component/Conversion';

function App() {
  return (
    <div className="container-fluid">
        <Header />
        <CurrencyPanel />
    </div>
  );
}

export default App;
