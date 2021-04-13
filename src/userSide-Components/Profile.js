import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { CCard, CCardBody, CCol } from "@coreui/react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    fetch(process.env.REACT_APP_API_ADDRESS + "/members/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(response.statusText, response.status);
        } else {
          return response.json();
        }
      })
      .then((result) => {
        this.setState(
          {
            membersState: result.members,
          },
          () => {
            console.log(this.state.membersState);
          }
        );
      })
      .catch((e) => {
        console.log("catch", e.message);
      });
  };
  render() {
    return (
      <React.Fragment>
        <CCol xs="12" sm="6" md="4">
          <CCard color="danger" className="text-white text-center">
            <CCardBody>
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50px",
                }}
                src="https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1605431246/vendor/6996/catalog/product/2/0/20200518104315_file_5ec30f83a4843_5ec30fadb7669.png"
              ></img>
              <blockquote className="card-bodyquote"></blockquote>
              <footer>
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </CCardBody>
          </CCard>
        </CCol>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    mobile: state.authReducer.mobile,
    isLoggedIn: state.authReducer.isLoggedIn,
    token: state.authReducer.token,
    error: state.authReducer.error,
  };
};

export default connect(
  mapStateToProps,
  null
)(withTranslation("translations")(Profile));
