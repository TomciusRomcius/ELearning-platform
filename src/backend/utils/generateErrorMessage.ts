import { ERROR_TYPE } from "./errorTypes";

// Note: for security reasons if there is no ERROR_TYPE definition of the error,
// the error won't be printed
export function generateErrorResponse(error: unknown) {
  console.log(error);
  let res = ERROR_TYPE.unknown

  Object.entries(ERROR_TYPE).forEach(([property, value]) => {
    if (error === value) {
      res = value;
    }
  });
  return res;
}