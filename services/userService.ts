export const fetchUser = async () => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/user?userId=${window.localStorage.getItem("userId")}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );

  const data: any = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return data;
};
 
  

export const updateUser = async (userData:User ) => {
  // console.log(window.localStorage.getItem("accessToken"));
 
 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/user?userId=${window.localStorage.getItem("userId")}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "PATCH",
      body:JSON.stringify(userData)
    }
  );

  const data: User = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return data;
};
 

export const updateUserPassword = async (newPassword:string ) => {
  // console.log(window.localStorage.getItem("accessToken"));
 
 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/user?userId=${window.localStorage.getItem("userId")}&newPassword`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "PATCH",
      body:JSON.stringify({newPassword:newPassword})
    }
  );

  const data: User = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return data;
};
 