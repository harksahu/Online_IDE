import logo from './logo.svg';
import './App.css';
import NaviagtionBar from "./Component/Navigation.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <NaviagtionBar />
      <Home/>
    </div>
  );
}

export default App;
