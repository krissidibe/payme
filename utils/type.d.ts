declare namespace NodeJS {
  export interface ProcessEnv {
    BASE_URL: string;
    BASE_API_URL: string;
  }
}

type User = {
    
    email: string,
    name: string,
    address?: string,
    country?: string,
    countryPhoneCode?: string,
    lockCode: boolean,
    number: string,
    code?: string,
    password?: string,
    normalSignUp?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    emailVerified?: boolean;
    image?: string,
    subscribe?: any,
  };
  

  type Payment = {
     id?: string,
    reference?  :string
    type  :string
    month  :number
    amount  :number
    currency  :string
    subscribe?  :any
     //Action
    createdAt? :     Date     
    updatedAt? :     Date     
    deletedAt? :     Date       
  };
    type Subscribe = {
       id?: string,
    paymentId  :string
    startAt? :     Date     
    endAt? :     Date      
     //Action
    createdAt? :     Date     
    updatedAt? :     Date     
    deletedAt? :     Date       
  };
  
  



type Enterprise ={
  id: string,
  email: string,
  activity: string,
  address: string,
  numbers: string,
  currency: string,
  name: string,
  rccm?: string,
  nif?: string,
  statut: string,
  bankNumber?: string,
  codeFinance?: string,
  lockFinance?: boolean,
  website?: string,
  createdAt?: string,
};




type Customer = {
  id?  :string
  externalContact  :string
  externalEmail  :string
  externalName  :string
  poste  :string
  activity  :string
  address  :string
  country  :string
  email?  :string 
  image?  :string 
  name :string
  type :string
   //Action
  inTrash? :boolean 
  createdAt? :     Date     
  updatedAt? :     Date     
  deletedAt? :     Date       
};


enum ProjectTypeEnum{
  INPROGRESS,
  ISVALIDATE,
  ISFINISH
}

  type Project = {
    id?  :string
    name  :string
    type :string
    invoiceNumber?  :int
    proformaDate?  :Date
    invoiceDate?  :Date
    discountItemTable?  :string
    table?  :string
    amountTotal?  :string
    tva?  :String
    modalite?  :String
  discount?  :String
  remarque?  :String
  invoiceType :int
    customer?  : Customer
    
     //Action
    inTrash? :boolean 
    createdAt? :     Date     
    updatedAt? :     Date     
    deletedAt? :     Date       
  };
  


 

  type Transaction = {
    client  :string
    projectName  :string
    type  :string
    taxe?  :string
    amountTotal  :string
 
    
     //Action
    inTrash? :boolean 
    createdAt? :     Date     
    updatedAt? :     Date     
    deletedAt? :     Date       
  };


enum FolderType {
  PROVIDER,
  SUPPLIER
}


    type Folder = {
    id?  :string
    name  :string
    type  :string 
 
    
     //Action
    inTrash? :boolean 
    createdAt? :     Date     
    updatedAt? :     Date     
    deletedAt? :     Date       
  };
  
    type FolderUser = {
    id?  :string
    contact  :string
    country  :string
    name  :string
    email?  :string
    function?  :string
    indicatif  :string
    rate  :string
    sexe  :string
    poste? : String  
    contrat? : String
    birthDate? :     Date
    
     //Action
    inTrash? :boolean 
    createdAt? :     Date     
    updatedAt? :     Date     
    deletedAt? :     Date       
  };
  



  type PlanningItem = {
    id?  :string
    name  :string
    color?  :string
    content  :string
    date? :     Date
    isCompleted?  :boolean
    
     //Action
    inTrash? :boolean 
    createdAt? :     Date     
    updatedAt? :     Date     
    deletedAt? :     Date       
  };
  



  type Planning = {
    id?  :string
    name  :string
    color?  :string
    
     //Action
    inTrash? :boolean 
    createdAt? :     Date     
    updatedAt? :     Date     
    deletedAt? :     Date       
  };