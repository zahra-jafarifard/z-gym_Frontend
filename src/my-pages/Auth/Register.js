import React , {Component} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLink,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { withTranslation } from "react-i18next";


class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed:false,
      showCard:true,

      name:'',
      lastName:'',
      mobile:'',
      gender:'',
      birthDay:'',
      weight:'',
      height:'',
      password:'',
      repeatPassword:''
    }
  }

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name] : value });
  }
  newAccountHandler=(e)=>{
    e.preventDefault();
    fetch('http://localhost:5000/register' , {
      method:'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name:this.state.name,
        lastName:this.state.lastName,
        mobile:this.state.mobile,
        password:this.state.password,
        repeatPassword:this.state.repeatPassword,
        birthDay:this.state.birthDay,
        weight:this.state.weight,
        height:this.state.height,
        gender:this.state.gender,
    })
  })
  .then(res => {
    return res.json();
  })
  .then(result => {
    console.log('new member created...',result.user)
  })
  .catch(e => {
    console.log(e)
  })
  }
  render(){ 
  const { t, i18n } = this.props;

  return (
    <div className="c-app c-default-layout flex-row align-items-center" >
       <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1> {t('Register')} </h1>
                  <p className="text-muted"><strong> {t('Create New Account')} </strong></p>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name='name' placeholder={t('Name')} onChange={this.changeHandler} autoComplete="نام" />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                      <CIcon size="sm" name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text"  name='lastName' placeholder={t('Last Name')} onChange={this.changeHandler} autoComplete="فامیلی" />
                  </CInputGroup>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                      <CIcon name="cil-mobile" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text"  name='mobile' placeholder={t('Mobile')} onChange={this.changeHandler} autoComplete="موبایل" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                      <CIcon name="cil-group" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text"  name='gender' placeholder={t('Gender')} onChange={this.changeHandler} autoComplete="جنسیت" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                      <CIcon name="cil-birthday-cake" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text"  name='birthDay' placeholder={t('BirthDay')} onChange={this.changeHandler} autoComplete="تاریخ تولد" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                      <CIcon name="cil-chevron-double-left" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text"  name='height' placeholder={t('Height')} onChange={this.changeHandler} autoComplete="قد" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                      <CIcon name="cil-chevron-double-left" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text"  name='weight' placeholder={t('Weight')} onChange={this.changeHandler} autoComplete="وزن" />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password"  name='password' placeholder={t('Password')} onChange={this.changeHandler} autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name='repeatPassword' placeholder={t('Repeat Password')} onChange={this.changeHandler} autoComplete="new-password" />
                  </CInputGroup>
                  <CButton color="success" onClick={(e)=>{this.newAccountHandler(e)}} size='lg' block> {t('Create New Account')} </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span> {t('Facebook')} </span><CIcon style={{marginTop:"-0.5px" }} name="cib-facebook" /></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span> {t('Twitter')} </span><CIcon style={{marginTop:"-0.5px" }} name="cib-twitter" /></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
  }
}

export default (withTranslation("translations")(Register));
