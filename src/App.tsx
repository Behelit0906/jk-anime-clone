import { lazy, Suspense } from "react";
import {Routes , Route, Navigate } from "react-router-dom" 
const Home = lazy(() => import('./pages/Home'));
const Directory = lazy(() => import('./pages/Directory'));
const Letter = lazy(() => import('./pages/Letter'));
const AnimeDetails = lazy(() => import('./pages/AnimeDetails'));
const Genre = lazy(() => import('./pages/Genre'));
const Top = lazy(() => import('./pages/Top'));
const Ranking = lazy(() => import('./pages/Ranking'));


import { useEffect } from "react";

const App = () => {
    useEffect(() => {
      const darkMode = localStorage.getItem('darkMode');
      if(darkMode === 'true') {
        document.getElementById('root')?.classList.add('dark');
      } 
    }, [])

    return (
      <Suspense>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/directory" Component={Directory} />
          <Route path="/anime-by-letter" Component={Letter} />
          <Route path="/genre/:id" Component={Genre} />
          <Route path="/anime/details/:id" Component={AnimeDetails} />
          <Route path="/top" Component={Top} />
          <Route path="/ranking" Component={Ranking} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>  
    )
}

export default App;