import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-4"
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
          Register
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;