import { Navigation, TopHeader } from '../../components'
import { Outlet } from 'react-router-dom'
import withRouter from '../../hocs/withRouter'
import clsx from 'clsx'

const LayoutPublic = ({location} : any) => {
  return (
    <main>
      <TopHeader/>
      <Navigation/>
      <div className={clsx(location.pathname === '/' ? 'pt-0' : 'pt-[232px]')}>
        <Outlet></Outlet>
      </div>
    </main>
  )
}

export default withRouter(LayoutPublic)