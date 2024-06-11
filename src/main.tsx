import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom" 
import './index.css';
import App from './App.tsx';
import { SWRConfig } from 'swr';
import swrConfig from './utils/swrConfig.ts';


const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <SWRConfig value={swrConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SWRConfig> 
);