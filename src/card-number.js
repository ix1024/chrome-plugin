var POSSIBLE_CHARS = "0123456789";
var sb = "";
var bankType = "CCB";
var bankName = "中国建设银行";
var bankCode = "105";

function change(obj) {
    var opt = obj.options[obj.selectedIndex]

    //alert("The option you select is:"+opt.text+"("+opt.value+")");

    bankType = opt.value;
    bankName = opt.text;
}

function StringBuilder() {
    this.init();
};
//初始化StringBuilder类  
StringBuilder.prototype.init = function () {
    this.array = [];
};
//追加数据到StringBuilder类  
StringBuilder.prototype.append = function (element) {
    this.array.push(element);
};
//转换成String  
StringBuilder.prototype.toString = function () {
    return this.array.join("");
};

//Luhm校验规则：16位银行卡号（19位通用）:

// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。

//方法步骤很清晰，易理解，需要在页面引用Jquery.js    


//bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件
function luhmCheck(bankno) {
    var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）

    var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array(); //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array(); //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) { //奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2);
            else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        } else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;

    if (lastNum == luhm) {
        // $("#banknoInfo").html("Luhm验证通过");
        return true;
    } else {
        //   $("#banknoInfo").html("银行卡号必须符合Luhm校验");
        return false;
    }
}

/**随机生成一个卡号*/
function RandomCreateBankID() {
    var cardNo = "";
    for (var i = 0; i < 200; i++) {
        if (bankType == 'ICBC' || bankType == 'CCB' || bankType == 'ABC' || bankType == 'PSBC' || bankType ==
            'BCOM' || bankType == 'GDB' || bankType == 'BOC') {
            sb = new StringBuilder(13);

            for (var i = 0; i < 13; i++) {
                sb.append(parseInt(Math.random() * 10));
            }
            //alert("***"+sb+"***");

        } else {
            sb = new StringBuilder(10);

            for (var i = 0; i < 10; i++) {
                sb.append(parseInt(Math.random() * 10));
            }
        }

        switch (bankType) {
            case "CCB":
                cardNo = "621700" + sb;
                bankCode = "105";
                break;
            case "CMBC":
                cardNo = "621691" + sb;
                bankCode = "305";
                break;
            case "ABC":
                cardNo = "622827" + sb;
                bankCode = "103";
                break;
            case "BCOM":
                cardNo = "622262" + sb;
                bankCode = "301";
                break;
            case "CMB":
                cardNo = "621486" + sb;
                bankCode = "308";
                break;
            case "SPDB":
                cardNo = "622521" + sb;
                bankCode = "310";
                break;
            case "GDB":
                cardNo = "622568" + sb;
                bankCode = "306";
                break;
            case "HXB":
                cardNo = "622632" + sb;
                bankCode = "304";
                break;
            case "PAB":
                cardNo = "622298" + sb;
                bankCode = "783";
                break;
            case "CITIC":
                cardNo = "622696" + sb;
                bankCode = "302";
                break;
            case "ICBC":
                cardNo = "620058" + sb;
                bankCode = "102";
                break;
            case "BOC":
                cardNo = "620061" + sb;
                bankCode = "104";
                break;
            case "CIB":
                cardNo = "622908" + sb;
                bankCode = "309";
                break;
            case "CEB":
                cardNo = "622660" + sb;
                bankCode = "303";
                break;
            case "PSBC":
                cardNo = "621799" + sb;
                bankCode = "403";
                break;
            default:
                cardNo = "621700" + sb;
                bankCode = "105";
        }

        if (luhmCheck(cardNo)) {
            return (cardNo);
        }

        //	return 0;
    }
}

/**批量生成卡号*/
function createBankId() {
    var count = document.getElementById("txt");
    var cnt = count.value;
    var info = document.getElementById("info");
    info.innerHTML = "";

    if (!isNaN(cnt)) {
        cnt = cnt < 0 ? cnt = 10 : cnt;
        cnt = cnt > 100 ? cnt = 100 : cnt;
        var list = [];
        for (var ii = 0; ii < cnt; ii++) {
            var t = RandomCreateBankID();
            list.push('<li><mark>' + t + '</mark>=' + bankName + '' + bankCode + '</li>');

        }
        info.innerHTML = list.join('');
    } else {
        info.innerHTML = '<li>不是数字！</li>';
    }
    count.focus;
    count.select();
}

var areaCode = {
    '11': '北京市',
    '12': '天津市',
    '13': '河北省',
    '14': '山西省',
    '15': '内蒙古',
    '21': '辽宁省',
    '22': '吉林省',
    '23': '黑龙江省',
    '31': '上海市',
    '32': '江苏省',
    '33': '浙江省',
    '34': '安徽省',
    '35': '福建省',
    '36': '江西省',
    '37': '山东省',
    '41': '河南省',
    '42': '湖北省',
    '43': '湖南省',
    '44': '广东省',
    '45': '广西省',
    '46': '海南省',
    '50': '重庆市',
    '51': '四川省',
    '52': '贵州省',
    '53': '云南省',
    '54': '西藏自治区',
    '61': '陕西省',
    '62': '甘肃省',
    '63': '青海省',
    '64': '宁夏回族自治区',
    '65': '新疆'
}

/**删除左右两端的空格**/
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**根据15位身份证或者18位身份证的前17位生成18位身份证号码*/
function getCheckID(_pid) {
    var arrVerifyCode = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    if (_pid.length != 15 && _pid.length != 17) return (false);
    var ai = (_pid.length == 17) ? _pid : _pid.substr(0, 6) + "19" + _pid.substr(6);
    if (!/^\d+$/.test(ai)) {
        alert(ai);
        return (false);
    }
    var yyyy = ai.substr(6, 4),
        mm = ai.substr(10, 2) - 1,
        dd = ai.substr(12, 2);
    var d = new Date(yyyy, mm, dd),
        year = d.getFullYear(),
        mon = d.getMonth(),
        day = d.getDate(),
        now = new Date();
    if (year != yyyy || mon != mm || day != dd || d > now || now.getFullYear() - year > 140) return (false);
    for (var i = 0, ret = 0; i < 17; i++) ret += ai.charAt(i) * wi[i];
    ai += arrVerifyCode[ret %= 11];
    return (ai);
}

/**判断输入的15位或者18位身份证号码是否合法*/
function ParseID(pId) {
    var arrVerifyCode = [1, 0, "x", 9, 8, 7, 6, 5, 4, 3, 2];
    var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    if (pId.length != 15 && pId.length != 18) return ("身份证号码只能是15位或18位!");
    var ai = (pId.length == 18) ? pId.substr(0, 17) : pId.substr(0, 6) + "19" + pId.substr(6);
    if (!/^\d+$/.test(ai)) return ("身份证除最后一位外，必须为数字！");
    var yyyy = ai.substr(6, 4),
        mm = ai.substr(10, 2) - 1,
        dd = ai.substr(12, 2);
    var d = new Date(yyyy, mm, dd),
        year = d.getFullYear(),
        mon = d.getMonth(),
        day = d.getDate(),
        now = new Date();
    if (year != yyyy || mon != mm || day != dd || d > now || now.getFullYear() - year > 140) return (
        "身份证出生年月日输入错误！");
    for (var i = 0, ret = 0; i < 17; i++) ret += ai.charAt(i) * wi[i];
    ai += arrVerifyCode[ret %= 11];
    return ((pId.length == 18 && pId.toLowerCase() != ai) ? "身份证输入错误，正确的为\n" + ai + "！" : ai);
}

/**根据身份证取 省份,生日，性别*/
function getInfo(pid) {
    _id = ParseID(pid);
    if (isNaN(_id.substr(0, 17))) return 0;
    var _id = String(_id),
        sex = _id.substr(16, 1) % 2 ? "男" : "女";
    var prov = areaCode[_id.substr(0, 2)] || "无法确定";
    var birthday = (new Date(_id.substr(6, 4), _id.substr(10, 2) - 1, _id.substr(12, 2))).toLocaleDateString();
    return [prov, birthday, sex];
}

/**生成一定范围的随机数*/
function fRandomBy(under, over) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * under + 1);
        case 2:
            return parseInt(Math.random() * (over - under + 1) + under);
        default:
            return 0;
    }
}

/**随机生成一个身份证*/
function RandomCreateID() {
    function _RandomCreateID() {
        var aid = 0,
            ac = null,
            yyyy = 0,
            mm = 0,
            dd = 0,
            rnd = 0;
        aid = "" + document.getElementById("ar1").value;
        var Code = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37',
            '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65'
        ];

        if (aid != "") {
            l = aid.length;
            for (i = 0; i < 6 - l; i++) {
                aid = "1" + aid;
            }
        } else {
            aid = "" + Code[fRandomBy(0, 31)] + fRandomBy(0, 9) + fRandomBy(0, 9) + fRandomBy(0, 9) + fRandomBy(
                0, 9);
        }
        //alert("aid:"+aid);
        yyyy = fRandomBy(1960, 1990), mm = fRandomBy(1, 12), dd = fRandomBy(1, 31);
        rnd = "" + fRandomBy(0, 9) + fRandomBy(0, 9) + fRandomBy(0, 9);
        //alert("id0:"+ mm +"id0:"+ dd );
        //直接用mm后值会变成true或false,因为第二种写法的问题。
        //if ( (mm == 2) && (dd > 28) )   if ( mm == 2 && dd > 28 )
        if ((mm == 2) && (dd > 28)) {
            dd = fRandomBy(1, 28);
        } else if (((mm == 4) || (mm == 6) || (mm == 9) || (mm == 11)) && (dd == 31)) {
            dd = dd - 1;
        }
        mm = (mm < 10) ? ("0" + mm) : mm;
        dd = (dd < 10) ? ("0" + dd) : dd;
        return ("" + aid + yyyy + mm + dd + rnd);
    }

    var ff = false;
    var ct = 0;
    while (!ff) {
        ct++;
        ff = getCheckID(_RandomCreateID());
        if (ct = 200) {
            return (ff);
        }
    }
    ct = 0;
    return (ff);
}

/**批量生成身份证*/
function createid() {
    var count = document.getElementById("txt1");
    var cnt = count.value;
    var info = document.getElementById("info1");
    var list = [];
    info.innerHTML = "";
    cnt = trim(cnt);
    if (!isNaN(cnt)) {
        cnt = cnt < 0 ? cnt = 10 : cnt;
        cnt = cnt > 100 ? cnt = 100 : cnt;
        for (var ii = 0; ii < cnt; ii++) {
            var t = RandomCreateID();

            if (getInfo(t) == 0) {
                continue;
                ii--;
            } else {
                list.push('<li><mark>' + t + '</mark>=' + getInfo(t) + ' </li>');

            }

        }
        info.innerHTML = list.join('');
    } else {
        info1.innerHTML = '<li>不是数字！</li>';
    }
    count.focus;
    count.select();
}

function run() {
    var card = document.getElementById('card');
    var btncreate = document.getElementById('btncreate');
    var btncreate1 = document.getElementById('btncreate1');
    btncreate.onclick = createBankId;
    btncreate1.onclick = createid;

    card.onchange = function () {
        change(this);
    };

    btncreate1.click();
    btncreate.click();

}

window.addEventListener('load', run, false)