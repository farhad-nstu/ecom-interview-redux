import HttpService from './HttpService';

export const loadProducts = (page) => {
  let token = localStorage.getItem('user');
  let pager = 12;
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
  let pager = 12;
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
    return error
  })  
}

export const loadFilterProducts = (filter_product, page) => {
  let token = localStorage.getItem('user');
  let pager = 12;
  let filterDataUrl; 
  if(page == "") {
    filterDataUrl = "user/product/filter/"+filter_product+"/"+token+"/"+pager; 
  } else {
    filterDataUrl = "user/product/filter/"+filter_product+"/"+token+"/"+pager+"?page="+page;
  }
  
  const http = new HttpService();
  return http.getData(filterDataUrl).then((data) => {
    return data
  }).catch((error) => {
    return error
  })  
}

export const loadSingleData = (id) => {
  if(id == "") {

  } else {
    let getDataUrl = "user/product-details/"+id;
    const http = new HttpService();
    return http.getData(getDataUrl).then((data) => {
      return data
    }).catch((error) => {
      return error
    })
  }
}

export const orderProduct = (data, id) => {

  let token = localStorage.getItem('user');

  if(id == "") {

  } else {
    const http = new HttpService();
    let orderUrl = "user/product/order/"+id+"/"+token;

    return http.postData(data, orderUrl).then((data) => {
      return data;
    }).catch((error) => {
      return error; 
    });
  }

}



