# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Bug Fixes

- **`cloudinaryFileOps`**: Corrected a syntax error in the `catch` blocks of `uploadBufferToCloudinary` and `deleteImageFromCloudinary` functions.
- **`compressFile`**: Fixed a TypeScript error where the `error` object in `catch` blocks was of type `unknown` and could not be passed directly to the `AppError` constructor. The error is now correctly handled.
- **`globalErrorHandler`**: Resolved a TypeScript error by updating the `handleCastError` function to correctly accept an error argument.
- **`auth.service`**: Fixed a TypeScript error (`TS2451`) caused by redeclaring the `password` variable in the same scope.

### Code Quality & Refactoring

- **`cloudinaryFileOps`**: Added conditional logging for Cloudinary upload and deletion failures that only logs in the development environment.
- **`handleCastError`**: Improved type safety by defining a specific `ICastError` interface instead of using `any`, and using `unknown` for the `value` property to adhere to stricter linting rules.
- **`auth.controller`**: Fixed TypeScript errors related to custom properties on the `Request` object by extending the `express.Request` interface in `src/types/express/index.d.ts`.
- **`auth.service`**: Resolved a linting error for an intentionally unused variable (`_password`) by adding an ESLint disable comment, preserving the clean object destructuring.
- **`profile.controller`**: Updated the import statement for Express types to use `import type`, complying with the `verbatimModuleSyntax` TypeScript setting.
- **Linting**: Resolved all outstanding ESLint warnings and errors across the codebase.
