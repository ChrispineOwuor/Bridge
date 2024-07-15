import { createContext, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    const role = localStorage.getItem("role");
    if (role) {
      return JSON.parse(role);
    } else {
      null;
    }
  });
  const [token, setToken] = useState(() => {
    const role = localStorage.getItem("token");
    if (role) {
      return JSON.parse(role);
    } else {
      null;
    }
  });
  const [user, setUser] = useState(() => {
    const id = localStorage.getItem("user_id");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (id && name && email) {
      return {
        id: JSON.parse(id),
        name: JSON.parse(name),
        email: JSON.parse(email),
      };
    }
    return null;
  });
  const [buttonText, setButtonText] = useState("Sign in");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async (email, password) => {
    setIsSubmitting(true);
    setButtonText("Signing in...");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_KEY}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 202) {
        const user = response.data.user;
        setUser(user);
        setRole(user.role);
        localStorage.setItem("user_id", JSON.stringify(user.id));
        localStorage.setItem("name", JSON.stringify(user.name));
        localStorage.setItem("email", JSON.stringify(user.email));
        localStorage.setItem("role", JSON.stringify(user.role));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setButtonText("Success");
        setButtonText("Success");
      } else {
        setButtonText("Sign in");
      }
    } catch (error) {
      alert(error.response.data.message);
      setButtonText("Sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  let data = {
    role,
    setRole,
    token,
    setToken,
    user,
    login,
    isSubmitting,
    buttonText,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
