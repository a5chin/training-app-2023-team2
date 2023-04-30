package entity

type Error struct {
	Code    int
	Message string
}

func (e Error) Error() string {
	return e.Message
}

type ErrorResponse struct {
	Message string `json:"message,omitempty"`
}

func WrapError(code int, err error) *Error {
	return &Error{
		Code:    code,
		Message: err.Error(),
	}
}
