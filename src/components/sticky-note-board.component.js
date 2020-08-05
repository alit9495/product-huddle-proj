import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

//setting up the formatting for indivdual sticky notes 
const StickyNote = props => (
    <div className="card" id="designCard">
        <div className="card-body">
            <h5 className="card-text">{props.note.username}</h5>
            <p className="card-text" id="designCardTextArea">{props.note.description}</p>
            <p className="card-text">{props.note.date.substring(5, 10)}</p>
            <div>
                <Link to={"/notes/edit/" + props.note._id}>edit</Link> / <a href="#" onClick={() => { props.deleteNote(props.note._id) }}>delete</a>
            </div>
        </div>
    </div>
)

//board where all of the sticky notes live 
export default class StickyNoteBoard extends Component {

    constructor(props) {
        super(props);

        this.deleteNote = this.deleteNote.bind(this);

        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/designboard')
            .then(response => {
                this.setState({
                    notes: response.data
                })
            })
            .catch(error => console.log(error));
    }

    deleteNote(id) {
        axios.delete('http://localhost:5000/designboard/' + id)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));

        this.setState({
            notes: this.state.notes.filter(el => el._id !== id)
        })
    }


    render() {
        return (
            <div>
                <div id="headerWrap">
                    <h1>Design Board <span>🎨</span></h1>
                    </div>
                     
                    {/*id="designCardLinkButton">*/}
                    <Link to={"/notes/new"}><button id="boardBtnTop" className="btn btn-success">Create A New Note</button></Link>              
                    <div id="designCardContainer">
                        {this.state.notes.map(currentnote => {
                                return <StickyNote note={currentnote} deleteNote={this.deleteNote} key={currentnote._id} />
                        })}
                    </div>
            </div>  
        )
    }

}