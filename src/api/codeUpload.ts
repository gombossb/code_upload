import { AxiosResponse } from "axios";
import { CodeUploadData } from "../context/CodeUploadContext";
import axiosClient from "./axiosClient";

export const apiUploadCode = (
  data: CodeUploadData | undefined,
  success: (r: AxiosResponse) => {},
  fail: (r: any) => {}
) => {
  if (!data) return;
  
  axiosClient.post("/code/upload", {
    email: data.email,
    code: data.code,
    purchase_time: data.purchaseDate
  })
  .then((response) => success(response))
  .catch((error) => fail(error));
}
