import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'
import Dropzone from 'react-dropzone'
import { setPhoto } from 'client/actions/user'

const UserPhoto = React.createClass({

  render() {

    return (
      this._getDropzoneNode()
    )

  },

  _getDropzoneNode() {

    let {editable} = this.props;

    if (!editable) {

      return (
        <div className="dropzone">
          {this._getExistingPhotoNode()}
        </div>
      )
    }

    let activeStyle = {
      borderStyle: 'solid',
      backgroundColor: '#eee'
    };

    return (
      <Dropzone
        onDrop={this._onDrop}
        className="dropzone"
        activeStyle={activeStyle}>
        <div className="dropzone-plus">+</div>
        {this._getExistingPhotoNode()}
      </Dropzone>
    );

  },

  _getExistingPhotoNode() {

    let {profilePic} = this.props.user;

    if (!profilePic) return null;

    return (<img src={profilePic} className="user-photo" />)

  },

  _onDrop(files) {

    this._submitPhoto(files[0]);

  },

  _handleFileChange(e) {

    this._submitPhoto(e.target.files[0]);

  },

  _submitPhoto(file) {

    let {editable} = this.props;

    if (!editable) return null;

    this.props.setPhoto(this.props.user.userId, file)

  }

});


export default connect(null, { setPhoto })(UserPhoto)


//
// export default connect(mapStateToProps, {setPhoto})(SignupPhotoPage)
