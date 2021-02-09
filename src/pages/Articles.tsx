import React from "react";
import styled from "styled-components";
import { Paper, Grid, Avatar, IconButton, Hidden, Toolbar, Menu, AppBar, MenuItem } from "@material-ui/core";

const ArticleWrap = styled(Grid)`
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

const Articles = () => {
  <ArticleWrap container xs={12}>
    <Grid item xs={12} justify="center">
      <Paper elevation={3} />
    </Grid>
  </ArticleWrap>;
};

export default Articles;
