var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.mymongo;
ds.automigrate('Counters', function(err) {
  if (err) throw err;

  var counters = [
    {
        collection: "PantherEvent"
    },
    {
        collection: "Demo"
    }
  ];
  var count = counters.length;
  counters.forEach(function(counter) {
    app.models.Counters.create(counter, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
        return;
    });
  });
});
