const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const vl = require('express-validator');
const handlebars = require('handlebars');
/* GET home page. */
const PAGE_ACCESS_TOKEN = 'EAAIb1JRAkFQBAKAWqIPy4SermzWV8hntp2zsjZA13v63xUZBaUd8qXoNzY9oob7Q49Hg1vTjMMFxWpsmQH2AJD9yCJ1m2xnVQRxlmHxs1HgIZAHGep1aATMZArvsivzF3AZA6iEZCurn2RIkspMKZB9yQN3ejgPc7jqXPMHgWue8QHJXWsJR7By';
let report;
let stt = false;

// router.get('/', function(req, res) {
//     let item1 = [];
//     let item2 = [];
//     let item1_child = [];
//     setTimeout(function(){
//         let fileName = __dirname + '/../data/data.json';
//         let results = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
//         let items = results.data[0].persistent_menu[0].call_to_actions;
//         item1.push(items[0]);
//         item2.push(items[1]);
//         for(var i in item1[0].call_to_actions){
//             item1_child.push(item1[0].call_to_actions[i]);
//         }
//         console.log('doc file')
//         res.render('./setup/index',{stt, report: report, title: 'Setup item menu',item1: item1,item1_child: item1_child, item2: item2, layout:'./layout_admin'});
//         console.log('render');
//         },2000);
//     console.log('viet file');
//     getMenu();
//
// });

router.get('/',function (req, res) {
    let submenu = [];
    let submenu_item = [];
    let buttonURL = [];
    let results = {
        data: [
            {
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "nested",
                                "title": "Thông tin",
                                "call_to_actions": [
                                    {
                                        "type": "nested",
                                        "title": "Giới thiệu",
                                        "call_to_actions": [
                                            {
                                                "type": "web_url",
                                                "title": "Ngành công nghệ thông tin",
                                                "url": "http://cntt.caothang.edu.vn/tam-nhin-su-mang/",
                                                "webview_height_ratio": "full"
                                            },
                                            {
                                                "type": "web_url",
                                                "title": "Bộ môn tin học",
                                                "url": "http://cntt.caothang.edu.vn/gioi-thieu-chung/",
                                                "webview_height_ratio": "full"
                                            },
                                            {
                                                "type": "web_url",
                                                "title": "Khoa Điện Tử - Tin Học",
                                                "url": "http://dtth.caothang.edu.vn/index.php/gioi-thieu/lich-su-phat-trien",
                                                "webview_height_ratio": "full"
                                            },
                                            {
                                                "type": "web_url",
                                                "title": "Trường CĐKT Cao Thắng",
                                                "url": "http://caothang.edu.vn/bai_viet/Gioi-thieu-chung-5",
                                                "webview_height_ratio": "full"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "nested",
                                        "title": "Tuyến sinh 2018",
                                        "call_to_actions": [
                                            {
                                                "type": "postback",
                                                "title": "Ngành công nghệ thông tin",
                                                "payload": "TUYEN_SINH_CNTT_PAYLOAD"
                                            },
                                            {
                                                "type": "postback",
                                                "title": "Hướng dẫn đăng ký",
                                                "payload": "DANG_KY_XET_TUYEN_PAYLOAD"
                                            },
                                            {
                                                "type": "postback",
                                                "title": "Những cầu hỏi thường gặp",
                                                "payload": "CAU_HOI_PAYLOAD"
                                            },
                                            {
                                                "type": "postback",
                                                "title": "Điểm chuẩn 2018",
                                                "payload": "DIEM_CHUAN_PAYLOAD"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "web_url",
                                        "title": "Thời khóa biểu",
                                        "url": "http://daotao.caothang.edu.vn/bai-viet/63-Thoi-khoa-bieu-hoc-ky-2-nam-hoc-2017-2018-a4e96b03feaf3b588e2e07a62a6bf78d.html",
                                        "webview_height_ratio": "full"
                                    },
                                    {
                                        "type": "web_url",
                                        "title": "Tra cứu kết quả học tập",
                                        "url": "http://cntt.caothang.edu.vn/tra-cuu-ket-qua-hoc-tap/",
                                        "webview_height_ratio": "full"
                                    },
                                    {
                                        "type": "nested",
                                        "title": "Thông tin khác",
                                        "call_to_actions": [
                                            {
                                                "type": "web_url",
                                                "title": "Trung tâm tin học",
                                                "url": "http://ttth.caothang.edu.vn/",
                                                "webview_height_ratio": "full"
                                            },
                                            {
                                                "type": "web_url",
                                                "title": "Trung tâm ngoại ngữ",
                                                "url": "http://englishcenter.caothang.edu.vn/",
                                                "webview_height_ratio": "full"
                                            },
                                            {
                                                "type": "web_url",
                                                "title": "Khoa giáo dục đại cương",
                                                "url": "http://gddc.caothang.edu.vn/",
                                                "webview_height_ratio": "full"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "web_url",
                                "title": "Website bộ môn tin học",
                                "url": "http://www.cntt.caothang.edu.vn/",
                                "webview_height_ratio": "full"
                            }
                        ]
                    }
                ]
            }
        ]
    };
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
    for(var i = 0; i< submenu[0].call_to_actions.length; i++){
        submenu_item[i] = submenu[0].call_to_actions[i];
    }

    submenu_item_0.push(submenu_item[0]);
    for(var i in submenu_item[1].call_to_actions){
        submenu_item_0.push(submenu_item[1].call_to_actions[i]);
    }
    data.push(submenu_item_0);


    submenu_item_1.push(submenu_item[1]);
    for(var i in submenu_item[1].call_to_actions){
        submenu_item_1.push(submenu_item[1].call_to_actions[i]);
    }
    data.push(submenu_item_1)


    submenu_item_2.push(submenu_item[2]);
    for(var i in submenu_item[2].call_to_actions){
        submenu_item_2.push(submenu_item[2].call_to_actions[i]);
    }
    data.push(submenu_item_2)


    submenu_item_3.push(submenu_item[3]);
    for(var i in submenu_item[3].call_to_actions){
        submenu_item_3.push(submenu_item[3].call_to_actions[i]);
    }
    data.push(submenu_item_3)


    submenu_item_4.push(submenu_item[4]);
    for(var i in submenu_item[4].call_to_actions){
        submenu_item_4.push(submenu_item[4].call_to_actions[i]);
    }
    data.push(submenu_item_4)
    let loai = ['postback','web_url'];
// console.log(submenu_item);
    console.log('-------------');
    console.log(submenu_item_0);
    console.log('-------------');
    console.log(submenu_item_1);
    console.log('-------------');
    console.log(submenu_item_2);
    console.log('-------------');
    console.log(submenu_item_3);
    console.log('-------------');
    console.log(submenu_item_4);
    console.log('-------------');
    console.log(data);

    res.render('./setup/index',{
        data: data,
        buttonurl: buttonURL[0],
        submenu: submenu[0].title,
        loai: loai
    });
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
    return true;
}
router.post('/update',function (req,res) {
    let title_menu = req.body.title_Menu;
    let title0 = req.body.title0;
    let title1 = req.body.title1;
    let title2 = req.body.title2;
    let payload0 = req.body.payload0;
    let payload1 = req.body.payload1;
    let payload2 = req.body.payload2;
    let title_ButtonURL = req.body.title_ButtonURL;
    let url_ButtonURL = req.body.url_ButtonURL;
    // req.check('title_Menu','title phải ít hơn 30 ký tự').isEmpty().isLength({max: 30});
    // req.check('title0','title phải ít hơn 30 ký tự').isEmpty().isLength({max: 30});
    // req.check('title1','title phải ít hơn 30 ký tự').isEmpty().isLength({max: 30});
    // req.check('title2','title phải ít hơn 30 ký tự').isEmpty().isLength({max: 30});
    // req.check('title_ButtonURL','title phải ít hơn 30 ký tự').isEmpty().isLength({max: 30});
    let menuitem = `,{
        "title": "demo",
        "type": "postback",
        "payload": "PAYLOAD_DEMO"
    }`;
    var messageData =
        `{
            "persistent_menu": [
                {
                    "locale": "default",
                    "composer_input_disabled": false,
                    "call_to_actions": [
                        {
                            "title": "${title_menu}",
                            "type": "nested",
                            "call_to_actions": [
                                {
                                    "title": "${title0}",
                                    "type": "postback",
                                    "payload": "${payload0}"
                                },
                                {
                                    "title": "${title1}",
                                    "type": "postback",
                                    "payload": "${payload1}"
                                },
                                {
                                    "title": "${title2}",
                                    "type": "postback",
                                    "payload": "${payload2}"
                                }
                            ]
                        },
                        {
                            "type": "web_url",
                            "title": "${title_ButtonURL}",
                            "url": "${url_ButtonURL}",
                            "webview_height_ratio": "full"
                        }
                    ]
                }
            ]
        }`;
    var msg = JSON.parse(messageData);
    console.log('msg data: ' + msg);

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
                report = null;
                console.log("update Persistent menu");
            } else {
                report = JSON.parse(body).error.message;
                stt = true;
                console.log('update loi' + report)
            }
        });
    res.redirect('back');
});


function  saveFile(obj,fileName) {
    fs.openSync(fileName,'w');
    fs.writeFile(fileName, obj, 'utf-8',function(err,data){
       if(err) throw err;
       console.log(`Save file to ${fileName}`);
    });
}
module.exports = router;