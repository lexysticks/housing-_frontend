import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Hero from "./PAGES/Hero/Hero";
import Aboutus from "./PAGES/ABoutus/Aboutus";
import Rent from "./PAGES/Rent/Rent";
import Buy from "./PAGES/Buy/Buy";
import Land from "./PAGES/Land/Land";
import Shortlet from "./PAGES/Shortlet/Shortlet";
import Contactpage from "./PAGES/Contact/Contact";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps pages so Navbar and Footer show on all */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
           <Route path="About" element={<Aboutus />} />
           <Route path="Rent" element={<Rent />} />
           <Route path="Buy" element={<Buy />} />
           <Route path="Shortlet" element={<Shortlet />} />
           <Route path="Land" element={<Land />} />
           <Route path="Contact" element={<Contactpage />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

