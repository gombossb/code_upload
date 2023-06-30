import { AxiosError, AxiosResponse } from "axios"
import axiosClient from "./axiosClient";

export const apiRegisterUser = (
  data: {
    email: string,
    name: string
  },
  success: (response: AxiosResponse) => Promise<void>,
  fail: (error: AxiosError) => Promise<void>
) => {
  if (!data) return;

  axiosClient.post("/user/register", data)
    .then(async (response) => await success(response))
    .catch(async (error) => await fail(error));
}
