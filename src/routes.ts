import SignInPage from "./pages/SignInPage";
import About from "./pages/About";

interface Routes {
  path: string;
  name: string;
  exact: boolean;
  private: boolean;
  component: React.FC;
}

export const routes: Array<Routes> = [
  {
    path: "/",
    name: "Sign In",
    exact: true,
    private: false,
    component: SignInPage,
  },
  {
    path: "/about",
    name: "About",
    exact: false,
    private: false,
    component: About,
  },
];
