import logo from './logo.svg';
import './App.css';
import CurrencyPanel from './component/CurrencyPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header';
import Conversion from './component/Conversion';

function App() {
  return (
    <div>
        <Header />
        <CurrencyPanel />
        <div className='footer bg-dark fixed-bottom'>
          <div className='footer text-secondary text-center'>Zen</div>
        </div>
    </div>
  );
}

export default App;
