export class entRegisterForm {
  MobileNumber = "";
  languageId = "";
  courseTypeId = "";
  counselorId = "";
  amount: number | undefined;
  FirstName = "";
  LastName = "";
  gmail = "";
  dob = "";
  professions = "";
  studentPhoto = new entDocument();
  aadharCard = new entDocument();
  modeOfClass = "";
  amountPaid = "";
  TransactionId = "";
  accountHolderName = "";
  paymentScreenShot = new entDocument();
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
