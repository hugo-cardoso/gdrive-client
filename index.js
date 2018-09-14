const fs = require('fs');
const express = require('express');
const request = require('request');
const rp = require('request-promise');

const app = express();

app.set('json spaces', 40);

const getMovies = () => {

  return rp(`https://www.googleapis.com/drive/v3/files?q='1jQ0i7usXNYPgalsNyBSUc6Zf0IC1J6lE'+in+parents&key=AIzaSyByoBqM0uF2NWJFGuFJ3Swn_6EFLhSd_ZE`);
};

const getFile = ( id ) => {

  return rp(`https://www.googleapis.com/drive/v3/files/${ id }?key=AIzaSyByoBqM0uF2NWJFGuFJ3Swn_6EFLhSd_ZE`);
};

app.get('/movies', (req, res) => {

  getMovies()
  .then(data => {
    res.set({
      'Content-Type': 'application/json'
    });
    res.json(JSON.parse(data));
  });
});

app.get('/movies/:id', (req, res) => {

  getFile( req.params.id )
  .then(data => {
    res.set({
      'Content-Type': 'application/json'
    });
    res.json(JSON.parse(data));
  });
});


app.listen(process.env.PORT || 8888, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});