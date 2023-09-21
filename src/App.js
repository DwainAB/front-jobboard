import {Routes,Route, Router, BrowserRouter} from "react-router-dom"
import Navbar from "./components/Navbar";
import './styles/App.css'
import Accueil from "./pages/Accueil";
import Log from "./pages/log";
import Footer from "./components/Footer";
import Logement from "./pages/Logement";
import Erreur404 from "./pages/Erreur";

function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <div className="global"> 
        <Navbar/>
        <Routes>
          <Route path="/" element={<Accueil/>} />
          <Route path="/log" element={<Log/>}/>
          <Route path="/Logement/:id" element={<Logement/>}/>
          <Route path="*" element={<Erreur404/>}/>
        </Routes>
        </div>
        <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
