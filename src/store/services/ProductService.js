import HttpService from './HttpService';


export const addNewContact = (credentials) =>{
    const http = new HttpService();
    // console.log(HttpService);
    let newContact = "user/contact/add";
    credentials.token = localStorage.getItem('user');
    console.log(credentials)
    return http.postData(credentials,newContact).then((data)=>{
         console.log(data)
        console.log(JSON.stringify(data));
        return data;
    }).catch((error)=> {console.log(error)
        return error; 
         });
}
 

//contact/get-all/{token}/{pagination?}
//this function loads paginated contacts
export const loadProducts = (page) => {
  let token = localStorage.getItem('user');
  let pager = 2;
  let productsDataUrl ; 
  if(page == "") {
    productsDataUrl = "user/product/get-all/"+token+"/"+pager; 
  } else {
    productsDataUrl = "user/product/get-all/"+token+"/"+pager+"?page="+page;
  }
  
  const http = new HttpService();
  return http.getData(productsDataUrl).then((data) => {
    return data
  }).catch((error)=>{
    return error
  })  
}


export const loadSearchProducts = (search_content, page) => {
  let token = localStorage.getItem('user');
  let pager = 2;
  let productsDataUrl; 
  if(page == "") {
    productsDataUrl = "user/product/search/"+search_content+"/"+token+"/"+pager; 
  } else {
    productsDataUrl = "user/product/search/"+search_content+"/"+token+"/"+pager+"?page="+page;
  }
  
  const http = new HttpService();
  return http.getData(productsDataUrl).then((data) => {
    return data
  }).catch((error) => {
    console.log(error)
    return error
  })  
}

export const loadSingleData =(id) =>
{
if(id==""){

}else{
    let getDataUrl = "user/contact/get-single/"+id;
    const http = new HttpService();
    return http.getData(getDataUrl).then((data)=>{
        console.log(data);
        return data
    }).catch((error)=>{
        console.log(error);
        return error
    })
}

}



export const editSingleData = (data,id) =>
{
    if(id==""){

    }else
    {
      const http = new HttpService();
let editDataUrl = "user/contact/update/"+id;
return http.postData(data,editDataUrl).then((data)=>{
     console.log(data)
    console.log(JSON.stringify(data));
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
}
}

export const orderProduct = (id) =>
{
  const data = {};

  if(id == "") {

  } else {
    const http = new HttpService();
    let orderUrl = "user/product/order/"+id;

    return http.getData(orderUrl).then((data) => {
      return data;
    }).catch((error) => {
      return error; 
    });
  }
}



