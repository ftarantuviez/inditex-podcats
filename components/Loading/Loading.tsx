import { Grid, Skeleton } from "@mui/material";
import React from "react";

type Props = {
  amountOfItems?: number;
};

const skeletonCard = (
  <Skeleton
    variant="rectangular"
    width={300}
    height={350}
    sx={{ borderRadius: "10px" }}
  />
);
const LoadingItems = (props: Props) => {
  const { amountOfItems = 8 } = props;

  return (
    <React.Fragment>
      {Array.from(Array(amountOfItems).keys()).map((i) => (
        <Grid item xs={12} md={3} key={i}>
          {skeletonCard}
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default LoadingItems;
