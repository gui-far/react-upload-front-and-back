import styled from 'styled-components'

export const Container = styled.div`

    height: 100%; /*All screen height*/
    display: flex;  /*Flex...*/
    justify-content: center; /*Horizontal positioning*/
    align-items: center; /*Vertical positioning*/

`;

export const Content = styled.div`

    max-width: 400px; /*Horizontal Size*/
    margin: 30px; /*"Outside" element distance from  border*/
    background: #FFF; /*White background */
    border-radius: 4px; /*Rounded border corner*/
    padding: 20px; /*"Inside" element distance from "border"*/


`;