
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route }from 'react-router-dom';
import Shop from './Pages/Shop.jsx';
import ShopCategory from './Pages/ShopCategory.jsx';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import  LoginSignup from './Pages/LoginSignup.jsx';
import Footer from './Components/Footer/Footer.jsx';
import  Banner_men from './Components/Assests/banner_mens.png';
import  Banner_women from './Components/Assests/banner_women.png';
import  Banner_kid from './Components/Assests/banner_kids.png';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path='/'element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={Banner_men} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner={Banner_women} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={Banner_kid} category="kid"/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="login" element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
