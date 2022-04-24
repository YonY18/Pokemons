import pikaLoader from '../Imagenes/loading.gif'
import estilos from "../Estilos/Loading.module.css";

function Loading() {
    return (
        <div className={estilos.spinner}>
            <img 
				src={pikaLoader}
				alt='Pikachu loader'
                width="300"
                height="250"
			/>
            
        </div> 
    )
}

export default Loading;