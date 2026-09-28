export const searchProducts = async (query, { limit = 0, signal } = {}) => {
  const params = new URLSearchParams({ q: query });
  params.set("limit", String(limit));

  const response = await fetch(`https://dummyjson.com/products/search?${params}`, { signal });
  if (!response.ok) throw new Error("Product search is currently unavailable.");

  const data = await response.json();
  return data.products || [];
};