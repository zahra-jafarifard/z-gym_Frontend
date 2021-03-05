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
  CTextarea,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { withTranslation } from "react-i18next";


class updateExercise extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed:true,
      showCard:true,
      categoryArray:[],

      id:'',
      name:'',
      description:'',
      icon:'',
      category:'',
    }
    }
    
  componentDidMount=() => {
    this.setState({
        id:this.props.location.state.id,
        name:this.props.location.state.item.name,
        description:this.props.location.state.item.description,
        icon:this.props.location.state.item.icon,
        category:this.props.location.state.item.category,
    })

    fetch(process.env.REACT_APP_API_ADDRESS + '/category/list' , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res =>{
        return res.json();
    })
    .then(result => {
        this.setState({categoryArray: result.categories }, 
        ()=>{console.log(this.state.categoryArray )})
    })
    .catch(e => {
      console.log(e);
    })
  }

  changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name] : value });
  }

  goBackHandler = (e)=>{
    e.preventDefault();
    this.props.history.push('/exercise/list')
  }
  
  updateHandler =(e) => {
      e.preventDefault();
      fetch(process.env.REACT_APP_API_ADDRESS + '/exercise/update' , {
      method:'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        id:this.props.location.state.id,
        name:this.state.name,
        description:this.state.description,
        icon:this.state.icon,
        category:this.state.category,
    })
  })
  .then(res => {
    return res.json();
  })
  .then(result => {
    console.log(' member updated...',result.message)
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
                <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput  name="name"  value={this.state.name}
              onChange={this.changeHandler}/>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroupPrepend>
            <CInputGroup>
              <CTextarea  name="description"  value={this.state.description}
                onChange={this.changeHandler} />
            </CInputGroup>
                </CInputGroupPrepend>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput   name="icon"  value={this.state.icon}
                autoComplete="username" onChange={this.changeHandler}/>
            </CInputGroup>
          </CFormGroup>
          
          <CFormGroup>
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
              </CInputGroupPrepend>
              <CSelect name='category' type='select'   onChange={this.changeHandler} >
              {/* <option value="" selected disabled hidden>گروه</option> */}
              {this.state.category && 
              <option  selected="selected" disabled hidden>{this.state.category}</option>
              }
                {this.state.categoryArray.map(opt =>{
                        return <option key={opt.id}  value={opt.id} >
                          {opt.category_name}
                            </option>
                    })
              }
            </CSelect>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup className="form-actions">
            <CButton  onClick={(e)=>this.updateHandler(e)} block  size="md"  color="success">
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
    
export default (withTranslation("translations")(updateExercise));
         