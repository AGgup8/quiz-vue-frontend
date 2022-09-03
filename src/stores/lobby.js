import { defineStore } from "pinia";

export const useLobbyStore = defineStore("lobby", {
  state: () => ({
    id: null,
    name: null,
    question: {
      text: null,
      pictureUrl: null,
      options: [],
      correctAnswer: null,
    },
    players: [],
    hasQuestionStarted: false,
    hasQuestionEnded: false,
    isShowingAnswer: false,
  }),

  getters: {
    isLobbyActive: state => (state.name !== null) ? true : false
  },

  actions: {
    setState(lobby) {
      this.id = lobby._id;
      this.name = lobby.name;
      this.players = lobby.players;
      this.question = lobby.question;
      this.hasQuestionStarted = lobby.hasQuestionStarted;
      this.hasQuestionEnded = lobby.hasQuestionEnded;
      this.isShowingAnswer = lobby.isShowingAnswer;
    }
  },
});
