import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { getMyServiceRequests, updateServiceRequestStatus } from "../api/requests";

const ArtisanDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const loadRequests = () => {
    setError("");
    getMyServiceRequests().then(setRequests).catch((requestError) => setError(requestError.message));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const changeStatus = async (requestId, status) => {
    setUpdatingId(requestId);
    setError("");
    try {
      const updatedRequest = await updateServiceRequestStatus(requestId, status);
      setRequests((current) => current.map((item) => item.id === requestId ? { ...item, ...updatedRequest } : item));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#f36b21]">Artisan portal</p>
            <h1 className="mt-2 text-3xl font-bold text-[#07162e]">Incoming service requests</h1>
            <p className="mt-2 text-gray-600">Respond to requests from potential clients.</p>
          </div>
          <Link to="/artisan/profile" className="rounded-lg bg-[#f36b21] px-4 py-2.5 font-semibold text-white hover:bg-[#d95716]">Edit profile</Link>
        </div>

        {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
        {!error && requests.length === 0 && <p className="mt-6 rounded-xl bg-white p-6 text-gray-500 shadow-sm">You have no incoming requests yet.</p>}

        <div className="mt-6 space-y-4">
          {requests.map((serviceRequest) => (
            <article key={serviceRequest.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">From {serviceRequest.client.name}</p>
                  <h2 className="mt-1 text-xl font-bold text-[#07162e]">{serviceRequest.title}</h2>
                </div>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold capitalize text-orange-600">{serviceRequest.status}</span>
              </div>
              <p className="mt-4 whitespace-pre-line leading-7 text-gray-700">{serviceRequest.message}</p>
              <p className="mt-4 text-sm text-gray-500">{serviceRequest.client.email}</p>

              {serviceRequest.status === "pending" && (
                <div className="mt-5 flex gap-3">
                  <button disabled={updatingId === serviceRequest.id} onClick={() => changeStatus(serviceRequest.id, "accepted")} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">Accept</button>
                  <button disabled={updatingId === serviceRequest.id} onClick={() => changeStatus(serviceRequest.id, "declined")} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-60">Decline</button>
                </div>
              )}
              {serviceRequest.status === "accepted" && (
                <button disabled={updatingId === serviceRequest.id} onClick={() => changeStatus(serviceRequest.id, "completed")} className="mt-5 rounded-lg bg-[#07162e] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">Mark completed</button>
              )}
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArtisanDashboard;
