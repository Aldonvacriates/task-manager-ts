import React from "react";
import SigninForm from "../components/SigninForm";
import { isAuthConfigured } from "../auth/useAuth";

const Signin: React.FC = () => {
  const configured = isAuthConfigured();
  return (
    <section
      className="wow fadeInUp pt-[120px] lg:pt-[240px]"
      data-wow-delay=".2s"
    >
      <div className="px-4 xl:container">
        <div className="border-b pb-20 dark:border-[#2E333D] lg:pb-[130px]">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[920px] rounded border bg-white px-6 py-10 dark:border-transparent dark:bg-[#1D232D] sm:p-[70px]">
                {!configured && (
                  <div className="panel" style={{ marginBottom: 12 }}>
                    <strong>Auth0 not configured.</strong> Update{" "}
                    <code>.env.local</code> with Auth0 vars or use the dev
                    fallback.
                  </div>
                )}
                <SigninForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
