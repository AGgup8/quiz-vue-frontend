import { defineStore } from 'pinia';

export const usePlayerStore = defineStore("player", {
  state: () => ({
    lobbyId: null,
    playerId: null,
    name: null,
    answer: null,
    score: 0,
    isCorrect: false
  }),

  getters: {
    hasJoined: (state) => (((state.name) && (state.name.length > 0)) ? true : false),
  },

  actions: {
    updatePlayer(lobby) {
      const player = lobby.players.find(player => (player.name == this.name));
      if (player) {
        this.playerId = player._id;
        this.name = player.name;
        this.score = player.score;
        this.answer = player.answer;
        this.isCorrect = player.correct;
      } else {
        this.id = null;
        this.name = null;
        this.score = null;
        this.answer = null;
        this.isCorrect = null;
        sessionStorage.removeItem("playerId");
      }
    },

    savePlayer(player) {
      this.playerId = player._id;
      this.name = player.name;
      this.score = player.score;
      this.answer = player.answer;
      this.isCorrect = player.correct;
      sessionStorage.setItem("playerId", player._id);
    }
  }
})