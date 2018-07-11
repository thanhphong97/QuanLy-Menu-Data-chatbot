let express = require('express');
let router = express.Router();
let assert = require('assert');
let mongo = require('mongodb').MongoClient;
let objectId = require('mongodb').ObjectID;
let url = "mongodb://localhost:27017/";
const util = require('util');
const vl = require('express-validator');
let isLogined = false;
/* GET home page. */
router.get('/index', function(req, res) {
  if(isLogined){
      res.render('index', { title: 'Quản lý DB chatbot',message: 'Admin home' ,layout: './layout_admin'});
  }
  else {
       res.render('./login',{layout: './layout'});
  }
});

router.get('/',function (req, res) {
    res.render('./login', {layout: 'layout'})
});

router.get('/logout',function (req, res) {
    isLogined = false;
    req.session.isLogined = isLogined;
    res.render('./login', {layout: 'layout'})
});

router.post('/',function (req, res) {
    let user = req.body.username;
    let pass = req.body.password;
    let kq = 0;
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        let dbo = db.db("dbChatBot_Demo2");
        dbo.collection('tai_khoan').count({user:`${user}`, password:`${pass}`},function (err, result) {
            if(err) throw err;
            kq = result
            if(result != 1){
                res.render('./login',{msg: 'Đăng nhập thất bại',layout:'./layout'})
            }else {
                isLogined = true;
                req.session.isLogined = isLogined;
                // res.render('./cntt/index', { title: 'Quản lý DB chatbot',message: 'Admin home' });
                res.redirect('./cntt')
            }
            db.close();
        })
    });
});
router.get('/cntt',function (req,res){
   if(isLogined){
       //in danh sách dữ liệu lên
       let resultArray = [];
       mongo.connect(url, function(err, db) {
           assert.equal(null, err);
           let dbo = db.db("dbChatBot_Demo2");
           let cursor = dbo.collection('cong_nghe_thong_tin').find();
           cursor.forEach(function(doc, err) {
               assert.equal(null, err);
               resultArray.push(doc);
           }, function() {
               db.close();
               res.render('./cntt/index', {title: 'Dữ liệu ngành công công nghệ thông tin',items: resultArray, layout: './layout_admin', majors: 'cntt'});
           });
       });
   }else
    res.render('./login',{layout: './layout'})
});

router.post('/cntt/insert',function(req,res){
    if(isLogined){
        req.checkBody('title','Không được để trống').notEmpty();
        req.checkBody('intent','Không được để trống').notEmpty();
        req.checkBody('url','Không được để trống').notEmpty();

        req.getValidationResult().then(function (validationResult) {
            if(!validationResult.isEmpty()){
                let data = [];
                data = util.inspect(validationResult.array());
                res.json({
                    result: "Thất bại",
                    message: `${data}`
                })
            }else{
                let item = {
                    title: req.body.title,
                    intent: req.body.intent,
                    url: req.body.url
                };
                mongo.connect(url, function(err, db) {
                    assert.equal(null, err);
                    let dbo = db.db('dbChatBot_Demo2');
                    dbo.collection('cong_nghe_thong_tin').insertOne(item, function(err, result) {
                        assert.equal(null, err);
                        console.log('Item inserted');
                        db.close();
                    });
                });
                res.redirect('/cntt');
            }
        });
    }else
     res.render('./login',{layout: './layout'});
});
router.get('/cntt/insert',function(req,res){
    if(isLogined){
        res.render('./cntt/insert',{layout: './layout_admin'});
    }
    else
    res.render('./login',{layout: './layout'});
});
router.get('/cntt/update/:id',function (req,res) {
    if(isLogined){
        req.checkBody('title','Không được để trống').notEmpty();
        req.checkBody('intent','Không được để trống').notEmpty();
        req.checkBody('url','Không được để trống').notEmpty();

        req.getValidationResult().then(function (validationResult) {
            if (!validationResult.isEmpty()) {
                let data = [];
                data = util.inspect(validationResult.array());
                res.json({
                    result: "Thất bại",
                    message: `${data}`
                })
            }else{
                let id = req.params.id;
                let resultArray = [];
                mongo.connect(url, function(err, db) {
                    assert.equal(null, err);
                    let dbo = db.db("dbChatBot_Demo2");
                    dbo.collection('cong_nghe_thong_tin').findOne({'_id': objectId(id)},function (err,result){
                        if(err) throw  err;
                        console.log(result.url);
                        resultArray = result;
                        db.close();
                        res.render('./cntt/update', {titles: 'Cập nhật dữ liệu ngành công công nghệ thông tin',
                            items: resultArray, layout: './layout_admin', majors: 'cntt'});
                    });
                });
            }
        });
    }else
     res.render('./login',{layout: './layout'})
});
router.post('/cntt/update',function(req,res){
    if(isLogined){
        let item = {
            title: req.body.title,
            intent: req.body.intent,
            url: req.body.url
        };
        let id = req.body.id;

        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            let dbo = db.db('dbChatBot_Demo2');
            dbo.collection('cong_nghe_thong_tin').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
                assert.equal(null, err);
                console.log('Item updated');
                db.close();
            });
        });
        res.redirect('/cntt');
    }else
     res.render('./login',{layout: './layout'});
});

router.get('/cntt/delete/:id',function(req,res){
    if(isLogined){
        let id = req.params.id;
        console.log(id);
        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            let dbo = db.db('dbChatBot_Demo2');
            dbo.collection('cong_nghe_thong_tin').deleteOne({"_id": objectId(id)}, function(err, result) {
                assert.equal(null, err);
                console.log('Item deleted');
                db.close();
            });
        });
        res.redirect('/cntt');

    }else{
        res.render('/login');
    }


});

//oto

router.get('/oto',function (req,res){
    if(isLogined){
        //in danh sách dữ liệu lên
        let resultArray = [];
        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            let dbo = db.db("dbChatBot_Demo2");
            let cursor = dbo.collection('cong_nghe_ky_thuat_oto').find();
            cursor.forEach(function(doc, err) {
                assert.equal(null, err);
                resultArray.push(doc);
            }, function() {
                db.close();
                res.render('./oto/index', {title: 'Dữ liệu ngành công nghệ kỹ thuật oto',items: resultArray, layout: './layout_admin',majors: 'oto'});
            });
        });
    }else
    res.render('./login',{layout: './layout'});
});

router.post('/oto/insert',function(req,res){
    if(isLogined){
        let item = {
            title: req.body.title,
            intent: req.body.intent,
            url: req.body.url
        };

        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            let dbo = db.db('dbChatBot_Demo2');
            dbo.collection('cong_nghe_ky_thuat_oto').insertOne(item, function(err, result) {
                assert.equal(null, err);
                console.log('Item inserted');
                db.close();
            });
        });

        res.redirect('/oto');
    }else
    res.render('./login',{layout: './layout'});

});

router.get('/oto/insert',function(req,res){
    if(isLogined){
        res.render('./oto/insert', {layout: './layout_admin'})
    }else
     res.render('./login',{layout: './layout'})
});

router.get('/oto/update/:id',function (req,res) {
    if(isLogined){
        let resultArray = [];
        let id = req.params.id;

        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            let dbo = db.db("dbChatBot_Demo2");
            dbo.collection('cong_nghe_ky_thuat_oto').findOne({'_id': objectId(id)},function (err,result){
                if(err) throw  err;
                console.log(result.url);
                resultArray = result;
                db.close();
                res.render('./oto/update', {titles: 'Cập nhật dữ liệu ngành công công nghệ thông tin',
                    items: resultArray, layout: './layout_admin', majors: 'cntt'});
            });
        });
    }else
    res.render('./login',{layout: './layout'})
});

router.post('/oto/update',function(req,res){
   if(isLogined){
       let item = {
           title: req.body.title,
           intent: req.body.intent,
           url: req.body.url
       };
       let id = req.body.id;

       mongo.connect(url, function(err, db) {
           assert.equal(null, err);
           let dbo = db.db('dbChatBot_Demo2');
           dbo.collection('cong_nghe_ky_thuat_oto').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
               assert.equal(null, err);
               console.log('Item updated');
               db.close();
           });
       });
       res.redirect('/oto');
   }else
   res.render('./login',{layout: './layout'})
});

router.get('/oto/delete/:id',function(req,res){
    if(isLogined){
        let id = req.params.id;
        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            let dbo = db.db('dbChatBot_Demo2');
            dbo.collection('cong_nghe_ky_thuat_oto').deleteOne({"_id": objectId(id)}, function(err, result) {
                assert.equal(null, err);
                console.log('Item deleted');
                db.close();
            });
        });
        res.redirect('/oto');
    }else
    res.render('./login',{layout: './layout'})
});
module.exports = router;
