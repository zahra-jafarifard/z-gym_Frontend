import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CSelect,
  CRow,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as displayAction from "../../store/actions/index";

class updateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      location: "",
      address: "",
      status: "",
      phoneNumber: "",
      gender: "",
      gymsType: "",
      manager: "",
    };
  }

  componentDidMount = () => {
    const idItem = this.props.location.state.idItem;

    // console.log('iddd' , idItem)
    fetch(process.env.REACT_APP_API_ADDRESS + "/gym/fetchForUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        id: idItem,
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
        console.log("frontend", result.data);
        this.setState(
          {
            id: result.data.id,
            name: result.data.name,
            status: result.data.status,
            address: result.data.address,
            location: result.data.location,
            gender: result.data.gender,
            phoneNumber: result.data.phoneNumber,
            manager: result.data.User.name + result.data.User.lastName,
            gymsType:result.data.gymType.name,
          },
          () => {
            console.log("cgyyyyyyyyym   state", this.state);
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };
  goBackHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/gym/list");
  };
  updateHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ADDRESS + "/gym/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        status: this.state.status,
        address: this.state.address,
        gender: this.state.gender,
        location: this.state.location,
        phoneNumber: this.state.phoneNumber,
        manager: this.state.manager,
        gymsType: this.state.gymsType,
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
        console.log(" group updated...", result.message);
        this.props.history.push("/gym/list");
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
          <CCard borderColor="info" style={{ width: "130%" }}>
            <CCardHeader>
              <CIcon name="cil-library-add" />
              <span style={{ marginRight: "5px" }}> {t("Edit")} </span>
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
                      <CCardBody style={{ width: "240%", marginRight: "40%" }}>
                        <CForm>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="name"
                                value={this.state.name}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>

                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-group" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CSelect
                                name="status"
                                onChange={this.changeHandler}
                              >
                                <option>Status</option>
                                <option value="1"> فعال</option>
                                <option value="0"> غیرفعال</option>
                              </CSelect>
                            </CInputGroup>
                          </CFormGroup>

                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-group" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CSelect
                              name="gender"
                              onChange={this.changeHandler}
                            >
                              <option value="">{t("Gender")}</option>
                              <option value="0"> زنانه</option>
                              <option value="1"> مردانه</option>
                            </CSelect>
                          </CInputGroup>

                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="address"
                                value={this.state.address}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>

                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="location"
                                value={this.state.location}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>

                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="gymsType"
                                value={this.state.gymsType}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="manager"
                                value={this.state.manager}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>

                          <CFormGroup className="form-actions">
                            <CButton
                              onClick={(e) => this.updateHandler(e)}
                              block
                              size="md"
                              color="success"
                            >
                              {t("Update")}
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
  // console.log("main map state", state);
  return {
    showCard: state.displayReducer.showCard,
    token: state.authReducer.token,
  };
};

export default connect(mapStateToProps)(
  withTranslation("translations")(updateGroup)
);
