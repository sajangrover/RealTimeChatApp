import {BrowserRouter , Route, Switch} from 'react-router-dom';
import Home from './component/Home';
import Chat from './component/Chat';
import './css/chat.css'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ="/" component={Home}/>
        <Route path="/chat" component={Chat}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
