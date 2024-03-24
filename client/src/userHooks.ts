import { jwtDecode } from "jwt-decode";
import { useAuth } from "react-oidc-context";

export interface HarnessUser {
  aud: string[];
  auth_time: number;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  groups: string[];
  ist: number;
  jti: string;
  name: string;
  preferred_username: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  session_state: string;
  sub: string;
  sid: string;
  typ: string;
}

export const useUser = () => {
  const auth = useAuth();

  if (!auth.user) return null;
  const user: HarnessUser = jwtDecode(auth.user?.access_token);
  
  return user;
}

export const useIsAdmin = () => {
  const user = useUser();

  if (!user) return false;

  return user.groups.includes("harness-admin");
}