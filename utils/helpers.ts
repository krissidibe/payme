import dayjs from "dayjs";


export const daysFr =(day)=>{
  return  dayjs(`${day}`).format("DD/MM/YYYY")
}