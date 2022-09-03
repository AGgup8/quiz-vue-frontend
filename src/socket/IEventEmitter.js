import service from "./socketIoService";

// function socketIoAdapter(payload) {
//     return payload;
// }

export const IEventEmitter = {
    // hey view (high level module)
    // you can assume I am going to run the service
    // but you must give me the lobby and player names in a format that I can run through an adapter
    joinLobby: function(payload) {
        // const massagedData = socketIoAdapter(payload);

        // hey service (low level module)
        // i expect you have to a function called joinLobby
        // i will give you massaged data so you can do your job 
        service.joinLobby(payload);
    },

    createLobby: function(payload) {
        // const massagedData = socketIoAdapter(payload);
        service.createLobby(payload);
    }
}