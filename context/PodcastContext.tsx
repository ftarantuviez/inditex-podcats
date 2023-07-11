import { createContext, FC, useEffect, useState } from "react";
import { PodcastsProviderProps, PodcastsProviderValues } from "./types";
import axios from "axios";
import { getItemFromStorage, getUrlWithAllow, setItemStorage } from "@/utils";
import { BASE_URL } from "@/constants/apiCalls";

export const PodcastsContext = createContext<PodcastsProviderValues>({
  podcasts: [],
  podcastsByFilter: [],
  setPodcastsByFilter: () => {},
  loading: false,
  getPodcasts: () => {},
  error: {
    isError: false,
    message: "",
  },
});

const PodcastsProvider: FC<PodcastsProviderProps> = ({ children }) => {
  const [podcasts, setPodcasts] = useState<Podcasts>([]);
  const [podcastsByFilter, setPodcastsByFilter] = useState<Podcasts>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    const savedPodcasts = getItemFromStorage("podcasts");
    if (savedPodcasts) {
      setPodcasts(JSON.parse(savedPodcasts));
      setPodcastsByFilter(JSON.parse(savedPodcasts));
    }
  }, []);

  const getPodcasts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        getUrlWithAllow(
          `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`
        )
      );
      const podcastsResponse = JSON.parse(data?.contents)?.feed?.entry;

      setPodcasts(podcastsResponse);
      setPodcastsByFilter(podcastsResponse);
      setItemStorage("podcasts", JSON.stringify(podcastsResponse));
      setItemStorage("lastUpdate", JSON.stringify(Date.now()));
    } catch (error: any) {
      console.log(error);
      setError({
        isError: true,
        message: error?.message ?? "Something went wrong",
      });
    }
    setLoading(false);
  };

  const values: PodcastsProviderValues = {
    podcasts,
    podcastsByFilter,
    setPodcastsByFilter,
    loading,
    error,
    getPodcasts,
  };

  return (
    <PodcastsContext.Provider value={values}>
      {children}
    </PodcastsContext.Provider>
  );
};

export default PodcastsProvider;
