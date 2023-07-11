/* eslint-disable react-hooks/exhaustive-deps */
import LoadingItems from "@/components/Loading/Loading";
import PodcastCard from "@/components/PodcastCard/PodcastCard";
import { DAY_IN_MILISECONDS } from "@/constants/time";
import usePodcastContext from "@/hooks/usePodcastContext";
import { getItemFromStorage } from "@/utils";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";

const Home = () => {
  const { getPodcasts, podcastsByFilter, loading } = usePodcastContext();

  useEffect(() => {
    const lastUpdate = Number(getItemFromStorage("lastUpdate"));

    if (!lastUpdate || Date.now() - lastUpdate > DAY_IN_MILISECONDS) {
      getPodcasts();
    }
  }, []);

  return (
    <Grid container spacing={3} p={3}>
      {loading ? (
        <LoadingItems />
      ) : (
        podcastsByFilter?.map((podcast) => (
          <Grid item xs={12} sm={6} md={3} key={podcast.id.attributes["im:id"]}>
            <PodcastCard
              author={podcast["im:artist"].label ?? ""}
              image={podcast["im:image"]?.[2]?.label ?? ""}
              title={podcast.title.label}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Home;
