import { createContext, useCallback, useContext, useMemo, useRef } from "react";

const NavGuardContext = createContext(null);

export const useNavGuard = () => useContext(NavGuardContext);

export function NavGuardProvider({ children }) {
  // Holds an optional guard function (to) => boolean. Returning true means the
  // navigation was intercepted / handled by the guard.
  const guardRef = useRef(null);

  const registerGuard = useCallback((fn) => {
    guardRef.current = fn;
  }, []);

  const runGuard = useCallback((to) => {
    return guardRef.current ? guardRef.current(to) : false;
  }, []);

  const value = useMemo(
    () => ({ registerGuard, runGuard }),
    [registerGuard, runGuard]
  );

  return (
    <NavGuardContext.Provider value={value}>
      {children}
    </NavGuardContext.Provider>
  );
}
