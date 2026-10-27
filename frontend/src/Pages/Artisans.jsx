import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiMapPin, FiSearch, FiStar } from "react-icons/fi";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { getArtisans, getCategories } from "../api/directory";
import fallbackImage from "../assets/artisan1.png";

const Artisans = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const city = searchParams.get("city") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError("");

    getArtisans({ search, city, category })
      .then((data) => {
        if (active) setArtisans(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [search, city, category]);

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#f36b21]">Find a professional</p>
          <h1 className="mt-2 text-3xl font-bold text-[#07162e] sm:text-4xl">
            Browse artisans
          </h1>
          <p className="mt-3 text-gray-600">Search trusted professionals for the service you need.</p>
        </div>

        <div className="mb-8 grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-3">
          <label className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-orange-500">
            <FiSearch className="text-gray-500" />
            <input
              value={search}
              onChange={(event) => updateFilter("search", event.target.value)}
              placeholder="Search artisans or services"
              className="w-full outline-none"
            />
          </label>
          <label className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-orange-500">
            <FiMapPin className="text-gray-500" />
            <input
              value={city}
              onChange={(event) => updateFilter("city", event.target.value)}
              placeholder="City, e.g. Lagos"
              className="w-full outline-none"
            />
          </label>
          <select
            value={category}
            onChange={(event) => updateFilter("category", event.target.value)}
            className="h-12 rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-orange-500"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.slug}>{item.name}</option>
            ))}
          </select>
        </div>

        {error && <p className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
        {isLoading && <p className="text-gray-500">Loading artisans...</p>}
        {!isLoading && !error && artisans.length === 0 && (
          <p className="rounded-xl bg-white p-6 text-gray-600 shadow-sm">No artisans match these filters yet.</p>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artisans.map((artisan) => (
            <article key={artisan.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <img
                src={artisan.profileImageUrl || fallbackImage}
                alt={artisan.businessName}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-lg font-bold text-[#172033]">{artisan.businessName}</h2>
                <p className="mt-1 text-sm text-gray-600">{artisan.categories.map((item) => item.name).join(", ")}</p>
                <p className="mt-3 flex items-center gap-2 text-sm text-gray-500"><FiMapPin className="text-[#f36b21]" />{artisan.city}{artisan.state ? `, ${artisan.state}` : ""}</p>
                <p className="mt-3 flex items-center gap-1 text-sm font-semibold text-gray-700"><FiStar className="fill-[#f9a825] text-[#f9a825]" />{artisan.averageRating.toFixed(1)} <span className="font-normal text-gray-400">({artisan.reviewCount})</span></p>
                <Link
                  to={`/artisans/${artisan.id}`}
                  className="mt-5 inline-flex rounded-lg bg-[#f36b21] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d95716]"
                >
                  View profile
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Artisans;
