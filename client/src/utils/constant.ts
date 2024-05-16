import path from "./path";
export const navigations = [
    {
        id: 1,
        path: '/',
        text: 'HOME'
    },
    {
        id: 2,
        path: `/${path.ABOUT_US}`,
        text: 'ABOUT US'
    },
    {
        id: 3,
        path: `/${path.OUR_AGENTS}`,
        text: 'OUR AGENTS'
    },
    {
        id: 4,
        path: `/${path.PROPERTIES}`,
        text: 'PROPERTIES'
    },
    {
        id: 5,
        path: `/${path.SEARCH}`,
        text: 'SEARCH'
    },
]


export const adminSideBarNavigate = [
    {
        id: `${Math.random()} ${Date.now()}`,
        name: 'Dashboard',
        path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_DASHBOARD}`,
        icon: 'MdDashboard', 
        type: 'single'
    },
    {
        id: `${Math.random()} ${Date.now()}`,
        name: 'Property Type',
        icon: 'BsFillHouseGearFill',
        type: 'parent',
        subs: [
            {
                id: `${Math.random()} ${Date.now()}`,
                name: 'Create Property Type',
                path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_CREATE_PROPERTY_TYPE}`,
                icon: 'MdCreateNewFolder',
                type: 'single'
            },
            {
                id: `${Math.random()} ${Date.now()}`,
                name: 'Manage Property Type',
                path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_MANAGE_PROPERTY_TYPE}`,
                icon: 'MdManageSearch',
                type: 'single'
            }
        ]
    }
]