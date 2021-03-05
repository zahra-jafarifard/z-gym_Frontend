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
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { withTranslation } from "react-i18next";


class newGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
          collapsed:true,
          showCard:true,
    
          name:'',
          status:'',
          
        }
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
    newGroupHandler =(e) => {
        e.preventDefault();
        fetch(process.env.REACT_APP_API_ADDRESS + '/user_group/create' , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            groupName:this.state.name,
            groupSatus:this.state.status
      })
    })
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log('frontend:::',result.message)
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
                <span style={{marginRight:'5px'}}> {t('Add New')} </span>
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
                    <CInput  name="name" placeholder={t('Name')} onChange={this.changeHandler}/>
                  </CInputGroup>
                </CFormGroup>
              
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect name="status"  onChange={this.changeHandler}>
                    <option value ="" selected disabled hidden>{t('Status')}</option>
                      <option  value= "1" >فعال</option>
                      <option value="0" >غیرفعال</option>
                    </CSelect>
                  </CInputGroup>
                </CFormGroup>
               
                <CFormGroup className="form-actions">
                  <CButton  onClick={(e)=>this.newGroupHandler(e)} block size="md"  color="success">
                  {t('Insert')}
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
    
export default (withTranslation("translations")(newGroup));
         