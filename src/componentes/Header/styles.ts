import styled from "styled-components";

export const HeaderBackground = styled.div`
  background: url("assets/imagens/initialwall2.png") repeat;
  background-size: contain;
  background-position: 100% 100%;
  box-shadow: inset -30px 380px 400px 200px var(--bg900);
`;

interface IHeadingStyled {
  showComponent: boolean;
}

export const TitleBackground = styled("div")<IHeadingStyled>`
  ${(props) =>
    props.showComponent &&
    `
    position: relative;
  background-color: var(--bg900);
  height: 12rem;
  `}
`;

export const ImagemFundo = styled.img`
  width: 25%;
  position: absolute;
  right: 2%;
`;

interface IHeadingStyled {
  showComponent: boolean;
}
export const BiggerHeader = styled("div")<IHeadingStyled>`
  ${(props) =>
    props.showComponent &&
    `
height: 155vh;
margin-top: -25%;
background-color: inherit;
background-image: url("assets/imagens/initialAlert.png");
background-position: 50%;
background-size: contain;
background-repeat: no-repeat;
-webkit-transition: webkit-transform 2s;
animation: transform 3s linear infinite;

@keyframes transform {
  0% {
    transform: translateY(-7rem);
  }
  50% {
    transform: translateY(5rem);
  }
  100% {
    transform: translateY(-7rem);
  }
}
`}
`;
export const Title = styled("div")<IHeadingStyled>`
  ${(props) =>
    props.showComponent &&
    `
  width: 30%;
  height: 12rem;
  background-image: url("assets/imagens/titletrans.png");
  background-repeat: no-repeat;
  background-position: -1% 37%;
`}

  @media screen and (min-width: 900px) and (max-width: 1500px) {
    width: 30%;
    background-position: 60% 37%;
  }
`;

export const Menu = styled.div`
  width: 100%;
  height: 3rem;
  float: left;
  background: linear-gradient(5rad, var(--bg900), #d41d24, var(--bg900));
`;
