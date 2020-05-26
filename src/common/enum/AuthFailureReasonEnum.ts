enum AuthFailureReasonEnum{
    INVALID_USER = "Invalid username or password",
    BAD_REQUEST = "Bad request",
    INTERNAL_SERVER_ERROR = "Internal server error",
    ACCOUNT_ALREADY_EXIST = "Account already exists",
    ACCOUNT_ALREADY_INUSED = "Account already inused",
    INVALID_EMAIL = "Invalid E-mail",
    INVALID_PHONE_NUMBER = "Invalid phone number"
}

export default AuthFailureReasonEnum;