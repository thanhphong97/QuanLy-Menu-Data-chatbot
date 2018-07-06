let index = require('../routes/index');
const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const vl = require('express-validator');
const handlebars = require('handlebars');
const util = require('util');

const PAGE_ACCESS_TOKEN = 'EAAIb1JRAkFQBAKAWqIPy4SermzWV8hntp2zsjZA13v63xUZBaUd8qXoNzY9oob7Q49Hg1vTjMMFxWpsmQH2AJD9yCJ1m2xnVQRxlmHxs1HgIZAHGep1aATMZArvsivzF3AZA6iEZCurn2RIkspMKZB9yQN3ejgPc7jqXPMHgWue8QHJXWsJR7By';
let report = '';
let stt = false;
router.get('/',function (req, res) {
    if(req.session.isLogined){
        setTimeout(function () {
            let submenu = [];
            let submenu_item = [];
            let buttonURL = [];
            let fileName = __dirname + '/../data/datav2.json';
            let results = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
            let items = results.data[0].persistent_menu[0].call_to_actions;
            submenu.push(items[0]);
            console.log('submenu '+ submenu[0].title +' bao gom:');
            console.log(submenu);
            console.log('---------------------');

            buttonURL.push(items[1]);
            console.log('button url '+buttonURL[0].title+' bao gom');
            console.log(buttonURL);
            console.log('--------------------');

            let submenu_item_0 = [];
            let submenu_item_1 = [];
            let submenu_item_2 = [];
            let submenu_item_3 = [];
            let submenu_item_4 = [];
            let data = [];
            console.log(submenu[0].call_to_actions.length);
            //chia nhỏ submenu ở trang menu2
            for(let i = 0; i< submenu[0].call_to_actions.length; i++){
                submenu_item[i] = submenu[0].call_to_actions[i];
            }

            submenu_item_0.push(submenu_item[0]);
            for(let i in submenu_item[1].call_to_actions){
                submenu_item_0.push(submenu_item[1].call_to_actions[i]);
            }
            data.push(submenu_item_0);


            submenu_item_1.push(submenu_item[1]);
            for(let i in submenu_item[1].call_to_actions){
                submenu_item_1.push(submenu_item[1].call_to_actions[i]);
            }
            data.push(submenu_item_1)


            submenu_item_2.push(submenu_item[2]);
            for(let i in submenu_item[2].call_to_actions){
                submenu_item_2.push(submenu_item[2].call_to_actions[i]);
            }
            data.push(submenu_item_2)


            submenu_item_3.push(submenu_item[3]);
            for(let i in submenu_item[3].call_to_actions){
                submenu_item_3.push(submenu_item[3].call_to_actions[i]);
            }
            data.push(submenu_item_3)


            submenu_item_4.push(submenu_item[4]);
            for(let i in submenu_item[4].call_to_actions){
                submenu_item_4.push(submenu_item[4].call_to_actions[i]);
            }
            data.push(submenu_item_4)
            let loai = ['postback','web_url'];
// console.log(submenu_item);
//         console.log('-------------');
//         console.log(submenu_item_0);
//         console.log('-------------');
//         console.log(submenu_item_1);
//         console.log('-------------');
//         console.log(submenu_item_2);
//         console.log('-------------');
//         console.log(submenu_item_3);
//         console.log('-------------');
//         console.log(submenu_item_4);
//         console.log('-------------');
//         console.log(data);

            res.render('./setup/index',{
                data: data,
                buttonurl: buttonURL[0],
                submenu: submenu[0].title
            });
        },1600);
        getMenu()
    }else {
        res.render('./login',{layout: './layout'});
    }

});

function getMenu(){
    request({
            url:'https://graph.facebook.com/v2.6/me/messenger_profile?fields=persistent_menu&access_token=' + PAGE_ACCESS_TOKEN
            }, function (err, res, body) {
        if (err)
            throw err;
        console.log(body);
        let fileName = __dirname + '/../data/datav2.json';
        saveFile(body,fileName);
    }),function (err,res) {
        if(err) throw err;
        console.log(res);
    };
}

router.post('/update',function (req,res) {
    if(req.session.isLogined){
        req.checkBody('submenu_title','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        //sub[0]
        req.checkBody('submenu_title_0','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_0_title_0','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_0_type_0','Không được để trống').notEmpty();
        req.checkBody('menuItem_0_url_0','Không được để trống').notEmpty();

        req.checkBody('menuItem_0_title_1','Không được để trống, ít hơn 30 ký tự').notEmpty();
        req.checkBody('menuItem_0_type_1','Không được để trống').notEmpty();
        req.checkBody('menuItem_0_url_1','Không được để trống').notEmpty();

        req.checkBody('menuItem_0_title_2','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_0_type_2','Không được để trống').notEmpty();
        req.checkBody('menuItem_0_url_2','Không được để trống').notEmpty();

        req.checkBody('menuItem_0_title_3','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_0_title_3','Không được để trống').notEmpty();
        req.checkBody('menuItem_0_url_3','Không được để trống').notEmpty();

        //sub[1]
        req.checkBody('submenu_title_1','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_1_title_0','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_1_type_0','Không được để trống').notEmpty();
        req.checkBody('menuItem_1_payload_0','Không được để trống').notEmpty();

        req.checkBody('menuItem_1_title_1','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_1_type_1','Không được để trống').notEmpty();
        req.checkBody('menuItem_1_payload_1','Không được để trống').notEmpty();

        req.checkBody('menuItem_1_title_2','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_1_type_2','Không được để trống').notEmpty();
        req.checkBody('menuItem_1_payload_2','Không được để trống').notEmpty();

        req.checkBody('menuItem_1_title_2','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_1_type_2','Không được để trống').notEmpty();
        req.checkBody('menuItem_1_payload_2','Không được để trống').notEmpty();

        req.checkBody('menuItem_1_title_3','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_1_type_3','Không được để trống').notEmpty();
        req.checkBody('menuItem_1_payload_3','Không được để trống').notEmpty();

        //sub[2]
        req.checkBody('submenu_title_2','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('submenu_url_2','Không được để trống').notEmpty();

        //sub[3]
        req.checkBody('submenu_title_3','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('submenu_url_3','Không được để trống').notEmpty();

        //sub[4]
        req.checkBody('submenu_title_4','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_4_title_0','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_4_type_0','Không được để trống').notEmpty();
        req.checkBody('menuItem_4_url_0','Không được để trống').notEmpty();

        req.checkBody('menuItem_4_title_1','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_4_type_1','Không được để trống').notEmpty();
        req.checkBody('menuItem_4_url_1','Không được để trống').notEmpty();

        req.checkBody('menuItem_4_title_2','Không được để trống, ít hơn 30 ký tự').notEmpty().isLength({max: 30});
        req.checkBody('menuItem_4_type_2','Không được để trống').notEmpty();
        req.checkBody('menuItem_4_url_2','Không được để trống').notEmpty();



        req.getValidationResult().then(function (validationResult) {
            if(!validationResult.isEmpty()){
                let data = [];
                data = util.inspect(validationResult.array());
                res.json({
                    result: "Thất bại",
                    message: `${data}`
                })
            }else{
                console.log(`request body:`)
                console.log(req.body);
                let menuItem_1 = `{
                        "type": "${req.body.menuItem_0_type_0}",
                        "title": "${req.body.menuItem_0_title_0}",
                        "url": "${req.body.menuItem_0_url_0}",
                         "webview_height_ratio": "full"
                     },
                     {
                        "type": "${req.body.menuItem_0_type_1}",
                        "title": "${req.body.menuItem_0_title_1}",
                        "url": "${req.body.menuItem_0_url_1}",
                         "webview_height_ratio": "full"
                     },
                     {
                        "type": "${req.body.menuItem_0_type_2}",
                        "title": "${req.body.menuItem_0_title_2}",
                        "url": "${req.body.menuItem_0_url_2}",
                         "webview_height_ratio": "full"
                     },
                     {
                        "type": "${req.body.menuItem_0_type_3}",
                        "title": "${req.body.menuItem_0_title_3}",
                        "url": "${req.body.menuItem_0_url_3}",
                         "webview_height_ratio": "full"
                     }`;
                let menuItem_2 = `{
                        "type": "${req.body.menuItem_1_type_0}",
                        "title": "${req.body.menuItem_1_title_0}",
                        "payload": "${req.body.menuItem_1_payload_0}"
                     },
                     {
                        "type": "${req.body.menuItem_1_type_1}",
                        "title": "${req.body.menuItem_1_title_2}",
                        "payload": "${req.body.menuItem_1_payload_3}"
                     },
                     {
                        "type": "${req.body.menuItem_1_type_2}",
                        "title": "${req.body.menuItem_1_title_2}",
                        "payload": "${req.body.menuItem_1_payload_2}"
                     },
                     {
                        "type": "${req.body.menuItem_1_type_3}",
                        "title": "${req.body.menuItem_1_title_3}",
                        "payload": "${req.body.menuItem_1_payload_3}"
                     }`;
                let menuItem_5 = `{
                        "type": "${req.body.menuItem_4_type_0}",
                        "title": "${req.body.menuItem_4_title_0}",
                        "url": "${req.body.menuItem_4_url_0}",
                         "webview_height_ratio": "full"
                     },
                     {
                        "type": "${req.body.menuItem_4_type_1}",
                        "title": "${req.body.menuItem_4_title_1}",
                        "url": "${req.body.menuItem_4_url_1}",
                         "webview_height_ratio": "full"
                     },
                     {
                        "type": "${req.body.menuItem_4_type_2}",
                        "title": "${req.body.menuItem_4_title_2}",
                        "url": "${req.body.menuItem_4_url_2}",
                         "webview_height_ratio": "full"
                     }`;

                let submenu_0 = `"type": "nested",
                    "title": "${req.body.submenu_title_0}",
                    "call_to_actions": [${menuItem_1}]`;

                let submenu_1 = `"type": "nested",
                    "title": "${req.body.submenu_title_1}",
                    "call_to_actions": [${menuItem_2}]`;

                let submenu_2 = `"type": "web_url",
                    "title": "${req.body.submenu_title_2}",
                    "url": "${req.body.submenu_url_2}"`;

                let submenu_3 = `"type": "web_url",
                    "title": "${req.body.submenu_title_3}",
                    "url": "${req.body.submenu_url_3}"`;

                let submenu_4 = `"type": "nested",
                    "title": "${req.body.submenu_title_4}",
                    "call_to_actions": [${menuItem_5}]`;

                let submenu = `[
                {"type": "nested",
                "title": "${req.body.submenu_title}",
                "call_to_actions": [
                    {
                            ${submenu_0}
                    },
                    {
                            ${submenu_1}
                    },
                    {
                            ${submenu_2}
                    },
                    {
                            ${submenu_3}
                    },
                    {
                            ${submenu_4}
                    }
                ]
                },
                {
                        "type": "web_url",
                        "title": "${req.body.buttonURL_title}",
                        "url": "${req.body.buttonURL_url}",
                        "webview_height_ratio": "full"
                }
            ]`;

                let messageData = `{
    "persistent_menu": [{
        "locale": "default",
        "composer_input_disabled": false,
        "call_to_actions": ${submenu}                        
        }
    ]
    }`;
                //console.log(messageData)
                let msg = JSON.parse(messageData);
                // Start the request
                request({
                        url: "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=" + PAGE_ACCESS_TOKEN,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        form: msg
                    },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            // Print out the response body
                            //res.send('setup Persistent menu');
                            report = '';
                            stt = false;
                            console.log("update Persistent menu");
                        } else {
                            report = JSON.parse(body).error.message;
                            console.log('update loi' + report)
                            stt = true;
                        }
                    });

                setTimeout(function () {
                    res.redirect('/setup');
                },1200);
            }
        });
    }else
     res.render('./login',{layout: './layout'})

});


function  saveFile(obj,fileName) {
    fs.openSync(fileName,'w');
    fs.writeFile(fileName, obj, 'utf-8',function(err,data){
       if(err) throw err;
       console.log(`Save file to ${fileName}`);
    });
}
module.exports = router;