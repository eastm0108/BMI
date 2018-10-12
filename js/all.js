//任務目標:點選按鈕，計算input裡面值，變成BMI值，之後判斷介於哪個區間，顯示在下方顯示區，資料記錄在localStorage。
//變數宣告
var BTMBtn = document.querySelector('#BMI-btn');
var arrayData = JSON.parse(localStorage.getItem('BMI-list')) || [];
var list = document.querySelector('#show-BMI-list');
//時間建構子
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
//函式宣告
//刪除
function deleteLi(e) {
    e.preventDefault();
    e.stopPropagation();
    var deleteBtn = document.querySelectorAll('.deleteBtn');
    if (e.target.nodeName !== 'A') { return }
    if(!(confirm('確定要刪除這筆資料嗎?'))){return}
    var num = e.path[1].dataset.num
    console.log(num);
    arrayData.splice(num, 1);
    checkList();
}
//檢查
function checkList() {
    let str = '';
    var len = arrayData.length;
    var localstorageData = JSON.stringify(arrayData);
    localStorage.setItem('BMI-list', localstorageData);
    //組字串
    for (let i = 0; i < len; i++) {
        str += '<li data-num="'+i+'" class="d-flex align-items-center justify-content-between showLi"><div class="decideBar bar-'+arrayData[i].bar+'"></div><p class="li-Title">'+arrayData[i].status+'</p><p class="li-BMI">'+arrayData[i].BMI+'</p><p class="li-weight">'+arrayData[i].weight+'</p><P class="li-height">'+arrayData[i].height+'</P><p class="li-date">'+arrayData[i].date+'</p><a class="deleteBtn" href="#">×</a></li>'
    }
    list.innerHTML = str;
    console.log(arrayData);
}
checkList();
//計算
function count(e){
    var valueCm = document.querySelector('#valueCm').value;
    var valueKg = document.querySelector('#valueKg').value;
    if(valueCm==''){alert("請輸入身高"); return}
    if(valueKg==''){alert("請輸入體重"); return}
    //BMI公式，取小數點後兩位，四捨五入小數點後第三位。
    var strBMI= ((valueKg/(valueCm*valueCm))*10000).toFixed(2);
    var intBMI =parseFloat(strBMI);
    console.log(intBMI);
    //判斷BMI區間
    if(intBMI<=0){
        alert('重新輸入');
    }else if(intBMI < 18.5){
        //alert('過輕');
        BTMBtn.setAttribute('class','d-flex flex-column align-items-center justify-content-center btn-Pos enterBtn-tooLight');
        BTMBtn.innerHTML='<P class="showBtn-value">'+intBMI+'</P><p class="showBtn-BMItext">BMI</p><img class="renewPic renewPic-tooLight"src="./images/icons_loop.png" alt="重新計算"><p class="showBtn-text">過輕</p>';
        arrayData.push({bar:'tooLight',status:'過輕',BMI:strBMI,height:valueCm ,weight:valueKg,date:(mm+'-'+dd+'-'+yyyy)});
        checkList();
    }else if((18.5<=intBMI)&&(intBMI<25)){
        // alert('理想');
        BTMBtn.setAttribute('class','d-flex flex-column align-items-center justify-content-center btn-Pos enterBtn-ideal');
        BTMBtn.innerHTML='<P class="showBtn-value">'+intBMI+'</P><p class="showBtn-BMItext">BMI</p><img class="renewPic renewPic-ideal"src="./images/icons_loop.png" alt="重新計算"><p class="showBtn-text">理想</p>';
        arrayData.push({bar:'ideal',status:'理想',BMI:strBMI,height:valueCm ,weight:valueKg,date:(mm+'-'+dd+'-'+yyyy)});
        checkList();
    }else if((25<=intBMI)&&(intBMI<30)){
        // alert('過重');
        BTMBtn.setAttribute('class','d-flex flex-column align-items-center justify-content-center btn-Pos enterBtn-tooHeavy');
        BTMBtn.innerHTML='<P class="showBtn-value">'+intBMI+'</P><p class="showBtn-BMItext">BMI</p><img class="renewPic renewPic-tooHeavy"src="./images/icons_loop.png" alt="重新計算"><p class="showBtn-text">過重</p>';
        arrayData.push({bar:'tooHeavy',status:'過重',BMI:strBMI,height:valueCm ,weight:valueKg,date:(mm+'-'+dd+'-'+yyyy)});
        checkList();
    }else if((30<=intBMI)&&(intBMI<35)){
        // alert('輕度肥胖');
        BTMBtn.setAttribute('class','d-flex flex-column align-items-center justify-content-center btn-Pos enterBtn-mildObesity');
        BTMBtn.innerHTML='<P class="showBtn-value">'+intBMI+'</P><p class="showBtn-BMItext">BMI</p><img class="renewPic renewPic-mildObesity"src="./images/icons_loop.png" alt="重新計算"><p class="showBtn-text">輕度肥胖</p>';
        arrayData.push({bar:'mildObesity',status:'輕度肥胖',BMI:strBMI,height:valueCm ,weight:valueKg,date:(mm+'-'+dd+'-'+yyyy)});
        checkList();
    }else if((35<=intBMI)&&(intBMI<40)){
        // alert('中度肥胖');
        BTMBtn.setAttribute('class','d-flex flex-column align-items-center justify-content-center btn-Pos enterBtn-mildObesity');
        BTMBtn.innerHTML='<P class="showBtn-value">'+intBMI+'</P><p class="showBtn-BMItext">BMI</p><img class="renewPic renewPic-mildObesity"src="./images/icons_loop.png" alt="重新計算"><p class="showBtn-text">中度肥胖</p>';
        arrayData.push({bar:'mildObesity',status:'中度肥胖',BMI:strBMI,height:valueCm ,weight:valueKg,date:(mm+'-'+dd+'-'+yyyy)});
        checkList();
    }else if(40<=intBMI){
        // alert('重度肥胖');
        BTMBtn.setAttribute('class','d-flex flex-column align-items-center justify-content-center btn-Pos enterBtn-severeObesity');
        BTMBtn.innerHTML='<P class="showBtn-value">'+intBMI+'</P><p class="showBtn-BMItext">BMI</p><img class="renewPic renewPic-severeObesity"src="./images/icons_loop.png" alt="重新計算"><p class="showBtn-text">重度肥胖</p>';
        arrayData.push({bar:'severeObesity',status:'重度肥胖',BMI:strBMI,height:valueCm ,weight:valueKg,date:(mm+'-'+dd+'-'+yyyy)});
        checkList();
    }else{
        alert('重新輸入');
    }
    //重新計算按鈕效果
    var renewBtn = document.querySelector('.renewPic');
    var remove = document.querySelector('.enterInfo');
    renewBtn.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        BTMBtn.setAttribute('class','d-flex flex-column align-items-center justify-content-center btn-Pos enterBtn');
        BTMBtn.innerHTML='<p class="enterBtn-p">看結果</p>';
        remove.innerHTML='<label  for="valueCm">身高 (cm)</label><input id="valueCm" type="number" value="" placeholder="請輸入身高"><label  for="valueKg">體重 (kg)</label><input id="valueKg" type="number" value="" placeholder="請輸入體重">';
    },false);
}
//監聽事件
BTMBtn.addEventListener('click',count,false);
list.addEventListener('click',deleteLi,false);