import React, { useEffect, useReducer } from 'react';

import './App.css';
import Header from './Header';
import Search from './Search';
import Movie from './Movie';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=c5737b09";

type Action = 
{ type: "SEARCH_MOVIES_SUCCESS", loading: false, payload: object[]} |
{ type: "SEARCH_MOVIES_FAILURE", error: string }

type State = {
  type: string;
  loading: boolean;
  movies: (object)[];
  Search: (object)[];
  errorMessage: string;
}
const initialState: State = {
  type: "SEARCH_MOVIES_SUCCESS",
  loading: true,
  movies: [],
  Search: [],
  errorMessage: '',
}
type Response = {  
  Search: (object)[];
  Response: string;
  Error: string;
}
const reducer = ( state: State, action: Action ): State => {
  // console.log('여기서 첫 렌더링?')
  switch (action.type) {
    case "SEARCH_MOVIES_SUCCESS":{
      // console.log('액션 페이로드'+ action.payload)
      // console.log('액션 페이로드 타입'+ typeof action.payload)
      return {
        ...state,
        movies: action.payload,
        loading: false
      }
    }
    case "SEARCH_MOVIES_FAILURE":{
      // console.log('실패상태 !')
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }  }
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // console.log(initialState, '이니셜 스테이트')
  useEffect(() => {
      fetch(MOVIE_API_URL)
        .then(response => response.json())
        .then((response: State) => {
          // console.log('처음 렌더링?')
          dispatch({ type: "SEARCH_MOVIES_SUCCESS", loading: false, payload: response.Search})
          // console.log('처음 렌더링 후에 리스폰스 ', response.Search )
        })
  },[]);

  const search = (searchValue: string) => {

    fetch(`https://www.omdbapi.com/?s=${searchValue}=&apikey=c5737b09`)
      .then(response => response.json())
      .then((jsonResponse: Response) => {
        if (jsonResponse.Response === "True") {
          // console.log('서치버튼 누르면 Response 업데이트')
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            loading: false,
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          }); 
        }
      });
  };
  const { movies, errorMessage, loading } = state;
  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search}/>
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
        <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          // movies 안의 movie들은 각각 object인데 parameter의 타입을 object로 설정하면 오류가 발생하는데 그 점은 풀지못하였으나 실행오류는 발생하지않아 그대로 두었으나 추후 더 연구하여 확실한 타입을 할당하도록 하겠습니다.
            movies.map(( movie: any, index: any ) => (
              <Movie key={`${index}-${movie}`} movie={movie} />
            ))
        )} 
      </div>
    </div>
  );
}

export default App;
