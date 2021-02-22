import SignInPage from "../pages/SignInPage";
import About from "../pages/About";
import Articles from "../pages/Articles";

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
    path: "/articles",
    name: "Articles",
    exact: false,
    private: true,
    component: Articles,
  },
  {
    path: "/about",
    name: "About",
    exact: false,
    private: true,
    component: About,
  },
];
