import AuthFailureReasonEnum from "../enum/AuthFailureReasonEnum"

export default class AuthError extends Error{
    constructor(resonEnum :AuthFailureReasonEnum){
        super(resonEnum.toString());
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}