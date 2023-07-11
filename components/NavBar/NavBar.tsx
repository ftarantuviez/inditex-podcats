/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchInput from "./SearchInput";
import { CircularProgress, Typography } from "@mui/material";
import useSearchFilter from "@/hooks/useSearchFilter";
import usePodcastContext from "@/hooks/usePodcastContext";
import { useRouter } from "next/router";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const {
    podcasts,
    setPodcastsByFilter,
    loading: contextLoading,
  } = usePodcastContext();
  const { filteredPodcasts } = useSearchFilter(podcasts, query);
  const [loading, setLoading] = useState(false);

  router.events?.on("routeChangeStart", () => setLoading(true));
  router.events?.on("routeChangeError", () => setLoading(false));
  router.events?.on("routeChangeComplete", () => setLoading(false));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    setPodcastsByFilter(filteredPodcasts);
  }, [filteredPodcasts]);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "80px" }}>
      <AppBar position="fixed" sx={{ background: "#1d1d1b" }}>
        <Toolbar>
          <Box
            alignItems="flex-end"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          >
            <Link href="/">
              <Typography variant="h5" color="#f2f2f2">
                Inditex Podcasts
              </Typography>
            </Link>
          </Box>
          <SearchInput onChange={onChange} />
          {loading ||
            (contextLoading && (
              <CircularProgress size={20} sx={{ ml: "10px" }} />
            ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
