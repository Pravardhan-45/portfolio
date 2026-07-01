import { usePortfolio } from '../context/PortfolioContext';

function AboutMe() {
  const { aboutMe, setAboutMe } = usePortfolio();

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">About Me</h2>
      <div>
        <label className="font-semibold">Summary</label>
        <textarea
          rows="5"
          name="aboutMe"
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder="Write a brief introduction about yourself"
          className="w-full border rounded-lg p-3 mt-2"
        ></textarea>
      </div>
    </div>
  );
}

export default AboutMe;
