import { Dispatch, SetStateAction, createContext } from "react";
import { CodeUploadData } from "../api/types";

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
