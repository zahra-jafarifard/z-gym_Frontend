import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CInputGroup
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { withTranslation } from "react-i18next";

class ForgetPasswordModal extends Component {
    constructor(props){
        super(props);
        this.state ={
            mobile:''
        }
    }

    
    
    resetPassHandler = (e) =>{

      fetch('http://localhost:5000/resetPassword' , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          mobile:this.state.mobile 
      })
    })
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log('rndnum',result.rndNumber ,'rest token', result.resetToken);
      this.props.history.push('/reset-password');
      
    })
    .catch(e => {
      console.log(e)
    })
    }
   

    render(){ 
  const { t, i18n } = this.props;

    return (
   
           
      <CCol xs="12" sm="6" md="4" >
          <CCard borderColor="danger" style={{width:'200%'}}>
            <CCardHeader>
            {t('Forget Password')}
            </CCardHeader>
            <CCardBody>
              
              <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                      <CInputGroupText>
                          <CIcon name="cil-Mobile" />
                        </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder={t('Mobile')} name="mobile" onChange={(e)=>this.setState({mobile:e.target.value})}  />
              </CInputGroup>
              <CButton  color="primary" onClick={(e) =>this.resetPassHandler(e)}>
                   {t('Reset Password')}
                 </CButton>
                 
            </CCardBody>
          </CCard>
        </CCol>
      
      
      
    

            
  )}
}

export default (withTranslation("translations")(ForgetPasswordModal));
