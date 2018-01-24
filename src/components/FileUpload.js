import React, { Component } from 'react';
import request from 'superagent';
import Dropzone from 'dropzone';

class FileUpload extends Component {
    onDrop = (files) => {
        request
        .post('/api/upload')
        .attach('recipe_image', files[0])
        .end((error, response) => {
          if (error) console.log(error);
          console.log('File Uploaded Succesfully');
          console.log(response.text);
        })
    }

    render(){
        return(
            <div>
                <Dropzone onDrop={ this.onDrop } multiple={ false }>
                    <DropText className="droptext">Drop a file here, or click to select a file to upload.</DropText>
                </Dropzone>
            </div>
        )
    }
}

export default FileUpload;