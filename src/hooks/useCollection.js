import { useState, useEffect, useRef } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

// This hook is use for bringing all user related recipes if added any recipe

export const useCollection = (collectionName, _q) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // Use to Prevent creating an infinite loop
  // Prevent the array "as it is reference type" for creating again and again as component rerenders
  const q = useRef(_q).current;

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (q) {
      ref = query(ref, where(...q));
    }
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        setError(null);
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocument(results);
      },
      (err) => setError(err.message)
    );

    return () => unsub();
  }, [collectionName, q]);

  return { document, error };
};
