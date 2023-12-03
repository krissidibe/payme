export const fetchAllTransaction = async () => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/transaction?userId=${window.localStorage.getItem("userId")}&date=date`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: Transaction[] = await request.json();


 
  if (!request.ok) {
    return null;
  }

  return datas;
};


export const fetchAllTransactionInterval = async (startAt,endAt) => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/transaction?userId=${window.localStorage.getItem("userId")}&startAt=${startAt}&endAt=${endAt}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: Transaction[] = await request.json();


 
  if (!request.ok) {
    return null;
  }

  return datas;
};
 
 


 

  export const addNewTransation = async (
    projectId: string,
    data:Transaction
  ) => {
    
    // console.log(window.localStorage.getItem("accessToken"));
    const dataTransValue:Transaction = {
      client:data.client,
      projectName:data.projectName,
      amountTotal:data.amountTotal,
      taxe:data.taxe,
      type:data.type,
    }
 
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/transaction?userId=${window.localStorage.getItem(
        "userId"
      )}&projectId=${projectId}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "POST",
        body: JSON.stringify(dataTransValue),
      }
    );
  
    const datas: any = await request;
    console.log(datas);
  
    console.log(request);
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };
  