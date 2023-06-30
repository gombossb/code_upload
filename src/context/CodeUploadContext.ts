import { Dispatch, SetStateAction, createContext } from "react";

export interface CodeUploadData {
  email: string;
  code: string; // 8 char, [a-zA-Z0-9]
  purchase_time: string; // "2021-07-21 10:00"
};

export const CodeUploadContext = createContext<{
  codeUploadData: CodeUploadData | undefined,
  setCodeUploadData: Dispatch<SetStateAction<CodeUploadData | undefined>>
}>({
  codeUploadData: {
    email: "",
    code: "",
    purchase_time: "",
  },
  setCodeUploadData: () => {},
});
