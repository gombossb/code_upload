export type CodeUploadError = {
  errors: {
    code: string,
    source: {
      parameters: string[]
    }
  }[]
};

export type RegistrationError = {
  errors: {
    code: string,
    source: {
      parameters: string[]
    }
  }[]
};
