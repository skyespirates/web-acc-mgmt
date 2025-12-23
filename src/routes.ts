import { createBrowserRouter } from "react-router";
import Homepage from "./pages/Homepage";
import Home from "./components/Home";
import MenuForm from "./components/MenuForm";
import AddPermission from "./components/AddPermission";
import DeleteMenu from "./components/DeleteMenu";
import UpdateMenu from "./components/UpdateMenu";
import AddRole from "./components/AddRole";
import RoleList from "./components/RoleList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserRoles from "./components/UserRoles";
import Chat from "./pages/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Homepage,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "add-menu",
        Component: MenuForm,
      },
      {
        path: "add-permission",
        Component: AddPermission,
      },
      {
        path: "delete-menu",
        Component: DeleteMenu,
      },
      {
        path: "update-menu",
        Component: UpdateMenu,
      },
      {
        path: "add-role",
        Component: AddRole,
      },
      {
        path: "role-list",
        Component: RoleList,
      },
      {
        path: "user-roles",
        Component: UserRoles,
      },
    ],
  },
  { path: "/register", Component: Register },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/chat",
    Component: Chat,
  },
]);

interface Menu {
  id: number;
  name: string;
  path: string;
}

export const routes: Menu[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Add Menu",
    path: "/add-menu",
  },
  {
    id: 3,
    name: "Add Permission",
    path: "/add-permission",
  },
  {
    id: 4,
    name: "Delete Menu",
    path: "/delete-menu",
  },
  {
    id: 5,
    name: "Update Menu",
    path: "/update-menu",
  },
  {
    id: 6,
    name: "Add Role",
    path: "/add-role",
  },
  {
    id: 7,
    name: "Role List",
    path: "role-list",
  },
  {
    id: 8,
    name: "User Roles",
    path: "user-roles",
  },
];
