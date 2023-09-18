import 'bootstrap/dist/css/bootstrap.min.css';
import "./scss/style.scss";

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.tsx";
import StorePage from "./pages/StorePage.tsx";
import Navbar from "./components/Navbar.tsx";
import {Container} from "react-bootstrap";

function App() {
  return (
        <BrowserRouter>
            <Navbar />
             <Container>
                 <Routes>
                     <Route path={'/'}>
                         <Route index element={<HomePage />} />
                         <Route path={'/store'} element={<StorePage />} />
                     </Route>
                 </Routes>
             </Container>
         </BrowserRouter>
  )
}
export default App
