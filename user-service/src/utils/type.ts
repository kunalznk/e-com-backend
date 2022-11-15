import { address, CreateUserSchema } from "./yup";
import { InferType } from "yup";

export type User = InferType<typeof CreateUserSchema>
export type UserAddress = InferType<typeof address>