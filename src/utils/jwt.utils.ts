import jsonwebtoken from "jsonwebtoken";
import { setting } from "../config/setting";

const privateKey = setting["privateKey"];

class Jwt {
  sign = (object: Object, options?: jsonwebtoken.SignOptions | undefined) => {
    return jsonwebtoken.sign(object, privateKey, options);
  }

  decode = (token: string) => {
    try {
      const decoded = jsonwebtoken.verify(token, privateKey);

      return { valid: true, expired: false, decoded };
    } catch (error: any) {
      return {
        valid: false,
        expired: error.message === "jwt expired",
        decoded: null,
      };
    }
  }
}

export const jwt = new Jwt();