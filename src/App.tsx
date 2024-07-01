import { lazy, Suspense } from "react";
import {Routes , Route, Navigate } from "react-router-dom" 
const Home = lazy(() => import('./pages/Home'));
const Directory = lazy(() => import('./pages/Directory'));
const Letter = lazy(() => import('./pages/Letter'));
const AnimeDetails = lazy(() => import('./pages/AnimeDetails'));
const Genre = lazy(() => import('./pages/Genre'));
const Top = lazy(() => import('./pages/Top'));
const Search = lazy(() => import('./pages/Search'));
const Schedules = lazy(() => import('./pages/Schedules'));


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
          <Route path="/anime-by-genre" Component={Genre} />
          <Route path="/anime/details/:id" Component={AnimeDetails} />
          <Route path="/top" Component={Top} />
          <Route path="/search" Component={Search} />
          <Route path="/schedules" Component={Schedules}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>  
    )
}

export default App;