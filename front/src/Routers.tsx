import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./features/login/pages/Login";
import { Home } from "./features/home/pages/Home";
import { ContextWrapper } from "./context/ContextWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { GetUser, RefreshToken } from "./utils/Auth";
import { Terms } from "./features/terms/pages/Terms";

export const Routers = () => {
    const navigate = useNavigate();

    useEffect(() => {
      localStorage.getItem("terms") ? "/home" : navigate("/");
    }, []);
    
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const [logInned, userInfo] = await GetUser();
        console.log(userInfo);
        if (logInned && userInfo) {
          // トークン更新
          RefreshToken();
          // ログイン済みの場合
          if (
            window.location.pathname === "/" ||
            window.location.pathname === "/login"
          ) {
            navigate("/home");
          } else {
            navigate(window.location.pathname, { replace: true });
          }
        } else {
          navigate("/login");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);

  const routesWithoutHeaderAndFooter = [{ path: "/login", element: <Login /> },{path: "/", element: <Terms />}];
  const routesWithHeadedrAndFooter = [{ path: "/home", element: <Home /> }];

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
