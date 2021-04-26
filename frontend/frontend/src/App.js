import './App.css';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './Store/store'
import NavBar from './components/NavBar';

function App() {
  return (
<Provider store={store}>
      <Router>
        <div className="App">
         <NavBar></NavBar>
        </div>
      </Router>
      </Provider>
  );
}

export default App;