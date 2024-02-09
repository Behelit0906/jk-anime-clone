import {Routes , Route } from "react-router-dom" 
import Home from "./pages/Home";
import { useEffect } from "react";

const App = () => {
    useEffect(() => {
      const darkMode = localStorage.getItem('darkMode');
      if(darkMode === 'true') {
        document.getElementById('root')?.classList.add('dark');
      } 
    }, [])

    return (
      <>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </>  
    )
}

export default App;