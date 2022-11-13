import * as yup from "yup";

const firstName = yup.string().required().min(5).max(100);
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

const role = yup.string().matches(/(CUSTOMER|SELLER|DELIVERY_PARTNER)/);

const token = yup.string().required()

export const CreateUserInputSchema = yup.object({
  firstName,
  lastName,
  emailId,
  password,
  role
});


export const LoginInputSchema = yup.object({
  emailId,
  password,
});

export const ResetPasswordInputSchema = yup.object({
  emailId,
});

export const VerifyEmailInputSchema = yup.object({
  token,
});

export const UpdatePasswordInputSchema = yup.object({
  token: yup.string().optional(),
  password: yup.string().when('token', {
    is: false,
    then: yup.string().required("Please Provide Password"),
    otherwise: yup.string().optional()
  }),
  newPassword: yup.string().required("Password dose not match")
});


