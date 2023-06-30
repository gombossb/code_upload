export interface CodeUploadData {
  email: string;
  code: string; // 8 char, [a-zA-Z0-9]
  purchase_time: string; // "2021-07-21 10:00"
};

export interface RegisterUserData {
  email: string;
  name: string;
};

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
