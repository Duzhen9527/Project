
//與 line 連結
var CHANNEL_ACCESS_TOKEN = '4C0v+4/BEwfMtlKWQ+M/OZZYex3rWvgR9pyCpC7YPsrY3VKBebFJxB3K1fAWmWsea1O0+lm/gr7RkjZwJZVQzXf027jDD8QejRNxt6JkTBmxCBB3qIz+2Rxnw4Z1eeMvJfXgQV+8bOBIGZC7wVx7lAdB04t89/1O/w1cDnyilFU=n';

//處理Line server傳進來訊息，判斷是message或postback
function doPost(e) {

  var events = JSON.parse(e.postData.contents).events[0];
  var reply_token = events.replyToken;
  
  if (typeof reply_token === 'undefined') 
    return;
  else if (events.type == "message")
    reply_message(events);
  else if (events.type == "postback") 
    post_back(events);

}
  
//抓取文字message，在input_text裡面做關鍵字
function reply_message(e) {
  var input_text = e.message.text;
  
 
  
 //00新手關
 switch(input_text) {
   case '我明白了':
      var postData = {
        "replyToken": e.replyToken,
      "messages":
        [{ 
  "type": "template",
  "altText": "this is a buttons template",
  "template": {
    "type": "buttons",
    "actions": [
      {
        "type": "message",
        "label": "走起練習去",
        "text": "走起練習去"
      }
    ],
    "title": "跳過直接闖關",
    "text": "跳過直接闖關"
  }
        
        }]};
      break;

   case '走起練習去': 
      var postData = {
        "replyToken": e.replyToken,
      "messages":  
        [{ 
  "type": "template",
  "altText": "this is a buttons template",
  "template": {
    "type": "buttons", 
     "actions": [
      {
        "type": "message",
        "label": "小兒科",
        "text": "掛號小兒科"
      },
      {
        "type": "message",
        "label": "骨科",
        "text": "掛號骨科"
      },
      {
        "type": "message",
        "label": "皮膚科",
        "text": "掛號皮膚科"
      }
    ],
    "title": "XX診所",
    "text": "請問您想要掛哪科?"
  }
        
        }]};
      break;
   
    default:
      var postData = {
        "replyToken": e.replyToken,
      "messages":
        [{ 
        "type": "text",
        "text": "oops！好像答錯了！🙅‍♂️\n沒關係現在只有伴伴看到，趕快再試試其它答案吧～"
        }]};
      break;}
  
  fetch_data(postData);
}

function fetch_data(postData) {
  var options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
    },
  'payload': JSON.stringify(postData)
};
      
UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply",options);  

  } 