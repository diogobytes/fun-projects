import { Route, Routes } from 'react-router-dom';
import '../../marvel-shop-react/src/index.scss';
import Authentication from './routes/authentication/authentication';
import Checkout from './routes/checkouts/checkout.component';
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
const App = () => {

  return (
  <Routes>
  <Route path='/' element={<Navigation />}>
  <Route index element={<Home />} />
  <Route path='shop/*' element={<Shop />} />

  <Route path='checkout' element={<Checkout />} />
  <Route path='auth' element={<Authentication />} />
  </Route>
  </Routes>
  )
}

export default App;
