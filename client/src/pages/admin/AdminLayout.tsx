import { Outlet } from "react-router-dom"
import { AdminSidebar } from "../../components"

const AdminLayout = () => {
  return (
    // divide : 100 / 10 => 1 - 10%
    <main className="grid grid-cols-12"> 
        <div className="col-span-2 bg-yellow-bold-main text-white w-full h-full max-h-screen overflow-y-auto">
            <AdminSidebar/>
        </div>
        <div className="col-span-10">
            <Outlet></Outlet>
        </div>
    </main>
  )
}

export default AdminLayout