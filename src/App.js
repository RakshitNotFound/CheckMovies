import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route,Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      
      <Route path="/" exact element={<Movies/>}></Route>
      <Route path="/favourites" element={<Favourites/>}></Route>
      </Routes>
       {/* <Banner/>
      <Movies/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
