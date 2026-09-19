import { Outlet } from 'react-router-dom' //Outlet là "vị trí" mà React Router sẽ đặt component của route con vào.
import Navbar from './Navbar'
import Sidebar from './Sidebar'


export default function Layout() {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />
  
        {/* Phần bên phải */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    )
  }