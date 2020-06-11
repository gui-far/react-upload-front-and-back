import styled, { css } from 'styled-components';

//Style for dragActive
const dragActive = css`
    border-color: #78e5d5;
`

//Style for dragReject
const dragReject = css`
    border-color: #e57878;
`

export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`

    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;

    /*Since its an component, props can be accessed*/
    ${props => props.isDragActive && dragActive}
    ${props => props.isDragReject && dragReject}

`;

/*Text color for dragActive and draReject message*/
const messageColors = {
    default: '#999',
    error: '#e57878',
    success: '#78e5d5'
}

//Style for dragActive and dragReject
export const UploadMessage = styled.p`
    display: flex;
    color: ${props => messageColors[props.type || 'default']};
    justify-content: center;
    padding: 15px 0;
`