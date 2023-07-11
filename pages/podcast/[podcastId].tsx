/* eslint-disable react-hooks/exhaustive-deps */
import LoadingItems from "@/components/Loading/Loading";
import PodcastCard from "@/components/PodcastCard/PodcastCard";
import { DAY_IN_MILISECONDS } from "@/constants/time";
import usePodcastContext from "@/hooks/usePodcastContext";
import { getItemFromStorage, msToTime } from "@/utils";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PodcastDetail = () => {
  const { getPodcast, podcastDetail, loading } = usePodcastContext();
  const router = useRouter();
  const { podcastId } = router.query;

  useEffect(() => {
    if (podcastId) {
      const savedPodcast = getItemFromStorage(`podcast-${podcastId}`);
      const savedPodcastParsed = savedPodcast ? JSON.parse(savedPodcast) : null;

      if (
        !savedPodcastParsed ||
        Date.now() - savedPodcastParsed.lastUpdate > DAY_IN_MILISECONDS
      ) {
        getPodcast(podcastId as string);
      }
    }
  }, [podcastId]);

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
            <Paper sx={{ padding: "10px", marginBottom: "10px" }}>
              <Typography variant="h6" fontWeight={"bold"}>
                Episodes: {podcastDetail?.episodes?.count}
              </Typography>
            </Paper>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Date
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Duration
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {podcastDetail?.episodes?.results?.map(
                    (episode: PodcastEpisode) => (
                      <TableRow key={episode.trackId}>
                        <TableCell>
                          <Link
                            href={`/podcast/${podcastId}/episode/${episode.trackId}`}
                          >
                            {episode.trackName}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          {new Date(episode.releaseDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          {msToTime(episode.trackTimeMillis)}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PodcastDetail;
