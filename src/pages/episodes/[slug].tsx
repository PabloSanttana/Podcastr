import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Link from "next/link";

import { convertDurationToTimeString } from "@/Utils/converDurationToTimeToString";
import { api } from "@/services/api";
import {
  EpisodeContainer,
  ThumbnailContainer,
  DescriptionContainer,
} from "@/styles/episodes";
import Image from "next/image";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  membres: string;
  publishedAt: string;
  duration: number;
  description: string;
  url: string;
  durationAsString: string;
};
interface EpisodesProps {
  episode: Episode;
}

export default function Episodes({ episode }: EpisodesProps) {
  return (
    <EpisodeContainer>
      <ThumbnailContainer>
        <Link href="/">
          <button id="goBack" type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          style={{ objectFit: "cover" }}
          alt={episode.title}
        />
        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </ThumbnailContainer>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.membres}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>
      <DescriptionContainer
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </EpisodeContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug }: any = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    membres: data.members,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
