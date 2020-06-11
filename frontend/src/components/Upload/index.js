//This is the "drag and drop" component

//React....
import React, { Component } from 'react'

//This component will implements features from Dropzone lib
import Dropzone from 'react-dropzone'

//Styled Componentes Css
import { DropContainer, UploadMessage } from './styles'

class Upload extends Component {

    //This function verify is isDragActive or isDragReject
    //For each one a different message will be render
    //It is used inside Dropzone component children
    renderDragMessage = (isDragActive, isDragReject) => {

        if (!isDragActive) {
            /*Component for message - will render with "default" style */
            return <UploadMessage>Arraste arquivos aqui...</UploadMessage>
        }

        if (isDragReject) {
            /*Component for message - will render with "error" style*/
            return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
        }

        /*Component for message - will render with "success" style*/   
        return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>

    }

    render() {

        const { onUpload } = this.props;

        return (
            
            /*This onDropAccepted will call a function everytime a new file is selected */
            /*This Dropzone element uses the "PROP RENDER PATTERN"*/
            /*So the Dropzone Children will be passed to the Dropzone element*/

            /*
            "...getRootProps()" inside the "DropContainer" component enables the Dropzone lib feature of drag and dorp
            "...getInputProps()" insede the <input> will also enable Dropzone lib feature 
            
            "isDragActive={isDragActive}"
            The first "isDragActive" refers to the component propertie, wilhe the "{isDragActive}" refers to the Dropzone lib funtion
            
            This properties "isDragAtive" will pass to component "isDragAtive" function
            Since its an StyleComponent, some css can be aplied when drag is active

            This also happens with isDragReject.
            
            */

            <Dropzone accept="image/*" onDropAccepted={onUpload}>

                {
                    ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                        <DropContainer
                            {...getRootProps()}
                            isDragActive={isDragActive}
                            isDragReject={isDragReject}
                        >

                            <input {...getInputProps()} />

                            {this.renderDragMessage(isDragActive, isDragReject)}

                        </DropContainer>
                    )
                }

            </Dropzone>
        )
    }
}

export default Upload;
