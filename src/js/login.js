function $id(id){
	return document.getElementById(id);
}	

function showLoginForm(){
  if($id('btn-login').value == "登入"){
    $id('showbox').style.display = 'block';
  }else{
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
      $id('btn-login').value = '登入';
      $id('std-ifo').style.display = 'none';
    }
    xhr.open("get", "php/logout.php", true);
    xhr.send(null);
  }
}

function showLoginForm2(){
  if($id('btn-login2').value == "登入"){
    $id('showbox').style.display = 'block';
  }else{
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
      $id('btn-login2').value = '登入';
      $id('std-ifo').style.display = 'none';
    }
    xhr.open("get", "php/logout.php", true);
    xhr.send(null);
  }
}

function sendForm(){   
  let xhr = new XMLHttpRequest();
  xhr.onload = function(){
    let std = xhr.responseText;
    if(std == 'success'){
      $id("btn-login").value = "登出";
      $id("btn-login2").value = "登出";
      $id('showbox').style.display = 'none';
      $id('account').value = '';
      $id('psw').value = '';
      $id('std-ifo').style.display = 'block';
    }else{
      alert("帳密錯誤");
    }
  }
    xhr.open("post", "php/login.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    let data_info = `stdid=${$id("account").value}&stdpsw=${$id("psw").value}`;
    console.log(data_info);
    xhr.send(data_info);
}

function cancelLogin(){
  $id('showbox').style.display = 'none';
  $id('account').value = '';
  $id('psw').value = '';
}

function getMemberInfo(){
  let xhr = new XMLHttpRequest();
  xhr.onload = function(){
    std = JSON.parse(xhr.responseText);
    if(std.stdid){
      $id("btn-login").value = "登出";
      $id('std-ifo').style.display = 'block';
    }
  }
  xhr.open("get", "php/getMemberInfo.php", true);
  xhr.send(null);
}

function getMemberInfo2(){
  let xhr = new XMLHttpRequest();
  xhr.onload = function(){
    std = JSON.parse(xhr.responseText);
    if(std.stdid){
      $id("btn-login2").value = "登出";
      $id('std-ifo').style.display = 'block';
    }
  }
  xhr.open("get", "php/getMemberInfo.php", true);
  xhr.send(null);
}

function init(){
  getMemberInfo();
  getMemberInfo2();
  $id('btn-login').onclick = showLoginForm;
  $id('btn-login2').onclick = showLoginForm2;
  $id('submit_btn').onclick = sendForm;
  $id('cancel_btn').onclick = cancelLogin;
};

let std = {};
window.onload=init;