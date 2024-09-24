import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { movies } from "./getMovies";
import "./Banner.css";
export default class Banner extends Component {
  render() {
    console.log(movies);
    let movie = movies.results[0];
    return (
      <>
        {movie ? (
          <div className="card banner-card">
            <img
              className="card-img-top banner-img"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="Card image cap"
            />

            <h5 className="card-title banner-title">{movie.original_title}</h5>
            <p className="card-text banner-text">{movie.overview}</p>
          </div>
        ) : (
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only"></span>
          </div>
        )}
      </>
    );
  }
}
