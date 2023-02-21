import styled from "styled-components";

interface propsPlayerContainer {
  active: boolean;
}

export const PlayerContainer = styled.div<propsPlayerContainer>`
  padding: 3rem 4rem;
  width: 26.5rem;
  height: 100vh;
  background-color: ${(props) => props.theme.COLORS.purple500};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
    color: ${(props) => props.theme.COLORS.white};
  }
  footer {
    align-self: stretch;
    opacity: ${(props) => (props.active ? 0.5 : 1)};
  }
`;

export const CurrentEpisode = styled.div`
  text-align: center;
  img {
    border-radius: 1.5rem;
  }
  strong {
    display: block;
    margin-top: 2rem;
    font: 600 1.25rem Lexend, sans-serif;
    line-height: 1.75rem;
  }
  span {
    display: block;
    margin-top: 1rem;
    opacity: 0.6;
    line-height: 1.5rem;
    color: ${(props) => props.theme.COLORS.white};
  }
`;

export const EmptyPlayer = styled.div`
  width: 100%;
  height: 20rem;
  border: 1.5px dashed ${(props) => props.theme.COLORS.purple300};
  border-radius: 1.5rem;

  background: linear-gradient(
    143.8deg,
    rgba(145, 100, 250, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  padding: 4rem;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
    color: ${(props) => props.theme.COLORS.white};
  }
`;

export const ContainerSlider = styled.div`
  flex: 1;
`;
export const EmptySlider = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${(props) => props.theme.COLORS.purple300};
  border-radius: 2px;
`;
export const ButtonsController = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 1.5rem;

  button {
    background-color: transparent;
    border: 0;
    font-size: 0.75rem;
    transition: filter 0.2s;

    &:hover:not(:disabled) {
      filter: brightness(0.8);
    }

    &#play {
      background-color: ${(props) => props.theme.COLORS.purple400};
      border-radius: 1rem;
      width: 4rem;
      height: 4rem;

      &:hover:not(:disabled) {
        filter: brightness(0.95);
      }
    }

    &:disabled {
      cursor: default;
    }
    &.repeatActive {
      background-color: ${(props) => props.theme.COLORS.green500};
      font-size: 0;
      border-radius: 0.3rem;
    }
  }
`;
