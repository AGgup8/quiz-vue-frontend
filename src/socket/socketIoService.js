import { socket } from "./socketIoClient";

const socketIoService = {
  joinLobby: function(payload) {
    const { lobbyName, playerName } = payload;
    socket.emit("join-lobby", lobbyName, playerName);
  },

  createLobby: function(payload) {
    const { name } = payload;
    socket.emit("create-lobby", name);
  },

  removeLobby: function() {
    socket.emit("close-lobby");
  },

  removePlayer: function(payload) {
    const { id } = payload;
    socket.emit("remove-player", id);
  },

  showQuestion: function(payload) {
    const {
      question, answer, imageName, imageData, options
    } = payload;
    socket.emit("show-question", {
      question,
      answer,
      imageData,
      imageName,
      options
    });
  },

  submitAnswer: function(payload) {
    const { answer, timeElapsed } = payload;
    socket.emit("submit-answer", answer, timeElapsed);
  },

  endQuestion: function() {
    socket.emit("end-question");
  },

  showAnswer: function() {
    socket.emit("show-answer");
  },

  hideAnswer: function() {
    socket.emit("hide-answer");
  },

  toggleCorrect: function(payload) {
    const { playerId, correct } = payload;
    socket.emit("toggle-correct", playerId, correct);
  },

  nextQuestion: function() {
    socket.emit("next-question");
  },

  logout: function() {
    socket.emit("logout");
  }
};

export default socketIoService;
