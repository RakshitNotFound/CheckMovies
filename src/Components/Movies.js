import React, { Component } from "react";
import "./Movies.css";
import { movies } from "./getMovies";
import axios from 'axios';
class Movies extends Component {
  constructor() {
    super();
    this.state = {
      page: [1],
      hover: "",
      currPage:1,
      movies:[],
      favourites:[]
    };
  }
  handleNextPage=()=>{
    console.log("handleNextPage called");
    let newParr=[];
    for(var i=1;i<=this.state.page.length+1;i++){
      newParr.push(i);
    }
    console.log(newParr);
    this.setState({
      page:[...newParr],
      currPage:this.state.currPage+1
    },this.changeMovie);
  }

  handlePage=(value)=>{
   this.setState({
     currPage:value
   },this.changeMovie);
  }

  handlePrevPage=()=>{
    if(this.state.currPage==1){
      return;
    }
    this.setState({
      currPage:this.state.currPage-1
    },this.changeMovie);
  }

  changeMovie=async ()=>{
    console.log("changeMovie called ");
    let data= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
    this.setState({
      movies:[...data.data.results]
    });
  }

  handleFavourites=(movie)=>{
    console.log("within handle favourites");
  let old_data=JSON.parse(localStorage.getItem("Favourite-movies") || "[]");
  
  let new_data;  
  if(this.state.favourites.includes(movie.id)){
    console.log("removing from favourites");
    // we have to remove it from local storage
    new_data=old_data.filter(movieObj=>{
      return movieObj.id!==movie.id;
    });
   // console.log(new_data);
    
  }else{
    console.log("aadding to fav");
    new_data=[...old_data];
    new_data.push({...movie});
    // we have to add it in local storage 
  }
  console.log("new_data");
     console.log(new_data);
     console.log("old_data");
     console.log(old_data);
    
    localStorage.setItem("Favourite-movies",JSON.stringify(new_data));
    this.handleFavouriteState();
  }

  handleFavouriteState=()=>{
    let old_data=JSON.parse(localStorage.getItem("Favourite-movies") || "[]");
    let temp=old_data.map(movieObj=>{
      return movieObj.id;
    });
    this.setState({
      favourites:[...temp]
    });
  }
  async componentDidMount(){
    console.log("componentdid mount ");
    let data=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
    console.log(data.data.results);
    this.setState({
      movies:[...data.data.results]
    });
    console.log(this.state.movies.length);
  }

  
  render() {
   let movie=this.state.movies;
    return (
      <div>
        {movie.length>0 ? (
          <div>
            <h1 class="trending"><strong>Trending</strong></h1>
            <div class="movie-list">
              {movie.map((movieObj) => {
                return (
                  <div
                    className="card movie-card"
                    onMouseEnter={() => {
                      this.setState({
                        hover: movieObj.id,
                      });
                    }}
                    onMouseLeave={() => {
                      this.setState({
                        hover: "",
                      });
                    }}
                  >
                    <img
                      className="card-img-top movie-img"
                      src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                      alt="Card image cap"
                    />

                    <h5 className="card-title movie-title">
                      {movieObj.original_title}
                    </h5>
                    <p className="card-text movie-text">{movieObj.overview}</p>
                    {this.state.hover===movieObj.id && (<a href="#" class="btn btn-primary favourite-button" onClick={()=>{this.handleFavourites(movieObj)}}>{this.state.favourites.includes(movieObj.id)?"Remove From Favourites":"Add To Favourites"}</a>)}
                  </div>
                );
              })}
            </div>
            <nav aria-label="Page navigation example" class="movie-paging">
              <ul class="pagination">
              <li class="page-item">
                  <a class="page-link" onClick={this.handlePrevPage} href="#">
                    Prev
                  </a>
                </li>
                {this.state.page.map((val) => {
                  return (
                    <li class="page-item">
                      <a class="page-link" href="#" onClick={()=>{
                        this.handlePage(val)
                      }}>
                        {val}
                      </a>
                    </li>
                  );
                })}
                <li class="page-item">
                  <a class="page-link" onClick={this.handleNextPage} href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div class="spinner-border text-success" role="status">
            <span class="sr-only"></span>
          </div>
        )}
      </div>
    );
  }
}
export default Movies;
