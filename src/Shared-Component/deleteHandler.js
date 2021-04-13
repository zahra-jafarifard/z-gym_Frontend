export const deleteHandler = (token , item , name) => {
    fetch(process.env.REACT_APP_API_ADDRESS + `/${name}/delete` , {
        method:'POST',
          headers:{
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token 
          },
          body:JSON.stringify({
            id:item.id
          })
      })
      .then(response =>{
        if(!response.ok){
          return new Error(response.statusText , response.status);
        }
        else{
          return response.json()
        }
      })
      .then(result => {
        console.log('frontend',result.message)
    
      })
      .catch(e => {
        console.log(e);
      })
}

