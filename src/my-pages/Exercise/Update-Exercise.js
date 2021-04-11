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
  CTextarea,
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

class updateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryArray: [],
      id: "",
      name: "",
      description: "",
      image: null,
      preview: null,
      category: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      id: this.props.location.state.id,
      name: this.props.location.state.item.name,
      description: this.props.location.state.item.description,
      preview: this.props.location.state.item.icon,
      category: this.props.location.state.item.category,
    });

    fetch(process.env.REACT_APP_API_ADDRESS + "/category/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        this.setState({ categoryArray: result.categories }, () => {
          console.log(this.state.categoryArray);
        });
      })
      .catch((e) => {
        console.log(e);
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

  updateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", this.props.location.state.id);
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    formData.append("image", this.state.image);
    formData.append("category", this.state.category);
    fetch(process.env.REACT_APP_API_ADDRESS + "/exercise/update", {
      method: "POST",
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
        console.log(result.message);
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
                                  <CIcon name="cil-chevron-double-left" />
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
                            <CInputGroupPrepend>
                              <CInputGroup>
                                <CTextarea
                                  name="description"
                                  value={this.state.description}
                                  onChange={this.changeHandler}
                                />
                              </CInputGroup>
                            </CInputGroupPrepend>
                          </CFormGroup>

                          <CFormGroup>
                            <CInputGroup>
                              {this.state.preview ? (
                                <img
                                  name="preview"
                                  src={
                                    "http://localhost:5000/" +
                                    this.state.preview
                                  }
                                  style={{
                                    width: "130px",
                                    marginRight: "4rem",
                                    border: "solid silver 1px",
                                    height: "130px",
                                  }}
                                  alt="preview"
                                />
                              ) : (
                                <img
                                  name="preview"
                                  src={
                                    "http://localhost:5000/" + this.state.image
                                  }
                                  style={{
                                    width: "130px",
                                    marginRight: "4rem",
                                    border: "solid silver 1px",
                                    height: "130px",
                                  }}
                                  alt="image"
                                />
                              )}
                            </CInputGroup>
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
                                {/* <option value="" selected disabled hidden>گروه</option> */}
                                {this.state.category && (
                                  <option selected="selected" disabled hidden>
                                    {this.state.category}
                                  </option>
                                )}
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
  console.log("main map state", state);
  return {
    showCard: state.showCard,
  };
};

export default connect(mapStateToProps)(
  withTranslation("translations")(updateExercise)
);
