import type {
  ICastError,
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/error.types.js";

export const handleCastError = (err: ICastError): TGenericErrorResponse => {
  const path = err.path ?? "unknown";

  const errorSources: TErrorSources[] = [
    {
      path,
      message: `Invalid value for ${path}`,
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid ID",
    errorSources,
  };
};
