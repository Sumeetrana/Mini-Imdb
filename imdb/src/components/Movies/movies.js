import React from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class movies extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {
            movieInfo: '',
            releaseYear: '',
            avgRating: '',
            isOpen: false
        }
    }

    MydModalWithGrid = (id) => {

        axios.get(`http://www.omdbapi.com/?i=${id}&page=3&apikey=3d465cc0`)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    movieInfo: response.data.Title,
                    releaseYear: response.data.Year,
                    avgRating: response.data.imdbRating,
                    isOpen: !this.state.isOpen
                })
            })
            .then(() => {
                console.log(this.state);
            })
            
      }

      handleShowDialog = () => {
          this.setState({
              isOpen: !this.state.isOpen
          })
          
      }


    render() {
        return (
                !this.state.isOpen ?

                    <img className="single-photo" src={this.props.movie.Poster} alt={this.props.movie.Title} onClick={() => this.handleShowDialog()} />
                :
                    <div>
                        <button onClick={this.handleShowDialog}>
                            Close
                        </button>
                    </div>
            )
        }
};

export default movies;