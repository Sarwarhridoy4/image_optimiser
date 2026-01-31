import type {
  TGenericErrorResponse,
  TErrorSources,
} from "../interfaces/error.types.js";

interface ICastError extends Error {
  path?: string;
  value?: unknown;
  kind?: string;
}

export const handleCastError = (err: ICastError): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [
    {
      path: err.path,
      message: "Invalid Value for " + err.path,
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid ID",
    errorSources,
  };
};

