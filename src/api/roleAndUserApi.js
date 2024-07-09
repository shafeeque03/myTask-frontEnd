import axios from 'axios';

const baseURL = "http://localhost:7000/";
const axiosInstance  = axios.create({baseURL:baseURL});

//roleAPI
export const addRoleApi = async(Permissions,name)=>{
    const data = await axiosInstance.post("/addRole",{Permissions,name});
    return data
}

export const getRoleApi = async()=>{
    const data = await axiosInstance.get("/getRole");
    return data
}

export const deleteRoleApi = async(roleId)=>{
    const data = await axiosInstance.post("/deleteRole",{roleId});
    return data
}

export const editRoleApi = async(roleId,Permissions,name)=>{
    const data = await axiosInstance.post('/editRole',{roleId,Permissions,name});
    return data
}



//userAPI
export const addUserApi = async(userData)=>{
    console.log(userData,"data is here")
    const data = await axiosInstance.post('/addUser',{userData});
    return data
}

export const getUserApi = async ()=>{
    const data = await axiosInstance.get('/getUsers');
    return data
}

export const deleteUserApi = async(userId)=>{
    const data = await axiosInstance.post("/deleteUser",{userId});
    return data
}

export const updateUserApi = async(userId,userData)=>{
    const data = await axiosInstance.post('/editUser',{userId,userData});
    return data
}

export const loginApi = async(email,password)=>{
    const data = await axiosInstance.post('/login',{email,password});
    return data
}
