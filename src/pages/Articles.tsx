import React from "react";
import styled from "styled-components";
import { Box, Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Footer from "../components/Footer";

const ArticleList = styled(Grid)`
  padding: 0px 150px;
  .image {
    border-radius: 4px;
    background-color: #C4C8CD;
  }
  .title { background-color: #ADB2B7; }
`;

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

  .banner {
    width: 100%;
    padding: 60px 0;
    text-align: center;
    background: #33cccc;
    color: white;

    .btn-bgstroke {
      font-size: 20px;
      display: inline-block;
      border: 1px solid white;
      padding: 10px 20px;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 300;
      margin-top: 30px;
    }

    .btn-bgstroke:hover {
      background-color: white;
      color: #33cccc;
    }

    h1,
    p,
    a {
      margin: 0;
      padding: 0;
      font-family: "Lato";
    }

    h1 {
      font-size: 2.8em;
      padding: 10px 0;
      font-weight: 800;
    }

    p {
      font-size: 1.1em;
      font-weight: 100;
      letter-spacing: 5px;
    }
  }
`;

const Articles = () => {
  return (
    <ArticleWrap container xs={12}>
      <div className="banner">
        <h1>FreeC Asia</h1>
        <p>Tìm kiếm công việc mơ ước của bạn.</p>
        <span className="btn-bgstroke">Read more</span>
      </div>
      <ArticleList container spacing={10}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Box marginRight={0.5} my={5} width="100%">
              <Skeleton className="image" variant="rect" height={200} />
              <Box pt={0.5}>
                <Skeleton className="title" width="40%" animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </Box>
            </Box>
          </Grid>
        ))}
      </ArticleList>
      <Footer />
    </ArticleWrap>
  );
};

export default Articles;
