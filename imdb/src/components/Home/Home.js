import React, { Component } from 'react';
import axios from 'axios';

import Movie from '../Movies/movies';
import './Home.css';
import InfiniteScroll from 'react-infinite-scroll-component';

import Modal from 'react-modal';

class Home extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            movies:[],
            searchBy: '',
            search: '',
            year: '',
            type: '',
            page: 1,
            length: 10,
            showModal: false,
            movieInfo: '',
            releaseYear: '',
            avgRating: '',
            currentRating: 0.0
            
        }
    }

    handleSearchBySelectChange = (e) => {
        this.setState({
            searchBy: e.target.value
        })
    }

    handleTypeSelectChange = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleYearChange = (e) => {
        this.setState({
            year: e.target.value
        })
    }

    handleSubmit = () => {
        this.setState({
            page: 1,
            movies: []
        })
        if (this.state.search =='' || this.state.searchBy == '') {
            alert('Search and searchBy fields are required fields.')
        } else {
        this.state.searchBy === 'title' ? 
            axios.get(`http://www.omdbapi.com/?s=${this.state.search}&page=${this.state.page}&y=${this.state.year}&type=${this.state.type}&apikey=3d465cc0`)
                .then(response => this.setState({
                    movies: response.data.Search
                }))
                .then(() => {
                    console.log(this.state.movies);
                    
                })
        :
            axios.get(`http://www.omdbapi.com/?i=${this.state.search}&y=${this.state.year}&type=${this.state.type}&apikey=3d465cc0`)
            .then(response => console.log(response.data.Search)
            )
        }
        
    }

    fetchMovies =  () => {
        this.setState({
            page: this.state.page + 1
        })
        
        
        axios.get(`http://www.omdbapi.com/?s=${this.state.search}&page=${this.state.page}&y=${this.state.year}&type=${this.state.type}&apikey=3d465cc0`)
                .then(response => this.setState({
                    movies: this.state.movies.concat(response.data.Search)
                }))
                .then(() => {
                    console.log(this.state.movies);
                    console.log(this.state.page);
                })
    }


      handleShowDialog = (id) => {
          this.setState({
              isOpen: !this.state.isOpen
          })
          console.log(this.state.isOpen);
          
      }

      handleOpenModal = (id) => {
        
        this.setState({ showModal: true });
        axios.get(`http://www.omdbapi.com/?i=${id}&apikey=3d465cc0`)
                .then(response => this.setState({
                    movieInfo: response.data.Title,
                    releaseYear: response.data.Year,
                    avgRating: response.data.imdbRating,
                }))
                
      }

      handleCloseModal = () => {
        this.setState({ showModal: false });
        this.setState({
            currentRating: 0.0
        }) 
      }

      handleFormSubmit = (e) => {
          e.preventDefault();
          localStorage.setItem(`${this.state.movieInfo}`, this.state.currentRating)
           this.setState({
               showModal: false
           })
      }

      handleRatingsChange = (e) => {
          this.setState({
              currentRating: e.target.value
          })
      }

    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">React IMDB</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                        <li class="nav-item">
                            <select name="searchBy" id="searchBy" onChange={(e) => this.handleSearchBySelectChange(e)}>
                                <option value="" disabled selected>Search By</option>
                                <option value="title">Title</option>
                                <option value="id">Id</option>
                            </select>
                        </li>
                        <li class="nav-item">
                            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={this.handleSearchChange} />
                        </li>
                        <li class="nav-item">
                            <input class="form-control mr-sm-2" type="number" placeholder="Year" aria-label="Search" onChange={this.handleYearChange} />
                        </li>
                        <li class="nav-item">
                            <select name="type" id="type" onChange={(e) => this.handleTypeSelectChange(e)}>
                                <option value="" disabled selected>Type</option>
                                <option value="movie">Movie</option>
                                <option value="series">Series</option>
                                <option value="episode">Episode</option>
                            </select>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Search</button>
                        </li>
                        </ul>
                    </div>
                    </nav>
                    
                    <div className="images">
                        <InfiniteScroll
                            dataLength={this.state.movies ? this.state.movies.length : 0}
                            next={this.fetchMovies}
                            hasMore={this.state.movies ? this.state.movies.length > 0 : false}
                            loader={<h4>Loading...</h4>}
                        >
                            
                            {this.state.movies.map((movie, i) => (
                                <img className="single-photo" src={movie.Poster} alt={movie.Title} onClick={() => this.handleOpenModal(movie.imdbID)} />
                            ))}
                            <Modal 
                                isOpen={this.state.showModal}
                                contentLabel="Minimal Modal Example"
                                >
                                <h1>Title: {this.state.movieInfo}</h1>
                                <h3>Year: {this.state.releaseYear}</h3>
                                <h5>Ratings: {this.state.avgRating}</h5>
                                <div><strong>Your ratings: </strong>{localStorage.getItem(`${this.state.movieInfo}`) ? localStorage.getItem(`${this.state.movieInfo}`) : this.state.currentRating}</div>
                                <form onSubmit={this.handleFormSubmit}>
                                    <div className="form-group">
                                        <label>Enter You Ratings: </label>
                                        <input placeholder="Enter Your Ratings"
                                            className="form-control"
                                            onChange={this.handleRatingsChange} 
                                            value={this.state.currentRating} />
                                        <button className="btn btn-success" type="submit">Submit</button>
                                    </div>
                                    
                                </form>
                                <button className="btn btn-danger" onClick={this.handleCloseModal}>Close</button>
                            </Modal>
                        </InfiniteScroll>
                    </div>
                    
            </div>
        );
    }
}

export default Home;