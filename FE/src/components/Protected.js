import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  if (cookies.Id != null) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
