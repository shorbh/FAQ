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
};
const mutations = {
  createFaq(state, data) {
    state.faqList.push(data);
  },
  editFaq(state, data) {
    state.faqList[data.id] = data.faq;
  },
};

const store = createStore({
  state,
  actions,
  mutations,
});

export default store;
