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

class newExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryArray: [],
      name: "",
      description: "",
      image: null,
      preview: null,
      category: "",
    };
  }

  componentDidMount = () => {
    fetch(process.env.REACT_APP_API_ADDRESS + "/category/list", {
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
        console.log("response cat", result.categories);
        this.setState({ categoryArray: result.categories }, () => {
          console.log(this.state.categoryArray);
        });
      });
  };

  fileHandler = (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.setState({ image: file, preview: fileReader.result }, () => {
        console.log("state file front", this.state.image);
      });
    };
    fileReader.readAsDataURL(file);
  };
  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  };
  goBackHandler = (e) => {
    e.preventDefault();
    this.props.history.push("/exercise/list");
  };
  newExerciseHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    formData.append("category", this.state.category);
    formData.append("image", this.state.image);
    fetch(process.env.REACT_APP_API_ADDRESS + "/exercise/create", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
      body: formData,
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
        this.props.history.push("/exercise/list");

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
                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-chevron-double-left" />
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
                              <img
                                src={this.state.preview}
                                style={{
                                  width: "130px",
                                  marginRight: "4rem",
                                  border: "solid silver 1px",
                                  height: "130px",
                                }}
                                alt="preview"
                              />
                            </CInputGroup>
                          </CFormGroup>
                          <CFormGroup>
                            <CInputGroup>
                              <input
                                type="file"
                                name="image"
                                onChange={this.fileHandler}
                              />
                            </CInputGroup>
                          </CFormGroup>

                          <CFormGroup>
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-chevron-double-left" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CSelect
                                name="category"
                                type="select"
                                onChange={this.changeHandler}
                              >
                                <option>Category</option>
                                {this.state.categoryArray.map((opt) => {
                                  return (
                                    <option key={opt.id} value={opt.id}>
                                      {opt.category_name}
                                    </option>
                                  );
                                })}
                              </CSelect>
                            </CInputGroup>
                          </CFormGroup>

                          <CFormGroup className="form-actions">
                            <CButton
                              onClick={(e) => this.newExerciseHandler(e)}
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
    token: state.authReducer.token,
    showCard: state.displayReducer.showCard,
  };
};

export default connect(mapStateToProps)(
  withTranslation("translations")(newExercise)
);
