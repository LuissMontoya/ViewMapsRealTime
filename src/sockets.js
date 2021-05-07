let number = 0;

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Nuevo Usuario Conectado");

        number++;
        console.log("Usuarios : ", number);

        socket.on("userCoordinates", (coords) => {
            console.log(coords);
            socket.broadcast.emit("newUserCoordinates", coords);
        });

        socket.on("disconnect", () => {
            let message = "Ha salido un Usuario";
            --number;
            console.log("Usuarios #: ", number);
            socket.broadcast.emit("Bay", { message });
            console.log("Usuario se ha Desconectado");
        });
    });
};