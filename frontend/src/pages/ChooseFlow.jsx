import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";

function ChooseFlow() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <TopNav />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Choose Your Generation Flow
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your details are saved! How would you like to build your portfolio?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Edit Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center group cursor-pointer">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              ✏️
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Update Details</h2>
            <p className="text-gray-600 mb-6 flex-grow text-sm">
              Add new projects, update your experience, or change your skills in your saved profile.
            </p>
            <Link
              to="/userinfo"
              className="w-full py-3 px-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              Edit Form
            </Link>
          </div>

          {/* Card 2: Direct Generation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center group cursor-pointer">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Direct Preview</h2>
            <p className="text-gray-600 mb-6 flex-grow text-sm">
              Instantly preview and download your portfolio using your saved information. No AI modifications.
            </p>
            <Link
              to="/preview"
              className="w-full py-3 px-4 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Skip AI & Preview
            </Link>
          </div>

          {/* Card 3: AI Optimization */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-blue-100 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] tracking-wider font-bold px-2 py-1 rounded-bl-lg">
              RECOMMENDED
            </div>
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🤖
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">AI Tailoring</h2>
            <p className="text-gray-600 mb-6 flex-grow text-sm">
              Upload a Job Description and our AI will automatically optimize your achievements to match.
            </p>
            <Link
              to="/jd-upload"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
            >
              Optimize with AI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseFlow;
