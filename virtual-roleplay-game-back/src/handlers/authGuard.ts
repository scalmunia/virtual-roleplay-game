export function authGuard(req: any, res: any, next:any) {
  // Lógica de seguridad
  try {
    const authorization = req.header('Authorization');

    // Comprobamos que nos han enviado la cabecera con el token
    if (!authorization) throw 'Falta cabecera Authorization con el token';

    // Tratamos de extraer el email y la fecha del token 
    const token = authorization.replace('Basic ', '');
    const credentials = atob(token);
    const [email, tokenDate] = credentials.split('/');

    // Comprobamos que ha extraído ambos datos, si no, significa que el token no es válido
    if (!tokenDate || !email) throw 'Token no válido';

    const aDay = 1000 * 60 * 60 * 24;
    const expirationDate = aDay; // Establecemos el tiempo de expiración (un día)

    const tokenDateAsTimestamp = new Date(tokenDate).getTime(); // La fecha del token, como timestamp
    const now = new Date().getTime(); // La fecha de "ahora", como timestamp

    // Comprobamos si el token ha expirado
    const timeFromTokenGeneration = now - tokenDateAsTimestamp;
    const isExpired = timeFromTokenGeneration > expirationDate;

    // Si el token ha expirado, se envía el error de token caducado
    if (isExpired) throw 'Token caducado';

    next(); // Si ha pasado todas las comprobaciones anteriores, ejecuta el siguiente "handler" del enpoint
  } catch (error) {
    
    // Si se ejecutan alguno de los "throw" del try a causa de que alguna de las comprobaciones falle
    // No se hará el "next()" al siguiente handler, y en su lugar se devolverá un error 401 (unauthorized)
    res.status(401).send({ error });

    return;
  }
};