import * as yup from "yup";

const fistName = yup.string().required().min(5).max(100);
const lastName = yup.string().required().min(5).max(100);
const password = yup
  .string()
  .required("Please Enter your password")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  )
  .min(5)
  .max(100);

const emailId = yup
  .string()
  .email("Please enter valid email id")
  .required()
  .min(5)
  .max(100);


export const CreateUserInputSchema = yup.object({
  fistName,
  lastName,
  emailId,
  password,
});


export const LoginInputSchema = yup.object({
  emailId,
  password,
});



