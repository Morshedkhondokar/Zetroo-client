import { Outlet } from 'react-router'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div className='max-w-7xl mx-auto'>
       {/* navbar */}
        <Navbar/>
       {/* Outlate */}
        <Outlet/>
        <div className='h-screen bg-green-700'>

        </div>
       {/* Footer */}
       
    </div>
  )
}

export default App
