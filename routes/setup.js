const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const url = "mongodb://localhost:27017/";
/* GET home page. */
const PAGE_ACCESS_TOKEN = 'EAAIb1JRAkFQBAKAWqIPy4SermzWV8hntp2zsjZA13v63xUZBaUd8qXoNzY9oob7Q49Hg1vTjMMFxWpsmQH2AJD9yCJ1m2xnVQRxlmHxs1HgIZAHGep1aATMZArvsivzF3AZA6iEZCurn2RIkspMKZB9yQN3ejgPc7jqXPMHgWue8QHJXWsJR7By';
let report;
let stt = false;
router.get('/', function(req, res) {
    getMenu();
    let item1 = [];
    let item2 = [];
    let item1_child = [];
    let fileName = __dirname + '/../data/data.json';
    let results = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    let items= results.data[0].persistent_menu[0].call_to_actions;

    item1.push(items[0]);
    item2.push(items[1]);
    for(var i in item1[0].call_to_actions){
        item1_child.push(item1[0].call_to_actions[i]);
    }
    res.render('./setup/index',{stt, report: report, title: 'Setup item menu',item1: item1,item1_child: item1_child, item2: item2, layout:'./layout_admin'});
});


function getMenu(){
    request({
            url:'https://graph.facebook.com/v2.6/me/messenger_profile?fields=persistent_menu&access_token=' + PAGE_ACCESS_TOKEN
            }, function (err, res, body) {
        if (err)
            throw err;
        console.log(body);
        let fileName = __dirname + '/../data/data.json';
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