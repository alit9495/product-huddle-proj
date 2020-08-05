import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

//component to add new bugs to the board 
export default class CreateExercise extends Component{
    
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAssignedto = this.onChangeAssignedto.bind(this);
        this.onChangeSubmittime = this.onChangeSubmittime.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            assignedto: '',
            submittime: 0,
            date: new Date(),
            users: []
        }
    }

    //grab our users for the dropdown
    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch(error => console.log(error));
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

    onChangeAssignedto(e) {
        this.setState({
            assignedto: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const bug = {
            username: this.state.username,
            description: this.state.description,
            assignedto: this.state.assignedto,
            submittime: this.state.duration,
            date: this.state.date
        }
        console.log(bug);

        axios.post('http://localhost:5000/bugs/add', bug)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));

        window.location = '/bugs';
    }

 //big ole form incoming    
    render(){ 
        return(
            <div id="createBugForm">
            <h3>Create Software Bug</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map((user) => {
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
                    placeholder="Describe problem"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Assigned To: </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.assignedto}
                    onChange={this.onChangeAssignedto}
                    />
              </div>
              
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                </div>
              </div>
      
              <div className="form-group">
                <input type="submit" onClick={this.onSubmit} value="Create New Bug" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}