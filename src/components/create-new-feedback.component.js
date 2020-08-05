import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


//new "Live Meeting" comment component 
export default class NewFeedback extends Component{
    
    constructor(props){ 
        super(props);

        this.onChangeFeedback = this.onChangeFeedback.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            feedback: ''
        }
    }

    //grab the comments 
    componentDidMount(){
        axios.get('http://localhost:5000/feedback/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        feedback: response.data.map(feedback => feedback)
                    })
                }
            })
    }

    onChangeFeedback(e) {
        this.setState({
            feedback: e.target.value
        });
    }
   
    onSubmit(e){
        e.preventDefault();

        const feedback = {
            feedback: this.state.feedback
        }

        console.log(feedback);

        //on submit -> add a comment 
        axios.post('http://localhost:5000/feedback/add', feedback)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));

        window.location = '/feedback';
    }

    
    render(){
        return(
                
        <div id="meetingInput">
            <h1 id="liveMeetingHeading">Live Meeting <span>💬</span></h1>
            <form onSubmit={this.onSubmit}>
              <br></br>
              <div className="form-group"> 
                <textarea id="textarea" type="text"
                    className="form-control"
                    placeholder="Want to participate in the discussion?"
                    onChange={this.onChangeFeedback}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Add your comment!" className="btn btn-primary" id="commentSubmitButton"/>
              </div>
            </form>
          </div>
        )
    }
}