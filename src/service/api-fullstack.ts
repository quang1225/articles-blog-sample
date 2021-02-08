import { IAPI } from "./types";
import { Response } from "../models/app";
import axios from "../utils/axios";
import { AxiosResponse } from "axios";

class ApiFullstack extends IAPI {
  async signIn(username: string, password: string): Promise<Response> {
    const resp = await axios.get<AxiosResponse<string>>(
      `/login?user_id=${username}&password=${password}`
    );

    return { status: 200, data: resp.data.data, message: "Success" };
  }
}

export default new ApiFullstack();
