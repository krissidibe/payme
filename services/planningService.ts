export const fetchAllPlanning = async () => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/planning?userId=${window.localStorage.getItem("userId")}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: Planning[] = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
 
 

  export const addNewPlanning = async (
    data:Planning
  ) => {
   
    
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/planning?userId=${window.localStorage.getItem(
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
  
    const datas: any = await request;
    console.log(datas);
  
    console.log(request);
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };
  









  export const deletePlanning = async (planningId: string,) => {
    // console.log(window.localStorage.getItem("accessToken"));
  
   
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/planning?userId=${window.localStorage.getItem("userId")}&planningId=${planningId}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "DELETE",
      }
    );
  
    const datas: Planning[] = [];
  
   
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };
   




  export const updatePlanning = async (planningId: string,name:string,color:string) => {

   const col = color.toString().replace("bg-","")
   console.log(col);
   
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/planning?userId=${window.localStorage.getItem("userId")}&planningId=${planningId}&name=${name}&color=${col}`,
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
   