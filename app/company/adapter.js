import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: 'https://api.themoviedb.org',
  namespace: '3',
  pathForType: function(type) {
    var camelized = Ember.String.camelize(type);
    return Ember.String.singularize(camelized);
  },
  buildURL: function (type, id, record) {
    var url = this._super(type, id, record);
    url += '?api_key=' + config.APP.apikey;
    return url;
  },
  query: function(store, type, query) {
    var isSearch = query.search;
    var modelName;
    if (isSearch) {
      query['query'] = query['search']
      delete query['search'];
      modelName = 'search/' + type.modelName
    }
    else {
      modelName = type.modelName
    }
    var url = this.buildURL(modelName, null, null, 'query', query);
    if (this.sortQueryParams) {
      query = this.sortQueryParams(query);
    }
    return this.ajax(url, 'GET', { data: query });
  }
});
