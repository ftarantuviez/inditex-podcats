import { ReactNode } from "react";

export type PodcastsProviderValues = {
  podcasts: Podcasts;
  loading: boolean;
  getPodcasts(): void;
  getPodcast(podcastId: string | number): void;
  error: {
    isError: boolean;
    message: string;
  };
};

export type PodcastsProviderProps = {
  children: ReactNode;
};
