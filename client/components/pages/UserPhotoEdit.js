import React from 'react'
import ReactDOM from 'react-dom'
import { signup } from 'client/actions/signup'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import Dropzone from 'react-dropzone'

const UserPhotoEditPage = React.createClass({

  render() {

    let colProps = {
      xs: 12,
      lg: 2,
      lgOffset: 5,
      className: 'text-center'
    }

    return (
      <Row>
        <Col xs={12} className="text-center">
          <h3>Update Photo</h3>
        </Col>
        <Col {...colProps}>

          {this._getDropzoneNode()}

          {this._getFileUploadStatusNode()}

          {this._getInputNode()}

        </Col>
      </Row>
    )

  },

  _getDropzoneNode() {

    let activeStyle = {
      borderStyle: 'solid',
      backgroundColor: '#eee'
    };

    return (
      <Dropzone
        onDrop={this._onDrop}
        className="dropzone"
        activeStyle={activeStyle}>
        <h4>Drop Photo Here</h4>
      </Dropzone>
    );


  },

  _getFileUploadStatusNode() {

  },

  _getInputNode() {

    return (
      <div className="btn-file-upload">
        <span>Upload</span>
        <Input
          className='input-upload'
          ref='docInput'
          type='file'
          onChange={this._handleFileChange} />
      </div>
    );

  },

  _onDrop(files) {

    this._submitPhoto(files[0]);

  },

  _handleFileChange(e) {

    this._submitPhoto(e.target.files[0]);

  },

  _submitPhoto(file) {

    console.log('TODO...call API/action', file);

  }

});

const SubmitButton = ({onClick}) => {
  return (
    <Button onClick={onClick}>Continue</Button>
  )
}

export default connect(null, {signup})(UserPhotoEditPage)
