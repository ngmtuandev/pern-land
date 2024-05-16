import { adminSideBarNavigate } from "../../utils/constant"
import { NavLink } from "react-router-dom"
import icons from "../../utils/icons";
import clsx from "clsx";
import { useState } from "react";

const {MdDashboard, BsFillHouseGearFill, FaChevronDown, FaChevronUp, MdCreateNewFolder, MdManageSearch} = icons;

const iconMap: { [key: string]: JSX.Element } = {
  'MdDashboard': <MdDashboard size={20} />,
  'BsFillHouseGearFill': <BsFillHouseGearFill size={20}/>,
  'MdCreateNewFolder': <MdCreateNewFolder size={20}/>,
  'MdManageSearch': <MdManageSearch size={20}/>
};


const AdminSidebar = () => {

  const [currentSideBar, setCurrentSideBar] = useState<string[]>([]);

  return (
    <div className="w-full h-screen">
      <div className="w-full flex-col items-center flex justify-center">
        <p className="font-agbalumo text-4xl p-4">LAND</p>
        <small className="text-gray-50 italic mt-2">admin : info</small>
      </div>
      <div className="mt-4">
        {adminSideBarNavigate.map(el => <div className="flex flex-col" key={el.id}>
          {
            el.type === 'single' &&
            <NavLink to={el.path!} className={({isActive}) => clsx('flex items-center gap-2 w-full p-4 ', isActive && 'bg-opacity-25 border-r-4 border-white')}>
              <span>{iconMap[el.icon]}</span>
              <span className="">{el.name}</span>
            </NavLink>
          }
          {
            el.type === 'parent' && <div>
              <div 
              onClick={() => {
                if (currentSideBar.includes(el.id)) {
                  setCurrentSideBar(currentSideBar?.filter(item => item !== el.id))
                }
                else {
                  setCurrentSideBar([...currentSideBar, el.id])
                }
              }}
              className="flex justify-between cursor-pointer px-2 items-center">
                <div className="flex items-center gap-2 w-full p-2">
                  <span>{iconMap[el.icon]}</span>
                  <span className="">{el.name}</span>
                </div>
                <div>
                  <span className="">{currentSideBar.includes(el.id) ? <FaChevronUp size={16}/> : <FaChevronDown size={16}/>}</span>
                </div>
              </div>
              <div className="pl-2">
                {
                  currentSideBar.includes(el.id) && <div>
                    {
                      el?.subs?.map(el => 
                      <NavLink to={el.path!} className={({isActive}) => clsx('flex items-center gap-2 w-full p-4 ', isActive && 'bg-opacity-25 border-r-4 border-white')}>
                        <span>{iconMap[el.icon]}</span>
                        <span className="">{el.name}</span>
                      </NavLink>)
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>)}
      </div>
    </div>
  )
}

export default AdminSidebar