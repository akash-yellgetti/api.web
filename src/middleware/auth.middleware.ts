import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { jwt, Api } from "../utils";
import { sessionService } from "../service";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken: any = get(req, "headers.x-refresh");

  if (!accessToken) {
    return new Api(res).code(401).error().send({ message: 'No Token Found.' })
  };

  // if (!accessToken) return next();

  const { decoded, expired } = jwt.decode(accessToken);

  if (!decoded) {
    return new Api(res).code(401).error().send({ message: 'Invalid Token Found.' })
  }

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await sessionService.reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader("x-access-token", newAccessToken);

      const { decoded } = jwt.decode(newAccessToken);

      // @ts-ignore
      req.user = decoded;
    }

    return next();
  }

  return next();
};

