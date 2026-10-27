import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { getCategories } from "../api/directory";
import { getMyArtisanProfile, saveArtisanProfile } from "../api/artisans";

const emptyProfile = {
  businessName: "",
  bio: "",
  city: "",
  state: "",
  profileImageUrl: "",
  categoryIds: [],
};

const ArtisanProfileSettings = () => {
  const [profile, setProfile] = useState(emptyProfile);
  const [categories, setCategories] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories).catch((requestError) => setError(requestError.message));
    getMyArtisanProfile()
      .then((artisan) => setProfile({
        businessName: artisan.businessName,
        bio: artisan.bio || "",
        city: artisan.city,
        state: artisan.state || "",
        profileImageUrl: artisan.profileImageUrl || "",
        categoryIds: artisan.categories.map((category) => category.id),
      }))
      .catch((requestError) => {
        if (requestError.message.includes("Create an artisan profile")) setIsNew(true);
        else setError(requestError.message);
      });
  }, []);

  const toggleCategory = (categoryId) => {
    setProfile((current) => {
      const selected = current.categoryIds.includes(categoryId);
      if (!selected && current.categoryIds.length === 5) return current;
      return {
        ...current,
        categoryIds: selected
          ? current.categoryIds.filter((id) => id !== categoryId)
          : [...current.categoryIds, categoryId],
      };
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSaving(true);
    try {
      await saveArtisanProfile(profile, isNew);
      setIsNew(false);
      setSuccess("Your artisan profile has been saved.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Link to="/artisan/dashboard" className="text-sm font-semibold text-[#f36b21] hover:underline">← Back to dashboard</Link>
        <h1 className="mt-5 text-3xl font-bold text-[#07162e]">{isNew ? "Create your artisan profile" : "Edit artisan profile"}</h1>
        <p className="mt-2 text-gray-600">Your profile appears in the public artisan directory.</p>

        {error && <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
        {success && <p className="mt-5 rounded-xl bg-green-50 p-4 text-green-700">{success}</p>}

        <form onSubmit={submit} className="mt-7 space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-700">Business name
            <input required value={profile.businessName} onChange={(event) => setProfile({ ...profile, businessName: event.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#f36b21]" />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">City
              <input required value={profile.city} onChange={(event) => setProfile({ ...profile, city: event.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#f36b21]" />
            </label>
            <label className="block text-sm font-medium text-gray-700">State
              <input value={profile.state} onChange={(event) => setProfile({ ...profile, state: event.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#f36b21]" />
            </label>
          </div>
          <label className="block text-sm font-medium text-gray-700">Profile image URL
            <input type="url" value={profile.profileImageUrl} onChange={(event) => setProfile({ ...profile, profileImageUrl: event.target.value })} placeholder="https://..." className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#f36b21]" />
          </label>
          <label className="block text-sm font-medium text-gray-700">About your business
            <textarea value={profile.bio} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} maxLength="2000" rows="5" className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#f36b21]" />
          </label>
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">Services offered (choose up to 5)</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {categories.map((category) => <label key={category.id} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700"><input type="checkbox" checked={profile.categoryIds.includes(category.id)} onChange={() => toggleCategory(category.id)} />{category.name}</label>)}
            </div>
          </fieldset>
          <button disabled={isSaving || profile.categoryIds.length === 0} className="w-full rounded-lg bg-[#f36b21] px-4 py-3 font-semibold text-white disabled:opacity-60">{isSaving ? "Saving..." : "Save profile"}</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ArtisanProfileSettings;
