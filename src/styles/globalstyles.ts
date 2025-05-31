import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';
// font
import 'pretendard/dist/web/static/pretendard.css';

const GlobalStyles = createGlobalStyle`
${Reset}
  
  * {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', sans-serif;
    width: 100%;
    max-width: 720px;
    min-width: 280px;
    margin: 0 auto;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    color: ${props => props.theme.font_color};
    ::-webkit-scrollbar {
      display: none;
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    background: transparent;
    cursor: pointer;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    &:hover {
      border: none;
    }
  }
  ol, ul, li {
    list-style: none;
  }
  select, option {
    font-family: 'Pretendard', sans-serif;
    background: transparent;
    font-size: 15px;
    -webkit-appearance:none; /* for chrome */
    -moz-appearance:none; /*for firefox*/
    appearance:none;
  }
  a, button, input, textarea {
    font-family: 'Pretendard', sans-serif;
    appearance: none;
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    -webkit-tap-highlight-color: transparent;
    outline:none;
    border: none;
    &:disabled {
      cursor: default;
    }
  }


`;

export default GlobalStyles;
