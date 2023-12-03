export const fetchAllFolderUser = async (folderId: string,) => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/folderuser?userId=${window.localStorage.getItem("userId")}&folderId=${folderId}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const datas: FolderUser[] = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return datas;
};
 
 

  export const addNewFolderUser = async (
    folderId:string,
    data:FolderUser
  ) => {
    
    
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/folderuser?userId=${window.localStorage.getItem(
        "userId"
      )}&folderId=${folderId}`,
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
  

  export const editFolderUser = async (
    folderUserId:string,
    data:FolderUser
  ) => {
    
    
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/folderuser?userId=${window.localStorage.getItem(
        "userId"
      )}&folderUserId=${folderUserId}`,
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
  





  export const deleteFolderUser = async (folderUserId: string,) => {
    // console.log(window.localStorage.getItem("accessToken"));
  
   
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/protected/folderuser?userId=${window.localStorage.getItem("userId")}&folderUserId=${folderUserId}`,
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
   