import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    font-family: ${({ theme }) => theme.fonts.roboto.fontFamily};
    width: 100vw;
    height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

   html, body, div, span, applet, object, iframe,
   h1, h2, h3, h4, h5, h6, p, blockquote, pre,
   a, abbr, acronym, address, big, cite, code,
   del, dfn, em, img, ins, kbd, q, s, samp,
   small, strike, strong, sub, sup, tt, var,
   b, u, i, center,
   dl, dt, dd, ol, ul, li,
   fieldset, form, label, legend,
   table, caption, tbody, tfoot, thead, tr, th, td,
   article, aside, canvas, details, embed, 
   figure, figcaption, footer, header, hgroup, 
   menu, nav, output, ruby, section, summary,
   time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
   }

   .Toastify{
      position: fixed;
      z-index: 9999;
   }

   .Toastify__toast--default { 
      border-radius: 0;
      height: 100vh;
      background-color: transparent;
      box-shadow: none;
   }
   
   .Toastify__toast-container--top-center {
      justify-content: center;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
   }
`;

export default GlobalStyles;
