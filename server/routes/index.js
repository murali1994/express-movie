var express = require('express');
var router = express.Router();
var request= require('request');
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
/*router.post('/', function(req, res, next) {
    var str = req.body.searchtext;
    // res.send(str);
});*/
router.get('/search',function(req, res) {
    console.log(req.query.moviename);
    request.get('https://api.themoviedb.org/3/search/movie?api_key=5125a43f0b8c8e68bc856d7038efe980&language=en-US&query='+req.query.moviename+ '&include_adult=false', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            res.json(response.body);
        }
        else {
            res.send('error occured');
        }
    });
});
module.exports = router;
