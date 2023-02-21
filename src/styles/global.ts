import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

body{
    background-color: ${(props) => props.theme.COLORS.gray50}
}

@media (max-width: 1080px){
    html{
        font-size: 93.75%;
    }
}

@media (max-width: 720px){
    html{
        font-size: 87.5%;
    }
}

@media (max-width: 600px){
    body{
        min-width: 600px
    }
}



body, input, textarea, button{
    font: 500 1rem Inter,sans-serif;
    color: ${(props) => props.theme.COLORS.gray500} 
}

h1,h2,h3,h4,h5,h6{
    font-weight: 600;
    font-family: Lenxed, sans-serif;
    color: ${(props) => props.theme.COLORS.gray800};
}

h1{
    font-size: 2rem;
}

h2{
    font-size: 1.5rem
}

button {
    cursor: pointer;
}


`;
