// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    /**
 * Created by MoBeiHuYang on 2017/7/5.
 */
    // 【系统】跨服：[36-40区]云老四逃到了跨服时空十二盘之中，众位英雄快来诛杀。
    // 【系统】跨服：[36-40区]岳老三逃到了跨服时空朱雀门之中，众位英雄快来诛杀。
    // 【系统】跨服：[36-40区]二娘逃到了跨服时空华山山脚之中，众位英雄快来诛杀。
    // 【系统】跨服：[36-40区]段老大逃到了跨服时空林中小路之中，众位英雄快来诛杀
    window.searchName = null;
    var Base = {
        init: function(){
            this.skills();
            this.writeBtn();
        },
        buttonWidth: '80px',
        buttonHeight: '20px',
        currentPos: 30,
        delta: 30,
        DrunkMan_targetName: 'luoyang_luoyang26',
        correctQu: function(){
            var url = window.location.href;
            var qu = 37;
            if(url.indexOf('direct38') != '-1' ){
                qu = 38;
            }
            return qu;
        },
        getCorrectText: function(txt){
            var url = window.location.href;
            var correctSwitch = false;
            if(url.indexOf(txt) != '-1' ){
                correctSwitch = true;
            }
            return correctSwitch;
        },
        mySkillLists: null,
        skills: function(){
            this.mySkillLists = '辟邪剑法；天师灭神剑';
            // 38区laodap123
            if(this.getCorrectText('4316804') && this.correctQu == '38'){
                this.mySkillLists = '独孤九剑；狂风快剑';
            }
            // 38区微信
            if(this.getCorrectText('4254240')){
                this.timeInter = 6000;
                this.mySkillLists = '独孤九剑；玄铁剑法';
            }
            // 37区东方红
            if(this.getCorrectText('4253282')){
                this.timeInter = 9000;
                this.mySkillLists = '排云掌法；九天龙吟剑法';
            }
            // 38区guaji
            if(this.getCorrectText('4259178')){
                this.mySkillLists = '辟邪剑法；魔剑诀';
            }
            // 37区guaji
            if(this.getCorrectText('4316804')  && this.correctQu == '37'){
                this.mySkillLists = '帝王剑法；真武七截剑';
            }
        },
        btnArr: [
            {
                'id' : '0',
                'name' : '战斗招兵',
                'function': function(e){
                    interServerFn1(e);
                }
            },
            {
                'id' : '1',
                'name' : '签到',
                'function': function(){
                    CheckIn();
                }
            },{
                'id' : '2',
                'name' : '刷碎片',
                'function': function(){
                    killDrunkManFunc();
                }
            },{
                'id' : '3',
                'name' : '获取正气',
                'function': function(e){
                    hitScore(e);
                }
            },{
                'id' : '4',
                'name' : '搜尸',
                'function': function(e){
                    setCsearch(e);
                }
            },{
                'id' : '5',
                'name' : '杀正邪',
                'function': function(e){
                    killErNiangFn(e);
                }
            },{
                'id' : '6',
                'name' : '杀逃犯',
                'function': function(e){
                    killTaoFanFn(e);
                }
            },{
                'id' : '7',
                'name' : '清正邪',
                'function': function(e){
                    clearNpcFn(e);
                }
            },{
                'id' : '8',
                'name' : '跨服青龙',
                'function': function(e){
                    interServerFn(e);
                }
            },{
                'id' : '9',
                'name' : '对招',
                'function': function(e){
                    fightAllFunc(e);
                }
            },{
                'id' : '10',
                'name' : '自动战斗',
                'function': function(e){
                    autoKill(e);
                }
            },{
                'id' : '11',
                'name' : '杀青龙',
                'function': function(e){
                    killQinglong(e);
                }
            },{
                'id' : '12',
                'name' : '钓鱼',
                'function': function(e){
                    fishingFirstFunc(e);
                }
            },{
                'id' : '13',
                'name' : '比试奇侠',
                'function': function(e){
                    startFightQixiaFn(e);
                }
            },{
                'id' : '14',
                'name' : '撩奇侠',
                'function': function(e){
                    talkSelectQiXia(e);
                }
            },{
                'id' : '15',
                'name' : '杀天剑',
                'function': function(e){
                    killTianJianTargetFunc(e);
                }
            },{
                'id' : '16',
                'name' : '侠客岛',
                'function': function(e){
                    newGetXiaKe(e);
                }
            },{
                'id' : '17',
                'name' : '试剑',
                'function': function(e){
                    CheckIn1(e);
                }
            },{
                'id' : '18',
                'name' : '答题',
                'function': function(e){
                    answerQuestionsFunc(e);
                }
            },{
                'id' : '19',
                'name' : '冰火玄铁',
                'function': function(e){
                    getXuanTieFunc(e);
                }
            }
        ],
        writeBtn: function(){
            var btnArr = this.btnArr;
            for(var i = 0; i< btnArr.length; i++){
                var btnName = 'btn' + i;
                btnName = document.createElement('button');
                btnName.innerText = btnArr[i].name;
                btnName.style.width = this.buttonWidth;
                btnName.style.height = this.buttonHeight;
                btnName.style.position = 'absolute';
                btnName.style.right = '0px';
                btnName.id = 'btn' + btnArr[i].id;
                btnName.style.top = this.currentPos + 'px';
                this.currentPos = this.currentPos + this.delta;
                document.body.appendChild(btnName);
                if(btnArr[i].function){
                    btnName.addEventListener('click', btnArr[i].function)
                }
            }
        }
    }
    var timeInter = 3000;

    /* 战斗招兵 方法 :start */
    var kuafuNpc = '',
        isInKuafu = false;
    function interServerFn1(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();
        if(DomTxt == '战斗招兵'){
            isInKuafu = true;
            Dom.html('不招兵');
        }else{
            isInKuafu = false;
            Dom.html('战斗招兵')
        }

    }
    /* 战斗招兵 方法 :end */
    /* 签到 方法 :start */
    function CheckIn(){
        sellAll();
        console.log('签到一次！');
        clickButton('jh 5');       // 进入扬州
        clickButton('go north');     // 南门大街
        clickButton('go north');   // 十里长街3
        clickButton('go north');    // 十里长街2
        clickButton('go west');    // 黄记杂货
        clickButton('sign7');      //签到
        /*clickButton('go east');    // 十里长街2
    clickButton('go north');   // 十里长街1
    clickButton('go north');    // 中央广场
    clickButton('go north');    // 十里长街4
    clickButton('go north');    // 十里长街5
    clickButton('go north');    // 十里长街6
    clickButton('go north');    // 北大街门
    clickButton('go west');    // 琼花街
    clickButton('go west');    // 月明桥
    clickButton('lq_qxlb');    // 月老礼物
    */
        goQian();
        clickButton('tzjh_lq');
        clickButton('home');     //回主页
        clickButton('jh 1');        // 进入章节
        clickButton('go east') ;     // 广场
        clickButton('go north');     // 雪亭镇街道
        clickButton('go east');     // 淳风武馆大门
        clickButton('go east') ;    // 淳风武馆教练场
        clickButton('event_1_8041045');//谜题卡
        clickButton('event_1_8041045');//谜题卡
        clickButton('event_1_44731074');//消费积分
        clickButton('home');  //回主页
        clickButton('sort');//排行榜
        clickButton('sort fetch_reward', 1);// 领取排行奖励
        clickButton('home');  //回主页
        //clickButton('exercise stop');  //停止打坐
        //clickButton('exercise');  //打坐
        clickButton('shop money_buy shop1_N_10'); // 引路蜂
        clickButton('cangjian get_all'); // 一键领取藏剑楼奖励
        clickButton('xueyin_shenbinggu blade get_all'); // 一键领取霸刀楼奖励
        clickButton('xueyin_shenbinggu unarmed get_all'); // 一键领取铁拳楼奖励
        clickButton('xueyin_shenbinggu throwing get_all'); // 一键领取天机楼奖励
        clickButton('home');     //回主页
        clickButton('jh 1');        // 进入章节
        getNewLibao();

    }
    // 领取礼包
    function getNewLibao(){
        clickButton('look_npc snow_mercenary');
        setTimeout(function(){
            clickLibaoBtn();
        },10000);
    }
    // 判断是什么礼包
    function clickLibaoBtn(){
        var LiBaoName = ['兑换礼包','1元礼包'];
        var btn = $('.cmd_click2');
        btn.each(function(){
            var txt = $(this).text();
            if(txt.indexOf('礼包') != '-1'){
                if($.inArray(txt, LiBaoName) == -1){
                    var clickText = $(this).attr('onclick'); // clickButton('event_1_41502934', 1)
                    var clickAction = getLibaoId(clickText);
                    triggerClick(clickAction);
                }
            }
        })
        setTimeout(function(){
            clickButton('home');
        },6000)
    }
    // 获取礼包方法的名称
    function getLibaoId(text){
        var arr = text.split(',');
        var newArr = arr[0].split('(');
        var nowArr = newArr[1].split("'");
        return nowArr[1];
    }
    // 触发领方法
    function triggerClick(name){
        clickButton(name);
    }
    /* 签到 方法 :end */
    /* 刷碎片 方法 :start */
    var counthead = null;
    var killDrunkIntervalFunc =  null;
    function killDrunkManFunc(){
        counthead = 20;
        $('span:contains(胜利)').remove();
        clickButton('jh 2');        // 进入章节
        clickButton('go north');      // 南郊小路
        clickButton('go north');     // 南门
        clickButton('go north');     // 南大街
        clickButton('go north');     // 洛川街
        killDrunkIntervalFunc = setInterval(killDrunMan,1000);
    }
    function isContains(str, substr) {
        if(substr == '铁手镯 可以在哪位npc那里获得？'){
            return true;
        }
        return str.indexOf(substr) >= 0;
    }
    function killDrunMan(){
        if(counthead>0){
            clickButton('kill ' + Base.DrunkMan_targetName);
            doKillSet();
            if($('span:contains(胜利)').text().slice(-3)=='胜利！'){
                counthead = counthead-1;
                console.log('杀人一次，剩余杀人次数：%d！', counthead);
                clickButton('prev_combat');
                $('span:contains(胜利)').html('')
            }
        }else {
            clickButton('prev_combat');
            clearInterval(killDrunkIntervalFunc);
            setTimeout(function(){
                clickButton('home');
            },2000)
        }
    }
    /* 刷碎片 方法 :end */
    /* 获取正气 方法 :start */
    var hitScoreInter = null,
        useDog = false;
    function hitScore(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();
        if(DomTxt == '获取正气'){
            killBadSwitch = true;
            Dom.html('获取负气');
        }else{
            killBadSwitch = false;
            Dom.html('获取正气')
        }
    }
    function hasDog(){
        var nameArr = [];
        var nameDom = $('.outkee_text');
        nameDom.each(function(){
            var name = $(this).prev().text();
            if(name != ''){
                nameArr.push(name);
            }
        })
        var dogName = ['金甲符兵','玄阴符兵'];

        var arr3=[];
        for(var i =0; i<nameArr.length; i++){
            for(var j=0; j<dogName.length; j++){
                if(nameArr[i]==dogName[j]){
                    arr3.push(nameArr[i]);
                    break;
                }
            }
        }
        return arr3;
    }
    /* 获取正气 方法 :end */
    /* 搜尸 方法 :start */
    var doGetCorpse = null;
    function setCsearch(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();
        if(DomTxt == '搜尸'){
            doGetCorpse = setInterval(function(){
                getC();
            },1000)
            Dom.html('取消搜尸');
        }else{
            clearInterval(doGetCorpse);
            Dom.html('搜尸')
        }
    }
    function getC(){
        clickButton('golook_room');
        $('.cmd_click3').each(function(){
            var txt = $(this).text();
            if(txt.indexOf('的尸体') != '-1' ){
                var npcText = $(this).attr('onclick');
                var id = getId(npcText);
                clickButton('get '+id);
            }
        })
    }
    /* 搜尸 方法 :end */
    /* 杀正邪 方法 :start */
    var badNameArr = [];
    var killBadSwitch = true;
    var killErInterval = null;
    var killENum = 0;
    function killErNiangFn(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();
        if(DomTxt == '杀正邪'){
            killENum = 0;
            console.log('开始杀正邪');
            useDog = false;
            killBadSwitch = true;
            badNameArr = ['段老大','二娘'];
            Dom.html('取消杀正邪');
            killErInterval = setInterval(function(){
                if(killENum >10){
                    clickButton('escape');
                    useDog = true;
                    console.log('取消杀正邪');
                    $("#btn5").html('杀正邪');
                    clearInterval(killErInterval);
                }else{
                    doClearNpc();
                    doKillDogSet();
                }

            },4000)
        }else{
            useDog = true;
            console.log('取消杀正邪');
            Dom.html('杀正邪');
            clearInterval(killErInterval);
        }
    }
    /* 杀正邪 方法 :end */
    /* 杀逃犯 方法 :start */
    var killTaoFanInterval = null;
    var taoPlaceStep = 1;
    function killTaoFanFn(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();
        if(DomTxt == '杀逃犯'){
            console.log('开始杀逃犯');
            useDog = true;
            killBadSwitch = true;
            badNameArr = ['段老大','二娘'];
            Dom.html('取消逃犯');
            killTaoFanInterval = setInterval(function(){
                doClearTaoFan();
                doKillTaoFanSet();
            },4000)
        }else{
            useDog = false;
            console.log('取消杀逃犯');
            Dom.html('杀逃犯');
            clearInterval(killTaoFanInterval);
        }
    }
    // 清狗技能
    function doKillTaoFanSet(){
        var skillArr = Base.mySkillLists.split('；');
        if(hasDog().length <2 && useDog){
            skillArr = ['茅山道术','天师灭神剑'];
        }

        if($('.out_top').find('.outkee_text').length >1){
            clickButton('escape');
            return false;
        }
        var skillIdA = ['1','2','3','4'];
        var clickSkillSwitch = false;
        $.each(skillIdA, function(index, val){
            var btn = $('#skill_'+val);
            var btnName = btn.text();
            for(var i = 0; i<skillArr.length; i++){
                var skillName = skillArr[i];
                if(btnName == skillName){
                    btn.find('button').trigger('click');
                    clickSkillSwitch = true;
                    break;
                }
            }
        })
        //clickButton('escape');
        if(!clickSkillSwitch && $('.cmd_skill_button').length >0){
            clickButton('playskill 1');
        }
    }
    // 开始打坏人
    function doClearTaoFan(){
        findTaoFan();
    }
    // 找打坏人
    function findTaoFan(){
        goNpcPlace(taoPlaceStep);
        javascript:clickButton('golook_room');
        var btn = $('.cmd_click3');
        idArr = [];
        for(var j = 0; j <badNameArr.length; j++){
            var badName = badNameArr[j];

            for(var i = btn.length;  i >0 ; i--){
                var txt = btn.eq(i).text();
                if(txt == badName){
                    bad_target_name = badName;
                    var npcText = null;
                    if(killBadSwitch){
                        npcText = btn.eq(i).attr('onclick');
                    }else{
                        npcText = btn.eq(i-1).attr('onclick');
                    }
                    var id = getId(npcText);
                    idArr.push(id);
                }
                // clickButton('score u4185184-15a1a', 0)
                var btnClick = btn.eq(i).attr('onclick');
                // 有玩家就闪过去
                if(btnClick){
                    if(btnClick.indexOf('score') != '-1'){
                        idArr = [];
                    }
                }
            }
        }

        // 有狗就闪过去
        if(getDogNum().length>0){
            goNextTaoFanPlace();
        }else{
            if(idArr.length == 0){
                goNextTaoFanPlace();
            }else{
                doKillTaoFan(idArr);
            }
        }

    }
    // 去下一个位置
    function goNextTaoFanPlace(){
        if(taoPlaceStep <10){
            taoPlaceStep++
        }else{
            taoPlaceStep = 1;
        }
        goTaoFanPlace(taoPlaceStep);
    }
    //去位置
    function goTaoFanPlace(place){
        clickButton('home');
        clickButton('jh '+place);
    }

    // 杀逃犯
    function doKillTaoFan(arr){
        var maxId = arr[0];
        killENum++;
        console.log('当前第：'+ killENum +'个，'+ bad_target_name +':'+ maxId);
        killE(maxId);
    }
    /* 杀逃犯 方法 :end */
    /* 清正邪 方法 :start */
    var clearNpcInterval = null;
    var placeArr = ['书房','打铁铺子','桑邻药铺','南市','绣楼','北大街','钱庄','桃花别院','杂货铺','祠堂大门','厅堂'];
    var placeStep = 0;
    var killENum = 0;
    var clearNpcInterval = null;
    var bad_target_name = null;
    function clearNpcFn(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();
        if(DomTxt == '清正邪'){
            console.log('开始清正邪');
            useDog = true;
            killBadSwitch = false;
            badNameArr = ['段老大','二娘','岳老三','云老四','剧盗','恶棍','流寇'];
            Dom.html('取消正邪');
            clearNpcInterval = setInterval(function(){
                doClearNpc();
                doKillDogSet();
            },4000)
        }else{
            useDog = false;
            console.log('取消清正邪');
            Dom.html('清正邪');
            clearInterval(clearNpcInterval);
        }

    }
    // 开始打坏人
    function doClearNpc(){
        findNpc();
    }
    // 清狗技能
    function doKillDogSet(){
        var skillArr = Base.mySkillLists.split('；');
        if(hasDog().length <2 && useDog){
            skillArr = ['茅山道术','天师灭神剑'];
        }

        if(hasDog().length >0 && useDog || $('.out_top').find('.outkee_text').length >1){
            clickButton('escape');
            return false;
        }
        var skillIdA = ['1','2','3','4'];
        var clickSkillSwitch = false;
        $.each(skillIdA, function(index, val){
            var btn = $('#skill_'+val);
            var btnName = btn.text();
            for(var i = 0; i<skillArr.length; i++){
                var skillName = skillArr[i];
                if(btnName == skillName){
                    btn.find('button').trigger('click');
                    clickSkillSwitch = true;
                    break;
                }
            }
        })
        //clickButton('escape');
        if(!clickSkillSwitch && $('.cmd_skill_button').length >0){
            clickButton('playskill 1');
        }
    }
    // 找打坏人
    function findNpc(){
        goNpcPlace(placeArr[placeStep]);
        clickButton('golook_room');
        var btn = $('.cmd_click3');
        idArr = [];
        for(var j = 0; j <badNameArr.length; j++){
            var badName = badNameArr[j];

            for(var i = btn.length;  i >0 ; i--){
                var txt = btn.eq(i).text();
                if(txt == badName){
                    bad_target_name = badName;
                    var npcText = null;
                    if(killBadSwitch){
                        npcText = btn.eq(i).attr('onclick');
                    }else{
                        npcText = btn.eq(i-1).attr('onclick');
                    }
                    var id = getId(npcText);
                    idArr.push(id);
                }
                // clickButton('score u4185184-15a1a', 0)
                var btnClick = btn.eq(i).attr('onclick');
                if(btnClick){
                    if(btnClick.indexOf('score') != '-1'){
                        idArr = [];
                    }
                }
            }
        }
        if(getDogNum().length>0){
            goNextPlace();
        }else if(getPlayerNum().length >0){
            goNextPlace();
        }else{
            if(idArr.length == 0){
                goNextPlace();
            }else{
                doKillBadNpc(idArr);
            }
        }

    }
    // 去下一个位置
    function goNextPlace(){
        if(placeStep <10){
            placeStep++
        }else{
            placeStep = 0;
        }
        goNpcPlace(placeArr[placeStep]);
    }
    // 获取Dog的数量
    function getDogNum(){
        var nameArr = [];
        var nameDom = $('.cmd_click3');
        var dogName = ['金甲符兵','玄阴符兵'];
        var arr3=[];
        nameDom.each(function(){
            var name = $(this).text();
            if(name != ''){
                nameArr.push(name);
            }
        })

        for(var i =0; i<nameArr.length; i++){
            for(var j=0; j<dogName.length; j++){
                if(nameArr[i]==dogName[j]){
                    arr3.push(nameArr[i]);
                    break;
                }
            }
        }
        return arr3;
    }
    // 获取在场人的数量
    function getPlayerNum(){
        var nameArr = [];
        var nameDom = $('.cmd_click3');
        var dogName = ['score u'];
        var arr3=[];
        nameDom.each(function(){
            var name = $(this).attr('onclick');
            if(name != ''){
                nameArr.push(name);
            }
        })

        for(var i =0; i<nameArr.length; i++){
            for(var j=0; j<dogName.length; j++){
                if(nameArr[i].indexOf(dogName[j]) != '-1'){
                    arr3.push(nameArr[i]);
                    break;
                }
            }
        }
        return arr3;
    }
    // 杀好人
    function doKillBadNpc(arr){
        // console.log(arr);
        var maxId = null;
        if(arr.length >1){
            var newIdArr = [];
            for(var i =0 ; i<arr.length; i++){
                // newIdArr.push(idArr[i].replace('eren',''));
                // newIdArr.push(arr[i].replace('bad_target_',''));
                // clickButton('kill taofan159742528', 1)
                if(killBadSwitch){
                    newIdArr.push(idArr[i].replace('eren',''));
                }else{
                    newIdArr.push(arr[i].replace('bad_target_',''));
                }
            }
            maxId = newIdArr.max();;
            maxId = arr[maxId];
        }else{
            maxId = arr[0];
        }
        killENum++;
        console.log('当前第：'+ killENum +'个，'+ bad_target_name +':'+ maxId);  //eren580108074
        // lookNpc(maxId);
        // clickButton('items use snow_qiannianlingzhi');
        killE(maxId);
    }
    //去位置
    function goNpcPlace(place){
        // clickButton('items use snow_qiannianlingzhi');
        switch(place){
            case "书房":
                goSfang();
                break;
            case "打铁铺子":
                goTie();
                break;
            case "桑邻药铺":
                goYao();
                break;
            case "南市":
                goNan();
                break;
            case "绣楼":
                goXiu();
                break;
            case "北大街":
                goNStreet();
                break;
            case "钱庄":
                goQian();
                break;
            case "桃花别院":
                goTao();
                break;
            case "杂货铺":
                goZa();
                break;
            case "祠堂大门":
                goCi();
                break;
            case "厅堂":
                goTing();
                break;
        }
    }
    /* 清正邪 方法 :end */
    /* 跨服 方法 :start */
    var kuafuNpc = '',
        isInKuafu = false;
    function interServerFn(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();
        if(DomTxt == '跨服青龙'){
            kuafuNpc = '[36-40区]';
            isInKuafu = true;
            Dom.html('取消跨服');
        }else{
            kuafuNpc = '';
            isInKuafu = false;
            Dom.html('跨服青龙')
        }

    }
    /* 跨服 方法 :end */
    /* 对招 方法 :start */
    var fightAllInter = null;
    function fightAllFunc(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();
        if(DomTxt == '对招'){
            fightAllInter = setInterval(function(){
                doFightAll();
            },1000);
            Dom.html('取消对招');
        }else{
            clearInterval(fightAllInter);
            Dom.html('对招')
        }
    }
    function doFightAll(){
        if($('#skill_1').length == 0){
            return;
        }
        var out = $('#out .out');
        out.each(function(){

            if($(this).hasClass('done')){
                return
            }

            $(this).addClass('done');

            var txt = $(this).text();
            if(txt.indexOf('你受伤不轻') != '-1'){
                var skillArr = ["茅山道术"];
                var skillIdA = ['1','2','3','4'];
                var clickSkillSwitch = false;
                $.each(skillArr, function(index, val){
                    var skillName = val;

                    for(var i = 0; i<skillIdA.length; i++){
                        var btnNum = skillIdA[i];
                        var btn = $('#skill_'+btnNum);
                        var btnName = btn.text();

                        if(btnName == skillName){
                            btn.find('button').trigger('click');
                            clickSkillSwitch = true;
                            break;
                        }
                    }
                })
                return
            }
            // 对准你 在你 四面八方 撞向你 直奔你 缠绕上了你 令你眼花缭乱
            var hitDesList = ['扫你','在你','四面八方','对准你','点你','劈你','取你','抓破你','往你','向你','奔你','朝你','击你','斩你'];
            for(var i = 0; i<hitDesList.length; i++){
                var hitText = hitDesList[i];
                if(txt.indexOf(hitText) != '-1'){
                    doKillSet();
                    return
                }
            }
            // if(txt.indexOf('扫你') != '-1' || txt.indexOf('在你') != '-1' || txt.indexOf('四面八方') != '-1' || txt.indexOf('对准你') != '-1' || txt.indexOf('点你') != '-1' || txt.indexOf('劈你') != '-1' || txt.indexOf('取你') != '-1' || txt.indexOf('抓破你的') != '-1' || txt.indexOf('往你') != '-1' || txt.indexOf('向你') != '-1' || txt.indexOf('缠绕上了你') != '-1' || txt.indexOf('令你眼花缭乱') != '-1'){
            //     doKillSet();
            //     return
            // }
        })

    }
    /* 对招 方法 :end */
    /* 自动战斗 方法 :start */
    var autoKillInter = null;
    function autoKill(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();
        if(DomTxt == '自动战斗'){
            autoKillInter = setInterval(function(){
                doKillSet();
            },timeInter);
            Dom.html('取消自动');
        }else{
            clearInterval(autoKillInter);
            Dom.html('自动战斗')
        }
    }
    function doKillSet(){
        if($('#skill_1').length == 0){
            return;
        }
        var skillArr = Base.mySkillLists.split('；');
        var skillIdA = ['1','2','3','4'];
        var clickSkillSwitch = false;
        $.each(skillArr, function(index, val){
            var skillName = val;

            for(var i = 0; i<skillIdA.length; i++){
                var btnNum = skillIdA[i];
                var btn = $('#skill_'+btnNum);
                var btnName = btn.text();

                if(btnName == skillName){
                    btn.find('button').trigger('click');
                    clickSkillSwitch = true;
                    break;
                }
            }
        })
        if(!clickSkillSwitch){
            clickButton('playskill 1');
        }
    }
    /* 自动战斗 方法 :end */
    /* 杀青龙 方法 :start */
    var openKillQinglong = ''; //是否开启杀青龙
    var Qname = '';     // 青龙恶人名称
    var pname = null;   // 装备名
    var idArr = [];     // 几个青龙人物的名称数组
    var myCareList = "";    // 关注装备的名称
    var ALLNAME = null;     // 装备名称字符串集合
    var qinglong = null;    // 定时查看是否有青龙
    function killQinglong(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();

        if(DomTxt == '杀青龙'){
            Dom.html('取消青龙');
            //myCareList = prompt("请输入要监控的装备", "明月,烈日,墨玄掌套,冰魄银针,烈日棍,西毒蛇杖,碧磷鞭,月光宝甲衣,斩神刀,龙象掌套,暴雨梨花针,残阳棍,伏虎杖,七星鞭,日光宝甲衣,龙皮至尊甲衣,碎片,斩龙宝镯,小李飞刀");
            console.log('运行杀青龙');

            if(Base.correctQu() == '38'){
                myCareList = "斩龙,九天龙吟剑,墨玄掌套,龙象掌套,飞宇天怒刀,天罡掌套,小李飞刀,龙皮";
                // myCareList = '明月,烈日,倚天剑,屠龙刀,墨玄掌套,冰魄银针,烈日棍,西毒蛇杖,碧磷鞭,月光宝甲衣,诛仙剑,斩神刀,龙象掌套,暴雨梨花针,残阳棍,伏虎杖,七星鞭,日光宝甲衣';
                // myCareList = '烈日,诛仙剑,斩神刀,龙象掌套,暴雨梨花针,残阳棍,伏虎杖,七星鞭,日光宝甲衣';
            }else{
                // myCareList = prompt("请输入要监控的装备", "明月,倚天剑,屠龙刀,墨玄掌套,冰魄银针,烈日棍,西毒蛇杖,碧磷鞭,月光宝甲衣,小李飞刀");
                myCareList = "碎片,小李飞刀";
            }

            isInKuafu = true;
            killBadSwitch = true;
            qinglong = setInterval(function(){
                getName();
            }, 2000);
        }else{
            clearInterval(qinglong);
            isInKuafu = false;
            Dom.html('杀青龙');
        }
    }
    // 获取最近出现的一个青龙
    Array.prototype.max = function() {
        var index = 0;
        var max = this[0];
        var len = this.length;
        for (var i = 1; i < len; i++){
            if (Number(this[i]) >= Number(max)) {
                max = this[i];
                index = i;
            }
        }
        return index;
    }
    // 获取青龙信息
    function getName(){
        var out = $('#out2 .out2');
        out.each(function(){

            if($(this).hasClass('done')){
                return
            }

            $(this).addClass('done');

            var txt = $(this).text();

            var searchText = null;

            if(searchName){
                console.log(searchName);
                searchText = '从'+searchName+'的尸体里搜出';
            }

            if(txt.indexOf(searchText) != '-1' ){
                if($('#btn4').html() == '取消搜尸'){
                    $('#btn4').trigger('click');
                }
            }else{
                if(txt.indexOf('战利品') == '-1' ){
                    return
                }
            }

            if(isKuaFu()){
                if(txt.indexOf(kuafuNpc) == '-1'){
                    return false;
                }
            }

            pname = getPname(txt);
            if(pname){
                console.log(txt);
                Qname = $(this).find('span').eq(1).html();
                var placeName =  $(this).find('a').text();
                if(placeName){
                    // playMp3();
                    goPlace(placeName);
                }
            }
        })
    }
    function isKuaFu(){
        var isTure = false;
        if(kuafuNpc != ''){
            isTure = true;
        }
        return isTure;
    }
    //去位置
    function goPlace(place){
        // clickButton('items use snow_qiannianlingzhi');
        clickButton('jh 1');
        switch(place){
            case "书房":
                goSfang();
                break;
            case "打铁铺子":
                goTie();
                break;
            case "桑邻药铺":
                goYao();
                break;
            case "南市":
                goNan();
                break;
            case "绣楼":
                goXiu();
                break;
            case "北大街":
                goNStreet();
                break;
            case "钱庄":
                goQian();
                break;
            case "桃花别院":
                goTao();
                break;
            case "杂货铺":
                goZa();
                break;
            case "祠堂大门":
                goCi();
                break;
            case "厅堂":
                goTing();
                break;
        }

        setTimeout(function(){
            idArr = [];
            killQ();
        },3000)
    }
    // 找到青龙目标
    function killQ(){
        var btn = $('.cmd_click3');
        idArr = [];
        Qname = kuafuNpc + Qname;
        //console.log('Qname:'+Qname);
        for(var i = btn.length;  i >0 ; i--){
            var txt = btn.eq(i).text();

            if(txt == Qname){
                var npcText = null;
                if(killBadSwitch){
                    npcText = btn.eq(i).attr('onclick');
                }else{
                    npcText = btn.eq(i-1).attr('onclick');
                }
                // var npcText = btn.eq(i).attr('onclick');
                // var npcText = btn.eq(i-1).attr('onclick');
                var id = getId(npcText);
                idArr.push(id);
                break;
            }
        }
        console.log(idArr);
        var maxId = null;
        if(idArr.length >1){
            var newIdArr = [];
            for(var i =0 ; i<idArr.length; i++){
                if(killBadSwitch){
                    newIdArr.push(idArr[i].replace('eren',''));
                }else{
                    newIdArr.push(arr[i].replace('bad_target_',''));
                }
                // newIdArr.push(idArr[i].replace('eren',''));
                // newIdArr.push(idArr[i].replace('bad_target_',''));
            }
            maxId = newIdArr.max();
            maxId = idArr[maxId];
        }else{
            maxId = idArr[0];
        }
        // console.log(maxId);  //eren580108074
        // lookNpc(maxId);
        killE(maxId);
        clearInterval(clearNpcInterval);
        // $('#btn11').html('清正邪');
    }
    // 杀死青龙
    function killE(name){
        clickButton('kill '+name);
    }
    // 获取恶人的id
    function getId(text){
        var arr = text.split(',');
        var newArr = arr[0].split('(');
        var nowArr = newArr[1].split(' ');
        var str = nowArr[1];
        var id = str.substr(0,str.length-1);
        return id;
    }
    // 判断是不是关注的青龙装备
    function getPname(txt){
        var _name = '';
        ALLNAME = myCareList.split(',');
        $.each(ALLNAME,function(n,v){
            if(txt.indexOf(v) != '-1'){
                _name = v;
                return false;
            }
        })
        return _name;
    }
    // 去书院
    function goSyuan(){
        clickButton('home');
        clickButton('jh 1');
        clickButton('go east');  // 广场
        clickButton('go south'); // 街口
        clickButton('go west');  // 街道
        clickButton('go south'); // 书院
    }
    // 去书房
    function goSfang(){
        clickButton('home');
        clickButton('jh 1');
        clickButton('go east');  // 广场
        clickButton('go north'); // 街道
        clickButton('go east');  // 大门
        clickButton('go east');  // 教练场
        clickButton('go east');  // 大厅
        clickButton('go east');  // 天井
        clickButton('go north'); // 进书房
    }
    // 去药店
    function goYao(){
        clickButton('home');
        clickButton('jh 1');
        clickButton('go east');  // 广场
        clickButton('go north'); // 街道
        clickButton('go north'); // 街道
        clickButton('go north'); // 街道
        clickButton('go west'); // 进药店
    }
    // 去铁匠铺
    function goTie(){
        clickButton('home');
        clickButton('jh 1');
        clickButton('go east');  // 广场
        clickButton('go north'); // 街道
        clickButton('go north'); // 街道
        clickButton('go west')
    }
    // 去南市
    function goNan(){
        clickButton('home');
        clickButton('jh 2');
        clickButton('go north');  // 南郊小路
        clickButton('go north');  // 南门
        clickButton('go east');  // 南市
    }
    // 去北大街
    function goNStreet(){
        clickButton('home');
        clickButton('jh 2');
        clickButton('go north');  // 南郊小路
        clickButton('go north');  // 南门
        clickButton('go north');  // 南大街
        clickButton('go north');  // 洛川街
        clickButton('go north');  // 中心鼓楼
        clickButton('go north');  // 中州街
        clickButton('go north');  // 北大街
    }
    // 去北大街
    function goQian(){
        clickButton('home');
        clickButton('jh 2');
        clickButton('go north');  // 南郊小路
        clickButton('go north');  // 南门
        clickButton('go north');  // 南大街
        clickButton('go north');  // 洛川街
        clickButton('go north');  // 中心鼓楼
        clickButton('go north');  // 中州街
        clickButton('go north');  // 北大街
        clickButton('go east');   // 钱庄
    }
    // 去桃花别院
    function goTao(){
        clickButton('home');
        clickButton('jh 2');
        clickButton('go north');  // 南郊小路
        clickButton('go north');  // 南门
        clickButton('go north');  // 南大街
        clickButton('go north');  // 洛川街
        clickButton('go west');   // 铜驼巷
        clickButton('go south');  // 桃花别院
    }
    // 去绣楼
    function goXiu(){
        clickButton('home');
        clickButton('jh 2');
        clickButton('go north');  // 南郊小路
        clickButton('go north');  // 南门
        clickButton('go north');  // 南大街
        clickButton('go north');  // 洛川街
        clickButton('go west');   // 铜驼巷
        clickButton('go south');  // 桃花别院
        clickButton('go west');   // 绣楼
    }
    // 去杂货店
    function goZa(){
        clickButton('home');
        clickButton('jh 3');
        clickButton('go south');  // 青石街
        clickButton('go south');  // 银杏广场
        clickButton('go east');  // 杂货店
    }
    // 去祠堂大门
    function goCi(){
        clickButton('home');
        clickButton('jh 3');
        clickButton('go south');  // 青石街
        clickButton('go south');  // 银杏广场
        clickButton('go west');   // 祠堂大门
    }
    // 去厅堂
    function goTing(){
        clickButton('home');
        clickButton('jh 3');
        clickButton('go south');  // 青石街
        clickButton('go south');  // 银杏广场
        clickButton('go west');   // 祠堂大门
        clickButton('go north');   // 厅堂
    }
    // 去鳄鱼
    function goEyu(){
        // n e e nw nw w n e n e e e ne ne ne  se n
        clickButton('home');
        clickButton('jh 37');
        clickButton('go north');
        clickButton('go east');
        clickButton('go east');
        clickButton('go northwest');
        clickButton('go northwest');
        clickButton('go west');
        clickButton('go north');
        clickButton('go east');
        clickButton('go north');
        clickButton('go east');
        clickButton('go east');
        clickButton('go east');
        clickButton('go northeast');
        clickButton('go northeast');
        clickButton('go northeast');
        clickButton('go southeast');
        clickButton('go north');
        clickButton('event_1_97487911');
        clickButton('home');
    }
    // 音乐地址
    var myAudio = new Audio();
    myAudio.src = 'http://zjdx1.sc.chinaz.com/Files/DownLoad/sound1/201705/8745.mp3';
    // 播放音乐
    function playMp3(){
        myAudio.play();
    }
    /* 杀青龙 方法 :end */
    /* 钓鱼 方法 :start */
    var resFishingParas = 100;   // 系统里默认最多挖50次
    var diaoyu_buttonName = 'diaoyu';
    var firstFishingParas = true;
    var resFishToday = 10;
    var lastFishMsg = "";
    var fishFunc = null;
    function fishingFirstFunc(){
        console.log("开始走向冰火岛！");
        fishingFirstStage();
    }
    function fishingFirstStage(){
        clickButton('home');
        clearInterval(fishFunc);
        for(var i = 0; i<10; i++){
            clickButton('shop money_buy shop5_N_10');
            clickButton('shop money_buy shop6_N_10');
        }
        // 进入扬州
        clickButton('jh 5');       // 进入章节
        clickButton('go north');     // 南门大街
        clickButton('go north');   // 十里长街3
        clickButton('go north');    // 十里长街2
        clickButton('go north');      // 十里长街1
        clickButton('go north');      // 中央广场
        clickButton('go north');      // 十里长街4
        clickButton('go north');      // 十里长街5
        clickButton('go north');      // 十里长街6
        clickButton('go north');      // 北门大街
        clickButton('go north');      // 镇淮门
        clickButton('go northeast') ;     // 扬州港
        clickButton('look_npc yangzhou_chuanyundongzhu');
        clickButton('chuhai go');
        setTimeout(function(){
            clickButton('chuhaigo');
            setTimeout(function(){
                fishingSecondFunc();
            },5000)
        },20000)
    }
    // 挖鱼饵参数

    function fishingSecondFunc(){
        resFishToday = 10;
        console.log("开始挖鱼饵、砍树、钓鱼！");
        fishingSecondStage();
    }
    function fishingSecondStage(){
        // 到达冰火岛
        clickButton('go northwest');      // 熔岩滩头
        clickButton('go northwest');      // 海蚀涯
        clickButton('go northwest');      // 峭壁崖道
        clickButton('go north');      // 峭壁崖道
        clickButton('go northeast') ;     // 炙溶洞口
        clickButton('go northwest');      // 炙溶洞
        clickButton('go west') ;     // 炙溶洞口
        clickButton('go northwest') ;     // 熔岩小径
        clickButton('go east') ;     // 熔岩小径
        clickButton('go east');      // 石华林
        clickButton('go east');      // 分岛岭
        clickButton('go east');      // 跨谷石桥
        clickButton('go east') ;     // 大平原
        clickButton('go southeast');
        clickButton('go east');
        // 开始钓鱼
        resFishingParas = 100;
        firstFishingParas = true;
        $('#out2 .out2').remove();
        fishIt();
        lastFishMsg = "";
        if(!fishFunc){
            fishFunc=setInterval(fishIt, 6000);
        }
    }
    function fishIt(){
        // 钓鱼之前先判断上次结果
        // 判断是否调出了东西
        console.log($('span:contains(突然)').text().slice(-9));

        if ($('span:contains(突然)').text().slice(-9) !== '没有钓上任何东西。' && ! firstFishingParas){
            if(lastFishMsg !== $('span:contains(突然)').text()) { // 防止钓鱼太快
                resFishToday = resFishToday - 1;
                console.log('钓到一条鱼，剩余钓鱼次数：%d，剩余鱼的条数:%d',resFishingParas, resFishToday);
            }else{
                console.log("应该是钓鱼太快了！");
            }
        }
        else{
            if (! firstFishingParas){
                console.log('shit！什么也没钓到！');
            }
        }
        lastFishMsg = $('span:contains(突然)').text();
        if(resFishingParas > 0 && resFishToday > 0){
            clickButton(diaoyu_buttonName);
            resFishingParas = resFishingParas-1;
            console.log('钓一次鱼，剩余钓鱼次数：%d，剩余鱼的条数:%d',resFishingParas, resFishToday);
            firstFishingParas = false;
            var hasYue = $('span:contains(钓鱼需要)').text().slice(-20);
            if (isContains(hasYue, '钓鱼需要鱼竿和鱼饵，你没有') && hasYue != ''){
                clearInterval(fishFunc);
                console.log('鱼竿或鱼饵不足，停止钓鱼！');
            }
            var hasDoneYue = $('span:contains(被你钓光了)');
            if (hasDoneYue.length >0){
                clearInterval(fishFunc);
                console.log('钓够10条了');
                if(Base.getCorrectText('4253282')){
                    clickButton('go west');
                    clickButton('go north');
                    clickButton('go north');
                    clickButton('go west');
                    clickButton('go north');
                    clickButton('go west');
                    clickButton('event_1_53278632');
                    setTimeout(function(){
                        clickButton('sousuo');
                        clickButton('sousuo');
                        clickButton('home');
                    },5000)
                }else{
                    clickButton('home');
                }
            }
        }
        else {
            clearInterval(fishFunc);
            if(Base.getCorrectText('4253282')){
                clickButton('go west');
                clickButton('go north');
                clickButton('go north');
                clickButton('go west');
                clickButton('go north');
                clickButton('go west');
                clickButton('event_1_53278632');
                setTimeout(function(){
                    clickButton('sousuo');
                    clickButton('sousuo');
                    clickButton('home');
                },5000)
            }else{
                clickButton('home');
            }
        }
    }
    /* 钓鱼 方法 :end */
    function removeByValue(arr, val) {
        for(var i=0; i< arr.length; i++) {
            if(arr[i] == val) {
                arr.splice(i, 1);
            }
        }
    }
    /* 37 || 38 设置  :start */
    var QIxiaListText = '郭济；步惊鸿；火云邪神；浪唤雨；吴缜；护竺；李宇飞；王蓉；庞统；风行骓；风南；逆风舞；狐苍雁';
    var qixiaPlace = false;
    function doPlace(){
        if(Base.correctQu() == '38'){
            qixiaPlace = true;
            // myCareList = '明月,烈日,倚天剑,屠龙刀,墨玄掌套,冰魄银针,烈日棍,西毒蛇杖,碧磷鞭,月光宝甲衣,诛仙剑,斩神刀,龙象掌套,暴雨梨花针,残阳棍,伏虎杖,七星鞭,日光宝甲衣';
            myCareList = '烈日,诛仙剑,斩神刀,龙象掌套,暴雨梨花针,残阳棍,伏虎杖,七星鞭,日光宝甲衣';
            QIxiaListText = '浪唤雨；郭济；王蓉；庞统；李宇飞；步惊鸿；风行骓；吴缜；风南；火云邪神；逆风舞；狐苍雁；护竺';
        }
    }
    doPlace();
    /* 37 || 38 设置  :end */
    /* 比试奇侠  :start */
    var QixiaInfoList = [
        {
            'name': '浪唤雨',
            'index': '0',
            'id': qixiaPlace ? 'langfuyu_1494082366_3948' : 'langfuyu_1493782694_7241',
        },{
            'name': '王蓉',
            'index': '1',
            'id': qixiaPlace ? 'wangrong_1494083286_5287' : 'wangrong_1493782958_7306',
        },{
            'name': '庞统',
            'index': '2',
            'id': qixiaPlace ? 'pangtong_1494084207_2639' : 'pangtong_1493783879_4255',
        },{
            'name': '李宇飞',
            'index': '3',
            'id': qixiaPlace ? 'liyufei_1494085130_5201' : 'liyufei_1493784259_6382',
        },{
            'name': '步惊鸿',
            'index': '4',
            'id': qixiaPlace ? 'bujinghong_1494086054_1635' : 'bujinghong_1493785173_9368',
        },{
            'name': '风行骓',
            'index': '5',
            'id': qixiaPlace ? 'fengxingzhui_1499611328_9078' : 'fengxingzhui_1499611243_9634',
        },{
            'name': '郭济',
            'index': '6',
            'id': qixiaPlace ? 'guoji_1494086978_5597' : 'guoji_1493786081_9111',
        },{
            'name': '吴缜',
            'index': '7',
            'id': qixiaPlace ? 'wuzhen_1499612120_4584' : 'wuzhen_1499612120_7351',
        },{
            'name': '风南',
            'index': '8',
            'id': qixiaPlace ? 'fengnan_1494087902_8771' : 'fengnan_1493786990_415',
        },{
            'name': '火云邪神',
            'index': '9',
            'id': qixiaPlace ? 'huoyunxieshen_1494088826_8655' : 'huoyunxieshen_1493787900_1939',
        },{
            'name': '逆风舞',
            'index': '10',
            'id': qixiaPlace ? 'niwufeng_1494089750_5660' : 'niwufeng_1493788811_7636',
        },{
            'name': '狐苍雁',
            'index': '11',
            'id': qixiaPlace ? 'hucangyan_1499613025_5192' : 'hucangyan_1499613026_2522',
        },{
            'name': '护竺',
            'index': '12',
            'id': qixiaPlace ? 'huzhu_1499613932_2191' : 'huzhu_1499613933_1522',
        }
    ]
    var fightQixiaSwitch = true;
    var qixiaObj= QixiaInfoList['12'];
    // 38区微信
    if(Base.getCorrectText('4254240')){
        qixiaObj= QixiaInfoList['0'];
    }
    var fightSkillInter = null,
        setFight = null,
        zhaobing = true;
    function startFightQixiaFn(e){
        var Dom = $(e.target);
        var DomTxt = Dom.html();

        if(DomTxt == '比试奇侠'){
            fightQixiaSwitch = true;
            Dom.html('取消奇侠');
            fightQiXiaFunc();
        }else{
            fightQixiaSwitch = false;
            clearInterval(fightSkillInter);
            clearInterval(setFight);
            Dom.html('比试奇侠');
        }
    }

    function fightQiXiaFunc(){
        clickButton('home');
        zhaobing = true;
        console.log('开始比试'+qixiaObj.name+'！');
        clickButton('open jhqx');
        clickButton('find_task_road qixia '+qixiaObj.index);
        if(fightQixiaSwitch){
            setTimeout(function(){
                eval("clickButton('fight " + qixiaObj.id + "')");
                // clickButton('fight huoyunxieshen_1493787900_1939');
                fightSkillInter = setInterval(function(){
                    getQiXiaInfo();
                }, 1000)
                setFight = setInterval(function(){
                    dofightQixiaSet();
                }, 1000)
            },1000)
        }
    }
    // 比试奇侠技能
    function dofightQixiaSet(){
        var skillArr = Base.mySkillLists.split('；');
        if(zhaobing){
            skillArr = ['茅山道术','天师灭神剑'];
        }

        if(hasDog().length >0 && zhaobing){
            clickButton('escape');
            return false;
        }
        var skillIdA = ['1','2','3','4'];
        var clickSkillSwitch = false;
        $.each(skillIdA, function(index, val){
            var btn = $('#skill_'+val);
            var btnName = btn.text();
            for(var i = 0; i<skillArr.length; i++){
                var skillName = skillArr[i];
                if(btnName == skillName){
                    btn.find('button').trigger('click');
                    clickSkillSwitch = true;
                    break;
                }
            }
        })
        //clickButton('escape');
        if(!clickSkillSwitch && $('.cmd_skill_button').length >0){
            clickButton('playskill 1');
        }
    }
    // 获取面板信息
    function getQiXiaInfo(){
        var out = $('#out2 .out2');
        out.each(function(){
            if($(this).hasClass('done')){
                return
            }
            $(this).addClass('done');
            var txt = $(this).text();
            if(txt.indexOf('悄声') != '-1' ){
                fightQixiaSwitch = false;
                clearInterval(fightSkillInter);
                clearInterval(setFight);
                var place = getQxiaQuestionPlace(txt);
                GoPlaceInfo(place);
            }else if(txt.indexOf('20/20') != '-1' ){
                fightQixiaSwitch = false;
                clearInterval(fightSkillInter);
                clearInterval(setFight);
            }else if(txt.indexOf('逃跑成功') != '-1'){
                //clearInterval(fightSkillInter);
                // clickButton('golook_room');
                clickButton('home');
                clickButton('open jhqx');
                clickButton('find_task_road qixia '+qixiaObj.index);
                setTimeout(function(){
                    fightDog();
                },1000)
            }else if(txt.indexOf('今日亲密度操作次数') != '-1'){
                // fightQixiaSwitch = false;
                clearInterval(fightSkillInter);
                clearInterval(setFight);
                fightQiXiaFunc();
            }
        });
    }
    // 比试狗
    function fightDog(){
        if(getDogNum().length >0){
            doFightDog();
        }
    }
    function doFightDog(){
        var nameArr = [];
        var nameDom = $('.cmd_click3');
        console.log('开始打兵');
        nameDom.each(function(){
            var name = $(this).text();
            if(name == '金甲符兵' || name == '玄阴符兵'){
                var npcText = $(this).attr('onclick');
                var id = getId(npcText);
                clickButton('fight '+id);
                zhaobing = false;
            }
        })
    }
    function getQxiaQuestionPlace(txt){
        var correctPlace = txt.split('，')[0].split('去')[1];
        return correctPlace;
    }
    // east  west south north northeast northwest northsouth southeast
    //
    // northwest    north(上)     northeast
    //
    // west(左)                   east(右)
    //
    // southwest    south(下)     southeast
    //
    function GoPlaceInfo(place){
        var placeNum = '';
        var placeSteps = [];
        switch(place){
            case '卢崖瀑布':
                placeNum = '22';
                placeSteps = [{'road': 'north'}];
                break;
            case '观景台':
                placeNum = '24';
                placeSteps = [{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'east'},{'road': 'east'},{'road': 'north'},];
                break;
            case '启母石':
                placeNum = '22';
                placeSteps = [{'road': 'north'},{'road': 'north'},{'road': 'west'},{'road': 'west'}];
                break;
            case '无极老姆洞':
                placeNum = '22';
                placeSteps = [{'road': 'north'},{'road': 'north'},{'road': 'west'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'}];
                break;
            case '猢狲愁':
                placeNum = '4';
                placeSteps = [{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'event': 'event_1_91604710'},{'road':'northwest'}];
                break;
            case '山坳':
                placeNum = '1';
                placeSteps = [{'road': 'east'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'}];
                break;
            case '山溪畔':
                placeNum = '4';
                placeSteps = [{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'}];
                break;
            case '桃花泉':
                placeNum = '3';
                placeSteps = [{'road': 'south'},{'road': 'south'},{'road': 'south'},{'road': 'south'},{'road': 'south'},{'road': 'northwest'},{'road': 'north'},{'road': 'north'},{'road': 'east'}];
                break;
            case '碧水寒潭':
                placeNum = '18';
                placeSteps = [{'road': 'north'},{'road': 'northwest'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'northeast'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'east'},{'road': 'east'},{'road': 'southeast'},{'road': 'southeast'},{'road': 'east'}];
                break;
            case '千尺幢':
                placeNum = '4';
                placeSteps = [{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'}];
                break;
            case '玉壁瀑布':
                placeNum = '16';
                placeSteps = [{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'north'},{'road': 'east'},{'road': 'south'},{'road': 'east'}];
                break;
            case '悬根松':
                placeNum = '9';
                placeSteps = [{'road': 'north'},{'road': 'west'}];
                break;
            case '夕阳岭':
                placeNum = '9';
                placeSteps = [{'road': 'north'},{'road': 'north'},{'road': 'east'}];
                break;
            case '沙丘小洞':
                placeNum = '6';
                placeSteps = [{'event': 'event_1_98623439'},{'road': 'northeast'},{'road': 'north'},{'road': 'northeast'},{'road': 'northeast'},{'road': 'northeast'},{'event': 'event_1_97428251'}];
                break;
        }

        GoPlace(placeNum, placeSteps);
    }
    function GoPlace(num, steps){
        clickButton('home');
        clickButton('jh '+num);
        //clickButton('go south');
        for(var i = 0 ; i<steps.length; i ++){
            for(var j in steps[i]){
                if(j == 'road'){
                    clickButton('go '+steps[i][j]);
                }else if( j == 'event'){
                    eval("clickButton('" + steps[i][j] + "')");
                }
            }


        }
        // clickButton('find_task_road secret');
        // clickButton('baguamen_op1');
        // clickButton('baguamen_saodang');
    }
    /* 比试奇侠  :end */
    /* 撩奇侠  :start */
    var QiXiaIndex = 0;
    function talkSelectQiXia(){
        var QiXiaTextList = QIxiaListText.split("；");
        for (var i = 0; i < QiXiaTextList.length; i ++){
            // 每个元素删除左右侧的空格
            QiXiaTextList[i] = QiXiaTextList[i].trim(" ", "left").trim(" ","right");
        }

        for (var i = 0; i < QiXiaTextList.length; i ++ ){
            QiXiaIndex = i;
            talkWithQiXia(QiXiaTextList[i]);
        }
    }

    function talkWithQiXia(name){
        var delay_Time = 1000;
        for(var i =0 ; i<QixiaInfoList.length; i++){
            var NAME = QixiaInfoList[i].name;
            if(NAME == name){
                doTalkWithQixia(QixiaInfoList[i]);
            }
        }
    }

    function doTalkWithQixia(info){
        console.log("开始撩"+info.name+"！");
        clickButton('open jhqx');
        clickButton('find_task_road qixia '+info.index);
        var maxLength = 5;
        if(QiXiaIndex == '0'){
            maxLength = 25;
        }
        for(var i = 0; i<maxLength; i++){
            clickButton('ask '+info.id);
        }
        clickButton('home');
    }

    String.prototype.trim = function (char, type) { // 去除字符串中，头部或者尾部的指定字符串
        if (char) {
            if (type == 'left') {
                return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
            } else if (type == 'right') {
                return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
            }
            return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
        }
        return this.replace(/^\s+|\s+$/g, '');
    };
    /* 撩奇侠  :end */
    /* 杀天剑  :start */
    var TianJianNPCList = ["天剑谷卫士", "天剑", "天剑真身", "虹风", "虹雨","虹雷", "虹电"];
    //var TianJianNPCList = ["王铁匠", "杨掌柜", "柳绘心", "柳小花", "朱老伯","方老板", "醉汉"];
    var killTianJianIntervalFunc =  null;
    var currentNPCIndex = 0;
    function killTianJianTargetFunc(e){
        mySkillLists =  Base.mySkillLists;
        var Dom = $(e.target);
        if (Dom.html() == '杀天剑'){
            currentNPCIndex = 0;
            console.log("开始杀天剑目标NPC！");
            skillLists = mySkillLists;
            Dom.html('停天剑');
            killTianJianIntervalFunc = setInterval(killTianJian, 500);

        }else{
            console.log("停止杀天剑目标NPC！");
            Dom.html('杀天剑');
            clearInterval(killTianJianIntervalFunc);
        }
    }
    function killTianJian(){
        //    clickButton('go east');
        if ($('span').text().slice(-7) == "不能杀这个人。"){
            currentNPCIndex = currentNPCIndex + 1;
            console.log("不能杀这个人！");
            //        return;
        }
        getTianJianTargetCode();
        setTimeout(ninesword, 200);
        if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...'){
            currentNPCIndex = 0;
            console.log('杀人一次！');
            clickButton('prev_combat');
        }
    }
    function getTianJianTargetCode(){
        var peopleList = $(".cmd_click3");
        var thisonclick = null;
        var targetNPCListHere = [];
        var countor= 0;
        for(var i=0; i < peopleList.length; i++) { // 从第一个开始循环
            // 打印 NPC 名字，button 名，相应的NPC名
            thisonclick = peopleList[i].getAttribute('onclick');
            if (TianJianNPCList.contains(peopleList[i].innerText)){
                var targetCode = thisonclick.split("'")[1].split(" ")[1];
                //           console.log("发现NPC名字：" +  peopleList[i].innerText + "，代号：" + targetCode);
                targetNPCListHere[countor] = peopleList[i];
                countor = countor +1;
            }
        }
        // targetNPCListHere 是当前场景所有满足要求的NPC button数组
        if (currentNPCIndex >= targetNPCListHere.length){
            currentNPCIndex = 0;
        }
        if (targetNPCListHere.length > 0){
            thisonclick = targetNPCListHere[currentNPCIndex].getAttribute('onclick');
            var targetCode = thisonclick.split("'")[1].split(" ")[1];
            console.log("准备杀目标NPC名字：" + targetNPCListHere[currentNPCIndex].innerText + "，代码：" + targetCode +"，目标列表中序号：" + (currentNPCIndex ));
            clickButton('kill ' + targetCode); // 点击杀人
            setTimeout(detectKillTianJianInfo,200); // 200 ms后获取杀人情况，是满了还是进入了
        }
    }
    function detectKillTianJianInfo(){
        var TianJianInfo = $('span').text();
        if (TianJianInfo.slice(-15) == "已经太多人了，不要以多欺少啊。"){
            currentNPCIndex = currentNPCIndex + 1;
        }else{
            currentNPCIndex = 0;
        }
    }
    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }
    /* 杀天剑  :end */
    /* 喂鳄鱼+侠客岛  :start */
    function newGetXiaKe(){
        weiEyuFn();
    }
    function goXiaKe(){
        clickButton('home');
        clickButton('jh 36');
        clickButton('yell');
        setTimeout(function(){
            goRead();
        },25000);
    }
    function goRead(){
        clickButton('go east');
        clickButton('go northeast');
        clickButton('go northeast');
        clickButton('go northeast');
        clickButton('go east');
        clickButton('go east');
        clickButton('go east');
        // clickButton('event_1_9179222');     // 进入侧厅
        setTimeout(function(){
            clickBtn('进入侧厅');
            readBoard();
        },3000)
    }
    function readBoard(){
        clickButton('go east');
        // clickButton('event_1_11720543');    // 观阅
        setTimeout(function(){
            clickBtn('观阅');
            goJump();
        },3000)
    }
    function goJump(){
        clickButton('go west');
        clickButton('go north');
        clickButton('go east');
        clickButton('go east');
        clickButton('go south');
        clickButton('go east');
        // clickButton('event_1_44025101');    // 跳下去
        setTimeout(function(){
            clickBtn('跳下去')
            setTimeout(function(){
                isCorrectJump();
            },2000)
        },3000)
    }
    function goBackXiaKe(){
        clickButton('go northwest');
        clickButton('go west');
        clickButton('go southwest');
        clickButton('go west');
        clickButton('go north');
        clickButton('go north');
        clickButton('go north');
        clickButton('go west');
        clickButton('go west');
        clickButton('go south');
        clickButton('go west');
        clickButton('go northwest');
        clickButton('go west');
        clickButton('go east');
        clickButton('go northeast');
        clickButton('go northeast');
        clickButton('go northeast');
        clickButton('go east');
        clickButton('go east');
        clickButton('go east');
        clickButton('go east');
        clickButton('go east');
        clickButton('go south');
        clickButton('go east');
        setTimeout(function(){
            clickBtn('跳下去')
            setTimeout(function(){
                isCorrectJump();
            },2000)
        },2000)

    }
    function isCorrectJump(){
        var clickName = getClickName('进入甬道');
        if(clickName){
            clickBtn('进入甬道');
            setTimeout(function(){
                clickButton('go east');
                clickButton('go east');
                clickButton('go south');
                setTimeout(function(){
                    clickBtn('领悟');
                    clickButton('home');
                },2000);
            },2000)
        }else{
            setTimeout(function(){
                clickBtn('游出去');
            },2000)
            setTimeout(function(){
                goBackXiaKe();
            },4000);
        }
    }
    function clickBtn(name){
        var btn = $('.cmd_click3');
        btn.each(function(){
            var _name = $(this).text();
            if(_name == name){
                $(this).trigger('click');
            }
        })
    }
    function getClickName(name){
        var nameSwitch = false;
        var btn = $('.cmd_click3');
        btn.each(function(){
            var _name = $(this).text();
            if(_name == name){
                nameSwitch = true;
            }
        })
        return nameSwitch;
    }
    function weiEyuFn(){
        goEyu();
        goXiaKe();
    }
    /* 喂鳄鱼+侠客岛  :end */
    /* 试剑  :start */
    var  zdskill111 = Base.mySkillLists;
    var killDrunkIntervalFunc1 =  null;
    function CheckIn1(e){
        clickButton('home');
        window.Dom = $(e.target);
        clickButton('swords');
        clickButton('swords select_member heimuya_dfbb');   // 东方
        clickButton('swords select_member tangmen_madam');  //欧阳敏
        clickButton('swords select_member qingcheng_mudaoren');   //木道人
        clickButton('swords fight_test go');
        if(Dom.html() == "试剑"){
            Dom.html("停止");
            killDrunkIntervalFunc1=setInterval(killDrunMan1,1000);//code
        }
        else{
            Dom.html("试剑");
            clearInterval(killDrunkIntervalFunc1)
        }
    }
    function isContains1(str, substr) {
        if(!str){
            return -1;
        }
        return str.indexOf(substr) >= 0;
    }
    function killDrunMan1(){
        var doneShijian = $('span:contains(你今天试剑次数已达限额)');
        if(doneShijian.length >0){
            Dom.html("试剑");
            clearInterval(killDrunkIntervalFunc1);
            return;
        }
        clickButton('swords fight_test go');
        doKillSet();
        var str = $("#out").html();
        if(str.indexOf('战斗结束') !=-1)
        {
            clickButton('prev_combat');
        }
    }
    /* 试剑  :end */
    /* 答题  :start */
    var answerQuestionsInterval = null;
    var QuestAnsLibs = {
        "“白玉牌楼”场景是在哪个地图上？":"c",
        "“百龙山庄”场景是在哪个地图上？":"b",
        "“冰火岛”场景是在哪个地图上？":"b",
        "“常春岛渡口”场景是在哪个地图上？":"c",
        "“跪拜坪”场景是在哪个地图上？":"b",
        "“翰墨书屋”场景是在哪个地图上？":"c",
        "“花海”场景是在哪个地图上？":"a",
        "“留云馆”场景是在哪个地图上？":"b",
        "“日月洞”场景是在哪个地图上？":"b",
        "“蓉香榭”场景是在哪个地图上？":"c",
        "“三清殿”场景是在哪个地图上？":"b",
        "“三清宫”场景是在哪个地图上？":"c",
        "“双鹤桥”场景是在哪个地图上？":"b",
        "“无名山脚”场景是在哪个地图上？":"d",
        "“伊犁”场景是在哪个地图上？":"b",
        "“鹰记商号”场景是在哪个地图上？":"d",
        "“迎梅客栈”场景是在哪个地图上？":"d",
        "“子午楼”场景是在哪个地图上？":"c",
        "8级的装备摹刻需要几把刻刀":"a",
        "NPC公平子在哪一章地图":"a",
        "瑷伦在晚月庄的哪个场景":"b",
        "安惜迩是在那个场景":"c",
        "黯然销魂掌有多少招式？":"c",
        "黯然销魂掌是哪个门派的技能":"a",
        "八卦迷阵是哪个门派的阵法？":"b",
        "八卦迷阵是那个门派的阵法":"a",
        "白金戒指可以在哪位那里获得？":"b",
        "白金手镯可以在哪位那里获得？":"a",
        "白金项链可以在哪位那里获得？":"b",
        "白蟒鞭的伤害是多少？":"a",
        "白驼山第一位要拜的师傅是谁":"a",
        "白银宝箱礼包多少元宝一个":"d",
        "白玉腰束是腰带类的第几级装备？":"b",
        "拜师风老前辈需要正气多少":"b",
        "拜师老毒物需要蛤蟆功多少级":"a",
        "拜师铁翼需要多少内力":"b",
        "拜师小龙女需要容貌多少":"c",
        "拜师张三丰需要多少正气":"b",
        "包家将是哪个门派的师傅":"a",
        "包拯在哪一章":"d",
        "宝石合成一次需要消耗多少颗低级宝石？":"c",
        "宝玉帽可以在哪位那里获得？":"d",
        "宝玉鞋击杀哪个可以获得":"a",
        "宝玉鞋在哪获得":"a",
        "暴雨梨花针的伤害是多少？":"c",
        "北斗七星阵是第几个的组队副本":"c",
        "北冥神功是哪个门派的技能":"b",
        "北岳殿神像后面是哪位":"b",
        "匕首加什么属性":"c",
        "碧海潮生剑在哪位师傅处学习":"a",
        "碧磷鞭的伤害是多少？":"b",
        "镖局保镖是挂机里的第几个任务":"d",
        "冰魄银针的伤害是多少？":"b",
        "病维摩拳是哪个门派的技能":"b",
        "不可保存装备下线多久会消失":"c",
        "不属于白驼山的技能是什么":"b",
        "沧海护腰可以镶嵌几颗宝石":"d",
        "沧海护腰是腰带类的第几级装备？":"a",
        "藏宝图在哪个NPC处购买":"a",
        "藏宝图在哪个处购买":"b",
        "藏宝图在哪里那里买":"a",
        "草帽可以在哪位那里获得？":"b",
        "成功易容成异性几次可以领取易容成就奖":"b",
        "成长计划第七天可以领取多少元宝？":"d",
        "成长计划六天可以领取多少银两？":"d",
        "成长计划需要多少元宝方可购买？":"a",
        "城里打擂是挂机里的第几个任务":"d",
        "城里抓贼是挂机里的第几个任务":"b",
        "充值积分不可以兑换下面什么物品":"d",
        "出生选武学世家增加什么":"a",
        "闯楼第几层可以获得称号“藏剑楼护法”":"b",
        "闯楼第几层可以获得称号“藏剑楼楼主”":"d",
        "闯楼第几层可以获得称号“藏剑楼长老”":"c",
        "闯楼每多少层有称号奖励":"a",
        "春风快意刀是哪个门派的技能":"b",
        "春秋水色斋需要多少杀气才能进入":"d",
        "从哪个处进入跨服战场":"a",
        "摧心掌是哪个门派的技能":"a",
        "达摩在少林哪个场景":"c",
        "达摩杖的伤害是多少？":"d",
        "打开引路蜂礼包可以得到多少引路蜂？":"b",
        "打排行榜每天可以完成多少次？":"a",
        "打土匪是挂机里的第几个任务":"c",
        "打造刻刀需要多少个玄铁":"a",
        "打坐增长什么属性":"a",
        "大保险卡可以承受多少次死亡后不降技能等级？":"b",
        "大乘佛法有什么效果":"d",
        "大旗门的修养术有哪个特殊效果":"a",
        "大旗门的云海心法可以提升哪个属性":"c",
        "大招寺的金刚不坏功有哪个特殊效果":"a",
        "大招寺的铁布衫有哪个特殊效果":"c",
        "当日最低累积充值多少元即可获得返利？":"b",
        "刀法基础在哪掉落":"a",
        "倒乱七星步法是哪个门派的技能":"d",
        "等级多少才能在世界频道聊天？":"c",
        "第一个副本需要多少等级才能进入":"d",
        "貂皮斗篷是披风类的第几级装备？":"b",
        "丁老怪是哪个门派的终极师傅":"a",
        "丁老怪在星宿海的哪个场景":"b",
        "东方教主在魔教的哪个场景":"b",
        "斗转星移是哪个门派的技能":"a",
        "斗转星移阵是哪个门派的阵法":"a",
        "毒龙鞭的伤害是多少？":"a",
        "毒物阵法是哪个门派的阵法":"b",
        "独孤求败有过几把剑？":"d",
        "独龙寨是第几个组队副本":"a",
        "读书写字301-400级在哪里买书":"c",
        "读书写字最高可以到多少级":"b",
        "端茶递水是挂机里的第几个任务":"b",
        "断云斧是哪个门派的技能":"a",
        "锻造一把刻刀需要多少玄铁碎片锻造？":"c",
        "锻造一把刻刀需要多少银两？":"a",
        "兑换易容面具需要多少玄铁碎片":"c",
        "多少消费积分换取黄金宝箱":"a",
        "多少消费积分可以换取黄金钥匙":"b",
        "翻译梵文一次多少银两":"d",
        "方媃是哪个门派的师傅":"b",
        "飞仙剑阵是哪个门派的阵法":"b",
        "风老前辈在华山哪个场景":"b",
        "风泉之剑加几点悟性":"c",
        "风泉之剑可以在哪位那里获得？":"b",
        "风泉之剑在哪里获得":"d",
        "疯魔杖的伤害是多少？":"b",
        "伏虎杖的伤害是多少？":"c",
        "副本完成后不可获得下列什么物品":"b",
        "副本一次最多可以进几人":"a",
        "副本有什么奖励":"d",
        "富春茶社在哪一章":"c",
        "改名字在哪改？":"d",
        "丐帮的绝学是什么":"a",
        "丐帮的轻功是哪个":"b",
        "干苦力是挂机里的第几个任务":"a",
        "钢丝甲衣可以在哪位那里获得？":"d",
        "高级乾坤再造丹加什么":"b",
        "高级乾坤再造丹是增加什么的？":"b",
        "高级突破丹多少元宝一颗":"d",
        "割鹿刀可以在哪位npc那里获得？":"b",
        "葛伦在大招寺的哪个场景":"b",
        "根骨能提升哪个属性":"c",
        "功德箱捐香火钱有什么用":"a",
        "功德箱在雪亭镇的哪个场景？":"c",
        "购买新手进阶礼包在挂机打坐练习上可以享受多少倍收益？":"b",
        "孤独求败称号需要多少论剑积分兑换":"b",
        "孤儿出身增加什么":"d",
        "古灯大师是哪个门派的终极师傅":"c",
        "古灯大师在大理哪个场景":"c",
        "古墓多少级以后才能进去？":"d",
        "寒玉床睡觉修炼需要多少点内力值":"c",
        "寒玉床睡觉一次多久":"c",
        "寒玉床需要切割多少次":"d",
        "寒玉床在哪里切割":"a",
        "寒玉床在那个地图可以找到？":"a",
        "黑狗血在哪获得":"b",
        "黑水伏蛟可以在哪位npc那里获得？":"c",
        "红宝石加什么属性":"b",
        "洪帮主在洛阳哪个场景":"c",
        "虎皮腰带是腰带类的第几级装备？":"a",
        "花不为在哪一章":"a",
        "花花公子在哪个地图":"a",
        "华山村王老二掉落的物品是什么":"a",
        "华山施戴子掉落的物品是什么":"b",
        "华山武器库从哪个NPC进":"d",
        "黄宝石加什么属性":"c",
        "黄岛主在桃花岛的哪个场景":"d",
        "黄袍老道是哪个门派的师傅":"c",
        "积分商城在雪亭镇的哪个场景？":"c",
        "技能柳家拳谁教的？":"a",
        "技能数量超过了什么消耗潜能会增加":"b",
        "嫁衣神功是哪个门派的技能":"b",
        "剑冢在哪个地图":"a",
        "街头卖艺是挂机里的第几个任务":"a",
        "金弹子的伤害是多少？":"a",
        "金刚不坏功有什么效果":"a",
        "金刚杖的伤害是多少？":"a",
        "金戒指可以在哪位npc那里获得？":"d",
        "金手镯可以在哪位npc那里获得？":"b",
        "金丝鞋可以在哪位npc那里获得？":"b",
        "金项链可以在哪位npc那里获得？":"d",
        "金玉断云是哪个门派的阵法":"a",
        "锦缎腰带是腰带类的第几级装备？":"a",
        "精铁棒可以在哪位那里获得？":"d",
        "九区服务器名称":"d",
        "九阳神功是哪个门派的技能":"c",
        "九阴派梅师姐在星宿海哪个场景":"a",
        "军营是第几个组队副本":"b",
        "开通VIP月卡最低需要当天充值多少元方有购买资格？":"a",
        "可以召唤金甲伏兵助战是哪个门派？":"a",
        "客商在哪一章":"b",
        "孔雀氅可以镶嵌几颗宝石":"b",
        "孔雀氅是披风类的第几级装备？":"c",
        "枯荣禅功是哪个门派的技能":"a",
        "跨服是星期几举行的":"b",
        "跨服天剑谷每周六几点开启":"a",
        "跨服需要多少级才能进入":"c",
        "跨服在哪个场景进入":"c",
        "兰花拂穴手是哪个门派的技能":"a",
        "蓝宝石加什么属性":"a",
        "蓝止萍在哪一章":"c",
        "蓝止萍在晚月庄哪个小地图":"b",
        "老毒物在白驮山的哪个场景":"b",
        "老顽童在全真教哪个场景":"b",
        "莲花掌是哪个门派的技能":"a",
        "烈火旗大厅是那个地图的场景":"c",
        "烈日项链可以镶嵌几颗宝石":"c",
        "林祖师是哪个门派的师傅":"a",
        "灵蛇杖法是哪个门派的技能":"c",
        "凌波微步是哪个门派的技能":"b",
        "凌虚锁云步是哪个门派的技能":"b",
        "领取消费积分需要寻找哪个NPC？":"c",
        "鎏金缦罗是披风类的第几级装备？":"d",
        "柳淳风在哪一章":"c",
        "柳淳风在雪亭镇哪个场景":"b",
        "柳文君所在的位置":"a",
        "六脉神剑是哪个门派的绝学":"a",
        "陆得财是哪个门派的师傅":"c",
        "陆得财在乔阴县的哪个场景":"a",
        "论剑每天能打几次":"a",
        "论剑是每周星期几":"c",
        "论剑是什么时间点正式开始":"a",
        "论剑是星期几进行的":"c",
        "论剑是星期几举行的":"c",
        "论剑输一场获得多少论剑积分":"a",
        "论剑要在晚上几点前报名":"b",
        "论剑在周几进行？":"b",
        "论剑中步玄派的师傅是哪个":"a",
        "论剑中大招寺第一个要拜的师傅是谁":"c",
        "论剑中古墓派的终极师傅是谁":"d",
        "论剑中花紫会的师傅是谁":"c",
        "论剑中青城派的第一个师傅是谁":"a",
        "论剑中青城派的终极师傅是谁":"d",
        "论剑中逍遥派的终极师傅是谁":"c",
        "论剑中以下不是峨嵋派技能的是哪个":"b",
        "论剑中以下不是华山派的人物的是哪个":"d",
        "论剑中以下哪个不是大理段家的技能":"c",
        "论剑中以下哪个不是大招寺的技能":"b",
        "论剑中以下哪个不是峨嵋派可以拜师的师傅":"d",
        "论剑中以下哪个不是丐帮的技能":"d",
        "论剑中以下哪个不是丐帮的人物":"a",
        "论剑中以下哪个不是古墓派的的技能":"b",
        "论剑中以下哪个不是华山派的技能的":"d",
        "论剑中以下哪个不是明教的技能":"d",
        "论剑中以下哪个不是魔教的技能":"a",
        "论剑中以下哪个不是魔教的人物":"d",
        "论剑中以下哪个不是全真教的技能":"d",
        "论剑中以下哪个不是是晚月庄的技能":"d",
        "论剑中以下哪个不是唐门的技能":"c",
        "论剑中以下哪个不是唐门的人物":"c",
        "论剑中以下哪个不是铁雪山庄的技能":"d",
        "论剑中以下哪个不是铁血大旗门的技能":"c",
        "论剑中以下哪个是大理段家的技能":"a",
        "论剑中以下哪个是大招寺的技能":"b",
        "论剑中以下哪个是丐帮的技能":"b",
        "论剑中以下哪个是花紫会的技能":"a",
        "论剑中以下哪个是华山派的技能的":"a",
        "论剑中以下哪个是明教的技能":"b",
        "论剑中以下哪个是青城派的技能":"b",
        "论剑中以下哪个是唐门的技能":"b",
        "论剑中以下哪个是天邪派的技能":"b",
        "论剑中以下哪个是天邪派的人物":"a",
        "论剑中以下哪个是铁雪山庄的技能":"c",
        "论剑中以下哪个是铁血大旗门的技能":"b",
        "论剑中以下哪个是铁血大旗门的师傅":"a",
        "论剑中以下哪个是晚月庄的技能":"a",
        "论剑中以下哪个是晚月庄的人物":"a",
        "论剑中以下是峨嵋派技能的是哪个":"a",
        "论语在哪购买":"a",
        "骆云舟在哪一章":"c",
        "骆云舟在乔阴县的哪个场景":"b",
        "落英神剑掌是哪个门派的技能":"b",
        "吕进在哪个地图":"a",
        "绿宝石加什么属性":"c",
        "漫天花雨匕在哪获得":"a",
        "茅山的绝学是什么":"b",
        "茅山的天师正道可以提升哪个属性":"d",
        "茅山可以招几个宝宝":"c",
        "茅山派的轻功是什么":"b",
        "茅山天师正道可以提升什么":"c",
        "茅山学习什么技能招宝宝":"a",
        "茅山在哪里拜师":"c",
        "每次合成宝石需要多少银两？":"a",
        "每个玩家最多能有多少个好友":"b",
        "vip每天不可以领取什么":"b",
        "每天的任务次数几点重置":"d",
        "每天分享游戏到哪里可以获得20元宝":"a",
        "每天能挖几次宝":"d",
        "每天能做多少个谜题任务":"a",
        "每天能做多少个师门任务":"c",
        "每天微信分享能获得多少元宝":"d",
        "每天有几次试剑":"b",
        "每天在线多少个小时即可领取消费积分？":"b",
        "每突破一次技能有效系数加多少":"a",
        "密宗伏魔是哪个门派的阵法":"c",
        "灭绝师太在第几章":"c",
        "灭绝师太在峨眉山哪个场景":"a",
        "明教的九阳神功有哪个特殊效果":"a",
        "明月帽要多少刻刀摩刻？":"a",
        "摹刻10级的装备需要摩刻技巧多少级":"b",
        "摹刻烈日宝链需要多少级摩刻技巧？":"c",
        "摹刻扬文需要多少把刻刀？":"a",
        "魔鞭诀在哪里学习":"d",
        "魔教的大光明心法可以提升哪个属性":"d",
        "莫不收在哪一章":"a",
        "墨磷腰带是腰带类的第几级装备？":"d",
        "木道人在青城山的哪个场景":"b",
        "慕容家主在慕容山庄的哪个场景":"a",
        "慕容山庄的斗转星移可以提升哪个属性":"d",
        "哪个NPC掉落拆招基础":"a",
        "哪个处可以捏脸":"a",
        "哪个分享可以获得20元宝":"b",
        "哪个技能不是魔教的":"d",
        "哪个门派拜师没有性别要求":"d",
        "哪个npc属于全真七子":"b",
        "哪样不能获得玄铁碎片":"c",
        "能增容貌的是下面哪个技能":"a",
        "捏脸需要花费多少银两？":"c",
        "捏脸需要寻找哪个NPC？":"a",
        "欧阳敏是哪个门派的？":"b",
        "欧阳敏是哪个门派的师傅":"b",
        "欧阳敏在哪一章":"a",
        "欧阳敏在唐门的哪个场景":"c",
        "排行榜最多可以显示多少名玩家？":"a",
        "逄义是在那个场景":"a",
        "披星戴月是披风类的第几级装备？":"d",
        "劈雳拳套有几个镶孔":"a",
        "霹雳掌套的伤害是多少":"b",
        "辟邪剑法是哪个门派的绝学技能":"a",
        "辟邪剑法在哪学习":"b",
        "婆萝蜜多心经是哪个门派的技能":"b",
        "七宝天岚舞是哪个门派的技能":"d",
        "七星鞭的伤害是多少？":"c",
        "七星剑法是哪个门派的绝学":"a",
        "棋道是哪个门派的技能":"c",
        "千古奇侠称号需要多少论剑积分兑换":"d",
        "乾坤大挪移属于什么类型的武功":"a",
        "乾坤一阳指是哪个师傅教的":"a",
        "青城派的道德经可以提升哪个属性":"c",
        "青城派的道家心法有哪个特殊效果":"a",
        "清风寨在哪":"b",
        "清风寨在哪个地图":"d",
        "清虚道长在哪一章":"d",
        "去唐门地下通道要找谁拿钥匙":"a",
        "全真的道家心法有哪个特殊效果":"a",
        "全真的基本阵法有哪个特殊效果":"b",
        "全真的双手互搏有哪个特殊效果":"c",
        "日月神教大光明心法可以提升什么":"d",
        "如何将华山剑法从400级提升到440级？":"d",
        "如意刀是哪个门派的技能":"c",
        "山河藏宝图需要在哪个NPC手里购买？":"d",
        "上山打猎是挂机里的第几个任务":"c",
        "少林的混元一气功有哪个特殊效果":"d",
        "少林的易筋经神功有哪个特殊效果":"a",
        "蛇形刁手是哪个门派的技能":"b",
        "什么影响打坐的速度":"c",
        "什么影响攻击力":"d",
        "什么装备不能镶嵌黄水晶":"d",
        "什么装备都能镶嵌的是什么宝石？":"c",
        "什么装备可以镶嵌紫水晶":"c",
        "神雕大侠所在的地图":"b",
        "神雕大侠在哪一章":"a",
        "神雕侠侣的时代背景是哪个朝代？":"d",
        "神雕侠侣的作者是?":"b",
        "升级什么技能可以提升根骨":"a",
        "生死符的伤害是多少？":"a",
        "师门磕头增加什么":"a",
        "师门任务每天可以完成多少次？":"a",
        "师门任务每天可以做多少个？":"c",
        "师门任务什么时候更新？":"b",
        "师门任务一天能完成几次":"d",
        "师门任务最多可以完成多少个？":"d",
        "施令威在哪个地图":"b",
        "石师妹哪个门派的师傅":"c",
        "使用朱果经验潜能将分别增加多少？":"a",
        "首次通过桥阴县不可以获得那种奖励？":"a",
        "受赠的消费积分在哪里领取":"d",
        "兽皮鞋可以在哪位那里获得？":"b",
        "树王坟在第几章节":"c",
        "双儿在扬州的哪个小地图":"a",
        "孙天灭是哪个门派的师傅":"c",
        "踏雪无痕是哪个门派的技能":"b",
        "踏云棍可以在哪位那里获得？":"a",
        "唐门的唐门毒经有哪个特殊效果":"a",
        "唐门密道怎么走":"c",
        "天蚕围腰可以镶嵌几颗宝石":"d",
        "天蚕围腰是腰带类的第几级装备？":"d",
        "天山姥姥在逍遥林的哪个场景":"d",
        "天山折梅手是哪个门派的技能":"c",
        "天师阵法是哪个门派的阵法":"b",
        "天邪派在哪里拜师":"b",
        "天羽奇剑是哪个门派的技能":"a",
        "铁戒指可以在哪位那里获得？":"a",
        "铁手镯 可以在哪位那里获得？":"a",
        "铁血大旗门云海心法可以提升什么":"a",
        "通灵需要花费多少银两？":"d",
        "通灵需要寻找哪个NPC？":"c",
        "突破丹在哪里购买":"b",
        "屠龙刀法是哪个门派的绝学技能":"b",
        "屠龙刀是什么级别的武器":"a",
        "挖剑冢可得什么":"a",
        "弯月刀可以在哪位那里获得？":"b",
        "玩家每天能够做几次正邪任务":"c",
        "玩家想修改名字可以寻找哪个NPC？":"a",
        "晚月庄的内功是什么":"b",
        "晚月庄的七宝天岚舞可以提升哪个属性":"b",
        "晚月庄的小贩在下面哪个地点":"a",
        "晚月庄七宝天岚舞可以提升什么":"b",
        "晚月庄主线过关要求":"a",
        "王铁匠是在那个场景":"b",
        "王重阳是哪个门派的师傅":"b",
        "魏无极处读书可以读到多少级？":"a",
        "魏无极身上掉落什么装备":"c",
        "魏无极在第几章":"a",
        "闻旗使在哪个地图":"a",
        "乌金玄火鞭的伤害是多少？":"d",
        "乌檀木刀可以在哪位那里获得？":"d",
        "钨金腰带是腰带类的第几级装备？":"d",
        "武当派的绝学技能是以下哪个":"d",
        "武穆兵法提升到多少级才能出现战斗必刷？":"d",
        "武穆兵法通过什么学习":"a",
        "武学世家加的什么初始属性":"a",
        "舞中之武是哪个门派的阵法":"b",
        "西毒蛇杖的伤害是多少？":"c",
        "吸血蝙蝠在下面哪个地图":"a",
        "下列哪项战斗不能多个玩家一起战斗？":"a",
        "下列装备中不可摹刻的是":"c",
        "下面哪个不是古墓的师傅":"d",
        "下面哪个不是门派绝学":"d",
        "下面哪个不是魔教的":"d",
        "下面哪个地点不是乔阴县的":"d",
        "下面哪个门派是正派":"a",
        "下面哪个是天邪派的师傅":"a",
        "下面有什么是寻宝不能获得的":"c",
        "向师傅磕头可以获得什么？":"b",
        "逍遥步是哪个门派的技能":"a",
        "逍遥林是第几章的地图":"c",
        "逍遥林怎么弹琴可以见到天山姥姥":"b",
        "逍遥派的绝学技能是以下哪个":"a",
        "萧辟尘在哪一章":"d",
        "小李飞刀的伤害是多少？":"d",
        "小龙女住的古墓是谁建造的？":"b",
        "小男孩在华山村哪里":"a",
        "新人礼包在哪个npc处兑换":"a",
        "新手礼包在哪里领取":"a",
        "新手礼包在哪领取？":"c",
        "需要使用什么衣服才能睡寒玉床":"a",
        "选择孤儿会影响哪个属性":"c",
        "选择商贾会影响哪个属性":"b",
        "选择书香门第会影响哪个属性":"b",
        "选择武学世家会影响哪个属性":"a",
        "学习屠龙刀法需要多少内力":"b",
        "雪莲有什么作用":"a",
        "雪蕊儿是哪个门派的师傅":"a",
        "雪蕊儿在铁雪山庄的哪个场景":"d",
        "扬文的属性":"a",
        "扬州询问黑狗能到下面哪个地点":"a",
        "扬州在下面哪个地点的处可以获得玉佩":"c",
        "羊毛斗篷是披风类的第几级装备？":"a",
        "阳刚之劲是哪个门派的阵法":"c",
        "杨过小龙女分开多少年后重逢?":"c",
        "杨过在哪个地图":"a",
        "夜行披风是披风类的第几级装备？":"a",
        "夜皇在大旗门哪个场景":"c",
        "一个队伍最多有几个队员":"c",
        "一天能完成谜题任务多少个":"b",
        "一天能完成师门任务有多少个":"c",
        "一天能完成挑战排行榜任务多少次":"a",
        "一张分身卡的有效时间是多久":"c",
        "一指弹在哪里领悟":"b",
        "移开明教石板需要哪项技能到一定级别":"a",
        "以下不是步玄派的技能的哪个":"c",
        "以下不是天宿派师傅的是哪个":"c",
        "以下不是隐藏门派的是哪个":"d",
        "以下哪个宝石不能镶嵌到戒指":"c",
        "以下哪个宝石不能镶嵌到内甲":"a",
        "以下哪个宝石不能镶嵌到披风":"c",
        "以下哪个宝石不能镶嵌到腰带":"c",
        "以下哪个宝石不能镶嵌到衣服":"a",
        "以下哪个不是道尘禅师教导的武学？":"d",
        "以下哪个不是何不净教导的武学？":"c",
        "以下哪个不是慧名尊者教导的技能？":"d",
        "以下哪个不是空空儿教导的武学？":"b",
        "以下哪个不是梁师兄教导的武学？":"b",
        "以下哪个不是论剑的皮肤？":"d",
        "以下哪个不是全真七子？":"c",
        "以下哪个不是宋首侠教导的武学？":"d",
        "以下哪个不是微信分享好友、朋友圈、QQ空间的奖励？":"a",
        "以下哪个不是岳掌门教导的武学？":"a",
        "以下哪个不是在洛阳场景":"d",
        "以下哪个不是在雪亭镇场景":"d",
        "以下哪个不是在扬州场景":"d",
        "以下哪个不是知客道长教导的武学？":"b",
        "以下哪个门派不是隐藏门派？":"c",
        "以下哪个门派是正派？":"d",
        "以下哪个门派是中立门派？":"a",
        "以下哪个是步玄派的祖师":"b",
        "以下哪个是封山派的祖师":"c",
        "以下哪个是花紫会的祖师":"a",
        "以下哪个是晚月庄的祖师":"d",
        "以下哪些物品不是成长计划第二天可以领取的？":"c",
        "以下哪些物品不是成长计划第三天可以领取的？":"d",
        "以下哪些物品不是成长计划第一天可以领取的？":"d",
        "以下哪些物品是成长计划第四天可以领取的？":"a",
        "以下哪些物品是成长计划第五天可以领取的？":"b",
        "以下属于邪派的门派是哪个":"b",
        "以下属于正派的门派是哪个":"a",
        "以下谁不精通降龙十八掌？":"d",
        "以下有哪些物品不是每日充值的奖励？":"d",
        "倚天剑加多少伤害":"d",
        "倚天屠龙记的时代背景哪个朝代？":"a",
        "易容后保持时间是多久":"a",
        "易容面具需要多少玄铁兑换":"c",
        "易容术多少级才可以易容成异性NPC":"a",
        "易容术可以找哪位NPC学习？":"b",
        "易容术向谁学习":"a",
        "易容术在哪里学习":"a",
        "易容术在哪学习？":"b",
        "银手镯可以在哪位那里获得？":"b",
        "银丝链甲衣可以在哪位npc那里获得？":"a",
        "银项链可以在哪位那里获得？":"b",
        "尹志平是哪个门派的师傅":"b",
        "隐者之术是那个门派的阵法":"a",
        "鹰爪擒拿手是哪个门派的技能":"a",
        "影响你出生的福缘的出生是？":"d",
        "油流麻香手是哪个门派的技能":"a",
        "游龙散花是哪个门派的阵法":"d",
        "玉蜂浆在哪个地图获得":"a",
        "玉女剑法是哪个门派的技能":"b",
        "岳掌门在哪一章":"a",
        "云九天是哪个门派的师傅":"c",
        "云问天在哪一章":"a",
        "在洛阳萧问天那可以学习什么心法":"b",
        "在庙祝处洗杀气每次可以消除多少点":"a",
        "在哪个NPC可以购买恢复内力的药品？":"c",
        "在哪个处可以更改名字":"a",
        "在哪个处领取免费消费积分":"d",
        "在哪个处能够升级易容术":"b",
        "在哪里可以找到“香茶”？":"a",
        "在哪里捏脸提升容貌":"d",
        "在哪里消杀气":"a",
        "在逍遥派能学到的技能是哪个":"a",
        "在雪亭镇李火狮可以学习多少级柳家拳":"b",
        "在战斗界面点击哪个按钮可以进入聊天界面":"d",
        "在正邪任务中不能获得下面什么奖励？":"d",
        "怎么样获得免费元宝":"a",
        "赠送李铁嘴银两能够增加什么":"a",
        "张教主在明教哪个场景":"d",
        "张三丰在哪一章":"d",
        "张三丰在武当山哪个场景":"d",
        "张松溪在哪个地图":"c",
        "张天师是哪个门派的师傅":"a",
        "张天师在茅山哪个场景":"d",
        "长虹剑在哪位那里获得？":"a",
        "长剑在哪里可以购买？":"a",
        "正邪任务杀死好人增长什么":"b",
        "正邪任务一天能做几次":"a",
        "正邪任务中客商的在哪个地图":"a",
        "正邪任务中卖花姑娘在哪个地图":"b",
        "正邪任务最多可以完成多少个？":"d",
        "支线对话书生上魁星阁二楼杀死哪个NPC给10元宝":"a",
        "朱姑娘是哪个门派的师傅":"a",
        "朱老伯在华山村哪个小地图":"b",
        "追风棍可以在哪位npc那里获得？":"a",
        "追风棍在哪里获得":"b",
        "紫宝石加什么属性":"d",
        "下面哪个npc不是魔教的":"d",
        "藏宝图在哪里npc那里买":"a",
        "从哪个npc处进入跨服战场":"a",
        "钻石项链在哪获得":"a",
        "在哪个npc处能够升级易容术":"b",
        "扬州询问黑狗子能到下面哪个地点":"a",
        "北岳殿神像后面是哪位npc":"b",
        "兽皮鞋可以在哪位npc那里获得？":"b",
        "在哪个npc处领取免费消费积分":"d",
        "踏云棍可以在哪位npc那里获得？":"a",
        "钢丝甲衣可以在哪位npc那里获得？":"d",
        "铁手镯 可以在哪位npc那里获得？":"a",
        "哪个npc处可以捏脸":"a",
        "草帽可以在哪位npc那里获得？":"b",
        "铁戒指可以在哪位npc那里获得？":"a",
        "银项链可以在哪位npc那里获得？":"b",
        "在哪个npc处可以更改名字":"a",
        "长剑在哪里可以购买？":"a",
        "宝玉帽可以在哪位npc那里获得？":"d",
        "论剑中以下哪个不是晚月庄的技能":"d",
        "清风寨在哪":"b",
        "精铁棒可以在哪位npc那里获得？":"d",
        "弯月刀可以在哪位npc那里获得？":"b",
        "密宗伏魔是哪个门派的阵法":"c",
        "vip每天不可以领取什么":"b",
        "华山施戴子掉落的物品是什么":"b",
        "钻石项链在哪获得":"a",
        "藏宝图在哪个npc处购买":"b",
        "宝玉鞋击杀哪个npc可以获得":"a",
        "银手镯可以在哪位npc那里获得？":"b",
        "莲花掌是哪个门派的技能":"a",
        "九区服务器名称":"d",
        "以下哪个不是在洛阳场景":"d",
        "红宝石加什么属性":"b",
        "摹刻10级的装备需要摩刻技巧多少级":"b",
        "军营是第几个组队副本":"b",
        "朱姑娘是哪个门派的师傅":"a",
        "金项链可以在哪位npc那里获得？":"d",
        "魏无极在第几章":"a",
        "清风寨在哪":"b",
        "以下哪个不是在洛阳场景":"d",
        "风泉之剑可以在哪位npc那里获得？":"b",
        "魔鞭诀在哪里学习":"d",
        "副本一次最多可以进几人":"a",
        "城里抓贼是挂机里的第几个任务":"b",
        "扬州在下面哪个地点的npc处可以获得玉佩":"c",
        "白金戒指可以在哪位npc那里获得？":"b",
        "长虹剑在哪位npc那里获得？":"a",
        "白金项链可以在哪位npc那里获得？":"b"
    }
    function answerQuestionsFunc(e){
        clickButton('home');
        window.Dom = $(e.target);
        if(Dom.html() == "答题"){
            console.log("准备自动答题！");
            answerQuestionsInterval = setInterval(answerQuestions, 4000);
            Dom.html("停答题");
        }else{
            console.log("停止自动答题！");
            Dom.html("答题");
            clearInterval(answerQuestionsInterval);
        }
    }
    function answerQuestions(){
        if($('span:contains(每日武林知识问答次数已经)').text().slice(-46) == "每日武林知识问答次数已经达到限额，请明天再来。每日武林知识问答次数已经达到限额，请明天再来。") {
            // 今天答题结束了
            console.log("完成自动答题！");
            Dom.html("答题");
            clearInterval(answerQuestionsInterval);
            return;
        }
        clickButton('question');
        setTimeout(getAndAnsQuestion, 1000); // 300 ms之后提取问题，查询答案，并回答
    }
    function getAndAnsQuestion(){
        // 提取问题
        var firstSplitArr = $(".out").text().split("题 ");
        if(firstSplitArr.length < 2){
            return;
        }
        var theQuestion = firstSplitArr[1].split("A")[0];
        // 左右去掉空格
        // theQuestion = theQuestion.trim(" ","left").trim(" ","right");
        theQuestion=theQuestion.replace( /^\theQuestion*/, "");
        theQuestion=theQuestion.replace( /\theQuestion*$/, "");
        // theQuestion=theQuestion.slice(1);
        // 查找某个问题，如果问题有包含关系，则
        var theAnswer = getAnswer2Question(theQuestion);
        if (theAnswer !== "failed"){
            eval("clickButton('question " + theAnswer + "')");
        }else{
            // alert("没有找到答案，请手动完成该题目！");
            console.log("停止自动答题！");
            Dom.html("答题");
            clearInterval(answerQuestionsInterval);
            return;
        }
        console.log($('span:contains(知识问答第)').text().split("继续答题")[0]);
        setTimeout(function(){
            printAnswerInfo(theAnswer);
        },1000)
    }
    function printAnswerInfo(theAnswer){
        console.log("完成一道武林知识问答：" + "答案是：" + theAnswer );
        console.log($('span:contains(知识问答第)').text().split("继续答题")[0]);
    }
    function getAnswer2Question(localQuestion){
        // 如果找到答案，返回响应答案，a,b,c或者d
        // 如果没有找到答案，返回 "failed"

        var resultsFound = [];
        var countor = 0;
        for(var quest in QuestAnsLibs){
            if (isContains(quest, localQuestion)){ //包含关系就可
                resultsFound[countor] = quest;
                countor = countor +1;
            }else if(isContains(quest, localQuestion.replace("npc","")) || isContains(quest, localQuestion.replace("NPC",""))){

            }

        }
        if(resultsFound.length >=1){
            return QuestAnsLibs[resultsFound[0]];
        }
        else {
            console.log("题目 " + localQuestion + " 找不到答案或存在多个答案，请手动作答！");
            return "failed";
        }
    }
    /* 答题  :end */

    /* getXuanTieFunc statr */
    function getXuanTieFunc(e){
        clickButton('home');
        clickButton('jh 35');
        clickButton('go northwest');      // 熔岩滩头
        clickButton('go northwest');      // 海蚀涯
        clickButton('go northwest');      // 峭壁崖道
        clickButton('go north');      // 峭壁崖道
        clickButton('go northeast') ;     // 炙溶洞口
        clickButton('go northwest');      // 炙溶洞
        clickButton('go west') ;     // 炙溶洞口
        clickButton('go northwest') ;     // 熔岩小径
        clickButton('go east') ;     // 熔岩小径
        clickButton('go east');      // 石华林
        clickButton('go east');      // 分岛岭
        clickButton('go east');      // 跨谷石桥
        clickButton('go east') ;     // 大平原
        clickButton('go southeast');
        clickButton('go north');
        clickButton('go north');
        clickButton('go west');
        clickButton('go north');
        clickButton('go west');
        clickButton('event_1_53278632');
        setTimeout(function(){
            clickButton('sousuo');
            clickButton('sousuo');
            clickButton('home');
        },5000)
    }
    /* getXuanTieFunc end */

    var userClickMouse = false;
    var autoGetBackInterval = null;
    var autoGetBackCMDExced = true;
    var autoGetBackCMDInterval = null;
    var allQLHFinishedFlag = false;
    var currentPos = null;
    // 领取奖励 ------------------------------------------------------------------------------------------------------
    //document.body.removeChild(getRewardsButton);
    var getRewardsButton = document.createElement('button');
    getRewardsButton.innerText = '开领奖';
    getRewardsButton.style.position = 'absolute';
    getRewardsButton.style.right = '0px';
    getRewardsButton.style.top = '0px';
    currentPos = Base.currentPos + Base.delta;
    getRewardsButton.style.width = Base.buttonWidth;
    getRewardsButton.style.height = Base.buttonHeight;
    document.body.appendChild(getRewardsButton);
    getRewardsButton.addEventListener('click', getRewardsFunc)

    var getRewardsdelay = 100
    var getRewardsInterval = 1.5*60*1000; // 3min

    function getRewardsFunc(){
        //    console.clear();
        if (getRewardsButton.innerText == '开领奖'){ // 处于未领奖状态，单击开始领奖,并将状态置于停领奖状态
            console.log("开始自动领取奖励！");
            autoGetBackInterval = setInterval(autoGetBack, 3*60*1000)
            scanEscapedFish();
            scanEscaped = setInterval(scanEscapedFish,getRewardsInterval);
            maikuli_i = setInterval(maikuli,5000 + getRewardsdelay); // 干苦力, 5s
            duancha_i  = setInterval(duancha,10*1000  + getRewardsdelay ); // 端茶送水, 10s
            dalie_i = setInterval(dalie,5*60*1000 + getRewardsdelay); // 上山打猎, 5 min = 300 s
            getRewardsButton.innerText = '停领奖';
        }else{
            console.log("停止自动领取奖励！");
            clearInterval(scanEscaped);
            clearInterval(maikuli_i);
            clearInterval(duancha_i);
            clearInterval(dalie_i);
            clearInterval(autoGetBackInterval);
            getRewardsButton.innerText = '开领奖';
        }
    }
    function maikuli() {
        clickButton('work click maikuli');
    }
    function duancha() {
        clickButton('work click duancha');
    }
    function dalie() {
        clickButton('work click dalie');
    }
    function baobiao() {
        clickButton('work click baobiao');
    }
    function maiyi() {
        clickButton('work click maiyi');
    }
    function xuncheng() {
        clickButton('work click xuncheng');
    }
    function datufei() {
        clickButton('work click datufei');
    }
    function dalei() {
        clickButton('work click dalei');
    }
    function kangjijinbin() {
        clickButton('work click kangjijinbin');
    }
    function zhidaodiying() {
        clickButton('work click zhidaodiying');
    }
    function dantiaoqunmen() {
        clickButton('work click dantiaoqunmen');
    }
    function shenshanxiulian() {
        clickButton('work click shenshanxiulian');
    }
    function scanEscapedFish() {
        maikuli();
        duancha();
        dalie();
        baobiao();
        maiyi();
        xuncheng();
        datufei();
        dalei();
        kangjijinbin();
        zhidaodiying();
        dantiaoqunmen();
        shenshanxiulian();
        clickButton('public_op3'); // 向师傅磕头

    }

    async function autoGetBack(){

        // 如果在监控界面或者主页，则获取信息
        if ($("span:contains(清空信息)").text()!=="" || $('.cmd_main_jh').length !==0){
            // 如果在主页或者在聊天
            clickButton('sleep_hanyuchuang', 0);
            clickButton('items use obj_bingzhen_suanmeitang', 0);
        }
        if(getRewardsButton.innerText == '开领奖'){
            return;
        }
        if ($("span:contains(清空信息)").text()==""){ // 如果不在聊天
            if($('span:contains(胜利)').text().slice(-3)=='胜利！' || $('span:contains(战败了)').text().slice(-6)=='战败了...' || $("span:contains(战斗结束)").text().slice(-8) == "战斗结束战斗结束"){ // 如果战斗结束，自动回到主页挂机
                console.log("战斗结束，无人操作！")
                clickButton('prev_combat');
                await new Promise(function (resolve) {
                    setTimeout(resolve, 200);
                });
                clickButton('exercise');
                clickButton('recovery');
                clickButton('recovery');
                clickButton('recovery');
                clickButton('recovery');
                clickButton('recovery');
            }
            if($("#skill_1")[0]==undefined){
                // 如果不在战斗界面，则探测，5分钟无人操作就返回
                if(autoGetBackCMDExced){
                    console.log("不在战斗界面，3分钟若无人操作，则自动返回主页界面！");
                    userClickMouse =  false;
                    document.body.addEventListener('click', userClickMouseFunc); // 添加鼠标单击命令
                    autoGetBackCMDInterval = setTimeout(auTogoBack2Chat, 3*60*1000); // 如果等待3分钟，尚未完成，返回主页
                    autoGetBackCMDExced = false;
                }
                clickButton('exercise');
                clickButton('recovery');
                clickButton('recovery');
                clickButton('recovery');
                clickButton('recovery');
                clickButton('recovery');
            }else{
                console.log("在战斗界面，放弃本次自动返回操作！");
                clearInterval(autoGetBackCMDInterval);
                return;
            }
        }
    }
    function userClickMouseFunc(){
        console.log("探测到用户操作，取消自动返回主页界面！");
        userClickMouse = true;
        document.body.removeEventListener('click', userClickMouseFunc); // 移出鼠标单击命令
    }
    async function auTogoBack2Chat(){
        if (!userClickMouse){
            console.log("未探测到用户操作，自动返回主页界面！");
            await clickButtonAsync('home');
            await new Promise(function (resolve) {
                setTimeout(resolve, 200);
            });
            // await clickButtonAsync('go_chat');
            await new Promise(function (resolve) {
                setTimeout(resolve, 200);
            });
            document.body.removeEventListener('click', userClickMouseFunc); // 移出鼠标单击命令
        }
        autoGetBackCMDExced = true;
    }
    async function clickButtonAsync(s) {
        $('.out')[0]._mark = true;
        clickButton(s);
        while (true) {
            await new Promise(function (resolve) {
                setTimeout(resolve, 20);
            });
            var out = $('.out')[0];
            if (out && !out._mark)
                break;
        }
        await new Promise(function (resolve) {
            setTimeout(resolve, 5);
        });
    }

    /**/
    // 开始挖宝
    //document.body.removeChild(CheckInButton);
    var digTreasureButton = document.createElement('button');
    digTreasureButton.innerText = '挖宝藏';
    digTreasureButton.style.position = 'absolute';
    digTreasureButton.style.right = '90px';
    digTreasureButton.style.top = '0px';
    currentPos = Base.delta;
    digTreasureButton.style.width = Base.buttonWidth;
    digTreasureButton.style.height = Base.buttonHeight;
    document.body.appendChild(digTreasureButton);
    digTreasureButton.addEventListener('click', digTreasureFunc)
    var numOfTreaure = 0;
    var treasureDesList = [];

    async function digTreasureFunc(){
        if(digTreasureButton.innerText =="挖宝藏"){
            console.log("开始挖宝藏！");
            digTreasureButton.innerText ="停宝藏";
            await digTreasure();
            console.log("挖宝结束！");
            digTreasureButton.innerText ="挖宝藏"
        }else{
            numOfTreaure = 0;
            console.log("停止挖宝藏！");
            digTreasureButton.innerText ="挖宝藏"
        }
    }
    async function digTreasure(){
        var chapName;
        if (!(chapName = prompt("请输入挖宝章节名：", "雪亭镇"))){
            return;
        };
        if(!(numOfTreaure = prompt("请输入挖宝次数（每天挖宝次数上限为10）:", "10"))){
            return;
        }
        var numOfBuyTreasureMap = 0;
        if(!(numOfBuyTreasureMap = prompt("请输入购买藏宝图数量:", "10"))){
            return;
        }
        numOfBuyTreasureMap= parseInt(numOfBuyTreasureMap);
        if(numOfBuyTreasureMap > 0){
            clickButton('jh 1');
            clickButton('go east');
            clickButton('go north');
            clickButton('go north');
            clickButton('go north');
            clickButton('go north');
            clickButton('go east');

            await new Promise(function (resolve) {
                setTimeout(resolve, 300);
            });
            // 买图
            for (var i = 0; i < numOfBuyTreasureMap; i ++){
                clickButton('buy /obj/quest/cangbaotu from snow_chefu'); //  购买藏宝图
                await new Promise(function (resolve) {
                    setTimeout(resolve, 50);
                });
            }
        }
        numOfTreaure = Math.min(10,parseInt(numOfTreaure));

        var ChapIndex  = getChapIndex(chapName);
        if (ChapIndex < 1){
            return;
        }
        while (numOfTreaure > 0){
            clickButton('cangbaotu_op1', 1) // 打开藏宝图
            // 如果未打开，则等待
            while (true) {
                await new Promise(function (resolve) {
                    setTimeout(resolve, 50);
                });
                if ($(".outtitle")[0].innerText == "挖 宝")
                    break;
            }
            await new Promise(function (resolve) {
                setTimeout(resolve, 50);
            });

            var infoList = $("span.out2");
            treasureDesList = [];

            // 处理信息，只提取藏宝图部分
            var k_Max = Math.floor(infoList.length/3); // 0: 序号， 1：描述；2：前往
            for (var k =0; k < k_Max; k ++){
                if (infoList[3*k + 2].innerText !== "前往"){
                    break;
                }
                treasureDesList[k] = infoList[3*k + 1].innerText;
            }
            // 搜寻地点，如果其中之一符合要求，挖一次宝，并开始下一次
            searchTreasureLoc
            if (await searchTreasureLoc(ChapIndex)){
                numOfTreaure = numOfTreaure - 1;

            }
            await new Promise(function (resolve) {
                setTimeout(resolve, 2000);
            });

        }
    }


    async function searchTreasureLoc(chapIndex) {
        // 清空已搜索列表
        searchedLocList = [];
        console.log("开始在第 " + chapIndex + " 章搜寻宝藏！ " );
        // 返回主页
        await clickButtonAsync('home');
        while (true) {
            await new Promise(function (resolve) {
                setTimeout(resolve, 50);
            });
            if ($('.cmd_main_jh')[0])
                break;
        }
        await new Promise(function (resolve) {
            setTimeout(resolve, 50);
        });

        await clickButtonAsync('jh ' + chapIndex);

        while (true) {
            await new Promise(function (resolve) {
                setTimeout(resolve, 50);
            });
            if (!$('.cmd_main_jh')[0])
                break;
        }
        await new Promise(function (resolve) {
            setTimeout(resolve, 50);
        });

        await clickButtonMapAsync('client_map');
        await clickButtonMapAsync('prev');

        if (await searchTheTreasureMap() == true){
            return true;
        }
        else {
            return false
        }

    }
    async function searchTheTreasureMap(){
        //    console.log("开始搜寻一次！");
        await clickButtonMapAsync('client_map'); // 打开地图
        var currentLocID = $("button[style*='room_in.png']")[0];
        if (currentLocID !== undefined) {
            currentLocID = currentLocID.parentNode.getAttribute('id');   // 获取在大地图中的位置：
        }else{
            currentLocID = "大地图中不存在该位置！";
        }
        await clickButtonMapAsync('prev');

        if (await isCurrentLocSearched(currentLocID)){
            // console.log("此位置已经搜索过：" + $(".cmd_click_room")[0].innerText);
            return false;
        }
        console.log('搜寻位置： ' +  $(".cmd_click_room")[0].innerText);
        await addCurrLoc2List(currentLocID);
        // 判断该位置是否发现目标
        if (await findTreasureHere()){
            console.log("发现宝藏！");
            return true;
        }

        // 分别判断8个方向
        if($(".cmd_click_exits_n")[0]){ // 北边
            await clickButtonAsync('go north');
            if(await searchTheTreasureMap()) {
                return true;
            }
            await clickButtonAsync('go south');
        }
        if($(".cmd_click_exits_s")[0]){ // 南
            await clickButtonAsync('go south');
            if( await  searchTheTreasureMap())  {
                return true;
            }
            await clickButtonAsync('go north');
        }
        if($(".cmd_click_exits_e")[0]){ // 东边
            await clickButtonAsync('go east');
            if(await  searchTheTreasureMap())  {
                return true;
            }
            await clickButtonAsync('go west');
        }
        if($(".cmd_click_exits_w")[0]){ // 西
            await clickButtonAsync('go west');
            if(await searchTheTreasureMap())  {
                return true;
            }
            await clickButtonAsync('go east');
        }
        if($(".cmd_click_exits_ne")[0]){ // 东北边
            await clickButtonAsync('go northeast');
            if(await searchTheTreasureMap())  {
                return true;
            }
            await clickButtonAsync('go southwest');
        }

        if($(".cmd_click_exits_se")[0]){ // 东南
            await clickButtonAsync('go southeast');
            if(await searchTheTreasureMap())  {
                return true;
            }
            await clickButtonAsync('go northwest');
        }

        if($(".cmd_click_exits_sw")[0]){ // 西南
            await clickButtonAsync('go southwest');
            if(await  searchTheTreasureMap())  {
                return true;
            }
            await clickButtonAsync('go northeast');
        }

        if($(".cmd_click_exits_nw")[0]){ // 西北
            await clickButtonAsync('go northwest');
            if(await  searchTheTreasureMap())   {
                return true;
            }
            await clickButtonAsync('go southeast');
        }
    }

    async function findTreasureHere(){
        var currDes = $(".out")[0].childNodes[2].textContent.trim("   ","left");
        currDes = $.trim(currDes);
        // console.log(currDes);
        for (var i = 0; i < treasureDesList.length; i ++){
            //      console.log("此处描述：" + currDes +"\n" +"宝藏列表：" + treasureDesList[i]);
            // 循环查找该处位置有没有满足要求
            if (treasureDesList[i] == currDes){
                clickButton('dig go'); // 挖宝
                await new Promise(function (resolve) {
                    setTimeout(resolve, 500);
                });
                // 从藏宝图列表中删除该项
                removeByValue(treasureDesList[i],treasureDesList[i]);
                // time =  getNowFormatDate();
                console.log("挖宝一次！");
                return true;
            }
        }
        return false;
    }

    // 吃药 ------------------------------------------------------------------------------------------------------
    var userMedecineButton = document.createElement('button');
    userMedecineButton.innerText = '吃补药';
    userMedecineButton.style.position = 'absolute';
    userMedecineButton.style.right = '180px';
    userMedecineButton.style.top = '0px';
    currentPos = Base.delta;
    userMedecineButton.style.width = Base.buttonWidth;
    userMedecineButton.style.height = Base.buttonHeight;
    document.body.appendChild(userMedecineButton);
    userMedecineButton.addEventListener('click', userMedecineFunc);
    function userMedecineFunc(){
        clickButton('items use snow_qiannianlingzhi');
    }

    /**/
    // 寻目标 ------------------------------------------------------------------------------------------------------
    var findSpecTargetButton = document.createElement('button');
    findSpecTargetButton.innerText = '寻目标';
    findSpecTargetButton.style.position = 'absolute';
    findSpecTargetButton.style.right = '270px';
    findSpecTargetButton.style.top ='0px';
    findSpecTargetButton.style.width = Base.buttonWidth;
    findSpecTargetButton.style.height = Base.buttonHeight;
    document.body.appendChild(findSpecTargetButton);
    findSpecTargetButton.addEventListener('click', findSpecargetFunc);

    var searchedLocList = [];
    var continuedSearch = false;
    var chapList = ['雪亭镇',  '洛阳',     '华山村', '华山',     '扬州',   '丐帮',    '乔阴县','峨眉山','恒山',  '武当山',
                    '晚月庄',   '水烟阁',   '少林寺', '唐门',     '青城山', '逍遥林', '开封',  '明教',   '全真教','古墓',
                    '白驮山',   '嵩山',     '寒梅庄', '泰山',     '大旗门', '大昭寺', '魔教',  '星宿海', '茅山',  '桃花岛',
                    '铁雪山庄', '慕容山庄','大理',    '断剑山庄','冰火岛',  '侠客岛'];
    var findSpecTagerInfo = "雪亭镇-王铁匠";
    function findSpecargetFunc(){
        if (!(findSpecTagerInfo = prompt("请输入寻找目标（章节名-目标名）：", findSpecTagerInfo))){
            return;
        };
        continuedSearch = false;
        if (isContains(findSpecTagerInfo,'-')){
            // 包含‘-’
            var tempTargetInfo = findSpecTagerInfo.split('-');
            removeByValue(tempTargetInfo, ""); // 删除空字符串
            for(var i = 0; i < tempTargetInfo.length; i++){
                tempTargetInfo[i] = tempTargetInfo[i].trim(" ", "left").trim(" ","right"); // 去除空白
            }
            if (tempTargetInfo.length !== 3){
                searchedLocList = []; // 清空搜索路径
            }else{
                continuedSearch = true;
            }
            var chapName = tempTargetInfo[0];
            var TargetName = tempTargetInfo[1];
            var ChapIndex  = getChapIndex(chapName);
            if (ChapIndex > 0){
                searchForSpecificTarget(ChapIndex, TargetName);
            }
        }else{
            // （1） 如果不包含 -，证明只输入目标名，从第一章找起
            TargetName = targetInfo.trim(" ", "left").trim(" ","right");
            for(var i = 0; i < chapList.length; i++){
                searchedLocList = [];
                searchForSpecificTarget(i + 1, TargetName);
            }
        }
    }

    function autoFindSpecargetFunc(){
        continuedSearch = false;
        if (isContains(findSpecTagerInfo,'-')){
            // 包含‘-’
            var tempTargetInfo = findSpecTagerInfo.split('-');
            removeByValue(tempTargetInfo, ""); // 删除空字符串
            for(var i = 0; i < tempTargetInfo.length; i++){
                tempTargetInfo[i] = tempTargetInfo[i].trim(" ", "left").trim(" ","right"); // 去除空白
            }
            if (tempTargetInfo.length !== 3){
                searchedLocList = []; // 清空搜索路径
            }else{
                continuedSearch = true;
            }
            var chapName = tempTargetInfo[0];
            var TargetName = tempTargetInfo[1];
            var ChapIndex  = getChapIndex(chapName);
            if (ChapIndex > 0){
                searchForSpecificTarget(ChapIndex, TargetName);
            }
        }else{
            // （1） 如果不包含 -，证明只输入目标名，从第一章找起
            TargetName = targetInfo.trim(" ", "left").trim(" ","right");
            for(var i = 0; i < chapList.length; i++){
                searchedLocList = [];
                searchForSpecificTarget(i + 1, TargetName);
            }
        }
    }

    function getChapIndex(chap){
        var findChaps = false;
        for(var i=0; i< chapList.length; i++) {
            if(chapList[i] == chap) {
                findChaps = true;
                return (i+1);
            }
        }
        if (!findChaps){
            // 如果没找到，发出警告
            console.error('## 找不到该目的地：' + chap + '！');
            return -1;
        }

    }

    async function clickButtonMapAsync(s) {
        clickButton(s);
        if (s == "client_map"){
            // 从场景切地图
            while (true) {
                await new Promise(function (resolve) {
                    setTimeout(resolve, 10);
                });
                if ($('.out_line')[0])
                    break;
            }
            await new Promise(function (resolve) {
                setTimeout(resolve, 2);
            });
        }else if (s == "prev"){
            //从地图切场景
            while (true) {
                await new Promise(function (resolve) {
                    setTimeout(resolve, 10);
                });
                if (!$('.out_line')[0])
                    break;
            }
            await new Promise(function (resolve) {
                setTimeout(resolve, 2);
            });
        }
    }

    async function clickButtonAsync(s) {
        $('.out')[0]._mark = true;
        clickButton(s);
        while (true) {
            await new Promise(function (resolve) {
                setTimeout(resolve, 20);
            });
            var out = $('.out')[0];
            if (out && !out._mark)
                break;
        }
        await new Promise(function (resolve) {
            setTimeout(resolve, 5);
        });
    }

    async function isCurrentLocSearched(locID){
        // 判断loc位置，是否已经在列表中
        var descrip = $(".out")[0].textContent.split("这儿有：")[0]; // 获取描述
        var currentLocID  = descrip + locID;
        return searchedLocList.includes(currentLocID);
    }

    async function addCurrLoc2List(locID){
        // 判断loc位置，是否已经在列表中
        var descrip = $(".out")[0].textContent.split("这儿有：")[0]; // 获取描述
        var currentLocID  = descrip + locID;
        searchedLocList.push(currentLocID);
    }

    async function searchTheMap(targetName) {
        await clickButtonMapAsync('client_map');

        var currentLocID = $("button[style*='room_in.png']")[0];
        if (currentLocID !== undefined) {
            currentLocID = currentLocID.parentNode.getAttribute('id');   // 获取在大地图中的位置：
        }else{
            currentLocID = "大地图中不存在该位置！";
        }
        await clickButtonMapAsync('prev');

        if (await isCurrentLocSearched(currentLocID)){
            // console.log("此位置已经搜索过：" + $(".cmd_click_room")[0].innerText);
            return;
        }
        console.log('搜寻位置： ' +  $(".cmd_click_room")[0].innerText);
        await addCurrLoc2List(currentLocID);
        // 判断该位置是否发现目标
        if (findObjectHere(targetName)){
            console.log("发现目标！");
            killQixia(targetName);
            throw new Error('发现目标！', 1);
        }

        // 分别判断8个方向
        if($(".cmd_click_exits_n")[0]){ // 北边
            await clickButtonAsync('go north');
            await searchTheMap(targetName);
            await clickButtonAsync('go south');
        }
        if($(".cmd_click_exits_s")[0]){ // 南
            await clickButtonAsync('go south');
            await  searchTheMap(targetName);
            await clickButtonAsync('go north');
        }
        if($(".cmd_click_exits_e")[0]){ // 东边
            await clickButtonAsync('go east');
            await  searchTheMap(targetName);
            await clickButtonAsync('go west');
        }
        if($(".cmd_click_exits_w")[0]){ // 西
            await clickButtonAsync('go west');
            await searchTheMap(targetName);
            await clickButtonAsync('go east');
        }
        if($(".cmd_click_exits_ne")[0]){ // 东北边
            await clickButtonAsync('go northeast');
            await searchTheMap(targetName);
            await clickButtonAsync('go southwest');
        }

        if($(".cmd_click_exits_se")[0]){ // 东南
            await clickButtonAsync('go southeast');
            await searchTheMap(targetName);
            await clickButtonAsync('go northwest');
        }

        if($(".cmd_click_exits_sw")[0]){ // 西南
            await clickButtonAsync('go southwest');
            await  searchTheMap(targetName);
            await clickButtonAsync('go northeast');
        }

        if($(".cmd_click_exits_nw")[0]){ // 西北
            await clickButtonAsync('go northwest');
            await  searchTheMap(targetName);
            await clickButtonAsync('go southeast');
        }
    }
    function findObjectHere(local_obj){
        var NPCList = $(".cmd_click3");  // 先查当前目录下NPC
        for (var i = 0; i < NPCList.length; i++){
            if(NPCList[i].innerText == "探查此地"){
                eval(NPCList[i].getAttribute('onclick'));
                console.log("探索一次地方！");
            }
            if (NPCList[i].innerText == local_obj || NPCList[i].innerText == (local_obj + "的尸体")){
                return true;
            }
        }
        var localLocList = $("button[class*='cmd_click_']"); // 再查当前目录下所有地点按钮
        for (var i = 0; i < localLocList.length; i++){
            if (localLocList[i].innerText == local_obj){
                // 走到那边，且返回true
                if (localLocList[i].getAttribute('class') !== "cmd_click_room"){
                    eval(localLocList[i].getAttribute('onclick') ); // 朝这个方向走去
                }
                return true;
            }
        }
        return false;
    }

    async function searchForSpecificTarget(chapIndex, targetName) {
        try {
            // if (getLittleBabyButton.innerText == "停垃圾"){
            //     // getLittleBabyButton.click();
            // }
            searchName = targetName;
            console.log("开始在第 " + chapIndex + " 章搜寻目标 " + targetName);
            if (!continuedSearch){
                // 返回主页
                await clickButtonAsync('home');
                while (true) {
                    await new Promise(function (resolve) {
                        setTimeout(resolve, 10);
                    });
                    if ($('.cmd_main_jh')[0])
                        break;
                }
                await new Promise(function (resolve) {
                    setTimeout(resolve, 10);
                });

                await clickButtonAsync('jh ' + chapIndex);
                // 如果在峨眉，或者嵩山，停止搜寻
                /*         if (chapIndex == 8 || chapIndex == 22){
                console.error("在峨眉山或者嵩山，取消自动搜索！");
                return;
            }*/
                while (true) {
                    await new Promise(function (resolve) {
                        setTimeout(resolve, 10);
                    });
                    if (!$('.cmd_main_jh')[0])
                        break;
                }
                await new Promise(function (resolve) {
                    setTimeout(resolve, 10);
                });

            }
            await clickButtonMapAsync('client_map');
            /*      await new Promise(function (resolve) {
         setTimeout(resolve, 100);
         }); */
            await clickButtonMapAsync('prev');
            await searchTheMap(targetName);
        }
        catch (e) {
            console.log(e);
        }
        console.log("搜索完毕！");
    }

    // 找到青龙目标
    function killQixia(name){
        var btn = $('.cmd_click3');
        idArr = [];
        for(var i = 0;  i <btn.length ; i++){
            var txt = btn.eq(i).text();

            if(txt == name){
                npcText = btn.eq(i).attr('onclick');
                var id = getId(npcText);
                idArr.push(id);
            }
        }
        console.log(idArr);
        var maxId = idArr[0];

        console.log(maxId);  //eren580108074

        // followNPC(maxId);

        killE(maxId);
        $('#btn4').trigger('click')    // 搜尸
        setTimeout(function(){
            $('#btn4').trigger('click')    // 搜尸
        },3*60*1000)
    }

    function followNPC(name){
        clickButton('follow_play '+name);
    }

    /**/
    function findQLHPath(targetLocation){
        switch(targetLocation)
        {
            case '打铁铺子':
                // 打铁铺子：饮风客栈 --> 广场 -->  雪亭镇街道 --> 雪亭镇街道 --> 打铁铺子                                          # 王铁匠 # 或者 # 坏人 #
                clickButton('jh 1');       // 进入章节
                clickButton('go east');     // 广场
                clickButton('go north');   // 雪亭镇街道
                clickButton('go north');    // 雪亭镇街道
                clickButton('go west');      // 打铁铺子
                break;
            case '桑邻药铺':
                // 桑林药铺：迎风客栈 --> 广场 -->  雪亭镇街道 --> 雪亭镇街道 --> 雪亭镇街道 --> 桑林药铺                           # 杨掌柜 # 或者 # 坏人 #
                clickButton('jh 1');        // 进入章节
                clickButton('go east');      // 广场
                clickButton('go north');     // 雪亭镇街道
                clickButton('go north') ;    // 雪亭镇街道
                clickButton('go north');     // 雪亭镇街道
                clickButton('go west') ;    // 桑林药铺
                break;
            case '书房':
                // 书房：迎风客栈 --> 广场 -->  雪亭镇街道 --> 淳风武馆大门 --> 淳风武馆教练场 --> 淳风武馆大厅 -->  天井 --> 书房  # 柳绘心 #  或者 # 坏人 #
                clickButton('jh 1');        // 进入章节
                clickButton('go east') ;     // 广场
                clickButton('go north');     // 雪亭镇街道
                clickButton('go east');     // 淳风武馆大门
                clickButton('go east') ;    // 淳风武馆教练场
                clickButton('go east');     // 淳风武馆大厅
                clickButton('go east') ;    // 天井
                clickButton('go north');    // 书房
                break;
            case '南市':
                // 南市：  龙门石窟 --> 南郊小路 -->  南门 --> 南市 # 客商#  或者 # 坏人#
                clickButton('jh 2');        // 进入章节
                clickButton('go north') ;     // 南郊小路
                clickButton('go north');     // 南门
                clickButton('go east');     // 南市
                break;
            case '北大街':
                // 北大街： 龙门石窟 --> 南郊小路 -->  南门 --> 南大街 -->  洛川街 --> 中心鼓楼 --> 中州街 --> 北大街              # 卖花姑娘 #  或者 # 坏人 #
                clickButton('jh 2');        // 进入章节
                clickButton('go north');      // 南郊小路
                clickButton('go north');     // 南门
                clickButton('go north');     // 南大街
                clickButton('go north');     // 洛川街
                clickButton('go north');     // 中心鼓楼
                clickButton('go north');     // 中州街
                clickButton('go north');     // 北大街
                break;
            case '钱庄':
                // 钱庄：  龙门石窟 --> 南郊小路 -->  南门 --> 南大街 -->  洛川街 --> 中心鼓楼 --> 中州街 --> 北大街--> 钱庄       # 刘守财 #  或者 # 坏人 #
                clickButton('jh 2');        // 进入章节
                clickButton('go north');      // 南郊小路
                clickButton('go north');     // 南门
                clickButton('go north');     // 南大街
                clickButton('go north');     // 洛川街
                clickButton('go north');     // 中心鼓楼
                clickButton('go north');     // 中州街
                clickButton('go north');     // 北大街
                clickButton('go east');     // 钱庄
                break;
            case '绣楼':
                // 绣楼：  龙门石窟 --> 南郊小路 -->  南门 --> 南大街 -->  洛川街 --> 铜锣巷 --> 桃花别院 --> 绣楼                 # 柳小花 #  或者 # 坏人 #
                clickButton('jh 2');        // 进入章节
                clickButton('go north');      // 南郊小路
                clickButton('go north');     // 南门
                clickButton('go north');     // 南大街
                clickButton('go north');     // 洛川街
                clickButton('go west') ;    // 铜锣巷
                clickButton('go south');     // 桃花别院
                clickButton('go west');     // 绣楼
                break;
            case '祠堂大门':
                // 祠堂大厅：华山村村口 --> 青石街 -->  银杏广场 --> 祠堂大门            # 朱老伯 #  或者 # 坏人 #
                clickButton('jh 3');        // 进入章节
                clickButton('go south');      // 青石街
                clickButton('go south');     // 银杏广场
                clickButton('go west') ;    // 祠堂大门
                break;
            case '厅堂':
                // 厅堂：华山村村口 --> 青石街 -->  银杏广场 --> 祠堂大门 -->  厅堂      # 方寡妇 #  或者 # 坏人 #
                clickButton('jh 3');        // 进入章节
                clickButton('go south');      // 青石街
                clickButton('go south');     // 银杏广场
                clickButton('go west');     // 祠堂大门
                clickButton('go north');     // 厅堂
                break;
            case '杂货铺':
                // 杂货铺：华山村村口 --> 青石街 -->  银杏广场 --> 杂货铺                # 方老板 #  或者 # 坏人 #
                clickButton('jh 3');        // 进入章节
                clickButton('go south');      // 青石街
                clickButton('go south');     // 银杏广场
                clickButton('go east');     // 杂货铺
                break;
            default:
                // 如果没找到，发出警告
                alert('## 找不到该目的地：' + targetLocation + '！');
        }
    }
    var chapList = ['雪亭镇',  '洛阳',     '华山村', '华山',     '扬州',   '丐帮',    '乔阴县','峨眉山','恒山',  '武当山',
                    '晚月庄',   '水烟阁',   '少林寺', '唐门',     '青城山', '逍遥林', '开封',  '光明顶',   '全真教','古墓',
                    '白驮山',   '嵩山',     '寒梅庄', '泰山',     '大旗门', '大昭寺', '魔教',  '星宿海', '茅山',  '桃花岛',
                    '铁雪山庄', '慕容山庄','大理',    '断剑山庄','冰火岛',  '侠客岛'];

    currentPos = 30;
    var delta = 30;
    var chapMapButton = [];
    var dis_right = "30";
    for(var i = 0; i < chapList.length; i++){
        if(i < 18){
            dis_right = "180";
        }else if (i == 18){
            dis_right = "90";
            currentPos = 30;
        }
        chapMapButton[i] = document.createElement('button');
        chapMapButton[i].innerText = chapList[i];
        chapMapButton[i].style.position = 'absolute';
        chapMapButton[i].style.right = dis_right + 'px';
        chapMapButton[i].style.top = currentPos + 'px';
        currentPos = currentPos + delta;
        chapMapButton[i].style.width = Base.buttonWidth;
        chapMapButton[i].style.height = Base.buttonHeight;
        document.body.appendChild(chapMapButton[i]);
        (function(i){chapMapButton[i].onclick = function () {
            var cmd = "clickButton('jh " + (i+1) + "')";
            eval(cmd);
        }
                    })(i);
    }

    var QLHLocList = ['主页', '背包', '技能', '打铁铺子',  '桑邻药铺',  '书房', '南市',     '北大街',   '钱庄',    '绣楼','祠堂大门','厅堂',  '杂货铺'];
    currentPos = 30;
    delta = 30;
    var QLHchapMapButton = [];
    for(var i = 0; i < QLHLocList.length; i++){
        dis_right = "270";
        QLHchapMapButton[i] = document.createElement('button');
        QLHchapMapButton[i].innerText = QLHLocList[i];
        QLHchapMapButton[i].style.position = 'absolute';
        QLHchapMapButton[i].style.right = dis_right + 'px';
        QLHchapMapButton[i].style.top = currentPos + 'px';
        currentPos = currentPos + delta;
        QLHchapMapButton[i].style.width = Base.buttonWidth;
        QLHchapMapButton[i].style.height = Base.buttonHeight;
        document.body.appendChild(QLHchapMapButton[i]);
        if(QLHLocList[i] == "技能"){
            currentPos = currentPos + 60;
        }
        (function(i){QLHchapMapButton[i].onclick = function () {
            if (QLHLocList[i] == "主页"){
                clickButton('quit_chat');
                clickButton('home');
            }else if(QLHLocList[i] == "背包"){
                clickButton('quit_chat');
                clickButton('items');
            }else if(QLHLocList[i] == "技能"){
                clickButton('quit_chat');
                clickButton('skills');
            }else{
                findQLHPath(QLHLocList[i]);
            }
        }
                    })(i);
    }


    function sellAll(){
        for(var i = 0; i <4; i++){
            clickButton('items sell binghuo_shuicao');
            clickButton('items sell binghuo_jiyu');
            clickButton('items sell binghuo_shuzhi');
            clickButton('items sell binghuo_polanyifu');
            clickButton('items sell binghuo_liyu');
            clickButton('items sell equip_waist1');
            clickButton('items sell equip_waist2');
            clickButton('items sell equip_waist3');
            clickButton('items sell equip_waist4');
            clickButton('items sell equip_surcoat1');
            clickButton('items sell equip_surcoat2');
            clickButton('items sell equip_surcoat3');
            clickButton('items sell equip_surcoat4');
            clickButton('items sell equip_shield1');
            clickButton('items sell equip_shield2');
            clickButton('items sell equip_shield3');
            clickButton('items sell equip_shield4');
            clickButton('items sell equip_armor1');
            clickButton('items sell equip_armor2');
            clickButton('items sell equip_armor3');
            clickButton('items sell equip_armor4');
            clickButton('items sell weapon_blade1');
            clickButton('items sell weapon_blade2');
            clickButton('items sell weapon_blade3');
            clickButton('items sell weapon_blade4');
            clickButton('items sell weapon_blade5');
            clickButton('items sell weapon_blade6');
            clickButton('items sell equip_head1');
            clickButton('items sell equip_head2');
            clickButton('items sell equip_head3');
            clickButton('items sell equip_head4');
            clickButton('items sell equip_head5');
            clickButton('items sell equip_head6');
            clickButton('items sell equip_boots1');
            clickButton('items sell equip_boots2');
            clickButton('items sell equip_boots3');
            clickButton('items sell equip_boots4');
            clickButton('items sell equip_boots5');
            clickButton('items sell equip_boots6');
            clickButton('items sell weapon_dagger1');
            clickButton('items sell weapon_dagger2');
            clickButton('items sell weapon_dagger3');
            clickButton('items sell weapon_dagger4');
            clickButton('items sell equip_cloth1');
            clickButton('items sell equip_cloth2');
            clickButton('items sell equip_cloth3');
            clickButton('items sell equip_cloth4');
            clickButton('items sell equip_cloth5');
            clickButton('items sell equip_cloth6');
            clickButton('items sell equip_wrists1');
            clickButton('items sell equip_wrists2');
            clickButton('items sell equip_wrists3');
            clickButton('items sell equip_wrists4');
            clickButton('items sell equip_wrists5');
            clickButton('items sell equip_wrists6');
            clickButton('items sell weapon_throwing1');
            clickButton('items sell weapon_throwing2');
            clickButton('items sell weapon_throwing3');
            clickButton('items sell weapon_throwing4');
            clickButton('items sell weapon_throwing5');
            clickButton('items sell weapon_throwing6');
            clickButton('items sell equip_neck1');
            clickButton('items sell equip_neck2');
            clickButton('items sell equip_neck3');
            clickButton('items sell equip_neck4');
            clickButton('items sell equip_neck5');
            clickButton('items sell equip_neck6');
            clickButton('items sell equip_finger1');
            clickButton('items sell equip_finger2');
            clickButton('items sell equip_finger3');
            clickButton('items sell equip_finger4');
            clickButton('items sell equip_finger5');
            clickButton('items sell equip_finger6');
            clickButton('client_prompt items splite equip_surcoat6');
            clickButton('client_prompt items splite equip_shield5');
            clickButton('client_prompt items splite equip_finger7');
            clickButton('client_prompt items splite equip_armor5');
            clickButton('client_prompt items splite equip_armor6');
            clickButton('client_prompt items splite equip_armor7');
            clickButton('client_prompt items splite weapon_dagger6');
            clickButton('client_prompt items splite weapon_dagger7');
            clickButton('client_prompt items splite equip_wrists7');
            clickButton('client_prompt items splite equip_waist6');
            clickButton('client_prompt items splite equip_cloth7');
            clickButton('items sell long sword');
        }


        clickButton('items put_store obj_wumu-yishu');
        clickButton('items put_store leftweapon book');
        clickButton('items put_store baiyin box');
        clickButton('items put_store meigui hua');
        clickButton('items put_store zishuijing1')
        clickButton('items put_store zishuijing2');
        clickButton('items put_store zishuijing3');
        clickButton('items put_store lanbaoshi1');
        clickButton('items put_store lanbaoshi2');
        clickButton('items put_store lanbaoshi3');
        clickButton('items put_store hongbaoshi1');
        clickButton('items put_store hongbaoshi2');
        clickButton('items put_store hongbaoshi3');
        clickButton('items put_store lvbaoshi1');
        clickButton('items put_store lvbaoshi2');
        clickButton('items put_store lvbaoshi3');
        clickButton('items put_store huangbaoshi1');
        clickButton('items put_store huangbaoshi2');
        clickButton('items put_store huangbaoshi3');
        clickButton('items put_store huangjinbox key');
        clickButton('items put_store obj_baibaoling');

        clickButton('items use obj_bingzhen_suanmeitang');
    }



    var hasDoOnece = false;
    // 到时做XXX
    function doOnTime(){
        var hours = getHours();
        // 0点 签到
        if(hours > 0 && hours < 5){
            $('span:contains(你今天试剑次数已达限额)').html('')
            CheckIn();
            dazuoAndSleep();
            doPractice();
        }
        // 0、2、4、8、12 、14点
        if(hours == 0  || hours == 2 || hours == 4 || hours == 8 || hours == 11 || hours == 12 || hours == 14){
            hasDoOnece = false;
        }
        // 5-7点开始清二娘
        if(hours > 4 && hours < 8){
            if(!Base.getCorrectText('4253282')){
                if($("#btn5").html() == '杀正邪'){
                    $("#btn5").trigger('click');
                }
            }else{
                doOnce(3);
            }
        }
        // 9点结束杀二娘去钓鱼
        if(hours == 8){
            useDog = true;
            console.log('取消杀正邪');
            $("#btn5").html('杀正邪');
            clearInterval(killErInterval);
        }
        // 8点领奖励
        if(hours == 9){
            $('span:contains(你今天试剑次数已达限额)').html('')
            CheckIn();
            dazuoAndSleep();
            doPractice();
        }
        // 10点去钓鱼
        if(hours == 10){
            doOnce(1);
        }
        // 12点 答题
        if(hours == 12){
            doOnce(4);
        }
        // 18点领取奖励  打坐
        if(hours == 13 || hours == 18){
            doReplay();
        }
        // 14点试剑
        if(hours == 14){
            if($('#btn17').html() == "试剑"){
                $('#btn17').trigger('click');
            }
        }
        // 15点刷碎片
        if(hours == 15){
            doOnce(2);
        }


    }
    // 每天执行一次
    function doOnce(type){

        if(!hasDoOnece){
            hasDoOnece = true;
            if(type == '1'){
                fishingFirstFunc();	 	// 钓鱼
            }
            if(type == '2'){
                killDrunkManFunc();  	// 刷碎片
            }
            if(type == '3'){
                newGetXiaKe();		 	// 侠客岛
            }
            if(type == '4'){
                $('#btn18').trigger('click')	// 答题
            }
        }

    }
    // 获取当前时间
    function getHours() {
        var date = new Date();
        var currentdate =  date.getHours();
        return currentdate;
    }
    function getWeek(){
        var week = new Date().getDay();
        return week;
    }
    function doReplay(){
        $('span:contains(你今天试剑次数已达限额)').html('')
        dazuoAndSleep();
        doPractice();
        if(Base.getCorrectText('4253282')){
            vipClick();
        }else{
            talkSelectQiXia();
        }
        setTimeout(function(){
            CheckIn();
        },1000*60*3)
    }
    function dazuoAndSleep(){
        clickButton('home');
        clickButton('exercise');
        clickButton('sleep_hanyuchuang');
    }
    function vipClick(){
        // VIP每日
        clickButton('vip drops');

        // VIP师门
        for(var i = 0 ; i<15; i++){
            clickButton('vip finish_family');
        }
        // VIP帮派
        for(var i = 0 ; i<20; i++){
            clickButton('vip finish_clan');
        }

        // VIP暴击
        for(var i = 0 ; i<10; i++){
            clickButton('vip finish_big_task');
        }

        // VIP正邪
        for(var i = 0 ; i<8; i++){
            //clickButton('vip finish_bad 2');
        }
        // VIP逃犯
        for(var i = 0 ; i<5; i++){
            if(getWeek() != '4'){
                clickButton('vip finish_taofan 1');
            }
        }
        // VIP打榜
        for(var i = 0 ; i<5; i++){
            clickButton('vip finish_sort');
        }
        // VIP挖宝
        for(var i = 0 ; i<10; i++){
            clickButton('vip finish_dig');
        }

        // VIP副本
        for(var i = 0 ; i<2; i++){
            clickButton('vip finish_fb dulongzhai');
        }
        // VIP副本
        for(var i = 0 ; i<2; i++){
            clickButton('vip finish_fb junying');
        }
        // VIP副本
        for(var i = 0 ; i<2; i++){
            clickButton('vip finish_fb beidou');
        }
    }

    function doPractice(){
        // 东方
        if(Base.getCorrectText('4253282')){
            // clickButton('practice pine-sword');
            clickButton('enable kuihua-shengong');
            clickButton('tupo go,kuihua-shengong');
            clickButton('tupo go,rulai-zhang');
            clickButton('enable yijinjing');
        }
        if(Base.getCorrectText('4316804')){
            // 37 laodap
            clickButton('practice lingboweibu');
            clickButton('tupo go,yijinjing');
        }
        if(Base.getCorrectText('4316804')){
            // 38 laodap
            clickButton('practice lingboweibu');
            clickButton('tupo go,bahuang-gong');
        }
        if(Base.getCorrectText('4254240')){
            // weixin
            clickButton('practice tiannan-step');
            clickButton('tupo go,bahuang-gong');
        }
    }
    // 加载完后运行
    $(function(){
        Base.init();
        var doOntimeInterval = setInterval(function(){
            if(!isInKuafu){
                doOnTime();
            }
        },1200000)
        if(Base.getCorrectText('4253282') || Base.getCorrectText('4254240')){
            webSocketConnet();
        }
    })



    var webSocket;

    function webSocketConnet(){
        webSocket = new WebSocket("ws://localhost:25303");

        webSocket.onerror = function(event) {
            console.log(event)
        };

        webSocket.onopen = function(event) {
            console.log(event)
        };

        webSocket.onclose = function(event) {
            console.log(event)
        };

        webSocket.onmessage = function(event) {
            onMessage(event)
        };
    }

    function onMessage(event) {

        var obj = eval('(' + decodeURI(event.data) + ')');
        if(obj.error != 0){
            return;
        }
        var name = '';
        if(Base.getCorrectText('4253282')){
            console.log(obj);
            if(obj.fromGroup != '291849393'){
                return;
            }
        }else if(Base.getCorrectText('4254240')){
            console.log(obj);
            if(obj.fromQQ != '1507682632'){
                return;
            }
        }else{
            return;
        }

        var txt = obj.msg;
        // 出游侠
        if(txt.indexOf('出游侠') != '-1'){
            console.log(txt);
            txt = txt.split(',');
            findSpecTagerInfo = txt[1];
            autoFindSpecargetFunc();
        }

    }


    // Your code here...
})();