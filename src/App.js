import './App.css';

import Main from './routes/main';
import { BrowserRouter } from 'react-router-dom';

function App() {
 
  return (
    <BrowserRouter>
    <Main />
    </BrowserRouter>
  );
}

export default App;
