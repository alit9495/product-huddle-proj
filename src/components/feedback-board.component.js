import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

//setup the board where the "Live meeting" comments live 
const Comment = props => (
    <div class="card" id="feedbackCard">
        <p class="card-text" id="feedbackCardText">{props.feedback.feedback}</p>
        <div>
            <a href="#" onClick={() => { props.deleteComment(props.feedback._id) }}><span id="trashCan">🗑</span></a>
        </div>
    </div>
  )

export default class FeedbackBoard extends Component{

    constructor(props){
        super(props);

        this.deleteComment = this.deleteComment.bind(this);

        this.state = {
            feedback: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/feedback')
            .then(response => {
                this.setState({
                    feedback: response.data
                }) 
            })
            .catch(error => console.log(error))
    }

    deleteComment(id){
        axios.delete('http://localhost:5000/feedback/' +id)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))

        this.setState({
            feedback: this.state.feedback.filter(el => el._id !== id)
        })
    }


    render() {
        return (
          <div id="commentSection">
              <div id="internalComments">
                <h3 id="commentSectionHeader">Team Comments</h3>
                <div>
                    {this.state.feedback.map(currentfeedback => {
                        return <Comment feedback={currentfeedback} deleteComment={this.deleteComment} key={currentfeedback._id}/>; 
                    })}
                </div>
            </div> 
          </div>
        )
      }
    
}