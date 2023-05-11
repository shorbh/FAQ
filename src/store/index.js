import { createStore } from 'vuex';

const state = () => {
  return {
    faqList: [],
  };
};

const actions = {
  fetchFaqList(context) {
    const faqList = JSON.parse(localStorage.getItem('faq')) || [];
    context.commit('addFaq', faqList);
  },
  createFaq(context, payload) {
    context.commit('createFaq', payload);
  },
  editFaq(context, payload) {
    context.commit('editFaq', payload);
  },
  deleteFaq(context, payload) {
    context.commit('deleteFaq', payload);
  },
};
const mutations = {
  addFaq(state, data) {
    state.faqList = data;
  },
  createFaq(state, data) {
    state.faqList.push(data);
    localStorage.setItem('faq', JSON.stringify(state.faqList));
  },
  editFaq(state, data) {
    state.faqList[data.id] = data.faq;
    localStorage.setItem('faq', JSON.stringify(state.faqList));
  },
  deleteFaq(state, data) {
    state.faqList = state.faqList.filter((faq, index) => index !== data.id);
    localStorage.setItem('faq', JSON.stringify(state.faqList));
  },
};

const store = createStore({
  state,
  actions,
  mutations,
});

export default store;
