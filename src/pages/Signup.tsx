import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOptionalAuth } from "../auth/useAuth";

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(120),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Min 6 characters"),
    confirm: z.string().min(6, "Min 6 characters"),
    agree: z.boolean().refine((v) => v, "You must agree to continue"),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Passwords must match",
  });

type SignupInput = z.infer<typeof signupSchema>;

const FieldError: React.FC<{ message?: string }> = ({ message }) =>
  message ? (
    <span className="small" style={{ color: "salmon" }}>{message}</span>
  ) : null;

const SocialButton: React.FC<{ label: string }> = ({ label }) => (
  <button type="button" className="icon-btn icon-50" aria-label={label}>
    {label}
  </button>
);

const Signup: React.FC = () => {
  const { loginWithRedirect } = useOptionalAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema) as any,
    defaultValues: { name: "", email: "", password: "", confirm: "", agree: false },
  });

  const onSubmit = (_: SignupInput) => {
    // Delegate to Auth0 hosted signup if configured
    try {
      // @ts-expect-error allow options in real Auth0 env
      loginWithRedirect?.({ authorizationParams: { screen_hint: "signup" } });
    } catch {
      // no-op in dev fallback
    }
  };

  return (
    <div className="container auth-hero" style={{ paddingTop: 120 }}>
      <div className="panel auth-card panel-lg">
        <h2 style={{ marginTop: 0, marginBottom: 6, fontSize: 28 }}>Create your Account</h2>
        <p className="small" style={{ marginTop: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <h3 style={{ marginTop: 24, marginBottom: 12, fontSize: 18 }}>Sign Up with Social Media</h3>
        <div className="row">
          <button
            className="btn"
            type="button"
            onClick={() => {
              try {
                // @ts-expect-error pass through to Auth0 when configured
                loginWithRedirect?.({ authorizationParams: { screen_hint: "signup", connection: "google-oauth2" } });
              } catch {}
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#g)">
                  <path d="M18 9.2c.01-.62-.055-1.237-.195-1.84H9.184v3.34h5.06c-.096.586-.312 1.146-.634 1.648a4.45 4.45 0 01-1.243 1.272l-.018.112 2.726 2.07.189.019C17 14.25 18 11.94 18 9.2z" fill="#4285F4"/>
                  <path d="M9.184 18c2.479 0 4.56-.8 6.081-2.18l-2.898-2.2c-.775.53-1.816.9-3.183.9-1.161-.006-2.29-.37-3.228-1.041a4.86 4.86 0 01-1.996-2.697l-.108.009-2.834 2.15-.037.101C2.014 14.53 3.186 15.785 4.635 16.66 6.084 17.536 7.753 18 9.455 18h-.271z" fill="#34A853"/>
                  <path d="M3.959 10.78A6.8 6.8 0 013.652 9c.004-.605.104-1.205.296-1.78l-.005-.12L1.073 4.916l-.093.044C.336 6.213 0 7.597 0 9c0 1.403.336 2.787.98 4.04l2.979-2.26z" fill="#FBBC05"/>
                  <path d="M9.184 3.48c1.316-.02 2.589.46 3.551 1.34l2.592-2.48C13.664.811 11.463-.027 9.184 0A8.48 8.48 0 004.364 1.34 8.24 8.24 0 00.98 4.96l2.97 2.26c.363-1.082 1.064-2.025 2.003-2.696.939-.671 2.069-1.036 3.231-1.044z" fill="#EB4335"/>
                </g>
                <defs>
                  <clipPath id="g"><rect width="18" height="18" fill="#fff"/></clipPath>
                </defs>
              </svg>
              <span>Sign up with Google</span>
            </span>
          </button>
          <SocialButton label="f" />
          <SocialButton label="x" />
          <SocialButton label="in" />
        </div>

        <div className="auth-divider" style={{ margin: "18px 0" }}>
          <span className="text">Or create account with email</span>
        </div>

        <form className="grid cols-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid">
            <label>
              Full Name
              <input className="input underline" placeholder="Jhon Andrio" {...register("name")} />
            </label>
            <FieldError message={errors.name?.message} />
          </div>
          <div className="grid">
            <label>
              Email Address
              <input className="input underline" placeholder="jhonandrio@domain.com" type="email" {...register("email")} />
            </label>
            <FieldError message={errors.email?.message} />
          </div>
          <div className="grid">
            <label>
              Password
              <input className="input underline" placeholder="**********" type="password" {...register("password")} />
            </label>
            <FieldError message={errors.password?.message} />
          </div>
          <div className="grid">
            <label>
              Retype Password
              <input className="input underline" placeholder="**********" type="password" {...register("confirm")} />
            </label>
            <FieldError message={errors.confirm?.message} />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label className="row" style={{ alignItems: "center" }}>
              <input type="checkbox" {...register("agree")} />
              <span className="small">
                By creating account means you agree to the Terms and Conditions and our Privacy Policy
              </span>
            </label>
            <FieldError message={errors.agree?.message} />
          </div>
          <div className="row" style={{ justifyContent: "flex-end", gridColumn: "1/-1" }}>
            <button className="btn primary" type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
