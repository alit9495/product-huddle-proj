import React, { Component } from 'react';

//setup a home componenet because why not!?
const Home = () => (
    <div className="">
        <h1 id="homeHeading">
          Welcome to <span id="productHuddle">Product Huddle</span> 🗓
        </h1>
         
        <div class="container">
            <div class="row" id="homeContentRows">
                <div class="col-sm">
                <h1><b>Bug Board</b></h1>
                Track bugs all the way from 
                prototype to production. Assign bug fixes
                to the proper team member to keep 
                teams focused. 
                </div>
            <div class="col-sm">
                <h1><b>Design Board</b></h1>
                Shared resource just for product 
                and design. Write out user stories, 
                Ask for feedback on mockups,
                leave a note for later.
            </div>
            </div>

            <div class="row" id="homeContentRows">
                <div class="col-sm">
                <h1><b>Live Meeting</b></h1>
                Fully anonymous, and overly honest.
                Great real feedback during your 
                meeting and stop wasting time. 
                Steer the meeting in the right 
                direction during the meeting, not after. 
                </div>
            <div class="col-sm">
                <h1><b>Feature Hub (coming soon)</b></h1>
                Members from non-product 
                teams quickly share their front lines
                feedback without the need to find the
                proper person or wait until meeting day.
            </div>
            </div>
    
    </div>
    </div>
  );

  export default Home;

