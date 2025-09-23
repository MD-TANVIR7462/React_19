export const fetchItems = async (endpoint) => {
  try {
    const result = await fetch(`${endpoint}`);
    const res = result.json();
    return res;
  } catch (err) {
    alert("Cant fetch data!");
  }
};
export const getAllProductsFromDB = async (query) => {
  try {
    const res = await fetch(
      `https://shipfinity-backend.vercel.app/api/products?search=${query}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};
