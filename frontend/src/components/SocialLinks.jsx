import { usePortfolio } from '../context/PortfolioContext';

const Label = ({ children, required, optional }) => (
  <label className="font-semibold text-gray-700 text-sm flex items-center gap-1">
    {children}
    {required && <span className="text-red-500 font-bold">*</span>}
    {optional && <span className="text-gray-400 font-normal text-xs">(Optional)</span>}
  </label>
);

function SocialLinks() {
  const { socialLinks, setSocialLinks } = usePortfolio();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">Social Links</h2>
      <p className="text-xs text-gray-400 mb-6 flex items-center gap-1">
        <span className="text-red-500 font-bold">*</span> Required fields
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label required>GitHub</Label>
          <input
            id="input-github"
            type="url"
            name="github"
            value={socialLinks.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <Label required>LinkedIn</Label>
          <input
            id="input-linkedin"
            type="url"
            name="linkedin"
            value={socialLinks.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <Label optional>Portfolio Website</Label>
          <input
            id="input-portfolio"
            type="url"
            name="portfolio"
            value={socialLinks.portfolio}
            onChange={handleChange}
            placeholder="https://your-portfolio.com"
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <Label optional>Twitter / X</Label>
          <input
            id="input-twitter"
            type="url"
            name="twitter"
            value={socialLinks.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/username"
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;
