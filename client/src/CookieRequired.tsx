import { FC, ReactNode } from 'react'
import { useAuth } from 'react-oidc-context';

interface CookieRequiredProps {
  children: ReactNode
}

export const CookieRequired: FC<CookieRequiredProps> = ({ children }) => {
  const auth = useAuth();

  if (auth.user) {
    const token = auth.user?.access_token;
    const expiresDate = new Date(0);
    expiresDate.setUTCSeconds(auth.user.expires_at ?? 0);
    document.cookie = `jwt=${token}; expires=${expiresDate.toUTCString()}; samesite=Strict; path=/api;`;
  }

  return (
    <>
      {children}
    </>
  )
}
