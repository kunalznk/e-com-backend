import * as yup from "yup";

const firstName = yup.string().required().min(5).max(100);
const lastName = yup.string().required().min(5).max(100);
const emailId = yup
  .string()
  .email("Please enter valid email id")
  .required()
  .min(5)
  .max(100);
const role = yup.string().matches(/(CUSTOMER|SELLER|DELIVERY_PARTNER)/);

const addressLine1 = yup.string().required("Please Enter Valud Address").min(5).max(1000);
const addressLine2 = yup.string().optional().min(5).max(1000);
const city = yup.string().required("Please Enter City").min(5).max(250);
const state = yup.string().required("Please Enter State").min(5).max(250);
const pinCode = yup.string().required("Please Enter Pin Coed").min(5).max(10);
const addressType = yup.string().required("Please Enter Type").min(5).max(250);
const isDefault = yup.boolean().optional()



export const address = yup.object({
    addressLine1,
    addressLine2,
    city,
    state,
    pinCode,
    addressType,
    isDefault

})

export const CreateUserSchema = yup.object({
  firstName,
  lastName,
  emailId,
  role,
  address: yup.array().of(address).min(0)
});

export const updateUserSchema = yup.object({
    firstName,
    lastName,
    role,
    address,
});




