import jwt from "jsonwebtoken";

const secretKey: string | undefined = process.env.JWT_SECRET_KEY;

interface User {
  id: string;
  username: string;
}

const generateJWT = (user: User) => {
  if (!secretKey) {
    throw new Error("Secret key is undefined or not provided");
  }

  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: "7d",
  });
  return token;
};

export default generateJWT;
