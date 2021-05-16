import React, { Component } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CCollapse,
  CLink,
  CButton,
  CFade,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import * as displayAction from "../../store/actions/index";
import Modal from '.././UI Components/Modal'


class GymType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],
      
      gymTypeState: [],
      id:'',
      name: "",
    };
  }
 
  componentDidMount = () => {
   
    fetch(process.env.REACT_APP_API_ADDRESS + "/gymType/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(response.statusText, response.status);
        }
        return response.json();
      })
      .then((result) => {
        // console.log("reeeeees", result.gymsTypes);
        this.setState(
          {
            gymTypeState: result.gymsTypes,
          },
          () => {
            // console.log(this.state.gymTypeState);
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

  searchHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ADDRESS + "/gymType/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token,
      },
      body: JSON.stringify({
        name: this.state.name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(response.statusText, response.status);
        }
        return response.json();
      })
      .then((result) => {
        // console.log('reeeeees' ,result.gTypes );
        this.setState({ gymTypeState: result.gTypes });
        this.props.onCollapsedFalse();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  editHandler = (event, item) => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/gymType/update",
      state: { idItem: item.id },
    });
  };

  delHandler = (event , id) => {
    event.preventDefault();
       this.setState({id:id})
    this.props.onDeleteModal(true);
  };

  
  render() {
    const { t, i18n } = this.props;
    const fields = [
      {
        key: "name",
        label: t("Name"),
      },
      {
        key: "show_details",
        label: "",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
    ];

    const toggleDetails = (index) => {
      const position = this.state.details.indexOf(index);
      let newDetails = this.state.details.slice();
      if (position !== -1) {
        newDetails.splice(position, 1);
      } else {
        newDetails = [...this.state.details, index];
      }
      this.setState({ details: newDetails });
    };
    return (
      
      <React.Fragment>

      {
        this.props.deleteModal &&
         <Modal  token={this.props.token} 
         item={document.getElementById('hiddenId_' + this.state.id).value} 
         name="gymType" />
         }

        <CLink to="/gymType/create">
          <CButton size="md" color="success">
            {t("Add New")}
          </CButton>
        </CLink>
        <CRow>
          <CCol xs="12" sm="6" md="4">
            <CFade in={this.props.showCard}>
              <CCard
                style={{ width: "80%", marginRight: "0%", marginTop: "8%" }}
              >
                <CCardHeader>
                  <CLink
                    className="card-header-action"
                    onClick={() => this.props.onCollapsedToggle()}
                  >
                    <CIcon name="cil-search" />
                    <span style={{ marginRight: "5px" }}>{t("Search")}</span>
                  </CLink>
                  <div className="card-header-actions">
                    <CLink
                      className="card-header-action"
                      onClick={() => this.props.onCollapsedToggle()}
                    >
                      <CIcon
                        name={
                          this.props.collapsed
                            ? "cil-chevron-bottom"
                            : "cil-chevron-top"
                        }
                      />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={this.props.collapsed}>
                  <CCardBody>
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
                          onClick={(e) => this.searchHandler(e)}
                          block
                          size="lg"
                          color="success"
                        >
                          {t("Search")}
                        </CButton>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCollapse>
              </CCard>
            </CFade>
          </CCol>
        </CRow>

        <CRow style={{ width: "90rem" }}>
          <CCol>
            <CCard style={{ width: "40%" }}>
              <CCardHeader>{t("GymTypes")}</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.gymTypeState.map((gT) => {
                    return {
                      id: gT.id,
                      name: gT.name,
                    };
                  })}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="lg"
                  itemsPerPage={5}
                  pagination
                  scopedSlots={{
                    show_details: (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              toggleDetails(index);
                            }}
                          >
                            {this.state.details.includes(index)
                              ? "Hide"
                              : "Show"}
                          </CButton>
                        </td>
                      );
                    },
                    details: (item, index) => {
                      return (
                        <CCollapse show={this.state.details.includes(index)}>
                          <CCardBody>
                            <h4>
                              {item.name} 
                            </h4>
                            <p className="text-muted">
                              {t("Edit")} / {t("Delete")}
                            </p>
                            <input type='hidden' id={`hiddenId_${item.id}`} 
                            value={item.id} />
                            <CButton
                              style={{ marginLeft: "5px" }}
                              size="sm"
                              color="info"
                              onClick={(e) => this.editHandler(e, item)}
                            >
                              {t("Edit")}
                            </CButton>
                            <CButton
                              size="sm"
                              color="danger"
                              className="ml-1"
                              onClick={(e) => this.delHandler(e , item.id)}
                            >
                              {t("Delete")}
                            </CButton>
                          </CCardBody>
                        </CCollapse>
                      );
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </React.Fragment>
    
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("gTypes map state", state);
  return {
    token: state.authReducer.token,
    showCard: state.displayReducer.showCard,
    collapsed: state.displayReducer.collapsed,
    deleteModal:state.displayReducer.deleteModal
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCollapsedToggle: () => {
      dispatch(displayAction.collapsedToggle());
    },
    onCollapsedFalse: () => {
      dispatch(displayAction.collapsedFalse());
    },
    onDeleteModal: (val) => {
      dispatch(displayAction.deleteModal(val));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translations")(GymType));
