import { Routes, Route } from "react-router-dom";
import { Login } from "./features/login/pages/Login";
import { ContextWrapper } from "./context/ContextWrapper";

export const Routers = () => {
  const routesWithoutHeaderAndFooter = [{ path: "/login", element: <Login /> }];

  interface LayoutProps {
    element: JSX.Element;
  }

  function LayoutWithoutHeaderAndFooter({ element }: LayoutProps) {
    // ヘッダーとフッターなしで要素を表示
    return <>{element}</>;
  }

  return (
    <ContextWrapper>
      <Routes>
        {/* ヘッダーとフッターなしで表示したいページ */}
        {routesWithoutHeaderAndFooter.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<LayoutWithoutHeaderAndFooter element={element} />}
          />
        ))}
      </Routes>
    </ContextWrapper>
  );
};
