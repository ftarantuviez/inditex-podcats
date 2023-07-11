import { useEffect, useState } from "react";

const useSearchFilter = (podcasts: Podcasts, q: string) => {
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcasts>([]);

  useEffect(() => {
    if (q) {
      const searchResult = podcasts.filter(
        (podcast) =>
          podcast.title.label.toLowerCase().includes(q.toLowerCase()) ||
          podcast["im:artist"].label.toLowerCase().includes(q.toLowerCase())
      );
      setFilteredPodcasts(searchResult);
    } else setFilteredPodcasts(podcasts);
  }, [podcasts, q]);

  return { filteredPodcasts };
};

export default useSearchFilter;
