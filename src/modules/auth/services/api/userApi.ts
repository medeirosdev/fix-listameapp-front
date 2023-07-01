import { api } from '~/app/services/api/api';
import axios from 'axios';
import {
  ICreateUserRequest,
  ICreateUserResponse,
} from '~/modules/auth/types/api/user';

interface ICreateUser {
  (userData: ICreateUserRequest): Promise<ICreateUserResponse>;
}

const BASE_URL = '/users';

const createUser: ICreateUser = async (userData) => {

/*
  const testdata =  {
    "name" : "gu",
    "email": "1emailsuper@gmail.com",
    "login" : "1dev2m213123edei2ros22" ,  
    "password" : "aa123456"
}
  console.log(testdata)
  try{
    const {data} = await axios.post('http://localhost:3333/users/', testdata);
    return data
  }catch(e:any){
    console.log(e)
  }
  */
  
  const endpoint = BASE_URL.concat('/');
  console.log("==== Userdata do Registro aqui! ========================")
  console.log(userData)
  console.log(endpoint)
  const { data } = await api.post(endpoint, userData);
  console.log("==== API AXIOS DATA ========================")
  console.log(data)
  return data;
  
};

export const userApi = {
  createUser,
};
