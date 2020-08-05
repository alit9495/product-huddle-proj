import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Bug = props => (

//setup the formating for each individual bug report 
<div className="row" id="bugBoardCard">
      <div className="col-sm" id="bugBoardCardInnerText"><span id="bugBoardCardProfileCircle">{props.bug.username}</span></div>
      <div className="col-sm" id="bugBoardCardInnerText"><span>{props.bug.description}</span></div>
      <div className="col-sm" id="bugBoardCardInnerText"><span>{props.bug.assignedto}</span></div>
      <div className="col-sm" id="bugBoardCardInnerText"><span>{props.bug.date.substring(5, 10)}</span></div>{/*trim the date to /month/date*/}
      <div className="col-sm" id="bugBoardCardInnerText">
        <span><Link to={"/bug/edit/" + props.bug._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBug(props.bug._id) }}>delete</a></span>
      </div>
    </div>
  )

//bugs live and display on the BugBoard component 
export default class BugBoard extends Component{

    constructor(props){
        super(props);

        this.deleteBug = this.deleteBug.bind(this);

        this.state = {
            bugs: []
        }
    }

    //grab the bugs
    componentDidMount(){
        axios.get('http://localhost:5000/bugs')
            .then(response => {
                this.setState({
                    bugs: response.data
                })
            })
            .catch(error => console.log(error))
    }

    //set up so we can quickly delete bugs off of the board
    deleteBug(id){
        axios.delete('http://localhost:5000/bugs/' +id)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))

        this.setState({
            bugs: this.state.bugs.filter(el => el._id !== id)
        })
    }

    render() {
        return (
          <div>
            <div id="headerWrap"> 
                <h1>Bug Board 👾</h1>
            </div>
            <Link to={"/bug/new"}><button id="boardBtnTop" className="btn btn-success">Create A New Bug</button></Link>              
            <br></br>
            <br></br>
            <br></br>
            <div id="bugTableWrapper">
                <div className="row">
                    <div className="col-sm" id="bugBoardDisplayColumn">
                        Created By
                    </div>
                    <div className="col-sm" id="bugBoardDisplayColumn">
                        Description
                    </div>
                    <div className="col-sm" id="bugBoardDisplayColumn">
                        Assigned To
                    </div>
                    <div className="col-sm" id="bugBoardDisplayColumn">
                        Needed Date
                    </div>
                    <div className="col-sm" id="bugBoardDisplayColumn">
                        Available Actions 
                    </div>
                </div>
              {/*grab the list of bugs to display*/}
                {this.state.bugs.map(currentbug => {
                        return <Bug bug={currentbug} deleteBug={this.deleteBug} key={currentbug._id}/>;
                    })
                } 
            </div>
          </div>
        )
      }
    
}