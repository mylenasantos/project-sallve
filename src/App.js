import React, { Component } from 'react';
//import logo from './logo.svg';
//import './materialize/css/materialize.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import "./App.css";
import axios from 'axios';
import StarRatings from 'react-star-ratings';

class App extends Component{
    constructor(){
        super()
        this.state = {
            texto: '',
            title: '',
            error: '',
            poster: '',
            plot: '' ,
            actors: '',
            director: '',
            writer: '',
            released: '',
            genre: '',
            awards: '',
            ratings: []
        }

    this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() { //materialize initialize
        // Auto initialize all the things!
        M.AutoInit();
    }

    handleClick() {
        axios.get('http://www.omdbapi.com/?apikey=1716a3d8&t=' + this.state.texto)
          .then(response => this.setState({
            title: response.data.Title,
            error: response.data.Error,
            poster: response.data.Poster,
            plot: response.data.Plot,
            actors: response.data.Actors,
            director: response.data.Director,
            writer: response.data.Writer,
            released: response.data.Released,
            genre: response.data.Genre,
            awards: response.data.Awards,
            ratings: response.data.Ratings
        }))

        document.getElementById('search').value="";
    }

    Error(error) {
      if (error == null) {
        return(
          <div className="modal-content">
            <div className="row col s12">
              <div className="col s8 Movie">
                <p>{this.state.title}</p>
                <p className="SmallText">{this.state.released} - {this.state.genre}</p>
              </div>
              <div className="col s4 SmallText">
                <p>{this.state.awards}</p>
              </div>
            </div>

            <div className="row col s12">
              <div className="col s4">
                  <img className="materialboxed responsive-img" width="" src={this.state.poster} alt={this.state.title} />
              </div>
              <div className="quebra"></div>
              <div className="col s8">
                  <p className="SmallText">Plot: {this.state.plot}</p>
                  <p className="SmallText">Actors: {this.state.actors}</p>
                  <p className="SmallText">Director: {this.state.director}</p>
                  <p className="SmallText">Writer: {this.state.writer}</p>
              </div>
            </div>

            <div className="row col s5">
                <p className="text">Ratings</p>
            </div>
            <div className="row col s12">
                {this.state.ratings.map(function(ratings){
                  var numStar = 5;
                  var stars = ratings.Value.split('/');
                  stars = (parseInt(stars[0].replace('.','').replace('%','')) / 100) * numStar;
                  return (
                    <div key={ratings.id} className="col s4">
                      <StarRatings rating={stars} starRatedColor="gold" numberOfStars={numStar} starDimension="20px" starSpacing="7px" />
                    </div>
                  )
                })}
            </div>
          </div>
        )
      }
      else {
        return(
          <p>{this.state.error}</p>
        )
      }
    }

    render(){
      return (
        <div className="container">

            <nav>
                <div className="nav-wrapper">
                    <div className="form">
                        <div className="input-field">
                            <input id="search" type="search" placeholder="Pesquisar..." required onInput={(e) => this.setState({texto: e.target.value})}/>
                            <i className="material-icons modal-trigger" onClick={this.handleClick} href="#modal1">search</i>
                        </div>
                    </div>
                </div>
            </nav>

            <div id="modal1" className="modal modal-fixed-footer">
                {this.Error(this.state.error)}

                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat ButtonColor">Close</a>
                </div>
            </div>

        </div>
        )
    }
}

export default App;
