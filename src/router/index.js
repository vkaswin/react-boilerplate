import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "hooks";
import { routes } from "router/Routes";
import { ProtectedRoute } from "./ProtectedRoute";
const PageNotFound = lazy(() => import("../pages/404"));

export const Router = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {routes.map(
            ({ path, auth = false, componentPath, children = [], name }) => {
              if (children.length === 0) {
                const PageComponent = lazy(() =>
                  import(
                    /* webpackChunkName: "[request]" */ `../${componentPath}`
                  )
                );
                return (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <ProtectedRoute
                        auth={auth}
                        name={name}
                        component={<PageComponent />}
                      />
                    }
                  />
                );
              } else {
                const LayoutComponent = lazy(() =>
                  import(
                    /* webpackChunkName: "[request]" */ `../${componentPath}`
                  )
                );
                return (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <ProtectedRoute
                        auth={auth}
                        name={name}
                        component={<LayoutComponent />}
                      />
                    }
                  >
                    {children.map(
                      ({
                        path: childPath,
                        componentPath: childComponentPath,
                        auth: childAuth,
                      }) => {
                        const ChildComponent = lazy(() =>
                          import(
                            /* webpackChunkName: "[request]" */ `../${childComponentPath}`
                          )
                        );
                        return (
                          <Route
                            key={childPath}
                            path={childPath}
                            element={
                              <ProtectedRoute
                                auth={childAuth}
                                component={<ChildComponent />}
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
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
