import authClient from "./authApi";

export const savePortfolio = async (portfolioData) => {
  const { data } = await authClient.post("/portfolio", portfolioData);
  return data;
};

export const getPortfolio = async () => {
  const { data } = await authClient.get("/portfolio");
  return data;
};
