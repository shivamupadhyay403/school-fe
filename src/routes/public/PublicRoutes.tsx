
import type { ComponentType } from "react";
import { lazy } from "react";
const Login = lazy(() =>
  import("@/pages/public").then((module) => ({
    default: module.Login,
  }))
);
const Register = lazy(() =>
  import("@/pages/public").then((module) => ({
    default: module.Register,
  }))
);
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
