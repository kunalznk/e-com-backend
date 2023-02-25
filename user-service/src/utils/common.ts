import { JsonWebTokenError } from "jsonwebtoken";
import { ValidationError } from "yup"
// import { UniqueConstraintError , ValidationError as  DBValidationError } from "sequelize"

export type Error = JsonWebTokenError | ValidationError | UniqueConstraintError | DBValidationError

export class InvalidDataError extends Error {  
    constructor (message) {
      super(message)
        this.name = message;
        Error.captureStackTrace(this, this.constructor);
        this.path = "auth";
    }
  }
export const buildSuccessMessage = (resData : unknown) => {
  return {
        data : {
        status : "SUCCESS",
        data: resData,
    },
    statusCode : 200
  }
}

export const buildFailMessage = (e : Error | unknown) => {
  console.log("Error", e)
  let error;
  if(e instanceof ValidationError) {
    error = {
      path: e.path,
      message : e.message
    };
  } else if (e instanceof JsonWebTokenError) {
    error = {
      path: e.stack,
      message: e.message
    }
  } else if (e instanceof UniqueConstraintError) {
    error = {
      path: e.fields,
      message: Object.keys(e.fields)[0] + " already exists "
    }
  } else if (e instanceof DBValidationError) {
    error = {
      path: e.errors[0]?.path,
      message: e.errors[0]?.message,
    }
  } else if (e instanceof InvalidDataError) {
    error = {
        path: e.path,
        message: e.name
    }
  }
  else {
    error =  e;
  }
  return {
       data : { 
        status : "FAIL",
        message : e?.name,
        error
    } ,
    statusCode : 500
    }
}
