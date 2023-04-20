import { UserType } from '../models/user';
//存储当前用户登录信息
let currentUser:UserType;

const setCurrentUserState= (user:UserType) => {
    currentUser = user
}
const getCurrentUserState = () => {
    return currentUser
}
export {
    setCurrentUserState,
    getCurrentUserState
}