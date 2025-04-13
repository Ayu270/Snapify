import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, orderBy, query, where, } from "firebase/firestore";

export const getProduct = async ({ id }) => {
  const data = await getDoc(doc(db, `products/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};


export const getFeaturedProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), where("isFeatured", "==", true))
  );
  return list.docs.map((snap) => snap.data());
};

export const getProducts = async () => {
  const list = await getDocs(query(collection(db, "products"), orderBy("timestampCreate", "asc")));//desc
  return list.docs.map((snap) => snap.data());
}; 

export const getProductsByCategory = async ({ categoryId }) => {
  const list = await getDocs(query(collection(db, "products"), orderBy("timestampCreate", "asc"), where("categoryId", "==", categoryId)));//desc
  return list.docs.map((snap) => snap.data());
}; 


export const getProductssByCategory = async ({ categoryId }) => {
    const list = await getDocs(query(collection(db, "products"), orderBy("timestampCreate", "asc"), where("categoryId", "==", categoryId)));//desc
    const products = list.docs.map((snap) => snap.data());

  const shuffledProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);

  return shuffledProducts;
  }; 

export const getProductsByBrand = async ({ brandId }) => {
  if (!brandId) {
    console.error("Error: brandId is undefined or null.");
    return [];
  }

  const q = query(
    collection(db, "products"), 
    where("brandId", "==", brandId),  
    orderBy("timestampCreate", "asc") 
  );

  const list = await getDocs(q);
  return list.docs.map((snap) => snap.data());
};

