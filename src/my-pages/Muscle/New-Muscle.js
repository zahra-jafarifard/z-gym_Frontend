import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CLink,
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as displayAction from "../../store/actions/index";

class newMuscle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };
  goBackHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/muscle/list");
  };
  newStatusHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ADDRESS + "/muscle/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        muscleName: this.state.name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(response.statusText, response.status);
        }
        return response.json();
      })
      .then((result) => {
        console.log("frontend:::", result.message);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { t, i18n } = this.props;

    return (
      <React.Fragment>
        <CCol xs="12" sm="6" md="4" style={{ margin: "auto" }}>
          <CCard borderColor="info" style={{ width: "30rem" }}>
            <CCardHeader>
              <CIcon name="cil-library-add" />
              <span style={{ marginRight: "5px" }}> {t("Add New")} </span>
              <div className="card-header-actions">
                <CLink
                  className="card-header-action"
                  onClick={(e) => this.goBackHandler(e)}
                >
                  {t("Back")}
                  <CIcon
                    name="cil-arrow-circle-left"
                    style={{ marginRight: "3px" }}
                  />
                </CLink>
              </div>
            </CCardHeader>

            <CCardBody>
              <CRow>
                <CCol xs="12" sm="6" md="4" style={{ textAlign: "center" }}>
                  <CFade in={this.props.showCard}>
                    <CCollapse show={this.props.showCard}>
                      <CCardBody style={{ width: "20rem", marginRight: "40%" }}>
                        <CForm>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-chevron-double-left" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="name"
                                placeholder={t("Name")}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>

                          <CFormGroup className="form-actions">
                            <CButton
                              onClick={(e) => this.newStatusHandler(e)}
                              block
                              size="md"
                              color="success"
                            >
                              {t("Insert")}
                            </CButton>
                          </CFormGroup>
                        </CForm>
                      </CCardBody>
                    </CCollapse>
                  </CFade>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("main map state", state);
  return {
    showCard: state.displayReducer.showCard,
    token: state.authReducer.token,
  };
};

export default connect(mapStateToProps)(
  withTranslation("translations")(newMuscle)
);
