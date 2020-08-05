import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

//component to edit individual sticky notes 
export default class EditStickyNote extends Component{
    
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSubmittime = this.onChangeSubmittime.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            submittime: '',
            date: new Date(),
            users: []
        }
    }
    //match note to id
    componentDidMount(){
        axios.get('http://localhost:5000/designboard/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    submittime: response.data.submittime,
                    date: new Date(response.data.date)
                })
            })
            .catch(error => console.log(error))

        //grab users for the dropdown 
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
            .catch(error => console.log(error))

    }
    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeSubmittime(e) {
        this.setState({
            submittime: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const note = {
            username: this.state.username,
            description: this.state.description,
            submittime: this.state.submittime,
            date: this.state.date
        }
        console.log(note);
        
        axios.post('http://localhost:5000/designboard/update/'+this.props.match.params.id, note)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));

        window.location = '/designboard';
    }

    
    render(){ 
        return(
        <div id="editNodeModal"> <a href="/designboard" id="editModalBackArrow">ᐸ Go back</a>
            <div id="editNoteForm">
            <h3>Edit Note</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {this.state.users.map((user) => {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <textarea id="textArea" type="text"
                    required
                    placeholder="Description"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>

              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                </div>
              </div>
              
              <div className="form-group">
                <input type="submit" value="Edit Your Note" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
        )
    }
}