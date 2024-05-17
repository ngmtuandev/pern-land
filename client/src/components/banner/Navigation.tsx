import { Link, NavLink } from 'react-router-dom'
import Button from '../commons/Button'
import { navigations } from '../../utils/constant'
import clsx from 'clsx'
import withRouter from '../../hocs/withRouter'
import { twMerge } from 'tailwind-merge'
import { useUserStore } from '../../store/useUserStore'
import { useModelStore } from '../../store/useModelStore'
import Login from '../author/Login'

const Navigation = ({location}: any) => {

  const { current } : any = useUserStore();
  const { setModel } : any = useModelStore();

  return (
    <div className={clsx('h-[85px] flex items-center justify-between fixed w-full top-[85px] z-50 px-[100px] py-[26px]', 
      location.pathname === '/' ? 'bg-transparent' : 'bg-white'
    )}>
      <Link to='/'>
        <span className='text-white font-bold text-[40px]'>LAND</span>
      </Link>
      <div className={clsx('flex items-center gap-5', location.pathname === '/' ? 'text-white' : 'text-yellow-bold-main')}>
        {
          navigations.map(item => (
            <NavLink 
            className={({isActive}) => clsx(isActive && 'text-yellow-bold-main font-semibold')}
            key={item.id} to={item.path}>
              {item.text}
            </NavLink>
          ))
        }
        {
        
        current ? 
        <Button styleCss={twMerge(clsx(location.pathname === '/' && 'bg-transparent border border-white'))}>
          Add Listing
        </Button>
        : 
        <Button 
        handleOnClick={() => setModel(true, <Login/>)}
        styleCss={twMerge(clsx(location.pathname === '/' && 'bg-transparent border border-white'))}>
          Sign in
        </Button>
        }
      </div>
    </div>
  )
}

export default withRouter(Navigation)