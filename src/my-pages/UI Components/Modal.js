import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";

import * as displayAction from "../../store/actions/index";

// import {deleteHandler} from '../../Shared-Component/deleteHandler'
class ModalBootStrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }


  handleClose = () => {
    this.setState({ show: false });
    this.props.onDeleteModal(false);
  };

  HandleDelete = () => {
    const item = this.props.item;
    console.log('item modal' , item)
    fetch(process.env.REACT_APP_API_ADDRESS + `/${this.props.name}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        id: item,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(response.statusText, response.status);
        } else {
          return response.json();
        }
      })
      .then((result) => {
        console.log("frontend", result.message);
        this.setState({ show: false });
        this.props.onDeleteModal(false);

      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
            // backdrop="static"
            // keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              CANCEL
            </Button>
            <Button variant="primary" onClick={this.HandleDelete}>
              DELETE
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
//   console.log("category map state", state);
  return {
    token: state.authReducer.token,
    deleteModal: state.displayReducer.deleteModal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteModal: (val) => {
      dispatch(displayAction.deleteModal(val));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalBootStrap);
