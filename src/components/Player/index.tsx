import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import {
  PlayerContainer,
  EmptyPlayer,
  Progress,
  EmptySlider,
  ButtonsController,
  ContainerSlider,
  CurrentEpisode,
} from "./styles";
import PlayerContext from "@/contexts/PlayerContext";
import Image from "next/image";
import { convertDurationToTimeString } from "@/Utils/converDurationToTimeToString";

function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    handleTogglePlayPause,
    setPlayingSate,
    isLooping,
    handleToggleLoop,
    isShuffling,
    handleToggleShuffling,
    hasPreviousEpisode,
    hasNextEpisode,
    handlePlayNextEpisode,
    handlePlayPreviousEpisode,
    clearPlayerState,
  } = useContext(PlayerContext);

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function changeProgressListener() {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener("timeupdate", () => {
      //@ts-ignore
      setProgress(audioRef.current.currentTime);
    });
  }

  function handleChangeProgress(value: number | any) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  }

  function handleEpisodeEnded() {
    if (hasNextEpisode) {
      handlePlayPreviousEpisode();
    } else {
      clearPlayerState();
    }
  }

  return (
    <PlayerContainer active={!episode}>
      <header>
        <img src="/playing.svg" alt="Tocando agora." />
        <strong>Tocando agora</strong>
      </header>
      {episode ? (
        <CurrentEpisode>
          <Image
            width={292}
            height={292}
            src={episode.thumbnail}
            alt={episode.title}
            style={{ objectFit: "cover" }}
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </CurrentEpisode>
      ) : (
        <EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </EmptyPlayer>
      )}

      <footer>
        <Progress>
          <span>{convertDurationToTimeString(progress)}</span>
          <ContainerSlider>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleChangeProgress}
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
              />
            ) : (
              <EmptySlider />
            )}
          </ContainerSlider>

          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </Progress>

        {episode && (
          <audio
            ref={audioRef}
            src={episode.url}
            autoPlay
            loop={isLooping}
            onPlay={() => setPlayingSate(true)}
            onPause={() => setPlayingSate(false)}
            onLoadedMetadata={changeProgressListener}
            onEnded={handleEpisodeEnded}
          ></audio>
        )}
        <ButtonsController>
          <button
            className={isShuffling ? "repeatActive" : ""}
            type="button"
            disabled={!episode}
            onClick={() => handleToggleShuffling()}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button
            onClick={() => handlePlayPreviousEpisode()}
            type="button"
            disabled={!episode || !hasPreviousEpisode}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            id="play"
            type="button"
            onClick={() => handleTogglePlayPause()}
            disabled={!episode}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Pausar ep" />
            ) : (
              <img src="/play.svg" alt="Tocar ep" />
            )}
          </button>
          <button
            onClick={() => handlePlayNextEpisode()}
            type="button"
            disabled={!episode || !hasNextEpisode}
          >
            <img src="/play-next.svg" alt="Tocar a Próxima" />
          </button>
          <button
            onClick={() => handleToggleLoop()}
            type="button"
            disabled={!episode}
            className={isLooping ? "repeatActive" : ""}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </ButtonsController>
      </footer>
    </PlayerContainer>
  );
}

export default React.memo(Player);
