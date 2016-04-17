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

    let {profilePic} = this.props;

    if (!profilePic) return null;

    return (<img src={profilePic} />)

  },

  _onDrop(files) {

    this._submitPhoto(files[0]);

  },

  _handleFileChange(e) {

    this._submitPhoto(e.target.files[0]);

  },

  _submitPhoto(file) {

    this.props.setPhoto(this.props.userId, file)

  }

});

const mapStateToProps = state => {

  if (!state.user) return {}

  let {userId, profilePic} = state.user;

  return {userId, profilePic};

}

export default connect(mapStateToProps, { setPhoto })(UserPhoto)


//
// export default connect(mapStateToProps, {setPhoto})(SignupPhotoPage)
