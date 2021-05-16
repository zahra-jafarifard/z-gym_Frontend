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

import { ReactSearchAutocomplete } from "react-search-autocomplete";


class newWorkOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personState: [],

      id: "",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      createdBy: "",
      user: "",
    };
  }

  handleOnSelect = (item) => {
    this.setState({ createdBy: item.id }, () => {
      console.log("this.state.creator", this.state.createdBy);
    });
  };

  handleOnSelectUser = (item) => {
    this.setState({ user: item.id }, () => {
      console.log("this.state.user", this.state.user);
    });
  };
  componentDidMount = () => {
    fetch(process.env.REACT_APP_API_ADDRESS + "/members/list", {
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
        // console.log("personState::", result.members);
        this.setState({ personState: result.members }, () => {
          console.log("personState::", this.state.personState);
        });
      });

  
  };

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };
  goBackHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/workOut/list");
  };
  newGroupHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ADDRESS + "/workOut/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        createdBy: this.state.createdBy,
        user: this.state.user,
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
        console.log("frontend:::", result.message);
        this.props.history.push("/workOut/list");
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
                                placeholder={t("Name")}
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
                                name="description"
                                placeholder={t("Description")}
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
                              type="date"
                                name="startDate"
                                placeholder={t("Start Date")}
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
                              type="date"
                                name="endDate"
                                placeholder={t("End Date")}
                                onChange={this.changeHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>

                         

                          <div style={{ marginBottom: "13px" }}>
                            <ReactSearchAutocomplete
                              items={this.state.personState.map((opt) => {
                                return {
                                  id: opt.id,
                                  name: opt.name + opt.lastName,
                                };
                              })}
                              styling={{
                                height: "34px",
                                borderRadius: "9px",
                                fontSize: "13px",
                                zIndex: "1200",
                              }}
                              placeholder="**Type Creator**"
                              name="createdBy"
                              onSelect={this.handleOnSelect}
                              value={this.state.createdBy}
                            />
                          </div>
                          <div style={{ marginBottom: "13px" }}>
                            <ReactSearchAutocomplete
                              items={this.state.personState.map((opt) => {
                                return {
                                  id: opt.id,
                                  name: opt.name + opt.lastName,
                                };
                              })}
                              styling={{
                                height: "34px",
                                borderRadius: "9px",
                                fontSize: "13px",
                              }}
                              placeholder="**Type User**"
                              name="user"
                              onSelect={this.handleOnSelectUser}
                              value={this.state.user}
                            />
                          </div>

                          <CFormGroup className="form-actions">
                            <CButton
                              onClick={(e) => this.newGroupHandler(e)}
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
  // console.log("main map state", state);
  return {
    showCard: state.displayReducer.showCard,
    token: state.authReducer.token,
  };
};

export default connect(mapStateToProps)(
  withTranslation("translations")(newWorkOut)
);
