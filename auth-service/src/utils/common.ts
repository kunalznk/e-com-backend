export const buildSuccessMessage = (resData : unknown) => {
    
    return {
        data : {
        status : "SUCCESS",
        data: resData,
        message : "Server Success"
    },
    statusCode : 200}
}

export const buildFailMessage = (error : unknown) => {
    
    return {
       data : { status : "FAIL",
        data : [],
        message : "Server Failure"
    } ,
    statusCode : 200
    }
}