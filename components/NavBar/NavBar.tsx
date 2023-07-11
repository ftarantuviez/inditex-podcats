/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchInput from "./SearchInput";
import { Typography } from "@mui/material";
import useSearchFilter from "@/hooks/useSearchFilter";
import usePodcastContext from "@/hooks/usePodcastContext";

const NavBar = () => {
  const [query, setQuery] = useState("");
  const { podcasts, setPodcastsByFilter } = usePodcastContext();
  const { filteredPodcasts } = useSearchFilter(podcasts, query);

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
            <Typography variant="h5" color="#f2f2f2">
              Inditex Podcasts
            </Typography>
          </Box>
          <SearchInput onChange={onChange} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
