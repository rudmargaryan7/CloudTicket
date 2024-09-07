import config from "config";
import jwt, { JwtPayload } from "jsonwebtoken";

const { expires, pass } = config.get<{ expires: string; pass: string }>("jwt");
interface CustomJwtPayload extends JwtPayload {
  email: string; // Add any custom fields here
}
export const generateToken = (payload: object) => {
  return jwt.sign(payload, pass, { expiresIn: expires });
};

export const parseToken = (token: string): CustomJwtPayload | null => {
  const decoded = jwt.decode(token);

  // Ensure that decoded is an object and cast it to the custom payload type
  if (decoded && typeof decoded === "object") {
    return decoded as CustomJwtPayload;
  }

  return null;
};
