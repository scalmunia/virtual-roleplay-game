import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getStorage, ref } from "firebase/storage";

export async function uploadsFilesController(req: Request, res: Response) {
  try {
    console.clear();
    console.log('ENTRANDO EN SERVIDOR -> uploadsFilesController')
    // console.log('fileName', req.file?.originalname);

    //Obtener el token de la cabecera
    const authorization = req.header('Authorization') as string;

    // Sacar solo el token
    const token = authorization.replace('Bearer ', '');

    //Sacar el id a partir del token
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };

    if (!decodedToken) {
      console.log('NO HAY TOKEN');
      res.status(401);
    }

    const imageName = req.file?.originalname;
    console.log('imageName', imageName);

    // // ALMACENAMIENTO DE IMAGENES EN FIREBASE
    // // Obtener una referencia al servicio de almacenamiento
    // const storage = getStorage();
    // console.log('storage', storage);

    // // Crear la referencia para la imágenes
    // const imagesRef = ref(storage, 'images/imagesRef');
    // console.log('imagesRef', imagesRef);

    // // Crear una referencia de almacenamiento desde el servicio de almacenamiento
    // const fileName = 'space.jpg';
    // const spaceRef = ref(imagesRef, fileName); // Apunta a 'images/space.jpg'
    // // const spaceRef = ref(storage, 'images/space.jpg');
    // console.log('fileName', fileName);
    // console.log('spaceRef', spaceRef);



    // // File path is 'images/space.jpg'
    // const path = spaceRef.fullPath;
    // console.log('path', path);

    // // File name is 'space.jpg'
    // const name = spaceRef.name;
    // console.log('name', name);

    // // Points to 'images'
    // const imagesRefAgain = spaceRef.parent;
    // console.log('imagesRefAgain', imagesRefAgain);



  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}





