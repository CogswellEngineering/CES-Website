import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html{

    box-sizing: border-box;
    height:100%;
    width:100%;
  }

  body{
    height:100%;
    box-sizing: border-box;

    width:100%;
  }

  
  *, *:before, *:after {
    box-sizing: inherit;
  }
  


  

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
