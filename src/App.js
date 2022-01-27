import './App.css';
import CustomizedTypo from './components/CustomizedTypo';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ForResearchers from './pages/ForResearchers';
import Home from './pages/Home';
import AboutFAQ from './pages/AboutFAQ';
import ForParticipants from './pages/ForParticipants';

function App() {
  return (
      <div className="App">
        <div className="App-header">
          <CustomizedTypo> <a className="App-header-title" href="/"> Plain Language Initiative </a> </CustomizedTypo>
          <div className="App-header-link">
                <a href="/">Home</a>
                <a href="/intro">Intro</a>
                <a href="/researchers">Researchers</a>
                <a href="/participants">Participants</a>
                <a href="/aboutfaq">About FAQ</a>
          </div>
        </div>
        <div style={{height: '5vh'}}/>
        <div>
          <Router>
              <Switch>
                <Route path="/intro">
                  <Home/>
                </Route>

                <Route path="/participants"> 
                  <ForParticipants/>
                </Route>

                <Route path="/researchers">
                  <ForResearchers/>
                </Route>

                <Route path="/aboutfaq">
                  <AboutFAQ/>
                </Route>
              </Switch>

            </Router>
        </div>
      </div>
  );
}

export default App;
