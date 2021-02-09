import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";
import styled from "styled-components";
import { getItemLocalStorage, setItemLocalStorage } from "../utils/localStorage.utils";
import {
  Paper,
  Grid,
  Avatar,
  IconButton,
  Hidden,
  Toolbar,
  Menu,
  AppBar,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const NavbarWrap = styled(Grid)`
  .MuiGrid-root {
    display: flex;
  }

  .MuiPaper-root {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .MuiAvatar-root {
    width: 60px;
    height: 60px;
    margin: 18px 0;
  }
`;

const ListNav = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const NavLinkStyled = styled(NavLink)`
  display: block;
  color: black;
  text-align: center;
  padding: 10px 15px;
  font-size: 16px;
  margin: 0px 8px;
  text-decoration: none;
  transition: 0.3s;
  border-radius: 15px;
  background-color: unset !important;
  &.active,
  &:hover {
    background-color: limegreen !important;
    color: white;
  }
`;

const NavbarMobileWrap = styled(AppBar)`
  .MuiToolbar-root {
    justify-content: space-between;
  }
`;

const Navbar = () => {
  const valueToken = getItemLocalStorage("token", "");
  const [token, setToken] = useState();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setToken(getItemLocalStorage("token", ""));
  }, [location]);

  return (
    <NavbarWrap container xs={12}>
      <Hidden xsDown>
        <Paper square>
          <Grid item xs={12} justify="center">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
          <Grid item xs={12} justify="center">
            <ListNav>
              {routes.map((route) => (
                <li key={route.path}>
                  <NavLinkStyled activeClassName="active" to={route.path} exact={route.exact}>
                    {route.name}
                  </NavLinkStyled>
                </li>
              ))}
              {valueToken && (
                <li style={{ float: "right" }}>
                  <NavLinkStyled to="/" exact onClick={() => setItemLocalStorage("token", null)}>
                    Logout
                  </NavLinkStyled>
                </li>
              )}
            </ListNav>
          </Grid>
        </Paper>
      </Hidden>

      <Hidden smUp>
        <NavbarMobileWrap position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              {routes.map((route) => (
                <li key={route.path}>
                  <MenuItem onClick={handleClose}>
                    <NavLinkStyled activeClassName="active" to={route.path} exact={route.exact}>
                      {route.name}
                    </NavLinkStyled>
                  </MenuItem>
                </li>
              ))}
            </Menu>
            <NavLinkStyled to="/" exact onClick={() => setItemLocalStorage("token", null)}>
              Logout
            </NavLinkStyled>
          </Toolbar>
        </NavbarMobileWrap>
      </Hidden>
    </NavbarWrap>
  );
};

Navbar.defaultProps = {
  routes: [],
};

export default Navbar;
