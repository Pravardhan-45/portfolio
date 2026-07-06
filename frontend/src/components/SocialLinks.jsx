import { usePortfolio } from '../context/PortfolioContext';

function SocialLinks() {
  const { socialLinks, setSocialLinks } = usePortfolio();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Social Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">GitHub</label>
          <input
            id="input-github"
            type="url"
            name="github"
            value={socialLinks.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div>
          <label className="font-semibold">LinkedIn</label>
          <input
            id="input-linkedin"
            type="url"
            name="linkedin"
            value={socialLinks.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div>
          <label className="font-semibold">Portfolio</label>
          <input
            id="input-portfolio"
            type="url"
            name="portfolio"
            value={socialLinks.portfolio}
            onChange={handleChange}
            placeholder="https://your-portfolio.com"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div>
          <label className="font-semibold">Twitter (Optional)</label>
          <input
            id="input-twitter"
            type="url"
            name="twitter"
            value={socialLinks.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/username"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;
