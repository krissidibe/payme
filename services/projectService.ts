export const fetchAllIsValideProject = async () => {
  // console.log(window.localStorage.getItem("accessToken"));

  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem("userId")}&isvalide`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: Project[] = await request.json();
 
  if (!request.ok) {
    return null;
  }

  return datas;
};


export const fetchAllProjectTrash = async () => {
  // console.log(window.localStorage.getItem("accessToken"));

  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem("userId")}&trash=trash`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: Project[] = await request.json();
 
  if (!request.ok) {
    return null;
  }

  return datas;
};


export const fetchAllProject = async (search,sortType,take,skip) => {
  // console.log(window.localStorage.getItem("accessToken"));
 
 

  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem("userId")}&search=${search}&sortType=${sortType}&take=${take}&skip=${skip}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: Project[] = await request.json();
  console.log(datas);

  console.log(request);
  if (!request.ok) {
    return null;
  }

  return datas;
};

export const fetchAllCustomerProject = async (customerId: string) => {
  // console.log(window.localStorage.getItem("accessToken"));

  const request = await fetch(
    `${process.env.BASE_API_URL}/api/protected/project?customerId=${customerId}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: Project[] = await request.json();
  console.log(datas);

  console.log(request);
  if (!request.ok) {
    return null;
  }

  return datas;
};

export const fetchOneCustomerProject = async (projectId: string) => {
  const request = await fetch(
    `${process.env.BASE_API_URL}/api/protected/project?projectId=${projectId}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: Project = await request.json();

  console.log(request);
  if (!request.ok) {
    return null;
  }

  return datas;
};

export const addNewProject = async (
  customerId: string,
  name: string,
  projectId?: string
) => {
  // console.log(window.localStorage.getItem("accessToken"));

  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem(
      "userId"
    )}&customerId=${customerId}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "POST",
      body: JSON.stringify({ name: name }),
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











export const saveInvoice = async (
 
  projectId: string,
  bodyData
) => {
   
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem(
      "userId"
    )}&projectId=${projectId}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "PATCH",
      body: JSON.stringify(bodyData),
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


export const updateProformaDate = async (
 
  projectId: string,
  proformaDate: Date,
) => {
 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem(
      "userId"
    )}&projectId=${projectId}&proformaDate=${proformaDate}`,
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



export const updateInvoiceDate = async (
 
  projectId: string,
  invoiceDate: Date,
) => {
 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem(
      "userId"
    )}&projectId=${projectId}&invoiceDate=${invoiceDate}`,
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



export const validateProforma = async (
 
  projectId: string,
) => {
   
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem(
      "userId"
    )}&projectId=${projectId}&validate=validate`,
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
export const finishProject = async (
 
  projectId: string,
) => {
   
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem(
      "userId"
    )}&projectId=${projectId}&finish=finish`,
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





export const deletProjectInTrash = async (
 
  projectId: string,
) => {
   
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem(
      "userId"
    )}&projectId=${projectId}`,
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


export const deleteAllProjectInTrash = async (
 
  
) => {
   
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem(
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




export const outTrashProject = async (
 
  projectId: string,
) => {
   
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/project?userId=${window.localStorage.getItem(
      "userId"
    )}&projectId=${projectId}&outtrash=outtrash`,
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






export const  updateNameProject = async (projectId:string,name:string)=>{
   
   
    
  const request = await fetch(`${process.env.BASE_API_URL}/api/protected/project?userId=${window.localStorage.getItem("userId")}&projectId=${projectId}&name=${name}`, {
    headers: {
     
      "Content-type": "application/json",
      "Authorization" : window.localStorage.getItem("accessToken")
    },
    method: "PATCH",
  
  });

  const datas:Project = await request.json();

  console.log(request);
 if(!request.ok){
return null;
 }
  
  return datas;
}
