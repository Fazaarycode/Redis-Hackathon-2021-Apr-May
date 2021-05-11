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
import SearchComponent from './components/SearchComponent/SearchComponent';

  let initRequest = () => {
    console.log(process.env)
    let init = fetch(`http://localhost:4000/`)
    .then(response => response.json())
    .then( data => console.log('Data ', data))
    ;
  };
  function App() {
  
  initRequest();
  return (
    <div className="App">
      <Router>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/user-login" component={Login} />
              <Route exact path="/user-registration" component={UserRegistrationComponent} />
              <Route exact path="/search-arena" component={SearchComponent} />
            </Switch>
          </Router>
    </div>
  );
}

export default App;
