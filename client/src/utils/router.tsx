import { RouteObject } from "react-router-dom";
import App from "../App";
import {
  AdminLayout,
  CreatePropertyType,
  DashBoard,
  ManagePropertyType,
} from "../pages/admin";
import {
  AboutUs,
  Home,
  LayoutPublic,
  OurAgent,
  Properties,
} from "../pages/public";
import { Personal, UserLayout } from "../pages/user";
import path from "./path";

const router: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: path.PUBLIC_LAYOUT,
        element: <LayoutPublic />,
        children: [
          {
            path: path.HOME,
            element: <Home />,
          },
          {
            path: path.ABOUT_US,
            element: <AboutUs />,
          },
          {
            path: path.OUR_AGENTS,
            element: <OurAgent />,
          },
          {
            path: path.PROPERTIES,
            element: <Properties />,
          },
        ],
      },
      {
        path: path.ADMIN_LAYOUT,
        element: <AdminLayout />,
        children: [
          {
            path: path.ADMIN_DASHBOARD,
            element: <DashBoard />,
          },
          {
            path: path.ADMIN_CREATE_PROPERTY_TYPE,
            element: <CreatePropertyType />,
          },
          {
            path: path.ADMIN_MANAGE_PROPERTY_TYPE,
            element: <ManagePropertyType />,
          },
        ],
      },
      {
        path: path.USER_LAYOUT,
        element: <UserLayout />,
        children: [
          {
            path: path.USER_PERSONAL,
            element: <Personal />,
          },
        ],
      },
    ],
  },
];

export default router;
