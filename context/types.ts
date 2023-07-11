import { Dispatch, ReactNode, SetStateAction } from "react";

export type PodcastsProviderValues = {
  podcasts: Podcasts;
  podcastsByFilter: Podcasts;
  setPodcastsByFilter: Dispatch<SetStateAction<Podcasts>>;
  loading: boolean;
  getPodcasts(): void;
  error: {
    isError: boolean;
    message: string;
  };
};

export type PodcastsProviderProps = {
  children: ReactNode;
};
