import Ember from 'ember';

export default Ember.Component.extend({
  moviedb: Ember.inject.service('moviedb-service'),
  didRender: function() {
    this.$().find('.card-content').velocity({
      height: '120px',
    }, 400)
  },
  willDestroyElement: function() {
    var clone = jQuery.extend(true, {}, this.$());
    this.$().parent().append(clone);
    clone.find('.card').velocity({
      height: "0px",
      
    }, {
      duration: 400,
      complete: function(element) {
        clone.hide();
      }
    });
  },
  actions: {

    selectCompany(companyId) {
      this.get('moviedb').loadMoviesByCompanyId(companyId);
      this.send('close');
    },

    close() {
      this.sendAction('clickClose');
    }
  }
});
