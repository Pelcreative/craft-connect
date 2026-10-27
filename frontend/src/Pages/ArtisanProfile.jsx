import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiMapPin, FiStar } from "react-icons/fi";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import fallbackImage from "../assets/artisan1.png";
import { getArtisan } from "../api/directory";
import { createServiceRequest } from "../api/requests";

const ArtisanProfile = () => {
  const { artisanId } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", message: "" });

  useEffect(() => {
    getArtisan(artisanId)
      .then(setArtisan)
      .catch((requestError) => setError(requestError.message));
  }, [artisanId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await createServiceRequest({ artisanId, ...form });
      setSuccess("Your service request has been sent.");
      setForm({ title: "", message: "" });
    } catch (requestError) {
      setFormError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <Link to="/artisans" className="text-sm font-semibold text-[#f36b21] hover:underline">← Back to artisans</Link>

        {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
        {!artisan && !error && <p className="mt-6 text-gray-500">Loading artisan profile...</p>}

        {artisan && (
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <img src={artisan.profileImageUrl || fallbackImage} alt={artisan.businessName} className="h-72 w-full object-cover" />
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#f36b21]">{artisan.categories.map((item) => item.name).join(", ")}</p>
                    <h1 className="mt-2 text-3xl font-bold text-[#07162e]">{artisan.businessName}</h1>
                    <p className="mt-1 text-gray-500">{artisan.name}</p>
                  </div>
                  <p className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-2 text-sm font-semibold text-gray-700"><FiStar className="fill-amber-400 text-amber-400" />{artisan.averageRating.toFixed(1)} ({artisan.reviewCount})</p>
                </div>
                <p className="mt-6 flex items-center gap-2 text-gray-600"><FiMapPin className="text-[#f36b21]" />{artisan.city}{artisan.state ? `, ${artisan.state}` : ""}</p>
                {artisan.bio && <p className="mt-6 whitespace-pre-line leading-7 text-gray-700">{artisan.bio}</p>}
              </div>
            </section>

            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#07162e]">Request a service</h2>
              <p className="mt-2 text-sm text-gray-600">Describe what you need. The artisan can accept or decline your request.</p>
              {formError && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{formError}</p>}
              {success && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{success}</p>}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <label className="block text-sm font-medium text-gray-700">What do you need?
                  <input required minLength="3" maxLength="160" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Traditional wedding outfit" className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#f36b21]" />
                </label>
                <label className="block text-sm font-medium text-gray-700">Tell them about the job
                  <textarea required minLength="10" maxLength="3000" rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Include dates, location, and any important details." className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#f36b21]" />
                </label>
                <button disabled={isSubmitting} className="w-full rounded-lg bg-[#f36b21] px-4 py-3 font-semibold text-white transition hover:bg-[#d95716] disabled:opacity-60">
                  {isSubmitting ? "Sending request..." : "Send request"}
                </button>
              </form>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ArtisanProfile;
