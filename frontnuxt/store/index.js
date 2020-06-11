export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtServerInit({ dispatch }) {
    let payload = {
      size : 10,
      offset : 0,
    }
    return dispatch('conven/productList',payload);
  },
};