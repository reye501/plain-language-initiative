import { ThemeProvider} from '@material-ui/core';
import custom_theme from './utility/Theme';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ForResearchers from './pages/ForResearchers';

function App() {
  return (
      <div className="App">
        <div>
          <Router>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Link to="/">Home</Link>
              <Link to="/researchers">Researchers</Link>
            </div>

              <div style={{height: '200px'}}>
              </div>

              <Switch>
                <Route path="/researchers">
                  <ForResearchers/>
                </Route>
              </Switch>

            </Router>
        </div>
      </div>
  );
}

export default App;
