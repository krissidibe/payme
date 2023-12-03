export const fetchAllPlanningItem = async (planningId: string,) => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/planningitem?userId=${window.localStorage.getItem("userId")}&planningId=${planningId}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: PlanningItem[] = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
 
 
export const searchAllPlanningItem = async (search: string,) => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/planningitem?userId=${window.localStorage.getItem("userId")}&search=${search}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
 


export const fetchAllWeekPlanningItemDashboard = async (startAt,endAt) => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/planningitem?userId=${window.localStorage.getItem("userId")}&startAt=${startAt}&endAt=${endAt}&dashboard=dashboard`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
export const fetchAllWeekPlanningItem = async (startAt,endAt) => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/planningitem?userId=${window.localStorage.getItem("userId")}&startAt=${startAt}&endAt=${endAt}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
export const todayAllPlanningItem = async () => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/planningitem?userId=${window.localStorage.getItem("userId")}&today=today`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
 

export const todayDashboardAllPlanningItem = async () => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/planningitem?userId=${window.localStorage.getItem("userId")}&todayDashboard=todayDashboard`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
 
 

  export const addNewPlanningItem = async (
    planningId:string,
    data:PlanningItem
  ) => {
    
    
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/planningitem?userId=${window.localStorage.getItem(
        "userId"
      )}&planningId=${planningId}`,
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
  

  export const updatePlanningItem = async (
    planningItemId:string,
    data:PlanningItem
  ) => {
    
    
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/planningitem?userId=${window.localStorage.getItem(
        "userId"
      )}&planningItemId=${planningItemId}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "PATCH",
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
  


  export const togglePlanningItem = async (
    planningItemId:string,
    toggle:boolean
  ) => {
 

      
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/planningitem?userId=${window.localStorage.getItem(
        "userId"
      )}&planningItemId=${planningItemId}&toggle=${toggle}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "PATCH",
        
      }
    );

    
    
  
    const datas: any = await request;
    console.log(await datas.json());
  
    console.log(request);
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };
  


  export const archivePlanningItem = async (
    planningItemId:string,
    archive:boolean
  ) => {
 

      
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/planningitem?userId=${window.localStorage.getItem(
        "userId"
      )}&planningItemId=${planningItemId}&archive=${archive}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "PATCH",
        
      }
    );

    
    
  
    const datas: any = await request;
    console.log(await datas.json());
  
    console.log(request);
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };




  export const deletePlanningItem = async (planningItemId: string,) => {
    // console.log(window.localStorage.getItem("accessToken"));
  
   
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/planningitem?userId=${window.localStorage.getItem("userId")}&planningItemId=${planningItemId}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "DELETE",
      }
    );
  
    const datas: FolderUser[] = [];
  
   
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };
   