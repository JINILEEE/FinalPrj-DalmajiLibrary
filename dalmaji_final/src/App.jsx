import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Layout from './component/Layout';
import { DalmajiContextProvider } from './context/DalmajiContext';

function App() {
  return (
    <DalmajiContextProvider>
      <BrowserRouter>
        <Layout color="#ffffff" />
      </BrowserRouter>
    </DalmajiContextProvider>
  );
}

export default App;
