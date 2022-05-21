export const routes = [
  {
    path: "auth",
    componentPath: "layout/AuthLayout",
    children: [
      {
        path: "sign-in",
        isAuthenticated: false,
        isAuthPage: true,
        componentPath: "pages/Auth/SignIn",
      },
      {
        path: "sign-up",
        isAuthenticated: false,
        isAuthPage: true,
        componentPath: "pages/Auth/SignUp",
      },
    ],
  },
  {
    path: "admin",
    componentPath: "layout/MainLayout",
    children: [
      {
        path: "dashboard",
        isAuthenticated: true,
        componentPath: "pages/Dashboard",
      },
    ],
  },
];
