import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import firebase from "../../clients/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadsFilesController(req: Request, res: Response) {
  try {
    //Obtener el token de la cabecera
    const authorization = req.header('Authorization') as string;

    // Sacar solo el token
    const token = authorization.replace('Bearer ', '');

    //Sacar el id a partir del token
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };

    if (!decodedToken) {
      console.error('NO HAY TOKEN');
      res.status(401);
    }

    // ALMACENAMIENTO DE IMAGENES EN FIREBASE
    // Obtener una referencia al servicio de almacenamiento
    const storage = firebase;

    // Crear la referencia para la imágenes
    const imageName = req.file?.originalname;
    const imagesRef = ref(storage, `images/${imageName}`);

    const image = req.file;
    if (!image) return;

    // Subir la imagen a Firebase
    // buffer permite acceder a los datos binarios del archivo de imagen y proporcionarlos directamente a Firebase Storage para cargarlos
    const uploadResult = await uploadBytes(imagesRef, image.buffer);

    // Sacar la URL de la ubicación de la imágen en Firebase
    const result = await getDownloadURL(uploadResult.ref);

    res.status(200).send({ result: result });

  } catch (error) {
    console.error(error)
    res.status(500).send(error);
  }
}





