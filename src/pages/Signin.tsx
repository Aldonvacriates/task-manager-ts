import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";

const signinSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
  remember: z.boolean().optional(),
});

type SigninInput = z.infer<typeof signinSchema>;

const FieldError: React.FC<{ message?: string }> = ({ message }) =>
  message ? (
    <span className="small" style={{ color: "salmon" }}>{message}</span>
  ) : null;

const SocialIconBtn: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => (
  <button type="button" className="icon-btn icon-50" aria-label={label} onClick={onClick}>
    {label}
  </button>
);

const Signin: React.FC = () => {
  const n = useNavigate();
  const configured = isAuthConfigured();
  const { loginWithRedirect } = useOptionalAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<SigninInput>({
    resolver: zodResolver(signinSchema) as any,
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data: SigninInput) => {
    try {
      await loginWithRedirect({
        authorizationParams: { login_hint: data.email },
      });
      if (!configured) {
        n("/");
      }
    } catch {
      n("/");
    }
  };

  return (
    <div className="container auth-hero" style={{ paddingTop: 120 }}>
      <div className="panel auth-card panel-lg">
        <h2 style={{ marginTop: 0, marginBottom: 6, fontSize: 28 }}>Sign in to your Account</h2>
        <p className="small" style={{ marginTop: 0 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <h3 style={{ marginTop: 24, marginBottom: 12, fontSize: 18 }}>Sign in with Social Media</h3>
        <div className="row" style={{ marginBottom: 12 }}>
          <button
            className="btn"
            type="button"
            onClick={() => {
              try {
                loginWithRedirect({
                  authorizationParams: { connection: "google-oauth2" },
                });
                if (!configured) {
                  n("/");
                }
              } catch {}
            }}
          >
            <span>Sign in with Google</span>
          </button>
          <SocialIconBtn label="x" />
          <SocialIconBtn label="f" />
          <SocialIconBtn label="in" />
        </div>

        <div className="auth-divider" style={{ margin: "18px 0" }}>
          <span className="text">Or Sign in with your email</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid cols-2">
          <div className="grid">
            <label>
              Email Address
              <input className="input underline" type="email" placeholder="hello@aldowebsite.com" {...register("email")} />
            </label>
            <FieldError message={errors.email?.message} />
          </div>
          <div className="grid">
            <label>
              Password
              <input className="input underline" type="password" placeholder="**********" {...register("password")} />
            </label>
            <FieldError message={errors.password?.message} />
          </div>
          <div className="row" style={{ gridColumn: "1/-1", alignItems: "center" }}>
            <label className="row" style={{ alignItems: "center" }}>
              <input type="checkbox" {...register("remember")} />
              <span className="small">Keep me signed in</span>
            </label>
            <a href="#" className="small" style={{ marginLeft: "auto" }}>Forgot Password?</a>
          </div>
          <div className="row" style={{ gridColumn: "1/-1", justifyContent: "flex-end" }}>
            <button className="btn primary" type="submit">Sign In Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
