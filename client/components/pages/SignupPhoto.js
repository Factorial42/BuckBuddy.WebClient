import React from 'react'
import ReactDOM from 'react-dom'
import { setPhoto } from 'client/actions/signup'
import { connect } from 'react-redux'
import { Row, Col, Input, Button } from 'bootstrap'
import { Link } from 'react-router'
import Dropzone from 'react-dropzone'
import UserPhoto from 'client/components/UserPhoto'

const SignupPhotoPage = React.createClass({

  render() {

    let colProps = {
      xs: 12,
      lg: 2,
      lgOffset: 5,
      className: 'text-center'
    }

    if (this.props.loading) return <span>Loading...</span>

    return (
      <Row>
        <Col xs={12} className="text-center">
          <h3>Add Your Photo</h3>
        </Col>
        <Col {...colProps}>

          <UserPhoto {...this.props} />

          <SubmitButton />

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

  _getFileUploadStatusNode() {

  },

  _handleContinueClick() {

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

const SubmitButton = ({onClick}) => {
  return (
    <Link to="/signup/stripe"><Button className="button-action button-blue">Continue</Button></Link>
  )
}

const mapStateToProps = state => {

  if (!state.user)

  return {
    loading: true
  }

  let {userId, profilePic} = state.user;

  return {userId, profilePic};

}

export default connect(mapStateToProps, {setPhoto})(SignupPhotoPage)
