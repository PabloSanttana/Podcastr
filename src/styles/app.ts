import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;

  main {
    flex: 1;
  }
  @media only screen and (max-width: 1100px) {
    display: block;
    position: relative;
    padding-bottom: 72rem;
    max-height: 100vh;
  }
`;
