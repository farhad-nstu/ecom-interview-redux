import HttpService from './HttpService';
 
export const loadOrders = (page) => {
  let token = localStorage.getItem('user');
  let pager = 2;
  let ordersDataUrl; 
  if(page == "") {
    ordersDataUrl = "user/order/get-all/"+token+"/"+pager; 
  } else {
    ordersDataUrl = "user/order/get-all/"+token+"/"+pager+"?page="+page;
  }
  
  const http = new HttpService();
  return http.getData(ordersDataUrl).then((data) => {
    return data
  }).catch((error)=>{
    return error
  })  
}


export const loadSearchOrders = (search_content, page) => {
  let token = localStorage.getItem('user');
  let pager = 2;
  let ordersDataUrl; 
  if(page == "") {
    ordersDataUrl = "user/order/search/"+search_content+"/"+token+"/"+pager; 
  } else {
    ordersDataUrl = "user/order/search/"+search_content+"/"+token+"/"+pager+"?page="+page;
  }
  
  const http = new HttpService();
  return http.getData(ordersDataUrl).then((data) => {
    return data
  }).catch((error) => {
    return error
  })  
}

export const loadSingleData = (id) => {
  if(id == "") {

  } else {
    let getDataUrl = "user/single-order/"+id;
    const http = new HttpService();
    return http.getData(getDataUrl).then((data) => {
      return data
    }).catch((error) => {
      return error
    })
  }
}

export const editSingleData = (data, id) => {
  if(id == "") {

  } else {
    const http = new HttpService();
    let editDataUrl = "user/order/update/"+id;
    return http.postData(data, editDataUrl).then((data) => {
      return data;
    }).catch((error) => {
      return error; 
    });
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