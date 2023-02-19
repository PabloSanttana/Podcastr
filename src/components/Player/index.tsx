import React from "react";

import {
  PlayerContainer,
  EmptyPlayer,
  Progress,
  EmptySlider,
  ButtonsController,
  ContainerSlider,
} from "./styles";

function Player() {
  return (
    <PlayerContainer active={false}>
      <header>
        <img src="/playing.svg" alt="Tocando agora." />
        <strong>Tocando agora</strong>
      </header>

      <EmptyPlayer>
        <strong>Selecione um podcast para ouvir</strong>
      </EmptyPlayer>

      <footer>
        <Progress>
          <span>00:00</span>
          <ContainerSlider>
            <EmptySlider />
          </ContainerSlider>

          <span>00:00</span>
        </Progress>
        <ButtonsController>
          <button type="button">
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button id="play" type="button">
            <img src="/play.svg" alt="Tocar" />
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Tocar a Próxima" />
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </ButtonsController>
      </footer>
    </PlayerContainer>
  );
}

export default React.memo(Player);
