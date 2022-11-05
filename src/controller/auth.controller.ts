class Auth {

  generateOTP = () => {

  }

  verifyOTP = () => {

  }

  register = () => {

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