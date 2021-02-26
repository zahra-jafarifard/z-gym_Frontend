import React , {Component} from 'react'
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
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { withTranslation } from "react-i18next";


class updateGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed:true,
      showCard:true,

      id:'',
      name:'',
      status:'',
    }
    }
    
      
  componentDidMount=() => {
    this.setState({
        id:this.props.location.state.id,
        name:this.props.location.state.item.name,
        status:this.props.location.state.item.status,
    })
  }

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name] : value });
  }
  goBackHandler = (e)=>{
    e.preventDefault();
    this.props.history.push('/user_group/list')
  }
  updateHandler =(e) => {
    e.preventDefault();
    fetch('http://localhost:5000/user_group/update' , {
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      id:this.props.location.state.id,
      name:this.state.name,
      status:this.state.status,
   })
  })
  .then(res => {
    return res.json();
  })
  .then(result => {
    console.log(' group updated...',result.message)
  })
  .catch(e => {
    console.log(e)
  })
  }
  render(){
  const { t, i18n } = this.props;

    return (
      <React.Fragment>
        <CCol xs="12" sm="6" md="4" style={{ margin:"auto"}} >
    <CCard borderColor="info" style={{width:'130%'}}>
      <CCardHeader >
        <CLink className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
          <CIcon name="cil-library-add"  />
          <span style={{marginRight:'5px'}}> {t('Edit')} </span>
          </CLink>
          <div className="card-header-actions">
            <CLink className="card-header-action" onClick={(e) => this.goBackHandler(e) }>
            {t('Back')}
              <CIcon name="cil-arrow-circle-left"  style={{marginRight:"3px"}} />
            </CLink>
            <CLink style={{marginRight:"13px"}} className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
              <CIcon name={this.state.collapsed ? 'cil-chevron-bottom':'cil-chevron-top'} />
            </CLink>
          </div>
        </CCardHeader>
      <CCardBody>
        
      <CRow >
  <CCol xs="12" sm="6" md="4"  style={{textAlign:"center"}} >
    <CFade in={this.state.showCard} >
        <CCollapse show={this.state.collapsed}>
          <CCardBody style={{width:'240%' , marginRight:"40%"}}>
        <CForm  >
        <CFormGroup >
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput  name="name"  value={this.state.name}
              onChange={this.changeHandler}/>
            </CInputGroup>
          </CFormGroup>

          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-group" /></CInputGroupText>
              </CInputGroupPrepend>
              <CSelect name="status" 
                onChange={this.changeHandler}>
              {this.state.status && 
              <option value={this.state.status} selected="selected" disabled hidden>{this.state.status} </option>
              }
              <option value='1' > فعال</option>
              <option  value='0'  > غیرفعال</option>
              </CSelect>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup className="form-actions">
            <CButton  onClick={(e)=>this.updateHandler(e)} block size="md"  color="success">
                {t('Update')}
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
    )
  }

}
    
export default  (withTranslation("translations")(updateGroup));
         