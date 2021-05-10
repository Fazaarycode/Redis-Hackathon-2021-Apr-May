// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// Components Import
import Welcome from './components/WelcomeComponent/Welcome';
import Login from './components/LoginComponent/Login';
import UserRegistrationComponent from './components/UserRegistrationComponent/UserRegistrationComponent';

function App() {
  return (
    <div className="App">
      <Router>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/user-login" component={Login} />
              <Route exact path="/user-registration" component={UserRegistrationComponent} />
            </Switch>
          </Router>
    </div>
  );
}

export default App;
