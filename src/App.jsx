import { Outlet } from 'react-router'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div className='max-w-7xl mx-auto'>
       {/* navbar */}
        <Navbar/>
       {/* Outlate */}
        <Outlet/>
       
       {/* Footer */}
       <Footer/>
    </div>
  )
}

export default App
