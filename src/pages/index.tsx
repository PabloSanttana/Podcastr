import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

import { api } from "../services/api";
import { convertDurationToTimeString } from "../Utils/converDurationToTimeToString";
import { Container, LatesEpisodes, AllEpisodes } from "@/styles/home";

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
interface HomeProps {
  latestEpisodes: Array<Episode>;
  allEpisodes: Array<Episode>;
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <Container>
      <h2>Últimos lançamentos</h2>
      <LatesEpisodes>
        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  style={{ objectFit: "cover" }}
                />

                <div className="episodeDetails">
                  <Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
                  <p>{episode.membres}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>
                <button type="button">
                  <img
                    src="/play-green.svg"
                    alt={`Tocar episodio:${episode.title}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </LatesEpisodes>
      <AllEpisodes>
        <h2>Todos os episodios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      {episode.title}
                    </Link>
                  </td>
                  <td>{episode.membres}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Tocar episodio " />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AllEpisodes>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode: any) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      membres: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      allEpisodes,
      latestEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
