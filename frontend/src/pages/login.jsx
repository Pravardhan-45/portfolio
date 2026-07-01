import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Portfolio Builder
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <Link to="/dashboard">
  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
    Login
  </button>
</Link>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;