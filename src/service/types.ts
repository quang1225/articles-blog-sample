import { Response } from "../models/app";

export abstract class IAPI {
  abstract signIn(username: string, password: string): Promise<Response>;
}
