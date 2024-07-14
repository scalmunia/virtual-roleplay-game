import { CollectionReference, DocumentData, collection, doc, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

export function createDoc<D = DocumentData>(path: string, data: any) {
  const firestore = useFirestore();
  const ref = collection(firestore, path) as CollectionReference<D>;
  const createDoc = setDoc(doc(ref), data);

  console.log('Documento creado', createDoc);
}