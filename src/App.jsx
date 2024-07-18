import { BrowserRouter, Route, Routes } from "react-router-dom"
import Hero from "./Components/Hero/Hero"
import Home from "./Components/Home/Home"
import CheckScroll from './CheckScroll';
import About from "./Components/About/About";


function App() {

  return (
    <BrowserRouter>
      <CheckScroll/>
      <Routes className='appRoutes'>

        <Route path='/' element={< Hero />} />
        
        <Route path='/home' element={< Home />} />
        <Route path='/about' element={< About />} />

        {/* <Route path='/:category' element={< GalleryContainer />} /> */}
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
