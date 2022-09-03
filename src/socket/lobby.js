import { socket } from "./socketIoClient";

export function joinLobby(lobbyName, playerName) {
  socket.emit("join-lobby", lobbyName, playerName);
}

export function createLobby(name) {
  socket.emit("create-lobby", name);
}

export function removeLobby() {
  socket.emit("close-lobby");
}

export function removePlayer(id) {
  socket.emit("remove-player", id);
}
