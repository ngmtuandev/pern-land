import { Outlet } from "react-router-dom"
import { AdminSidebar } from "../../components"

const AdminLayout = () => {
  return (
    <main className="grid grid-cols-12 gap-4"> 
        <div className="col-span-2 bg-yellow-bold-main text-white w-full h-full max-h-screen overflow-y-auto">
            <AdminSidebar/>
        </div>
        <div className="col-span-10 max-h-screen overflow-y-auto">
            <Outlet></Outlet>
        </div>
    </main>
  )
}

export default AdminLayout