function pointer(){
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.responseText != 1) {
      alert('您尚未登入');
      window.location.href = 'home.html';
    }else{
      var offOn = true; //是否正在抽獎
      if (offOn) {
        var turntable = document.getElementById("turntable");
        turntable.style.transform = "rotate(0deg)";
        offOn = !offOn;
        ratating();
      }
    }       
  };
  xhr.open('GET', "./php/logincheck.php", false);
  xhr.send(null);
}

// 
function sendDiscountToDb(discount){
  let xhr = new XMLHttpRequest();
  xhr.onload = function(){
    if( xhr.status == 200 ){
      //modify here
    }else{
      alert( xhr.status );
      console.log(xhr.responseText);
    }
  }
  xhr.open("get","./php/sendDiscountToDb.php?discount="+discount);
  xhr.send(null);
}

//旋轉
function ratating() {
  var turntable = document.getElementById("turntable");
  var cat = 60; //總共6個扇形區域，每個區域60度
  var num = 0; //轉圈結束后停留的度數
  var offOn = true; //是否正在抽獎  
  var timer = null;
  var rdm = 0; //隨機度數
  clearInterval(timer);
  timer = setInterval(function () {
    if (Math.floor(rdm / 360) < 3) { rdm = Math.floor(Math.random() * 3600); }
    else {
      turntable.style.transform = "rotate(" + rdm + "deg)";
      clearInterval(timer);
      setTimeout(function () {
      offOn = !offOn;
      num = rdm % 360;
      let discount="";
        if (num <= cat * 1) { alert("銘謝惠顧");console.log("rdm=" + rdm + "，num=" + num + "，" + "銘謝惠顧"); }
        else if (num <= cat * 2) { alert("結帳金額五折"); discount=5;console.log("rdm=" + rdm + "，num=" + num + "，" + "結帳金額五折"); }
        else if (num <= cat * 3) { alert("結帳金額六折"); discount=4;console.log("rdm=" + rdm + "，num=" + num + "，" + "結帳金額六折"); }
        else if (num <= cat * 4) { alert("結帳金額七折"); discount=3;console.log("rdm=" + rdm + "，num=" + num + "，" + "結帳金額七折"); }
        else if (num <= cat * 5) { alert("結帳金額八折"); discount=2;console.log("rdm=" + rdm + "，num=" + num + "，" + "結帳金額八折"); }
        else if (num <= cat * 6) { alert("結帳金額九折"); discount=1;console.log("rdm=" + rdm + "，num=" + num + "，" + "結帳金額九折"); }
        sendDiscountToDb(discount);
      }, 4000);
      
    }
  }, 30);
}