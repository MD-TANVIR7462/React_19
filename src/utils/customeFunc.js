export const fetchItems = async (endpoint) => {
  try {
    const result = await fetch(`${endpoint}`);
    const res = result.json();
    console.log(res);
    return res;
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    alert("Cant fetch data!");
  }
};

export const usePromise = async(endpoint)=>{
const result = await fetch(`${endpoint}`);
const res = result.json();
return res;
}


export const getAllProductsFromDB = async (query) => {
  try {
    const res = await fetch(
      `https://shipfinity-backend.vercel.app/api/products2?search=${query}`
    );
    
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};
