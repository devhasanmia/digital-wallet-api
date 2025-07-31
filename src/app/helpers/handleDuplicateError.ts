import { TGenericErrorResponse } from "../interfaces/error.types"
export const handlerDuplicateError = (err: any): TGenericErrorResponse => {
    const matched = err.message.match(/"([^"]*)"/)
    return {
        statusCode: 400,
        message: `${matched[1]} is already exists`
    }
}