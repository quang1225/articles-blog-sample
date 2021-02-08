import { IAPI } from "./types";
import { Response } from "../models/app";

const mockToken = "testabc.xyz.ahk";

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<Response> {
    if (username === "test" && password === "test") {
      return Promise.resolve({
        token: mockToken,
        status: 200,
        message: "Success",
      });
    }

    return Promise.reject({
      status: 404,
      message: "Incorrect username/password",
    });
  }
}

export default new ApiFrontend();
