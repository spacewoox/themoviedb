import Ember from 'ember';

export default Ember.Component.extend({
  searchBarHasFocus: null,
  actions: {
    searchFocusOff() {
      this.set('searchBarHasFocus', false);
    },
    searchFocusOn() {
      this.set('searchBarHasFocus', true);
    },
  }
});
