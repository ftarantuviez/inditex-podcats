import { createContext, FC, useEffect, useState } from "react";
import { PodcastsProviderProps, PodcastsProviderValues } from "./types";
import axios from "axios";
import { getItemFromStorage, getUrlWithAllow, setItemStorage } from "@/utils";
import { BASE_URL } from "@/constants/apiCalls";
import { useRouter } from "next/router";

export const PodcastsContext = createContext<PodcastsProviderValues>({
  podcasts: [],
  podcastsByFilter: [],
  setPodcastsByFilter: () => {},
  podcastDetail: {},
  loading: false,
  getPodcasts: () => {},
  getPodcast: () => {},
  error: {
    isError: false,
    message: "",
  },
});

const PodcastsProvider: FC<PodcastsProviderProps> = ({ children }) => {
  const router = useRouter();
  const [podcasts, setPodcasts] = useState<Podcasts>([]);
  const [podcastDetail, setPodcastDetail] = useState<any>();
  const [podcastsByFilter, setPodcastsByFilter] = useState<Podcasts>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const { podcastId } = router.query;

  useEffect(() => {
    const savedPodcasts = getItemFromStorage("podcasts");
    if (savedPodcasts) {
      setPodcasts(JSON.parse(savedPodcasts));
      setPodcastsByFilter(JSON.parse(savedPodcasts));
    }
  }, []);

  useEffect(() => {
    if (podcastId) {
      const savedPodcast = getItemFromStorage(`podcast-${podcastId}`);
      if (savedPodcast) {
        setPodcastDetail(JSON.parse(savedPodcast));
      }
    }
  }, [podcastId]);

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

  const getPodcastDetail = async (podcastId: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        getUrlWithAllow(
          `${BASE_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
        )
      );
      const episodes = JSON.parse(data.contents ?? "");
      const podcastDesc = {
        ...podcasts.find(
          (podcast) => podcast.id?.attributes["im:id"] === podcastId
        ),
        episodes: {
          count: episodes.resultCount,
          results: episodes.results,
        },
      };
      setPodcastDetail(podcastDesc);
      setItemStorage(
        `podcast-${podcastId}`,
        JSON.stringify({ ...podcastDesc, lastUpdate: Date.now() })
      );
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
    podcastDetail,
    loading,
    error,
    setPodcastsByFilter,
    getPodcasts,
    getPodcast: getPodcastDetail,
  };

  return (
    <PodcastsContext.Provider value={values}>
      {children}
    </PodcastsContext.Provider>
  );
};

export default PodcastsProvider;
