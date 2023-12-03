export const fetchAllFolder = async (folderType: string,) => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/folder?userId=${window.localStorage.getItem("userId")}&folderType=${folderType}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: Folder[] = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
 
 

  export const addNewFolder = async (
    data:Folder
  ) => {
    
    
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/folder?userId=${window.localStorage.getItem(
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
  









  export const deleteFolder = async (folderId: string,) => {
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
   




  export const updateFolder = async (folderId: string,name:string) => {
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
   