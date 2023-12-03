export const fetchEnterprise = async () => {
  // console.log(window.localStorage.getItem("accessToken"));

 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/enterprise?userId=${window.localStorage.getItem("userId")}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "GET",
    }
  );  

  const data: Enterprise = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return data;
};
 
  

export const updateEnterprise = async (enterpriseData:Enterprise ) => {
  // console.log(window.localStorage.getItem("accessToken"));
 
 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/enterprise?userId=${window.localStorage.getItem("userId")}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "PATCH",
      body:JSON.stringify(enterpriseData)
    }
  );

  const data: Enterprise = await request.json();

 
  if (!request.ok) {
    return null;
  }

  return data;
};
 


export const updateEnterpriseLockFinance = async (value:boolean ) => {
  // console.log(window.localStorage.getItem("accessToken"));
 
 
 
  const request = await fetch(
    `${
      process.env.BASE_API_URL
    }/api/protected/enterprise?userId=${window.localStorage.getItem("userId")}&lockFinance=lockFinance`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: window.localStorage.getItem("accessToken"),
      },
      method: "PATCH",
      body:JSON.stringify({lockFinance:value})
    }
  );

  const data: Enterprise = await request.json();
 
 
  if (!request.ok) {
    return null;
  }

  return data;
};
 












export const uploadImageLogo = async (image: any,id:string) => {
 
  
  fetch(image)
  .then((res) => res.blob())
  .then(async (blob) => {
    const file = new File([blob], "logo.png", {
      type: "image/png",
    });
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", "logo-"+id);
    const res = await fetch(
      `${process.env.BASE_API_URL}/api/storagetest`,
      {
        body: formData,

        method: "POST",
      }
    );
    const data = await res.json();
  });
 

};


export const uploadImageSignature = async (image: any,id:string) => {
 
  
  fetch(image)
  .then((res) => res.blob())
  .then(async (blob) => {
    const file = new File([blob], "signature.png", {
      type: "image/png",
    });
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", "signature-"+id);
    const res = await fetch(
      `${process.env.BASE_API_URL}/api/storagetest`,
      {
        body: formData,

        method: "POST",
      }
    );
    const data = await res.json();
  });
 

};