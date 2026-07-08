import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { useNotice } from "../context/NoticeContext";
import { isPortfolioComplete } from "../utils/validatePortfolioForm";

function RequireCompleteForm({ children }) {
  const data = usePortfolio();
  const complete = isPortfolioComplete(data);
  const { notify } = useNotice();

  useEffect(() => {
    if (!complete) {
      notify("Please complete your portfolio form before generating a template.");
    }
  }, [complete, notify]);

  if (!complete) {
    return <Navigate to="/userinfo" replace />;
  }

  return children;
}

export default RequireCompleteForm;
