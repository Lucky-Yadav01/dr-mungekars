import { useEffect, useState } from "react";
import { fetchDentalImages } from "../services/unsplash";

export default function useUnsplashImages(query, count = 6) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchDentalImages(query, count)
      .then(setImages)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [query, count]);

  return { images, loading, error };
}
