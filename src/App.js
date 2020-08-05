import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import CreateBug from "./components/new-bug.component";
import EditBug from "./components/edit-bug.component";
import BugBoard from "./components/bug-board.component";
import StickyNoteBoard from "./components/sticky-note-board.component";
import NewStickyNote from "./components/new-sticky-note.component";
import EditStickyNote from "./components/edit-sticky-note-component.js";
import NewFeedback from "./components/create-new-feedback.component";
import FeedbackBoard from "./components/feedback-board.component";
import Home from "./components/home.component"

function App() {
  return ( 
    <Router>
        <Navbar />
        <br/>
        <Route path="/user" component={CreateUser} />
        <Route path="/designboard" component={StickyNoteBoard} />
        <Route path="/notes/new" component={NewStickyNote} />
        <Route path="/notes/edit/:id" component={EditStickyNote} />
        <Route path="/bugs" component={BugBoard} />
        <Route path="/bug/edit/:id" component={EditBug} />
        <Route path="/bug/new" component={CreateBug} />
        <Route path="/feedback" component={NewFeedback} />
        <Route path="/feedback" component={FeedbackBoard} />
        <Route path="/home" component={Home} />
    </Router>
  );
}

export default App;
