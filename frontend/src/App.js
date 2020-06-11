//React
import React, { Component } from 'react'

//CSS (But with Style Components)
import GlobalStyle from './styles/global'
import { Container, Content } from './styles'

//Components
import Upload from './components/Upload'
import FileList from "./components/FilesList"

//Utils
//uniqueId = Generates Unique ID
//filezie = Get correct "kb","mb","gb" of file size
import { uniqueId } from 'lodash'
import filesize from 'filesize'

//Api 
import api from './services/api'

class App extends Component {


  //The state will be manage by the App.js since its a single page
  state = {
    //This will hold the uploadedFiles, the new ones and the ones that are inside the server
    uploadedFiles: [],
  };

  //React recommends use this hook to for api requests
  //Here we will retrieve initial data from server
  async componentDidMount() {
    
    //"posts" endpoint
    const res = await api.get('posts')

    //Set state with...
    this.setState({
      //every file find at "posts" endpoint (using map)
      uploadedFiles: res.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),  //Correct File Size and extension
        preview: file.url,
        uploaded: true,
        url: file.url
      }))
    })

  }

  //This function will recieve all files selected
  handleUpload = files => {
    //And for each one will create a new object
    //These objects will be stored in an array
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),  //Correct File Size and extension

      //This will create a URL that will hold to the object/file selected
      //Remember that at this point, the upload has not started yet
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      erro: false,
      url: null
    }))

    //This new array will be "add/concat" with the current ones inside state
    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    //Now the upload will start
    uploadedFiles.forEach(this.processUpload)

  };


  //This function will change the files data inside the state
  //This function will be called inside processUpload with the "onUploadProgress"
  updateFile = (id, progress) => {
    this.setState({
      //For each files inside state
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        //Search/if for the correct id and update the "progress" propertie, or keep it the same when id dont match
        return id === uploadedFile.id ? {
          ...uploadedFile, ...progress
        } : uploadedFile
      })
    })
  }


  processUpload = (uploadedFile) => {

    //Data like a "html form"
    //Remeber, In the backend we need the: express.urlencoded({extended: true})
    const data = new FormData();

    //File...remember in the backend we retrieve this trougth "request" (request.file)
    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('posts', data, {

      //This onUploadProgress will provide the upload progress 
      //The "arrow function" will be called every time progress changes
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        //Here we call the updateFile so the state also will change whenever upload progresses
        this.updateFile(uploadedFile.id, {
          progress
        })
      }
    }).then((res) => {
      //When finish, get the backend generated URL
      //And set uploaded to TRUE
      this.updateFile(uploadedFile.id, {
        uploaded: true,
        id: res.data._id,
        url: res.data.url
      })

    }).catch(() => {
      //When erro, set erro to True
      this.updateFile(uploadedFile.id, {
        error: true
      })
    })
  }

  //Delete - passed through props to FileList 
  handleDelete = async id => {

    //Delete endpoint use "id" as a param
    await api.delete(`posts/${id}`);

    //After delete "filter/remove" the deleted id
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file=> file.id != id)
    })

  }

  //after unmount component, we need to clear the "URL CACHE"
  //It was generated inside handleUpload function, at url propertie
  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {

    //Get Current Files from state sp it can be passed to FileList component
    const { uploadedFiles } = this.state;


    /*
    There are two components:
    
    "Upload" = Drag and Drop zone
    "FileList" = Liste the Files Uploaded
    
    */
    return (
      <Container>
        <Content>

        <GlobalStyle />

        <Upload onUpload={this.handleUpload} />

        {!!uploadedFiles.length && (
          //Pass Files from State to File List component trougth "props"
          <FileList files={uploadedFiles} onDelete={this.handleDelete}/>
        )}

        </Content>
        
      </Container>
    )
  }
}

export default App;
