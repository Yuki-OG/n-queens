// This file is a Backbone View.
// It's part of the board visualizer
var board3 = new Board({n: 3});
var board4 = new Board({n: 4});
var board5 = new Board({n: 5});
var board8 = new Board({n: 8})
(function() {

  window.BoardView = Backbone.View.extend({

    tagName: 'table',

    initialize: function() {
      this.model.on('change', this.render, this);
    },

    render: function() {
      var model = this.model;

      return this.$el.html(_(_.range(model.get('n'))).map(function(rowIndex) {
        return $('<tr class="row"/>').html(_(_.range(model.get('n'))).map(function(colIndex) {
          var $square = $('<td class="square"/>').on('click', function(e) {
            model.togglePiece(rowIndex, colIndex);
          }).addClass(['positive', 'negative'][(rowIndex + colIndex) % 2]);
          model.get(rowIndex)[colIndex] && $square.html('&#9813;');
          model.hasAnyQueenConflictsOn(rowIndex, colIndex) && $square.addClass('inConflict');
          return $square;
        }));
      }));
    }
  });

}());
