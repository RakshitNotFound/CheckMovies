import React, { Component } from "react";
import "./Favourites.css";
import { movies } from "./getMovies";
import 'font-awesome/css/font-awesome.min.css';
var FontAwesome = require('react-fontawesome');
class Favourites extends Component {
  constructor() {
    super();
    this.state={
      cgenre:"All Genres",
      movies:[],
      genres:[],
      limit:"5",
      currPage:1,
      pageArr:[1],
      currText:""
    }
  }

  componentDidMount(){
      console.log("within component did mount ");
      let old_data=JSON.parse(localStorage.getItem("Favourite-movies") || "[]");
      

      let genreids = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",
      };
      let temp=[];
      old_data.forEach(movieObj=>{
          if(!temp.includes(genreids[movieObj.genre_ids[0]])){
             temp.push(genreids[movieObj.genre_ids[0]]);
          }
      });
      temp.unshift("All Genres");
      
     //  let temp2=old_data.slice(start,end+1);
      this.setState({
        movies:[...old_data],
        genres:[...temp],
     //    pArr:temp2
    });
 // console.log(temp2);
  }
handleGenre=()=>{
    let genreids = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",
      };
      let temp=[];
      this.state.movies.forEach(movieObj=>{
          if(!temp.includes(genreids[movieObj.genre_ids[0]])){
             temp.push(genreids[movieObj.genre_ids[0]]);
          }
      });
      temp.unshift("All Genres");
      this.setState({
        genres:[...temp]
    });
}

sortPopularityDecreasing=()=>{
    let temp=[...this.state.movies];
    temp.sort((objA,objB)=>{
        return objB.popularity-objA.popularity;
    });
    this.setState({
        movies:[...temp]
    });
}

sortPopularityIncreasing=()=>{
    let temp=[...this.state.movies];
    temp.sort((objA,objB)=>{
        return objA.popularity-objB.popularity;
    });
    this.setState({
        movies:[...temp]
    });
}
sortRatingDecreasing=()=>{
    let temp=[...this.state.movies];
    temp.sort((objA,objB)=>{
        return objB.vote_average-objA.vote_average;
    });
    this.setState({
        movies:[...temp]
    });
}

sortRatingIncreasing=()=>{
    let temp=[...this.state.movies];
    temp.sort((objA,objB)=>{
        return objA.vote_average-objB.vote_average;
    });
    this.setState({
        movies:[...temp]
    });
}


  handleDeleteMovie=(movieObj)=>{
      let filteredMovie=this.state.movies.filter(mObj=>{
          return mObj.id!==movieObj.id;
      });

      localStorage.setItem("Favourite-movies",JSON.stringify(filteredMovie));
      this.setState({
          movies:[...filteredMovie]
      },this.handleGenre);
  }
  handleGenreClick=(genre)=>{
this.setState({
    cgenre:genre
});
  }
  handlePageClick=(page)=>{
      console.log("page : "+page+" got clicked");
    this.setState({
        currPage:page
    });
    }

    
  render() {
    let movie = this.state.movies;
    
   // console.log(movie);
    let genreids = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",
      };
      let start=parseInt(this.state.limit) * (parseInt(this.state.currPage)-1);
       let end=parseInt(start)+parseInt(this.state.limit)-1;
       console.log("start: "+ start+" end is : "+ end);
        end=end>=parseInt(this.state.movies.length)?parseInt(this.state.movies.length)-1:end;
    //    console.log("start : "+start+" end is  "+end);
    //    start=start%parseInt(this.state.limit);
    //    end=end%parseInt(this.state.limit);
    //   let partArray=this.state.movies.slice(start,end+1);
      let filteredArray;
      if(this.state.cgenre==="All Genres"){
          filteredArray=[...this.state.movies];
      }else{
          filteredArray=this.state.movies.filter(movieObj=>{return genreids[movieObj.genre_ids[0]]===this.state.cgenre});
      }
      let newFiltered;
      if(this.state.currText.length>0){
          newFiltered=filteredArray.filter(movieObj=>{
              console.log("original title hai "+ movieObj.original_title.toLowerCase())
              let title=movieObj.original_title.toLowerCase();
              return title.includes(this.state.currText.toLowerCase())});
      }else{
          newFiltered=[...filteredArray];
      }
    //  console.log("current genre "+this.state.cgenre);

      console.log("filtered length  "+ filteredArray.length);
      let parts=Math.ceil(newFiltered.length/parseInt(this.state.limit));
      newFiltered=newFiltered.slice(start,end+1);
      
     console.log("parts : "+ parts);
    let temp=[]
    for(var i=1;i<=parts;i++){
         temp.push(i);
    }
    //  console.log("After "+filteredArray.length);
    return (
      <div>
        {movie ? (
          <div class="row main-grid">
            <div className="col-lg-3">
              <ul class="list-group">
                  {
                      this.state.genres.map(genre=>{
                       //   console.log(genre);
                          return genre===this.state.cgenre ?  (<li class="list-group-item highlight-genre" onClick={()=>{this.handleGenreClick(genre)}} >{genre}</li>): (<li class="list-group-item " onClick={()=>{this.handleGenreClick(genre)}}>{genre}</li>)
                      })
                  }
              </ul>
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                    value={this.state.currText}
                    onChange={(e)=>{this.setState({currText:e.target.value})}}
                  ></input>
                </div>
                <div className="col">
                  <input type="number" class="form-control" placeholder="Rows Count" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}></input>
                </div>
              </div>
              <table class="table">
                <thead>
                  <tr>
                      <th scope="col"></th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col"><FontAwesome className="fas fa-sort-up" onClick={this.sortPopularityDecreasing}/>Popularity<FontAwesome className="fas fa-sort-down" onClick={this.sortPopularityIncreasing}/></th>
                    <th scope="col"><FontAwesome className="fas fa-sort-up" onClick={this.sortRatingDecreasing}/>Rating<FontAwesome className="fas fa-sort-down" onClick={this.sortRatingIncreasing}/></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {newFiltered.map((movieObj) => {
                    return (
                      <tr>
                        <td>
                          <img
                            class="favourite-img"
                            src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                          ></img>
                        </td>
                        <th scope="row">{movieObj.original_title}</th>
                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                        <td>{movieObj.popularity}</td>
                        <td>{movieObj.vote_average}</td>
                        <td>
                          <a href="#" class="btn btn-danger " role="button" onClick={()=>{this.handleDeleteMovie(movieObj)}}>
                            Delete
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul class="pagination favourite-pagination">
                  

                  {
                      temp.map(page=>{
                          return (<li class="page-item">
                          <a class="page-link" href="#" onClick={(e)=>{this.handlePageClick(page)}}>
                            {page}
                          </a>
                        </li>)
                      })
                  }
                  
                </ul>
              </nav>
            </div>
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

export default Favourites;
