import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    var json = this._super(...arguments);
    var res = {
      "data": payload.results.map((item) => {
        return {
          "id": item.id,
          "type": "company",
          "attributes": {
            "name": item.name
          },
        }
      }),
      "meta": {
        "pages": payload['page'],
        "total_pages": payload['total_pages'],
        "total_results": payload['total_results'],
      }
    }
    return res;
  }
});
