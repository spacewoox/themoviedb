import Ember from 'ember';

export default Ember.Component.extend({
  moviedb: Ember.inject.service('moviedb-service'),
});
