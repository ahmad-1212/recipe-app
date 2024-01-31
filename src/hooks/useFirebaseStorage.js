import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

export const useFirebaseStorage = () => {
  const storage = getStorage();

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
    const res = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef, res.ref);
    return { url, name: res.metadata.name };
  };

  const deleteImage = async (imageName) => {
    const deleteRef = ref(storage, `images/${imageName}`);
    await deleteObject(deleteRef);
  };

  return { uploadImage, deleteImage };
};
