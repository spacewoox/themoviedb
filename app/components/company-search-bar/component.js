import Ember from 'ember';

export default Ember.Component.extend({

  moviedb: Ember.inject.service('moviedb-service'),
  searchInput: '',
  waitBeforeInitiatingARequest: null,

  updateSearchResultVisibility: function() {
    if (this.get('moviedb.companySearchResult.length') > 0) {
      this.sendAction('resultExist');
    }
  }.observes('moviedb.companySearchResult.@each'),

  searchCompanyOrWait() {
    if (!this.get('searchInput.length') > 0) return;
    if (!this.get('waitBeforeInitiatingARequest')) {
      this.set('waitBeforeInitiatingARequest', Ember.run.later(this, function() {
        this.set('waitBeforeInitiatingARequest', null);
        this.get('moviedb').companySearch(this.get('searchInput'));
      }, 1000));
      this.get('moviedb').companySearch(this.get('searchInput'));
    }
  },

  focusIn() {
    this.$().find('input').select();
    this.set('searchInputInitialWidth', this.$().css('width'));
    var element = this.$().velocity({
      width: '100%'
    }, "300");
    if (this.get('moviedb.companySearchResultExist')) {
      this.sendAction('resultExist');
    }
  },

  focusOut() {
    var element = this.$().velocity({
      width: this.get('searchInputInitialWidth')
    }, "300");
  },

  actions: {
    type(e) {
      if (e.target.value && e.target.value.length > 2) {
        this.set('searchInput', e.target.value);
        this.searchCompanyOrWait();
      }
    },

    submit(e) {
      this.get('moviedb').companySearch(this.get('searchInput'));
    },

    selectCompany(companyId) {
      this.get('moviedb').loadMoviesByCompanyId(companyId);
    }
  }
});
