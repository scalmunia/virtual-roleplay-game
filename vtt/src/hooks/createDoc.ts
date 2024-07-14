import { CollectionReference, DocumentData, collection, doc, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

export function useFirebaseMutation<D = DocumentData>() {
  const firestore = useFirestore();

  function saveDoc(path: string, data: any) {
    const ref = collection(firestore, path) as CollectionReference<D>;
    return setDoc(doc(ref), data);
  }

  return { saveDoc }
}