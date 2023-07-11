/* eslint-disable react-hooks/exhaustive-deps */
import LoadingItems from "@/components/Loading/Loading";
import PodcastCard from "@/components/PodcastCard/PodcastCard";
import usePodcastContext from "@/hooks/usePodcastContext";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Episode = () => {
  const { podcastDetail, loading } = usePodcastContext();
  const router = useRouter();
  const { episodeId } = router.query;

  const episode = podcastDetail?.episodes?.results?.find(
    (e) => e.trackId === Number(episodeId)
  );

  return (
    <Grid container spacing={4} p={4}>
      {loading || !podcastDetail ? (
        <LoadingItems />
      ) : (
        <>
          <Grid item xs={12} md={4}>
            <PodcastCard
              author={podcastDetail?.["im:artist"]?.label ?? ""}
              image={podcastDetail?.["im:image"]?.[2]?.label ?? ""}
              title={podcastDetail?.title?.label}
              id={podcastDetail?.id?.attributes["im:id"]}
              description={podcastDetail?.summary?.label || ""}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">{episode?.trackName}</Typography>
              <Typography
                mt={2}
                color="#a1a1a1"
                sx={{ whiteSpace: "pre-line" }}
              >
                {episode?.description}
              </Typography>
              <Box p={3}>
                <audio
                  controls
                  src={episode?.previewUrl}
                  style={{ width: "100%" }}
                />
              </Box>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Episode;
