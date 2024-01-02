 export const fetchAllCategories = async () => {
   

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/category?userId=${window.localStorage.getItem("userId")}}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: any[] = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
 export const fetchAllInvoices = async () => {
   

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/invoice?userId=${window.localStorage.getItem("userId")}}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: any[] = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
   
 
export const updateInvoice = async (
  data:any
) => {
  

 

 

  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/invoice?userId=${window.localStorage.getItem(
      "userId"
    )}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );

  const datas: any = await request.json();


  if (!request.ok) {
    return null;
  }

  return datas;
};

 









/*   export const deleteFolder = async (folderId: string,) => {
    // console.log(window.localStorage.getItem("accessToken"));
  
   
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/folder?userId=${window.localStorage.getItem("userId")}&folderId=${folderId}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "DELETE",
      }
    );
  
    const datas: Folder[] = [];
  
   
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };
    */




 /*  export const updateFolder = async (folderId: string,name:string) => {

    // console.log(window.localStorage.getItem("accessToken"));
  
   
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/folder?userId=${window.localStorage.getItem("userId")}&folderId=${folderId}&name=${name}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "PATCH",
      }
    );
  
    const datas: Folder[] = [];
  
   
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };
    */

  /* 

  export const addNewPayment = async (
    data:Payment
  ) => {
    
  
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/payment?userId=${window.localStorage.getItem(
        "userId"
      )}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  
    const datas: any = await request.json();
 
 
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };
  






  export const updatePaymentStartDate = async (
 
    subscribeId: string,
    date: Date,
  ) => {
  
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/subscribe?userId=${window.localStorage.getItem(
        "userId"
      )}&subscribeId=${subscribeId}&startAt=${date}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "PATCH",
       
      }
    );
  
    const datas: any = await request.json();
    console.log(datas);
  
    console.log(request);
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };
  export const updatePaymentEndDate = async (
 
    subscribeId: string,
    date: Date,
  ) => {
   
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/subscribe?userId=${window.localStorage.getItem(
        "userId"
      )}&subscribeId=${subscribeId}&endAt=${date}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "PATCH",
       
      }
    );
  
    const datas: any = await request.json();
    console.log(datas);
  
    console.log(request);
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };
   */