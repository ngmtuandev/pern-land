import icons from '../../utils/icons'
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import withRouter from '../../hocs/withRouter';
const TopHeader = ({location} : any) => {

    const { IoMailUnread } = icons;

  return (
    <div className={twMerge(clsx(`px-[100px] text-white border-b border-white py-[26px] h-[85px] 
    bg-transparent flex items-center justify-between fixed z-50 w-full top-0`,
    !(location.pathname === '/') && 'bg-yellow-bold-main'
    ))}>
        <span className='flex items-center gap-2'>
            <IoMailUnread size={24}></IoMailUnread>
            <span>
                nguyenmanhtuancomputer@gmail.com
            </span>
        </span>
        <div>
            <div>
                <span>0363073476</span>
            </div>
        </div>
    </div>
  )
}

export default withRouter(TopHeader)