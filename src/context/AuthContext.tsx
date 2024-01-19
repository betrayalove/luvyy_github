import React, { createContext, useState, useEffect, ReactElement, ReactNode } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>({} as IAuthContext);

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = (props: IAuthProviderProps): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt'));
    setIsLoggedIn(!!jwt);
  }, []);

  const login = (): void => {
    setIsLoggedIn(true);
  };

  const logout = (): void => {
    setIsLoggedIn(false);
    document.cookie = 'jwt=';
    document.cookie = 'refreshToken=';
  };

  return (
    <AuthContext.Provider value= {{ isLoggedIn, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
