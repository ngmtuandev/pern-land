import React from 'react'
import icons from '../../utils/icons'
const TopHeader = () => {

    const { IoMailUnread } = icons;

  return (
    <div className='px-[100px] text-white border-b border-yellow-bold-main py-[26px] h-[85px] bg-transparent flex items-center justify-between fixed z-50 w-full top-0'>
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

export default TopHeader