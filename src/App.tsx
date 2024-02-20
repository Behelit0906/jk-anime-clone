import {Routes , Route } from "react-router-dom" 
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import  Letter from "./pages/Letter";
import AnimeDetails from "./pages/AnimeDetails";
import Genre from "./pages/Genre";

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
          <Route path="/directory" Component={Directory} />
          <Route path="/letter/:letter" Component={Letter} />
          <Route path="/genre/:id" Component={Genre} />
          <Route path="/anime/details/:id" Component={AnimeDetails} />
        </Routes>
      </>  
    )
}

export default App;