
export default {
  UPDATE_LIST({ commit }, listItems) {
    commit("SET_LIST", listItems);
  },
  UPDATE_CONTENTS({ commit }, contents) {
    commit("SET_CONTENTS", contents);
  },
};
