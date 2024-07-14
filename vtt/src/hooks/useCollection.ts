import { CollectionReference, DocumentData, QueryConstraint, collection, query, setDoc } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { Campaing } from "../core/domain/campaing/Campaing";

export function useCollection<D = DocumentData>(path: string, ...queryConstraints: QueryConstraint[]) {
  // https://github.com/FirebaseExtended/reactfire/blob/HEAD/docs/use.md#show-a-list-of-data-collection
  const firestore = useFirestore();

  // https://firebase.google.com/docs/firestore/query-data/queries?hl=es
  const ref = collection(firestore, path) as CollectionReference<D>;
  const q = query<D>(ref, ...queryConstraints);

  // react fire hook
  const result = useFirestoreCollectionData<D>(q, { idField: 'id' });


  return { ...result };
}