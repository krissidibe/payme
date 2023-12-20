export const sendCodeOTP = async (
    email:string
  ) => {
    
    
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/codeotp?email=${email}`,
      {
        headers: {
          "Content-type": "application/json",
         
        },
        body:JSON.stringify({email}),
        method: "POST",
       
      }
    );
  
    const datas: any = await request.json();
    
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };



  export const checkCodeOTP = async (
    email:string,
    code:string,
  ) => {
    
    
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/codeotp?email=${email}&code=${code}`,
      {
        headers: {
          "Content-type": "application/json",
         
        }, 
        method: "GET",
       
      }
    );
  
    const datas: any = await request.json();
    
    if (!request.ok) {
      return null;
    }
  
    return datas;
  };


  export const updateUserPasswordOut = async (newPassword:string,email:string ) => {
    // console.log(window.localStorage.getItem("accessToken"));
   
   
    const request = await fetch(
      `${
        process.env.BASE_API_URL
      }/api/codeotp?newPassword`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: window.localStorage.getItem("accessToken"),
        },
        method: "PATCH",
        body:JSON.stringify({newPassword:newPassword,email:email})
      }
    );
  

    const data: any = await request.json();
  
   
    if (!request.ok) {
      return null;
    }
  
    return data;
  };
   