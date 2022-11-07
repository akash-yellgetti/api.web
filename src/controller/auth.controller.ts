import * as express from 'express';
class Auth {

  generateOTP = () => {

  }

  verifyOTP = () => {

  }

  register = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    try {
      return response.status(200).json(inputs);
    } catch (error) {

    }
  }

  login = (req: any, res: any) => {
    const result = {
      project: 'Welcome to Momenta auth login'
    };
    return res.status(200).json(result);
  }

  resetPassword = () => {

  }

  forgotPassword = () => {

  }
}

export const AuthController = new Auth();