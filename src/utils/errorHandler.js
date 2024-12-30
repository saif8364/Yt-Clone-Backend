class apiError extends Error{
    constructor (
        statusCode,
        message="no msg passed",
        errors=[],
        stack=""
    ){
           super(message);
           this.statusCode=statusCode;
           this.data=null;
           this.message=message;
           this.errors=errors;
           this.success=false

    }
}

export default apiError;