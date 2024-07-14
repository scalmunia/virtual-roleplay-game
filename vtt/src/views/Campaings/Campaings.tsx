import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { Campaing } from "../../core/domain/campaing/Campaing";
import { createDoc } from "../../hooks/createDoc";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "reactfire";

const Campaings = () => {
  const firestore = useFirestore();

  const { data: campaings } = useCollection<Campaing>('campaings');
  const currentDate = new Date().toISOString();

  const campaingData: Omit<Campaing, 'id'> = {
    mapUrl: 'https://mapas.com/mapa.jpg',
    createdAt: currentDate,
    updatedAt: currentDate,
    name: 'campaña1'
  }

  // const createCampaing = () => createDoc('campaings', campaingData) as MouseEventHandler<HTMLButtonElement>;
  function createCampaing() {
    createDoc('campaings', campaingData) as any;
  }

  const deleteCampaings = async () => {
    const q = query(collection(firestore, 'campaings'), where('name', '==', 'campaña1'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No se encontraron campañas para borrar.');
      return;
    }

    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(firestore, 'campaings', document.id))
    });
  }

  return (
    <>
      <div className="Campaings">Campaings</div>
      <pre>{JSON.stringify(campaings, null, 2)}</pre>

      <h2>Campañas</h2>
      {/* <ul>
          {campaings.map((campaing) =>
              <li>Nombre: {campaing.name}</li>
          )}
      </ul> */}
      <button onClick={createCampaing}>Crear campaña</button>
      <button onClick={deleteCampaings}>Eliminar campañas</button>

    </>
  );
};

export default Campaings;
