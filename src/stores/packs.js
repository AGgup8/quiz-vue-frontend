import { defineStore } from 'pinia';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:3000/api/packs';

export const usePackStore = defineStore("packs", {
  id: 'packs',

  state: () => ({
    packs: [
      {
        id: "54nvd6",
        name: "Pack 1",
        questions: [
          {
            id: "fbgjn4",
            text: "How many lions are there in Trafalgar Square?",
            pictureUrl: "",
            options: ["2", "3", "4", "6"],
            answer: "4"
          },
          {
            id: "piu2h7",
            text: "What is the capital of Bulgaria?",
            pictureUrl: "",
            options: [],
            answer: "Sofia"
          }
        ]
      },
      {
        id: "gr5gfk",
        name: "Pack 2",
        questions: [
          {
            id: "flw2h3",
            text: "What is the capital of Bulgaria?",
            pictureUrl: "",
            options: [],
            answer: "Sofia"
          }
        ]
      }
    ]
  }),

  getters: {
    getPacks: (state) => { return state.packs }
  },

  actions: {
    async fetchPacks() {
      try {
        const res = await axios.get(`${baseUrl}`);
        this.packs = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async saveQuestion(id, isMultipleChoice) {
      try {
        const pack = this.packs.find((pack) => {
          return pack.questions.find((question) => {
            return question.id == id;
          });
        });
        const question = pack.questions.find((question) => {
          return question.id == id;
        });
        console.log(question);
        // const res = await axios.put(`${baseUrl}/${id}`, { question });
        // this.packs = res.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
})
