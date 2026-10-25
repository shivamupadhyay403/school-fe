
import type { ComponentType } from "react";
import { Login, Register } from "../../pages/public";

interface IPublicRoute {
  name: string;
  path: string;
  component: ComponentType;
}

const PublicRoutes: IPublicRoute[] = [
  { name: "login", path: "/login", component: Login },
  { name: "register", path: "/register", component: Register },
];

export default PublicRoutes;
