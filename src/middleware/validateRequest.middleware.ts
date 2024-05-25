import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import { Api, log } from '../utils';

const validate = (schema: AnySchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: false });

    return next();
  } catch (e: any) {
    log.error(e);
    return new Api(res).code(422).error().send({ message: 'Validation Failed.', data: e.inner  })
  }
};

export default validate;