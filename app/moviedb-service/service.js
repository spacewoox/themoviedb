import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  companySearchResult: null,
  companySearchResultExist: Ember.computed.gt('companySearchResult.length', 0),

  reload_search_result: function() {
    this.set('companySearchResult', this.get('store')
      .query('company', {
        search: this.get('searchText')
      }));
  }.observes('searchText'),

  companySearch(search) {
    console.log('company search');
    this.set('searchText', search);
  },

  loadMoviesByCompanyId(companyId) {
    this.set('movieResults',
      this.get('store').query('movie', {
        'companyId': companyId
      })
    );
  },
  resetCompanySearchResults() {
    this.set('companySearchResult', null);
  }
});
