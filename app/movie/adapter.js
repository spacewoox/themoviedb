import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: 'https://api.themoviedb.org',
  namespace: '3',

  buildURL: function (type, id, record) {
    var url = this._super(type, id, record);
    url += '?api_key=' + config.APP.apikey;
    return url;
  },

  query: function(store, type, query) {
    var companyId = query['companyId'];
    delete query['companyId']
    var url = this.buildURL('company/' + companyId + '/movies', null, null, 'query', query);
    if (this.sortQueryParams) {
      query = this.sortQueryParams(query);
    }
    return this.ajax(url, 'GET', { data: query });
  }
});
