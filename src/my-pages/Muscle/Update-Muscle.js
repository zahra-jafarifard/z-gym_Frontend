import React , {Component} from 'react'
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
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { withTranslation } from "react-i18next";

class updateMuscle extends Component {
    constructor(props){
        super(props);
        this.state = {
          collapsed:true,
          showCard:true,

          id:'',
          name:'',
        }
      }
    
      
    componentDidMount=() => {
      // console.log('iteeeemmmm' ,this.props.location.state)
      this.setState({
          id:this.props.location.state.id,
          name:this.props.location.state.item.name,
      })
  
    }

    changeHandler = (event) => {
      let value = event.target.value;
      let name = event.target.name;
      this.setState({ [name] : value });
    }
    goBackHandler = (e)=>{
      e.preventDefault();
      this.props.history.push('/muscle/list')
    }
    updateHandler =(e) => {
        e.preventDefault();
        fetch('http://localhost:5000/muscle/update' , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          id:this.props.location.state.id,
          name:this.state.name,
      })
    })
    .then(response => {
      if (!response.ok){
        return new Error(response.statusText , response.status );
      // return console.log(response.statusText , response.status);

    }
    return response.json()    })
    .then(result => {
      console.log(result.message)
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
          <CCard borderColor="info" style={{width:'30rem'}}>
            <CCardHeader >
              <CLink className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
                <CIcon name="cil-library-add"  />
                <span style={{marginRight:'5px'}}>{t('Edit')}</span>
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
                <CCardBody style={{width:'20rem' , marginRight:"40%"}}>
                  
              <CForm  >
              <CFormGroup >
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput  name="name"  value={this.state.name}
                    onChange={this.changeHandler}/>
                  </CInputGroup>
                </CFormGroup>


                  
               
                
                <CFormGroup className="form-actions">
                  <CButton  onClick={(e)=>this.updateHandler(e)} block size="md" 
                   color="success">
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
    
export default (withTranslation("translations")(updateMuscle));
         