export class entRegisterForm {
  MobileNumber = "";
  languageId = 0;
  courseTypeId = 0;
  counselorId = 0;
  amount = 0;
  FirstName = "";
  LastName = "";
  gmail = "";
  dob = "";
  professions = "";
  studentPhoto = "";
  aadharCard = "";
  modeOfClass = "";
  amountPaid = "";
  TransactionId = "";
  accountHolderName = "";
  paymentScreenShot = "";
  isaggery = "";

}


export class entUser {
  email = "";
  firstName = "";
  groups = "";
  id = "";
  isActive = "";
  isStaff = "";
  isSuperuser = "";
  lastLogin = "";
  lastName = "";
  mobileNumber = "";
  photo = new entDocument();
  userPermissions = "";
  userRole = "";

}

export class entDocument {
  createdDate = "";
  documentContant = "";
  documentName = "";
  documentSize = "";
  documentsExtention = "";
}
