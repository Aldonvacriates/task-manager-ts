import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useOptionalAuth } from "../auth/useAuth";

const signinSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
  remember: z.boolean().optional(),
});

type SigninInput = z.infer<typeof signinSchema>;

const FieldError: React.FC<{ message?: string }> = ({ message }) =>
  message ? (
    <span className="small" style={{ color: "salmon" }}>
      {message}
    </span>
  ) : null;

export const SigninForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const n = useNavigate();
  const { loginWithRedirect } = useOptionalAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(signinSchema) as any,
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data: SigninInput) => {
    try {
      // loginWithRedirect is provided by the optional auth wrapper when Auth0 is configured.
      // When not configured the fallback implementation will throw; catch and navigate to dashboard.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (loginWithRedirect as any)?.({
        authorizationParams: { login_hint: data.email },
      });
    } catch {
      // Dev fallback: pretend sign-in and go to dashboard
      n("/");
    }
    onClose?.();
  };

  return (
    <div>
      <h2 style={{ marginTop: 0, marginBottom: 6, fontSize: 28 }}>
        Sign in to your Account
      </h2>
      <p className="small" style={{ marginTop: 0 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <h3 style={{ marginTop: 24, marginBottom: 12, fontSize: 18 }}>
        Sign in with Social Media
      </h3>
      <div className="row" style={{ marginBottom: 12 }}>
        <button
          className="btn"
          type="button"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (loginWithRedirect as any)?.({
              authorizationParams: { connection: "google-oauth2" },
            });
          }}
        >
          <span>Sign in with Google</span>
        </button>
      </div>

      <div className="auth-divider" style={{ margin: "18px 0" }}>
        <span className="text">Or Sign in with your email</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid cols-2">
        <div className="grid">
          <label>
            Email Address
            <input
              className="input underline"
              type="email"
              placeholder="jhonandrio@domain.com"
              {...register("email")}
            />
          </label>
          <FieldError message={errors.email?.message} />
        </div>
        <div className="grid">
          <label>
            Password
            <input
              className="input underline"
              type="password"
              placeholder="**********"
              {...register("password")}
            />
          </label>
          <FieldError message={errors.password?.message} />
        </div>
        <div
          className="row"
          style={{ gridColumn: "1/-1", alignItems: "center" }}
        >
          <label className="row" style={{ alignItems: "center" }}>
            <input type="checkbox" {...register("remember")} />
            <span className="small">Keep me signed in</span>
          </label>
          <a href="#" className="small" style={{ marginLeft: "auto" }}>
            Forgot Password?
          </a>
        </div>
        <div
          className="row"
          style={{ gridColumn: "1/-1", justifyContent: "flex-end" }}
        >
          <button className="btn primary" type="submit">
            Sign In Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
