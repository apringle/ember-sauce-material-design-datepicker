import Ember from 'ember';
import layout from '../templates/components/smd-date-button';
// import DateTimePicker from './datetime-picker';
import Setup from '../mixins/setup';

var set = Ember.set;
var get = Ember.get;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'button',
  classNames: ['day-button'],
  classNameBindings: ['isCurrentDay'],

  day: null,

  formatDate: function(date) {
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  },

  isCurrentDay: Ember.computed('parent._selectedDate', 'day', function() {
    var parentDate = get(this, 'parent._selectedDate');
    var currentDate = get(this, 'date');
    var parentDateFull = this.formatDate(parentDate);
    var currentDateFull = this.formatDate(currentDate);
    return parentDateFull === currentDateFull;
  }),

  setup: Ember.on('init', function(){
    var day = get(this, 'date');
    if(day) {
      day = day.getDate();
      set(this, 'day', day);
    }
  }),

  click: function() {
    var date = get(this, 'date');
    var parentDate = get(this, 'parent._selectedDate');
    date.setHours(parentDate.getHours());
    date.setMinutes(parentDate.getMinutes());
    date.setSeconds(parentDate.getSeconds());
    set(this, 'parent._selectedDate', date);
  }

});
