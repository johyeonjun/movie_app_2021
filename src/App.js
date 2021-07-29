// import logo from './logo.svg';
// import './App.css';
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";
import Movie from "./Movies";
import "./App.css";

class App extends React.Component {
 state = {
   isLoading: true,
   movies: []
 }

 getMovies = async () => {
   // await : axios 함수가 끝날떄까지 기다려라 (async 와 같이 써줘야함)
    // const movies = await axios.get("https://yts.mx/api/v2/list_movies.json");
    // console.log(movies.data.data.movies);

    // 위 코드와 동일
    const {
      data: {
        data: {
          movies
        }
      }
    } = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
    this.setState({movies, isLoading: false}); // this.setState({movies:movie}); 와 동일
 }
 componentDidMount(){
   this.getMovies();
 }


  render() {
    // this.state 내의 isLoading 의 값을 변수로 생성해줌 즉, isLoading 이라는 변수명에 true가 들어가있음 es6 문법?
    const {isLoading, movies } = this.state
    
    return <section className="container">
      {isLoading ?  <div className="loader"><span className="loader__text">Loading...</span></div> :
      <div className="movies">
        {movies.map(movie => {     
          return <Movie 
          key={movie.id}
          id={movie.id} 
          year={movie.year} 
          title={movie.title} 
          summary={movie.summary} 
          poster={movie.medium_cover_image}
          genres={movie.genres}/>
        })}
      </div>

  }</section>
  }

  
}

export default App;
