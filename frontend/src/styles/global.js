import { createGlobalStyle } from 'styled-components'

import 'react-circular-progressbar/dist/styles.css'

export default createGlobalStyle`

  * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box; /*This changes how elements width and height inpacts on rendering*/
      /*Example:
      
      width: 100px;
      padding: 10px;
      border: 4px;
      margin: 20px;

      The default "box-sizing" value us "content-box":
      Total width = left border + left padding + element + right padding + right border
      Total width = 4 + 10 + 100 + 10 + 4
      Total width = 128

      But using "border-box":
      100 = 4 + 10 + element + 10 + 4
      element = 100 - 4 - 10 - 10 - 4
      element = 72

      But with this will be easier to align the page elements

      */
  } 

  /*Some default styling*/
  body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      background: #7159c1;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
  }

  /*This allow us to ensure that 100% of screen height will be used*/
  html, body, #root {
      height: 100%; 
  }

`;