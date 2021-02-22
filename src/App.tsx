import React from "react";
import { BrowserRouter } from "react-router-dom";
import { routes } from "./routes/routes";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styled from "styled-components";
import { AnimatedSwitch } from "react-router-transition";

const ContentWrap = styled.div`
  display: flex;
  width: 100%;
  min-height: 275px;
  justify-content: center;
  flex: 1;
`;

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Navbar />
        <ContentWrap>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            {routes.map((route) =>
              route.private ? (
                <PrivateRoute key={route.path} path={route.path} exact={route.exact} component={route.component} />
              ) : (
                <PublicRoute key={route.path} path={route.path} exact={route.exact} component={route.component} />
              )
            )}
            <Footer />
          </AnimatedSwitch>
        </ContentWrap>
      </BrowserRouter>
    </main>
  );
}

export default App;
