import React from "react";
import portfolio from "./data/portfolio";

import MinimalTemplate from "./templates/MinimalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";

function App() {
  switch (portfolio.template?.toLowerCase()) {
    case "minimal":
      return <MinimalTemplate data={portfolio} />;

    case "modern":
      return <ModernTemplate data={portfolio} />;

    case "professional":
      return <ProfessionalTemplate data={portfolio} />;

    default:
      return <ProfessionalTemplate data={portfolio} />;
  }
}

export default App;