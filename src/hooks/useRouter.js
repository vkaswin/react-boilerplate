import { useNavigate, useLocation, useParams } from "react-router-dom";
import queryString from "query-string";

export const useRouter = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const params = useParams();

  return {
    push: navigate,
    goBack: () => navigate(-1),
    pathName: location.pathname,
    query: {
      ...queryString.parse(location.search),
      ...params,
    },
  };
};
