import jwt from "jsonwebtoken"

export const generateJWTToken = async ( user, message, statusCode, res ) => {
  const token = jwt.sign(
    { id: user._id }, // Payload: unique identifier of the user
     process.env.JWT_SECRET_KEY, // Secret key for signing
    { expiresIn: process.env.JWT_EXPIRE } // Token expiry time
  );

  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true, // prevents JavaScript access (security)
      maxAge: process.env.COOKIE_EXPIRE*24*60*60*1000, // how long the cookie stays valid
      sameSite: "strict", // prevents CSRF attacks
      secure: process.env.NODE_ENV !== "development" ? true : false, // secure cookies only on HTTPS in production
    })
    .json({
      success: true,
      message,
      token, // send token back to frontend
    });
};
