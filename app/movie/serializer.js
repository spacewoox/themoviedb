import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    var json = this._super(...arguments);
    var res = {
      "data": payload.results.map((item) => {
        return {
          "id": item.id,
          "type": "movie",
          "attributes": item
        }
      }),
      "meta": {
        "total_pages": payload.total_pages,
        "total_results": payload.total_results,
        "page": payload.page,
      }
    }
    return res;
  },
  extractMeta(store, type, payload) {
    payload['data'] = payload['results'];
    payload['meta'] = {
      'total_results': payload['total_results'],
      'total_pages': payload['total_pages'],
      'page': payload['page']
    }
    delete payload['total_results'];
    delete payload['total_pages'];
    delete payload['id'];
    delete payload['page'];
    return payload;
  }
});
