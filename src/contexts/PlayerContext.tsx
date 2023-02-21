import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import light from "@/Theme/light";
type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

interface PlayerContextData {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  handlePlay: (episode: Episode) => void;
  isPlaying: boolean;
  handleTogglePlayPause: () => void;
  setPlayingSate: (value: boolean) => void;
  isLooping: boolean;
  handleToggleLoop: () => void;
  playList: (list: Episode[], index: number) => void;
  isShuffling: boolean;
  handleToggleShuffling: () => void;
  hasPreviousEpisode: boolean;
  hasNextEpisode: boolean;
  handlePlayNextEpisode: () => void;
  handlePlayPreviousEpisode: () => void;
  clearPlayerState: () => void;
}

const PlayerContext = createContext({} as PlayerContextData);

export const PlayerProvider = ({ children }: any) => {
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [isLooping, setLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function handlePlay(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setPlaying(true);
  }

  function handleTogglePlayPause() {
    setPlaying((oldvalue) => !oldvalue);
  }

  function setPlayingSate(value: boolean) {
    setPlaying(value);
  }
  function handleToggleLoop() {
    setLooping((oldvalue) => !oldvalue);
  }

  const hasPreviousEpisode = currentEpisodeIndex > 0;
  const hasNextEpisode =
    isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function handlePlayNextEpisode() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNextEpisode) {
      setCurrentEpisodeIndex((oldValue) => oldValue + 1);
    }
  }

  function handleToggleShuffling() {
    setIsShuffling((oldValue) => !oldValue);
  }

  function handlePlayPreviousEpisode() {
    if (hasPreviousEpisode) {
      setCurrentEpisodeIndex((oldValue) => oldValue - 1);
    }
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
    setLooping(false);
    setIsShuffling(false);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        handlePlay,
        isPlaying,
        handleTogglePlayPause,
        setPlayingSate,
        isLooping,
        handleToggleLoop,
        playList,
        isShuffling,
        handleToggleShuffling,
        hasPreviousEpisode,
        hasNextEpisode,
        handlePlayNextEpisode,
        handlePlayPreviousEpisode,
        clearPlayerState,
      }}
    >
      <ThemeProvider theme={light}>{children}</ThemeProvider>
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
