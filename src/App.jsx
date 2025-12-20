import { Outlet } from 'react-router'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div>
       {/* navbar */}
        <Navbar/>
       {/* Outlate */}
        <Outlet/>
        <div className='h-screen'>

        </div>
       {/* Footer */}
       
    </div>
  )
}

export default App
