import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { trimLargeText } from "@/utils";

type PodcastCardProps = {
  title: string;
  image: string;
  author: string;
};
const PodcastCard = (props: PodcastCardProps) => {
  const { title, image, author } = props;
  return (
    <Card sx={{ maxWidth: 345, height: 320 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ height: 200, objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {trimLargeText(title, 40)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PodcastCard;
