import { useReducer } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { useFirebaseStorage } from "./useFirebaseStorage";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
  deleted: false,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
        deleted: false,
      };
    case "ADDED": {
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
        deleted: false,
      };
    }
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
        deleted: false,
      };
    case "DELETED":
      return {
        isPending: false,
        document: null,
        success: false,
        error: null,
        deleted: true,
      };
    default:
      return { ...state };
  }
};

// This hook is use to add or delete any document 'recipe' from firestore

export const useFirestore = (collectionName) => {
  const [response, dispatchResponse] = useReducer(
    firestoreReducer,
    initialState
  );
  const { deleteImage, uploadImage } = useFirebaseStorage();
  // collection reference
  const ref = collection(db, collectionName);

  // Add a document

  const addDocument = async (doc) => {
    dispatchResponse({ type: "IS_PENDING" });

    try {
      const createdAt = Timestamp.fromDate(new Date());
      if (doc.file) {
        const res = await uploadImage(doc.file);
        doc.image_name = res.name;
        doc.image_url = res.url;
        delete doc.file;
      }
      const addedDoc = await addDoc(ref, { ...doc, createdAt });

      dispatchResponse({ type: "ADDED", payload: addedDoc });
    } catch (err) {
      console.log(err);
      dispatchResponse({ type: "ERROR", payload: err.message });
    }
  };

  // Delete a Document
  const deleteDocument = async (id, imageName) => {
    dispatchResponse({ type: "IS_PENDING" });
    try {
      const docRef = doc(ref, id);
      await deleteImage(imageName);
      await deleteDoc(docRef);
      dispatchResponse({ type: "DELETED" });
    } catch (err) {
      dispatchResponse({ type: "ERROR", payload: err.message });
    }
  };

  return { addDocument, deleteDocument, response };
};
