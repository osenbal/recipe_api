export default interface User {
  id: number;
  email: string;
  password: string;
  role_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// check required input
export const checkRequiredInput = (input: any) => {
  let isRequiredInputEmpty = false;
  Object.keys(input).forEach((key) => {
    // check if input is empty
    if (
      input[key] === "" ||
      input[key] === undefined ||
      input[key] === null ||
      input[key].length === 0
    ) {
      isRequiredInputEmpty = true;
      return false;
    }
  });

  if (isRequiredInputEmpty) {
    return false;
  }

  return true;
};

// check validation email
export const checkEmailStringFormat = (email: string) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

// check validation password
export const checkPasswordStringFormat = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const hashPassword = async (bcrypt: any, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
