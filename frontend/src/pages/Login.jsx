import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setCredentials }from '../features/auth/authSlice';

const schema = z.object({
  emailOrUsername: z.string().min(1, "Email or Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });


  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
        dispatch(setCredentials({
          user: JSON.parse(storedUser)
        }));
        navigate("/");
        setLoading(false);
        return;
    }
    try {
      await login(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-zinc-500 text-sm mb-6">Sign in to your account</p>

        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-zinc-400 text-sm mb-1 block">Email or Username</label>
            <input
              {...register("emailOrUsername")}
              type="text"
              className="w-full bg-zinc-800 text-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="john@example.com"
            />
            {errors.emailOrUsername && (
              <p className="text-red-400 text-xs mt-1">
                {errors.emailOrUsername.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-1 block">Password</label>
            <input
              {...register("password")}
              type="password"
              className="w-full bg-zinc-800 text-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-zinc-500 text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-400 hover:text-red-300">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login