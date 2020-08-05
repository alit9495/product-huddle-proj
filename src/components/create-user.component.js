import React, { Component } from 'react';
import axios from 'axios';

//create new users for our "team" 
//this will be updated to have some other fields and team management functionality 
export default class CreateUser extends Component{
    
   constructor(props){
       super(props);

       this.state = {
           username: '',
           role: ''
       }

       this.onChangeUsername = this.onChangeUsername.bind(this);
       this.onChangeRole = this.onChangeRole.bind(this);
       this.onSubmit = this.onSubmit.bind(this)
   }

   onChangeUsername(e){
       this.setState({
           username: e.target.value
       });
   }

   onChangeRole(e){
        this.setState({
            role: e.target.value
    });
}

   onSubmit(e){
    e.preventDefault();

    const user = {
        username: this.state.username,
        role: this.state.role
    }
    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));

    this.setState({
        username: '',
        role: ''
    })
} 
    
    render(){
        return(
            <div>
                <div id="formWrapper">
                <h3>Add a New Team Member <span>👤</span></h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User's Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <label>Role: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.role}
                            onChange={this.onChangeRole}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}