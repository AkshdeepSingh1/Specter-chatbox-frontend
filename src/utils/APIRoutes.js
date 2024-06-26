//export const host="http://localhost:3000";
export const host =
  "https://specter-chatbox-backend-production-84a8.up.railway.app";
export const createUserRoute = `${host}/api/auth/createuser`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const requestPasswordReset = `${host}/api/forgetpassword/request-password-reset`;
export const passwordReset = `${host}/api/forgetpassword/reset-password`;
export const verifyEmail = `${host}/api/auth/verify-email`;
export const fetchAllContacts = `${host}/api/auth//allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;
