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
  CRow,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react';

class updateCategory extends Component {
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
    this.props.history.push('/equipment/list')
  }
  updateHandler =(e) => {
      e.preventDefault();
      fetch('http://localhost:5000/equipment/update' , {
      method:'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        id:this.props.location.state.id,
        name:this.state.name,
    })
  })
  .then(res => {
    return res.json();
  })
  .then(result => {
    console.log(result.message)
  })
  .catch(e => {
    console.log(e)
  })
  }
  render(){
    return (
      <React.Fragment>
        <CCol xs="12" sm="6" md="4" style={{ margin:"auto" }} >
    <CCard borderColor="info" style={{width:'25rem'}}>
      <CCardHeader >
        <CLink className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
          <CIcon name="cil-library-add"  />
          <span style={{marginRight:'5px'}}>ویرایش  تجهیزات</span>
          </CLink>
          <div className="card-header-actions">
            <CLink className="card-header-action" onClick={(e) => this.goBackHandler(e) }>
                بازگشت
              <CIcon name="cil-arrow-circle-left"  style={{marginRight:"3px"}} />
            </CLink>
            <CLink style={{marginRight:"13px"}} className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
              <CIcon name={this.state.collapsed ? 'cil-chevron-bottom':'cil-chevron-top'} />
            </CLink>
          </div>
        </CCardHeader>

      <CCardBody style={{width:'70rem' , marginRight:"3%"}} >
        
      <CRow >
  <CCol xs="12" sm="6" md="4"   >
    <CFade in={this.state.showCard} >
        <CCollapse show={this.state.collapsed}>
          <CCardBody >
            
        <CForm  >
        <CFormGroup >
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
              </CInputGroupPrepend>
              <CInput  name="name" placeholder=" نام وسیله" value={this.state.name}
              onChange={this.changeHandler}/>
            </CInputGroup>
          </CFormGroup>


            
          
          
          <CFormGroup className="form-actions">
            <CButton  onClick={(e)=>this.updateHandler(e)} block size="md"  color="success">
                ویرایش
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
    
export default updateCategory;
         