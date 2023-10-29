import React, { createContext, useState, useEffect, ReactElement } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import {
  API_CREATE_USER_URL,
  API_GET_TOKEN_URL,
  API_REFRESH_TOKEN_URL,
} from "../constants";
import { SignUpFormData } from "../components/AuthForms/SignUpForm";

const FOUR_MINUTES = 1000 * 60 * 4;

interface AuthContextData {
  user: string | null;
  authTokens: AuthTokens | null;
  loginUser: (event: any) => Promise<void>;
  logoutUser: () => void;
  createUser: (accountData: SignUpFormData) => Promise<void>;
  authError: string | null;
  postRequest: (
    url: string,
    data: Record<string, any>
  ) => Promise<AxiosResponse<any, any> | Error>;
}

export const getCSRFToken = () => {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("csrftoken="))
    ?.split("=")[1];
};

export const parseErrorMessage = (error: any) => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return "An error has occurred";
  }
};

const defaultContext: AuthContextData = {
  user: null,
  authTokens: null,
  loginUser: async () => {
    return;
  },
  logoutUser: () => {
    return;
  },
  createUser: async ({}) => {
    return;
  },
  authError: null,
  postRequest: async (url, data) => new Error(),
};

const AuthContext = createContext(defaultContext);

export default AuthContext;

interface AuthTokens {
  access: string;
  refresh: string;
}

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const authTokensOnStartup = localStorage.getItem("authTokens");
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
    authTokensOnStartup ? JSON.parse(authTokensOnStartup) : null
  );
  const [user, setUser] = useState<string | null>(() =>
    authTokensOnStartup ? jwt_decode(authTokensOnStartup) : null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const navigate = useNavigate();

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usernameElement: HTMLInputElement = event.currentTarget
      .elements[0] as HTMLInputElement;
    const passwordElement: HTMLInputElement = event.currentTarget
      .elements[1] as HTMLInputElement;
    const username = usernameElement.value;
    const password = passwordElement.value;
    try {
      const response = await axios.post(API_GET_TOKEN_URL, {
        username,
        password,
      });
      const data = response.data;
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthError(null);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else if (typeof error === "string") {
        setAuthError(error);
      }
    }
  };

  const createUser = async (userInfo: SignUpFormData) => {
    try {
      const response = await axios.post(API_CREATE_USER_URL, userInfo, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      });

      setAuthTokens({
        access: response.data.access,
        refresh: response.data.refresh,
      });
      setUser(jwt_decode(response.data.access));
      localStorage.setItem(
        "authTokens",
        JSON.stringify({
          access: response.data.access,
          refresh: response.data.refresh,
        })
      );
      navigate("/");
      setAuthError(null);
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else if (typeof error === "string") {
        setAuthError(error);
      }
    }
  };

  const updateToken = async () => {
    try {
      const response = await axios.post(API_REFRESH_TOKEN_URL, {
        refresh: authTokens?.refresh,
      });

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }
    } catch (error) {}

    if (loading) {
      setLoading(false);
    }
  };

  const postRequest = async (
    url: string,
    data: Record<string, any>
  ): Promise<AxiosResponse<any, any> | Error> => {
    try {
      const request = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authTokens}`,
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      });

      return request;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      } else if (typeof error === "string") {
        return new Error(error);
      }
    }

    return new Error();
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  useEffect(() => {
    if (loading) updateToken();

    const interval = setInterval(() => {
      if (authTokens) updateToken();
    }, FOUR_MINUTES);

    return clearInterval(interval);
  }, [authTokens, loading]);

  let contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    createUser,
    authError,
    postRequest,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
