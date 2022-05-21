import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "router/Routes";
import { ProtectedRoute } from "./ProtectedRoute";
const PageNotFound = lazy(() => import("../pages/404"));

export const Router = (props) => {
  const { user, isLoading } = props.auth;

  if (isLoading) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {routes.map(
            ({
              path,
              componentPath,
              children = [],
              isAuthenticated = false,
              isAuthPage = false,
            }) => {
              if (children.length === 0) {
                const PageComponent = lazy(() => import(`../${componentPath}`));
                return (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        isAuthPage={isAuthPage}
                        component={<PageComponent {...props} />}
                      />
                    }
                  />
                );
              } else {
                const LayoutComponent = lazy(() =>
                  import(`../${componentPath}`)
                );
                return (
                  <Route
                    key={path}
                    path={path}
                    element={<LayoutComponent {...props} />}
                  >
                    {children.map(
                      ({
                        path: childPath,
                        componentPath: childComponentPath,
                        isAuthenticated: isChildAuthenticated,
                        isAuthPage: isChildAuthPage,
                      }) => {
                        const ChildComponent = lazy(() =>
                          import(`../${childComponentPath}`)
                        );
                        return (
                          <Route
                            key={childPath}
                            path={childPath}
                            element={
                              <ProtectedRoute
                                isAuthenticated={isChildAuthenticated}
                                isAuthPage={isChildAuthPage}
                                component={<ChildComponent {...props} />}
                              />
                            }
                          />
                        );
                      }
                    )}
                  </Route>
                );
              }
            }
          )}
          <Route
            path="/"
            element={
              <Navigate
                replace
                to={user ? "/admin/dashboard" : "/auth/sign-in"}
              />
            }
          />
          <Route path="*" element={<PageNotFound {...props} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
