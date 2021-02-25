import React , {Component} from 'react';
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
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const getBadge = status => {
  switch (status) {
    case 'فعال': return 'success'
    case 'غیرفعال': return 'secondary'
    case 'در انتظار': return 'warning'
    case 'مسدود': return 'danger'
    default: return 'primary'
  }
}
const fields = [{
  key: 'name',
  label: 'نام',
},
{
  key: 'show_details',
  label: '',
  _style: { width: '1%' },
  sorter: false,
  filter: false
}];

class Status extends Component {
  constructor(props){
    super(props);
    this.state = {
      statusState:[],
      collapsed:false,
      showCard:true,
      details:[],

      name:''
    }
  }

componentDidMount = ()=>{
  fetch('http://localhost:5000/user_status/list' , {
    method:'POST',
      headers:{
          'Content-Type': 'application/json'
      }
  })
  .then(res => {
    return res.json()
  })
  .then(result => {
    this.setState({
      statusState:result.statuses,
    } , ()=>{
      console.log(this.state.statusState);
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

searchHandler = (e)=>{
  e.preventDefault();
  fetch('http://localhost:5000/user_status/search' , {
    method:'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
      name:this.state.name
    })
  })
  .then(res => {
    return res.json();
  })
  .then(result => {
    this.setState({statusState:result.statuses  ,
    collapsed:false
    }, ()=> {
      console.log(this.state.statusState);
  });
  })
  .catch(e => {
    console.log(e);
  })
  
}
  editHandler =(event , index , item )=>{
    event.preventDefault();
    this.props.history.push({
      pathname:'/user_status/update',
      state: { item: item , id:index }
    })
  }

render(){
  const toggleDetails = (index) => {
    const position = this.state.details.indexOf(index)
    let newDetails = this.state.details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...this.state.details, index]
    }
    this.setState({details:newDetails})
  }
return (
<React.Fragment>
  <CLink to='/user_status/create'>
    <CButton  size="md" color="success">
    اضافه کردن وضعیت جدید 
    </CButton>
  </CLink>
<CRow>
  <CCol xs="12" sm="6" md="4" >
        <CFade in={this.state.showCard} >
          <CCard  style={{ width:"120%", marginRight:"0%", marginTop:"8%"}}>
            <CCardHeader >
            <CLink className="card-header-action" onClick={() => this.setState({collapsed:!this.state.collapsed}) }>
              <CIcon name="cil-search" />
              <span style={{marginRight:'5px'}}>جستجوی وضعیت</span>
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
                    <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput  name="name" placeholder="نام وضعیت " onChange={this.changeHandler}/>
                </CInputGroup>
              </CFormGroup>
              
              <CFormGroup className="form-actions">
                <CButton  onClick={(e)=>this.searchHandler(e)} block size="lg"  color="success">جستجو</CButton>
              </CFormGroup>
            </CForm>
              </CCardBody>
            </CCollapse>
          </CCard>
        </CFade>
      </CCol>
    </CRow>
    
    <CRow style={{width:"50rem"}}>
      <CCol>
        <CCard>
          <CCardHeader>
            جدول وضعیت ها
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={this.state.statusState.map(st => {
                return{
                    "name":st.status_name,
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
              'name':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.name)} style={{padding:"8px" , fontSize:"0.8rem"}}>
                      {item.name}
                    </CBadge>
                  </td>
                ),

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
                  <p className="text-muted">حذف / ویرایش وضعیت :</p>
                  <CButton style={{marginLeft:"5px"}} size="sm" color="info" onClick={(e)=>this.editHandler(e , index , item)}>
                    ویرایش
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1" onClick={(e)=>this.deleteHandler(e , index)}>
                    حذف
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          }
            }}
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </React.Fragment>
)
}
}

export default Status;
