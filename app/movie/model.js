import DS from 'ember-data';

export default DS.Model.extend({
  adult: DS.attr('bool'),
  backdrop_path: DS.attr('string'),
  belongs_to_collection: DS.attr(),
  budget: DS.attr(),
  genres : DS.attr('array'),
  homepage : DS.attr('string'),
  imdb_id : DS.attr(),
  original_language : DS.attr('string'),
  original_title : DS.attr('string'),
  overview : DS.attr('string'),
  popularity : DS.attr(), 
  poster_path : DS.attr('string'),
  release_date : DS.attr(),
  status : DS.attr('string'),
  title : DS.attr('string'),
  vote_average : DS.attr(),
  vote_count : DS.attr(), 
  poster_full_path: Ember.computed('poster_path', function() {
    if (!this.get('poster_path')) return '';
    return 'https://image.tmdb.org/t/p/w640/' + this.get('poster_path');
  })
});
