import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.tsx";
import StorePage from "./pages/StorePage.tsx";
import Navbar from "./components/Navbar.tsx";
import {Container} from "react-bootstrap";
import {CartProvider} from "./context/CartContext.tsx";

function App() {
  return (
        <BrowserRouter>
            <CartProvider>
                <Navbar />
                <Container>
                    <Routes>
                        <Route path={'/'}>
                            <Route index element={<HomePage />} />
                            <Route path={'/store'} element={<StorePage />} />
                        </Route>
                    </Routes>
                </Container>
            </CartProvider>
         </BrowserRouter>
  )
}
export default App
