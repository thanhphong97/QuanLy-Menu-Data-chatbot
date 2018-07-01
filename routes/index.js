var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quản lý DB chatbot',message: 'Admin home' ,layout: './layout_admin'});
});

router.get('/cntt',function (req,res){
    //in danh sách dữ liệu lên
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var dbo = db.db("dbChatBot_Demo2");
        var cursor = dbo.collection('cong_nghe_thong_tin').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('./cntt/index', {title: 'Dữ liệu ngành công công nghệ thông tin',items: resultArray, layout: './layout_admin', majors: 'cntt'});
        });
    });
});

router.post('/cntt/insert',function(req,res){
    var item = {
        title: req.body.title,
        intent: req.body.intent,
        url: req.body.url
    };

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var dbo = db.db('dbChatBot_Demo2');
        dbo.collection('cong_nghe_thong_tin').insertOne(item, function(err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
    res.redirect('/cntt');
});
router.get('/cntt/insert',function(req,res){
    res.render('./cntt/insert',{layout: './layout_admin'});
});
router.get('/cntt/update/:id',function (req,res) {
    var id = req.params.id;
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var dbo = db.db("dbChatBot_Demo2");
        dbo.collection('cong_nghe_thong_tin').findOne({'_id': objectId(id)},function (err,result){
            if(err) throw  err;
            console.log(result.url);
            resultArray = result;
            db.close();
            res.render('./cntt/update', {titles: 'Cập nhật dữ liệu ngành công công nghệ thông tin',
                items: resultArray, layout: './layout_admin', majors: 'cntt'});
        });
    });
});
router.post('/cntt/update',function(req,res){
    var item = {
        title: req.body.title,
        intent: req.body.intent,
        url: req.body.url
    };
    var id = req.body.id;

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var dbo = db.db('dbChatBot_Demo2');
        dbo.collection('cong_nghe_thong_tin').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
            assert.equal(null, err);
            console.log('Item updated');
            db.close();
        });
    });
    res.redirect('/cntt');
});

router.get('/cntt/delete/:id',function(req,res){
    var id = req.params.id;
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var dbo = db.db('dbChatBot_Demo2');
        dbo.collection('cong_nghe_thong_tin').deleteOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log('Item deleted');
            db.close();
        });
    });
    res.redirect('/cntt');
});

//oto

router.get('/oto',function (req,res){
    //in danh sách dữ liệu lên
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var dbo = db.db("dbChatBot_Demo2");
        var cursor = dbo.collection('cong_nghe_ky_thuat_oto').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('./oto/index', {title: 'Dữ liệu ngành công nghệ kỹ thuật oto',items: resultArray, layout: './layout_admin',majors: 'oto'});
        });
    });
});

router.post('/oto/insert',function(req,res){
    /*req.check('title', 'title bỏ trống').isEmpty();
    req.check('intent', 'title bỏ trống').isEmpty();
    req.check('url', 'title bỏ trống').isEmpty();
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
    } else {

    }*/
    var item = {
        title: req.body.title,
        intent: req.body.intent,
        url: req.body.url
    };

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var dbo = db.db('dbChatBot_Demo2');
        dbo.collection('cong_nghe_ky_thuat_oto').insertOne(item, function(err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });

    res.redirect('/oto');

});

router.get('/oto/insert',function(req,res){
    res.render('./oto/insert', {layout: './layout_admin'})
});

router.get('/oto/update/:id',function (req,res) {
    var resultArray = [];
    var id = req.params.id;

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var dbo = db.db("dbChatBot_Demo2");
        dbo.collection('cong_nghe_ky_thuat_oto').findOne({'_id': objectId(id)},function (err,result){
            if(err) throw  err;
            console.log(result.url);
            resultArray = result;
            db.close();
            res.render('./oto/update', {titles: 'Cập nhật dữ liệu ngành công công nghệ thông tin',
                items: resultArray, layout: './layout_admin', majors: 'cntt'});
        });
    });
});

router.post('/oto/update',function(req,res){
    var item = {
        title: req.body.title,
        intent: req.body.intent,
        url: req.body.url
    };
    var id = req.body.id;

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var dbo = db.db('dbChatBot_Demo2');
        dbo.collection('cong_nghe_ky_thuat_oto').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
            assert.equal(null, err);
            console.log('Item updated');
            db.close();
        });
    });
    res.redirect('/oto');
});

router.get('/oto/delete/:id',function(req,res){
    var id = req.params.id;
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var dbo = db.db('dbChatBot_Demo2');
        dbo.collection('cong_nghe_ky_thuat_oto').deleteOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log('Item deleted');
            db.close();
        });
    });
    res.redirect('/oto');
});
module.exports = router;
