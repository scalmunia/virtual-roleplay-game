import { Campaing } from "../../core/domain/campaing/Campaing";
import { useCollection } from "../../hooks/useCollection";

const Campaings = () => {
    const { data: campaings } = useCollection<Campaing>('campaings');
    
    return (
        <>
            <div className="Campaings">Campaings</div>
            <pre>{JSON.stringify(campaings, null, 2)}</pre>

            <h2>Campañas</h2>
            <ul>
                {campaings.map((campaing) => 
                    <li>Nombre: {campaing.name}</li>
                )}
            </ul>
        </>
    );
};

export default Campaings;
