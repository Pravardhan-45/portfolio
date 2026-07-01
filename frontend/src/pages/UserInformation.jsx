import PersonalInfo from "../components/PersonalInfo";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";

function UserInformation() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Portfolio Details
        </h1>

        <PersonalInfo />

        <Education />

        <Skills />

        <Projects />

        <Experience />

        <div className="text-center mt-8">
          <button
            className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700"
          >
            Save Portfolio
          </button>
        </div>

      </div>

    </div>
  );
}

export default UserInformation;