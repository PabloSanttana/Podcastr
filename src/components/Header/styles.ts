import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.COLORS.white};

  display: flex;

  align-items: center;

  padding: 2rem 4rem;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.gray100};
  p {
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid ${(props) => props.theme.COLORS.gray100};
  }
  span {
    margin-left: auto;
    text-transform: capitalize;
  }
`;
