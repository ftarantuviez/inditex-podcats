/* eslint-disable import/no-anonymous-default-export */
import { useContext } from "react";
import { PodcastsProviderValues } from "@/context/types";
import { PodcastsContext } from "@/context/PodcastContext";

export default () => useContext<PodcastsProviderValues>(PodcastsContext);
