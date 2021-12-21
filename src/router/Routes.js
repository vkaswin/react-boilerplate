export const routes = [
  {
    name: "AuthLayout",
    path: "auth",
    auth: false,
    componentPath: "layout/AuthLayout",
    children: [
      {
        path: "sign-in",
        auth: false,
        componentPath: "pages/Auth/SignIn",
      },
    ],
  },
  {
    name: "MainLayout",
    path: "admin",
    auth: true,
    componentPath: "layout/MainLayout",
    children: [
      {
        path: "dashboard",
        auth: true,
        componentPath: "pages/Admin/Dashboard",
      },
    ],
  },
];
