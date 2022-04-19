import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Home from './components/Home/Home';
import Create from './components/Create/Create'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path= "/create" component={Create}/>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;