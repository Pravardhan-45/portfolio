import { usePortfolio } from '../context/PortfolioContext';

function AboutMe() {
  const { aboutMe, setAboutMe } = usePortfolio();

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">About Me</h2>
      <div>
        <label className="font-semibold">Summary</label>
        <textarea
          rows="5"
          name="aboutMe"
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder="Write a brief introduction about yourself"
          className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        ></textarea>
      </div>
    </div>
  );
}

export default AboutMe;
