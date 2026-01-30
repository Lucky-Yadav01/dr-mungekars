const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function fetchDentalImages(query, count = 6) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=${count}&orientation=landscape&client_id=${ACCESS_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch images from Unsplash");
  }

  const data = await response.json();
  return data.results;
}
