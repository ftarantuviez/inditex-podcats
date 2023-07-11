import { BASE_URL } from "@/constants/apiCalls";
import { getUrlWithAllow } from "@/utils";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";

type Props = {};

const PodcastDetail = (props: Props) => {
  return <div>PodcastDetail</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { podcastId } = context.query;
  const { data } = await axios.get(
    getUrlWithAllow(
      `${BASE_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
    )
  );

  return {
    props: {},
  };
};

export default PodcastDetail;
