import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import firebase from "../../clients/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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


    // ALMACENAMIENTO DE IMAGENES EN FIREBASE
    // Obtener una referencia al servicio de almacenamiento
    const storage = firebase;

    // Crear la referencia para la imágenes
    const imageName = req.file?.originalname;
    const imagesRef = ref(storage, `images/${imageName}`);




    // Crear una referencia de almacenamiento desde el servicio de almacenamiento
    // const spaceRef = ref(imagesRef, imageName); // Apunta a 'images/space.jpg' 

    // // File path is 'images/space.jpg'
    // const path = spaceRef.fullPath;
    // console.log('path', path);

    // // File name is 'space.jpg'
    // const name = spaceRef.name;
    // console.log('name', name);



    // Subir la imagen a Firebase
    const image = req.file;
    console.log('image', image);
    if (!image) return;

    //buffer permite acceder a los datos binarios del archivo de imagen y proporcionarlos directamente a Firebase Storage para cargarlos
    uploadBytes(imagesRef, image.buffer).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    // getDownloadURL(uploadBytes.snapshot.ref).then((downloadURL) => {
    //   console.log('File available at', downloadURL);
    // });



  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}





