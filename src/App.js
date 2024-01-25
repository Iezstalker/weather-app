// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API;
  return (
    <div className="App">
      <Home apiKey={apiKey} />
    </div>
  );
}

export default App;
