import { Routes, Route } from "react-router-dom";
import { Login } from "./features/login/pages/Login";
import { Home } from "./features/home/pages/Home";
import { ContextWrapper } from "./context/ContextWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const Routers = () => {
  const routesWithoutHeaderAndFooter = [{ path: "/login", element: <Login /> }];
  const routesWithHeadedrAndFooter = [{ path: "/home", element: <Home /> }]


  interface LayoutProps {
    element: JSX.Element;
  }

  function LayoutWithoutHeaderAndFooter({ element }: LayoutProps) {
    // ヘッダーとフッターなしで要素を表示
    return <>{element}</>;
  }

  function LayoutWithHeaderAndFooter({ element }: LayoutProps) {
    // ヘッダーとフッターを含めて要素を表示
    return (
      <>
        <Header />
        {element}
        <Footer />
      </>
    );
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
        {/* ヘッダーとフッターありで表示したいページ */}
        {routesWithHeadedrAndFooter.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<LayoutWithHeaderAndFooter element={element} />}
          />
        ))}
      </Routes>
    </ContextWrapper>
  );
};
