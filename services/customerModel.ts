export const  fetchAllCustomer = async (last?:string)=>{
   // console.log(window.localStorage.getItem("accessToken"));
   
    
    const request = await fetch(`${process.env.BASE_API_URL}/api/protected/customer?userId=${window.localStorage.getItem("userId")}&${last}`, {
      headers: {
       
        "Content-type": "application/json",
        "Authorization" : window.localStorage.getItem("accessToken")
      },
      method: "GET",
    
    });

    const datas:Customer[] = await request.json();

    console.log(request);
   if(!request.ok){
return null;
   }
    
    return datas;
  }
export const  fetchAllCustomerTrash = async ()=>{
   // console.log(window.localStorage.getItem("accessToken"));
   
    
    const request = await fetch(`${process.env.BASE_API_URL}/api/protected/customer?userId=${window.localStorage.getItem("userId")}&trash=trash`, {
      headers: {
       
        "Content-type": "application/json",
        "Authorization" : window.localStorage.getItem("accessToken")
      },
      method: "GET",
    
    });

    const datas:Customer[] = await request.json();

    console.log(request);
   if(!request.ok){
return null;
   }
    
    return datas;
  }







export const outTrashCustomer = async (
 
  customerId: string,
) => {
 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/customer?userId=${window.localStorage.getItem(
      "userId"
    )}&customerId=${customerId}&outtrash=outtrash`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "PATCH",
     
    }
  );

   
  const datas = await request.json();
  console.log(datas);

  console.log(request);
  if (!request.ok) {
    return null;
  }

  return datas;
};






export const deleteAllCustomerInTrash = async (
 
  
) => {
 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/customer?userId=${window.localStorage.getItem(
      "userId"
    )}&deleteall=deleteall`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "DELETE",
     
    }
  );

   
   
  console.log(request);
  if (!request.ok) {
    return null;
  }

 
};

export const deleteCustomerInTrash = async (
 
  customerId: string,
) => {
 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/customer?userId=${window.localStorage.getItem(
      "userId"
    )}&customerId=${customerId}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "DELETE",
     
    }
  );

   
   
  console.log(request);
  if (!request.ok) {
    return null;
  }

 
};







export const intrashProject = async (
 
  projectId: string,
) => {
   
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem(
      "userId"
    )}&projectId=${projectId}&intrash=intrash`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "PATCH",
     
    }
  );

  const datas: Project = await request.json();
  console.log(datas);

  console.log(request);
  if (!request.ok) {
    return null;
  }

  return datas;
};

