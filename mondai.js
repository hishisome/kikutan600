//htmlのidからデータを取得
//取得したデータを変数に代入

var startDay = document.getElementById('startDay');
var endDay = document.getElementById('endDay');
var amount = document.getElementById('amount');
var create = document.getElementById('create');
var contents = document.getElementById('contents');
var next = document.getElementById('next');
var question = document.getElementById('question');
var day = document.getElementById('day');
var mondaiList = []

//csvファイルの取得
var req = new XMLHttpRequest();
req.open('get', "mondai.csv", true);
req.send(null);

req.onload = function(){
	mondaiList = convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
 
// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    var mondaiList = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
 
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        mondaiList[i] = tmp[i].split(',');
    }
  return mondaiList;  
}

//問題番号用に変数cntを定義
var cnt = 0;

//日目をクリックすると(内の注釈が変わる)
startDay.addEventListener('click', function() {
  var start = document.getElementById('startDay').value;
  var end = document.getElementById('endDay').value;
  let howMany = (end - start) * 16 + 16;
  amount.innerHTML=`(1~${howMany}問まで)`;
}, false);

endDay.addEventListener('click', function() {
  var start = document.getElementById('startDay').value;
  var end = document.getElementById('endDay').value;
  let howMany = (end - start) * 16 + 16;
  amount.innerHTML=`(1~${howMany}問まで)`;
}, false);

//問題作成をクリックすると問題が作成される
create.addEventListener('click', function() {
  cnt = 0;
  for(i = mondaiList.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = mondaiList[i];
    mondaiList[i] = mondaiList[j];
    mondaiList[j] = tmp;
  }
  question.innerHTML=("問1");
  next.innerHTML=("解答表示");
  contents.innerHTML=(`${mondaiList[0][0]}:${mondaiList[0][1]}`);
  day.innerHTML=(" ");
}, false);

//解答表示⇔次の問題へ
next.addEventListener('click', function() {
  var text = document.getElementById('next').textContent;
  if(text === "解答表示"){
    next.innerHTML=("次の問題へ");
    contents.innerHTML=(mondaiList[cnt][2]);
    day.innerHTML=(`day${mondaiList[cnt][3]},No.${mondaiList[cnt][4]}`);
  }else if(text === "次の問題へ"){
    next.innerHTML=("解答表示");
    cnt++;
    contents.innerHTML=(`${mondaiList[cnt][0]}:${mondaiList[cnt][1]}`);
    question.innerHTML=(`問${cnt+1}`);
    day.innerHTML=(" ");
  }



}, false);
