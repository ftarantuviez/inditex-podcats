import { Dispatch, ReactNode, SetStateAction } from "react";

export type PodcastsProviderValues = {
  podcasts: Podcasts;
  podcastsByFilter: Podcasts;
  podcastDetail: any;
  setPodcastsByFilter: Dispatch<SetStateAction<Podcasts>>;
  getPodcasts(): void;
  getPodcast(id: string): void;
  loading: boolean;
  error: {
    isError: boolean;
    message: string;
  };
};

export type PodcastsProviderProps = {
  children: ReactNode;
};
