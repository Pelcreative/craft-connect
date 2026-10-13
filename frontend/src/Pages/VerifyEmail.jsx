import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

import { verifyEmail } from "../api/auth.js";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "We are verifying your email address.",
  );

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("This verification link is missing its token.");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setStatus("success");
        setMessage(data.message);
      })
      .catch((error) => {
        setStatus("error");
        setMessage(error.message);
      });
  }, [searchParams]);

  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF9F4] px-4">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-[0_20px_60px_rgba(7,23,45,0.10)]">
        {status === "loading" && (
          <FiLoader
            className="mx-auto animate-spin text-[#F36B16]"
            size={42}
          />
        )}

        {isSuccess && (
          <FiCheckCircle
            className="mx-auto text-green-500"
            size={48}
          />
        )}

        {isError && (
          <FiAlertCircle
            className="mx-auto text-red-500"
            size={48}
          />
        )}

        <h1 className="mt-5 text-2xl font-bold text-[#07172D]">
          {isSuccess ? "Email verified" : "Email verification"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {message}
        </p>

        {isSuccess && (
          <Link
            to="/login"
            className="mt-7 inline-flex rounded-xl bg-[#F36B16] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#df5d0c]"
          >
            Continue to login
          </Link>
        )}

        {isError && (
          <Link
            to="/login"
            className="mt-7 inline-flex rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-[#07172D] transition hover:border-[#F36B16]"
          >
            Back to login
          </Link>
        )}
      </section>
    </main>
  );
};

export default VerifyEmail;