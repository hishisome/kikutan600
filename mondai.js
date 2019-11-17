//htmlのidからデータを取得
//取得したデータを変数に代入
var startDay = document.getElementById('startDay');
var endDay = document.getElementById('endDay');
var amount = document.getElementById('amount');
var create = document.getElementById('create');
var contents = document.getElementById('contents');
var next = document.getElementById('next');
var question = document.getElementById('question');
var howMany = document.getElementById('howMany');
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

//問題数用に変数quesを定義
var ques = 16;

//出題用の配列mondaiを定義
var mondai = [];

//日数をstart endを定義
var start = 1;
var end = 2;

//日目をクリックすると(内の注釈が変わる)
startDay.addEventListener('click', function() {
  start = document.getElementById('startDay').value;
  end = document.getElementById('endDay').value;
  let howManyQues = (end - start) * 16 + 16;
  amount.innerHTML=`(1~${howManyQues}問まで)`;
}, false);

endDay.addEventListener('click', function() {
  start = document.getElementById('startDay').value;
  end = document.getElementById('endDay').value;
  let howManyQues = (end - start) * 16 + 16;
  amount.innerHTML=`(1~${howManyQues}問まで)`;
}, false);

//出題数を変更
howMany.addEventListener('click', function() {
  var amount = document.getElementById('howMany').value;
  ques = amount;
}, false);

//問題作成をクリックすると問題が作成される
create.addEventListener('click', function() {
  cnt = 0;
  mondai = []; //一度問題を空にする
  var list = [];
  x = 0;
  //〇日目～〇日目までにcsvリストをカットする
  var startWard = (start - 1)*16 + 1;
  var endWard = end*16;

  for(i = startWard - 1; i < endWard; i++){
    list[x] = mondaiList[i];
    x++;
  }
  for(i = list.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
  }
  for(i = 0; i < ques; i++) {
    mondai[i] = list[i]
  }
  question.innerHTML=("問1");
  next.innerHTML=("解答表示");
  contents.innerHTML=(`${mondai[0][0]}:${mondai[0][1]}`);
  day.innerHTML=(" ");
}, false);

//解答表示⇔次の問題へ
next.addEventListener('click', function() {
  var text = document.getElementById('next').textContent;
  if(text === "解答表示"){
    next.innerHTML=("次の問題へ");
    contents.innerHTML=(mondai[cnt][2]);
    day.innerHTML=(`day${mondai[cnt][3]},No.${mondai[cnt][4]}`);
  }else if(text === "次の問題へ"){
    if(cnt < ques - 1){
      next.innerHTML=("解答表示");
      cnt++;
      contents.innerHTML=(`${mondai[cnt][0]}:${mondai[cnt][1]}`);
      question.innerHTML=(`問${cnt+1}`);
      day.innerHTML=(" ");
    }else{
      question.innerHTML=("終了");
      contents.innerHTML=(" ");
      day.innerHTML=(" ");
    }
  }
}, false);
