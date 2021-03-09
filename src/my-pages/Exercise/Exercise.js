import React , {Component} from 'react';
import {
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
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { withTranslation } from "react-i18next";
import {deleteHandler} from '../../Shared-Component/deleteHandler';



class Exercise extends Component {
  constructor(props){
    super(props);
    this.state = {
      exerciseState:[],
      collapsed:false,
      showCard:true,
      details:[],

      name:'',
      description:'',
      preview:''
      // category:'',
    }
  }

componentDidMount = ()=>{
  fetch(process.env.REACT_APP_API_ADDRESS + '/exercise/list' , {
    method:'POST',
      headers:{
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
    if(!response.ok){
      return new Error(response.statusText , response.status);
    }
    else{
      return response.json()
    }
  })
  .then(result => {
    this.setState({
      exerciseState:result.exercises,
    } , ()=>{
      console.log(this.state.exerciseState);
  })

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

editHandler =(event , index , item )=>{
  event.preventDefault();
  this.props.history.push({
    pathname:'/exercise/update',
    state: { item: item , id:index }
  })
}
delHandler =(event , item)=>{
  event.preventDefault();
  deleteHandler(item , 'exercise');
}
searchHandler = (e)=>{
  e.preventDefault();
  fetch(process.env.REACT_APP_API_ADDRESS + '/exercise/search' , {
    method:'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
      name:this.state.name,
      description:this.state.description,
      // category:this.state.category
    })
  })
  .then(response => {
    if(!response.ok){
      return new Error(response.statusText , response.status);
    }
    else{
      return response.json()
    }
  })
  .then(result => {
    this.setState({exerciseState:result.exercises  ,
    collapsed:false
    }, ()=> {
      console.log(this.state.exerciseState);
  });
  })
  .catch(e => {
    console.log(e);
  })
  
}
render(){
  const { t, i18n } = this.props;
  const fields = [
    {
      key: 'id',
      label: t('Id'),
    },
    {
      key: 'name',
      label: t('Name'),
    },
     {
      key: 'description',
      label: t('Description'),
    },
     {
      key: 'show-icon',
      label: t('Icon'),
      
    },
     {
      key: 'category',
      label: t('Category'),
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
    ];
    

  const toggleDetails = (index) => {
    const position = this.state.details.indexOf(index)
    let newDetails = this.state.details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...this.state.details, index]
    }
    this.setState({details:newDetails})}
  
return (
<React.Fragment>
  
  <CLink to='/exercise/create'>
    <CButton  size="md" color="success">
   {t('Add New')}
    </CButton>
  </CLink>
<CRow>
  <CCol xs="12" sm="6" md="4" >
        <CFade in={this.state.showCard} >
          <CCard  style={{  marginRight:"0%", marginTop:"8%"}}>
            <CCardHeader >
            <CLink className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
              <CIcon name="cil-search" />
              <span style={{marginRight:'5px'}}> {t('Search')} </span>
              </CLink>
              <div className="card-header-actions">
                <CLink className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
                  <CIcon name={this.state.collapsed ? 'cil-chevron-bottom':'cil-chevron-top'} />
                </CLink>
              </div>
            </CCardHeader>
            <CCollapse show={this.state.collapsed}>
              <CCardBody>
                
            <CForm  >
              <CFormGroup >
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput  name="name" placeholder={t('Name')} onChange={this.changeHandler}/>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup >
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText><CIcon name="cil-chevron-double-left" /></CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput  name="description" placeholder={t('Description')} onChange={this.changeHandler}/>
                </CInputGroup>
              </CFormGroup>
              
              <CFormGroup className="form-actions">
                <CButton  onClick={(e)=>this.searchHandler(e)} block size="lg"  color="success"> {t('Search')} </CButton>
              </CFormGroup>
            </CForm>
              </CCardBody>
            </CCollapse>
          </CCard>
        </CFade>
      </CCol>
    </CRow>
    
    <CRow style={{width:"60rem"}}>
      <CCol >
        <CCard >
          <CCardHeader>
            {t('Exercises')}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={this.state.exerciseState.map(exr => {
                return{
                    "id":exr.id,
                    "name":exr.name,
                    "description":exr.description,
                    "icon":exr.icon ,
                    "category":exr.category.category_name
                }
            })}
            fields={fields}
            hover
            striped
            bordered
            size="lg"
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'show_details':
              (item, index)=>{
                return (
              <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={()=>{toggleDetails(index)}}
              >
                {this.state.details.includes(index) ? 'Hide' : 'Show'}
              </CButton>
            </td>
            )
        },
      'details':
          (item, index)=>{
            return (
            <CCollapse show={this.state.details.includes(index)}>
              <CCardBody>
                <h4>
                  {item.name}{' '}{item.lastName}
                </h4>
                <p className="text-muted"> {t('Edit/Delete')} </p>
                <CButton style={{marginLeft:"5px"}} size="sm" color="info" 
                onClick={(e)=>this.editHandler(e , index , item)}>
                {t('Edit')}
                </CButton>
                <CButton size="sm" color="danger" className="ml-1" 
                onClick={(e)=>this.delHandler(e , item)}>
                {t('Delete')}
                </CButton>
              </CCardBody>
            </CCollapse>
          )
        },
      'show-icon':
          (item, index)=>{
            return (
              <CCardBody>
                      <img style={{width:"50px" , height:"40px"}} 
                    src={`http://localhost:5000/${item.icon}`} alt='preview'/> 
                
              </CCardBody>
          )
        },
            }}
            
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </React.Fragment>
)}
}

export default (withTranslation("translations")(Exercise));
