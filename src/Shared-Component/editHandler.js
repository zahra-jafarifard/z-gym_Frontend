
export const editHandler =(item , pathName)=>{
    this.props.history.push({
      pathname:`/${pathName}/update`,
      state: { item: item , id:item.id }
    })
  }