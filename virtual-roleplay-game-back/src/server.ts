import app from "./app";

//Inicializacion del servidor
const server = app.listen(app.get("port"), () => {
	console.log("Running at http://localhost:%d in %s mode", app.get("port"), app.get("env")
	);
	console.log("  Press CTRL-C to stop\n");
});

export default server;
