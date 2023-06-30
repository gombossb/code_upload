import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

export const apiUploadCode = (
  data: {
    email: string,
    code: string,
    purchase_time: string
  },
  success: (response: AxiosResponse) => Promise<void>,
  fail: (error: AxiosError) => Promise<void>
) => {
  if (!data) return;

  axiosClient.post("/code/upload", data)
    .then(async (response) => await success(response))
    .catch(async (error) => await fail(error));
}
