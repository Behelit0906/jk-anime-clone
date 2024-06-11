import { useLocation } from 'react-router-dom';
import { genres, types } from "../constants";


function genreExist(urlName:string | null) {
  const genre = {"mal_id": 0, "name": "Genre", urlName: ""};
  if(!urlName) return genre;

  for(let i = 0; i < genres.length; i++) {
    if(genres[i].urlName === urlName){
      genre.mal_id = genres[i].mal_id;
      genre.name = genres[i].name;
      genre.urlName = genres[i].urlName;
    }
  }
  return genre;
}

function typeExist(urlName:string | null) {
  const type = {id: "", name:"Type", urlName: "" }
  if(!urlName) return type;

  for(let i = 0; i < types.length; i++) {
    if(types[i].urlName === urlName) {
      type.id = types[i].id;
      type.name = types[i].name;
      type.urlName = types[i].urlName;
    }
  }
  return type;
}

function useExtractUrlQueries () {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentYear = new Date().getUTCFullYear();

  const criteria = ['title', 'start_date', 'popularity'];
  const states = ['complete', 'upcoming', 'airing'];
  
  const page = Number(searchParams.get('page')) || 1;
  const sortingCriteria = criteria.includes(String(searchParams.get('sorting_criteria'))) ? String(searchParams.get('sorting_criteria')) : 'start_date';
  const genre = genreExist(searchParams.get('genre'));
  const type = typeExist(searchParams.get('type'));
  const status = states.includes(String(searchParams.get('status'))) ? String(searchParams.get('status')) : '';
  const year = Number(searchParams.get('year')) && Number(searchParams.get('year')) >= 1981 && Number(searchParams.get('year')) <= currentYear ? Number(searchParams.get('year')) : 0;
  const order = ['asc', 'desc'].includes(String(searchParams.get('order'))) ? String(searchParams.get('order')) : 'desc';

  return { page, sortingCriteria, genre, type, status, year, order }
}


export default useExtractUrlQueries;