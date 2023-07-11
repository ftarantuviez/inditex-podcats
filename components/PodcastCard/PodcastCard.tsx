import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import { trimLargeText } from "@/utils";
import Link from "next/link";

type PodcastCardProps = {
  title: string;
  image: string;
  author: string;
  id: string;
  description?: string;
};

const PodcastCard = (props: PodcastCardProps) => {
  const { title, image, author, id, description } = props;
  return (
    <Link href={`/podcast/${id}`}>
      <Card sx={{ maxWidth: 345, height: !description ? 320 : "auto" }}>
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

            {description && (
              <>
                <Divider sx={{ margin: "15px 0" }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={"bold"}
                  mb={1}
                >
                  Description:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default PodcastCard;
