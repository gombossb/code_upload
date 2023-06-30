import { AxiosError, AxiosResponse } from "axios"
import axiosClient from "./axiosClient";
import { RegisterUserData } from "./types";

export const apiRegisterUser = (
  data: RegisterUserData,
  success: (response: AxiosResponse) => Promise<void>,
  fail: (error: AxiosError) => Promise<void>
) => {
  if (!data) return;

  axiosClient.post("/user/register", data)
    .then(async (response) => await success(response))
    .catch(async (error) => await fail(error));
}
