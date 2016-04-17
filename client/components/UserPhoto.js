import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'
import Dropzone from 'react-dropzone'

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
        <img src={this.props.profilePic} />
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
//
// const SubmitButton = ({onClick}) => {
//   return (
//     <Link to="/signup/stripe"><Button className="button-action button-blue">Continue</Button></Link>
//   )
// }

export default UserPhoto

// const mapStateToProps = state => {
//
//   if (!state.user)
//
//   return {
//     loading: true
//   }
//
//   let {userId, profilePic} = state.user;
//
//   return {userId, profilePic};
//
// }
//
// export default connect(mapStateToProps, {setPhoto})(SignupPhotoPage)
