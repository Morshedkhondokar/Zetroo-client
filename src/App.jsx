import { Outlet } from 'react-router'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Toaster position="top-center" reverseOrder={false} />
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
