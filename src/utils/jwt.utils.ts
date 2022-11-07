import jsonwebtoken from "jsonwebtoken";
import config from "config";

const privateKey = config.get("privateKey") as string;

class Jwt {
  sign = (object: Object, options?: jwt.SignOptions | undefined) => {
    return jsonwebtoken.sign(object, privateKey, options);
  }

  decode = (token: string) => {
    try {
      const decoded = jsonwebtoken.verify(token, privateKey);

      return { valid: true, expired: false, decoded };
    } catch (error) {
      return {
        valid: false,
        expired: error.message === "jwt expired",
        decoded: null,
      };
    }
  }
}

export const jwt = new Jwt();