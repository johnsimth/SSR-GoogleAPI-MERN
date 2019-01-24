import { injectGlobal } from 'styled-components';
import normalize from 'styled-normalize';
import { colors } from 'shared/styles/variables';

const baseStyles = () => injectGlobal`
  ${normalize}
  * { box-sizing: border-box; }
  html {
    font-size: 62.5%;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Yu Gothic", YuGothic, Verdana, Meiryo, "M+ 1p", sans-serif;
  }
  body {
    font-size: 1.4em;
    background-color: ${colors.mainLight};
  }
  p, h1, h2, h3, h4, h5, h6 { margin: 0; }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;

export default baseStyles;