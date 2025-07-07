export const loginDataKeys = {
  isLogin: "isLogin", 
  jwtToken: "jwtToken", 
  _id: "_id",
  fullName: "fullName",
  emailAddress: "emailAddress",
  mobileNumber: "mobileNumber",
  password: "password",
  passwordOriginal: "passwordOriginal",
  gender: "gender",
  dateOfBirth: "dateOfBirth",
  profilePhoto: "profilePhoto",
  bloodGroup: "bloodGroup",
  emergencyContactNo: "emergencyContactNo",
  hobbies: "hobbies",
  panCardNo: "panCardNo",
  aadharCardNo: "aadharCardNo",
  address: "address",
  employeeCode: "employeeCode",
  approvalStatus: "approvalStatus",
  createdAt: "createdAt",
  lastLogin: "lastLogin",
  isActive: "isActive",
  isEmailVerified: "isEmailVerified",
  isMobileVerified: "isMobileVerified",
  verificationToken: "verificationToken",
  mPin: "mPin",
  latitude: "latitude",
  longitude: "longitude",
  deviceId: "deviceId",
  onesignalPlayerId: "onesignalPlayerId",
  dateOfJoining: "dateOfJoining",
  dateOfTerminate: "dateOfTerminate",
  deleted: "deleted",
  technology: "technology",
  role: "role",
  isElectron: "isElectron",
  isMobile: "isMobile",
  isDesktopBrowser: "isDesktopBrowser"
};

export const storeLoginData = (data, isLoginData) => {
  const userData = isLoginData ? data["data"] : data;
  if(isLoginData) {
    if(data[loginDataKeys.jwtToken]) {
      localStorage.setItem(loginDataKeys.isLogin, "true");
      localStorage.setItem(loginDataKeys.jwtToken, data[loginDataKeys.jwtToken]);
    }
  }
  localStorage.setItem(loginDataKeys.fullName, userData[loginDataKeys.fullName]);
  localStorage.setItem(loginDataKeys.emailAddress, userData[loginDataKeys.emailAddress]);
  localStorage.setItem(loginDataKeys.mobileNumber, userData[loginDataKeys.mobileNumber]);
  localStorage.setItem(loginDataKeys.profilePhoto, userData[loginDataKeys.profilePhoto]);
  localStorage.setItem(loginDataKeys._id, userData[loginDataKeys._id]);
  localStorage.setItem(loginDataKeys.role, userData[loginDataKeys.role]);
  // Object.keys(userData).forEach(key => {
  //   localStorage.setItem(key, userData[key]);
  // });
};

export const getUserData = {
  fullName: localStorage.getItem(loginDataKeys.fullName),
  emailAddress: localStorage.getItem(loginDataKeys.emailAddress),
  mobileNumber: localStorage.getItem(loginDataKeys.mobileNumber),
  profilePhoto: localStorage.getItem(loginDataKeys.profilePhoto),
  _id: localStorage.getItem(loginDataKeys._id),
  role: localStorage.getItem(loginDataKeys.role),
  isLogin: localStorage.getItem(loginDataKeys.isLogin),
  jwtToken: localStorage.getItem(loginDataKeys.jwtToken),
};

export const getLocalData = (key) => {
  return localStorage.getItem(key);
};