import React from "react";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import { HeaderContainer } from "./styles";

function Header() {
  const currentDate = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });

  return (
    <HeaderContainer>
      <img src="/logo.svg" alt="Podcastr" />
      <p>O melhor pra você ouvir, sempre</p>
      <span>{currentDate}</span>
    </HeaderContainer>
  );
}

export default React.memo(Header);
