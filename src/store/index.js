import { createStore } from 'vuex';

const state = () => {
  return {
    faqList: [],
  };
};

const actions = {
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
  createFaq(state, data) {
    state.faqList.push(data);
  },
  editFaq(state, data) {
    state.faqList[data.id] = data.faq;
  },
  deleteFaq(state, data) {
    state.faqList = state.faqList.filter((faq, index) => index !== data.id);
  },
};

const store = createStore({
  state,
  actions,
  mutations,
});

export default store;
