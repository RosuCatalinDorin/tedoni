

var main=new Object(),myWins,menus=new Object(),screens=new Object(),screens_type=new Object();popups=new Array();
var system={};
//debugger;
var user_mesages=[
    "Banca Transilvania ^10000",
    niceDate()+'^10000',
    ];


var configs={
    icons_path:"icons/"
}

function loadJson(cell,dirs,name){
    cell.progressOn(1,'Incarc ecranul solicitat..');
    var loader=window.dhx4.ajax.postSync(dirs+'/'+name+'.js?'+system.version);
    if (loader.xmlDoc.status==200){
        var data='';var actions='';var functions='';
        try {
            eval(loader.xmlDoc.responseText);
        }
        catch(err) {

            var msg='Error loading config file <b>'+name+'.js</b><br> :'+err.message
            if (window.dhx4.isFF) {
                msg+=' on line <b>'+err.lineNumber+'</b> column <b>'+err.columnNumber+'</b>'
            }
            _error('Error loading config file ',msg);
            cell.progressOff(1);
            return false;
        }

        cell.progressOff(1);
        return {'data':data,'actions':actions,'functions':functions};
    }
    else {
        _error('Error loading config file ','Error loading config file <b>'+name+'.js</b><br> Response status:'+loader.xmlDoc.status+' - '+loader.xmlDoc.statusText);
        cell.progressOff(1);
        return false;
    }

}
function initMenuFull(cell,name){
    if (!menus[name]) {
        menus[name]=loadJson(cell,'menus',name);
    }
    //debugger;
    if (!!menus[name]){
        var m=cell.attachMenu({
            items:menus[name].data,
            icon_path:configs.icons_path
        });

        if (!!menus[name].actions){
            var events=Object.keys(menus[name].actions);
            for(var i=0;i<events.length;i++){
                var event=events[i];
                var str="m.attachEvent('"+event+"',function(id){";
                var ids=menus[name].actions[event];
                for (var j=0;j<ids.length;j++){
                    str+=" if (id=='"+ids[j].id+"')" + ids[j].action+';';
                }
                str+="})";
                eval(str);
            }
        }
        return m ;
    }
}

function setActions(item,actions){
    //debugger;
    var it=item;
    var ac=actions;
    if (!!ac){
        var events=Object.keys(ac);
        for(var i=0;i<events.length;i++){
            var event=events[i];
            var str="it.attachEvent('"+event+"',function(id){";
            var ids=actions[event];
            if (typeof (ids) =='string') str+=ids;
            else for (var j=0;j<ids.length;j++){
                if (ids[j].id.length>0) str+=" if (id"+(!ids[j].type?'==':ids[j].type)+"'"+ids[j].id+"'){" + ids[j].action+'}';
                else str+=ids[j].action;
            }
            str+="})";
            eval(str);
            str='';
        }
    }
}
function setConfig(item,settings){
    var config=Object.keys(settings);

    for(var i=0;i<config.length;i++){
        if (typeof settings[config[i]]!="object"){

            item[config[i]].call(item,settings[config[i]])
        }
        else{
            if(Array.isArray(settings[config[i]])){
                var values=settings[config[i]];
                for(var j=0;j<values.length;j++)
                    if (typeof values[j]!='object')  item[config[i]].call(item,values[j]);
                    else {
                        item[config[i]].apply(item,values[j]);
                    }
            }
        }

        //eval(str);
    }
}

function initForm(cell,data,actions){
    if (!!cell.attachForm)
        var f=cell.attachForm(data);
    else f=new dhtmlXForm(cell,data);
    f.setFontSize('11px');
    setActions(f,actions);
    return f;
}
function initLayout(cell,data,actions,screenName){
    //debugger;
    var d=data;
    var l=cell.attachLayout(d);
    var n=-1;

    if(!!d.cells) n=d.cells.length;
    for(var i=0;i<n;i++){
            if (!!d.cells[i].items) initItems(l.cells(d.cells[i].id),d.cells[i].items,screenName);
        }
    setActions(l,actions);
    return l;

}
function initAccordion(cell,data,actions,screenName){
    //debugger;
    var d=clone(data);
    var a=cell.attachAccordion(d);
    var n=-1;

    if(!!data.items) n=data.items.length;
    for(var i=0;i<n;i++){
        if (!!data.items[i].items) initItems(a.cells(data.items[i].id),data.items[i].items,screenName);
    }
    setActions(a,actions);
    return a;

}
function initToolbar(cell,data,actions){
    //debugger;
    var d=data;
    var t=cell.attachToolbar({icons_path:"icons/",items: d.items});
    t.setIconSize(32);
    if (!!d.init) setConfig(t,d.init);
    setActions(t,actions);
    return t;

}
function initRibbon(cell,data,actions){
    //debugger;
    var t=cell.attachRibbon({icons_path:"icons/",items:data});
    setActions(t,actions);
    return t;

}
function initMenu(cell,data,actions,cont,contextZone){
    if (typeof cont=='undefined') cont=false;
    else if (cont !== true) cont=false;
    var m=cell.attachMenu({context:cont,icon_path:configs.icons_path,items:data});
    // m.setIconsPath();
    setActions(m,actions);
    if (cont === true && !!contextZone) {
        str='m.addContextZone('+contextZone+')';eval(str);
    }
    return m

}
function initContexMenu(cell,data,actions){
    var m=cell.attachMenu({items:data});
    setActions(m,actions);
    return m

}
function initGrid(cell,data,actions){
    var d=data;
    var g=cell.attachGrid();
    if (!!d.init){
        setConfig(g, d.init);
        g.init();
        if (!!data.id) g.entBox.id=g.entBox.id+':'+data.id;
    }
    else {
        g.setImagePath("codebase/imgs/");
    }



    g.parent=cell;
    g.attachEvent('onXLS',function(){
        this.resetFilters();
        this.clearAll();
        this.parent.progressOn(this.entBox.id,'Incarc date solicitate...');
    });
    g.attachEvent('onXLE',function(){
        if (!!this.selectOnFirstLoad && this.doesRowExist(this.selectOnFirstLoad)){
            this.selectRowById(this.selectOnFirstLoad);
            delete this.selectOnFirstLoad;
        }
        this.parent.progressOff(this.entBox.id);
    });
    setActions(g,actions);
    if (!!d.load) g.load(d.load.url, d.load.type);
    return g;
}
function initTree(cell,data,actions){
    var d=data;
    var g=cell.attachTree();
    var config=Object.keys(d.init);
    for(var i=0;i<config.length;i++){
        var str="g."+config[i]+"('"+eval('d.init.'+config[i])+"');";
        eval(str);
    }


    g.parent=cell;
    g.attachEvent('onXLS',function(){
        this.parent.progressOn(this.entBox.id,"Incarc date solicitate");
    });
    g.attachEvent('onXLE',function(){
        this.parent.progressOff(this.entBox.id);
    });
    setActions(g,actions);
    if(!!d.load){
        if (!!d.load.onComplete) g.onComplete=d.load.onComplete+'(this)';
        if(d.load.type=='json')
            g.loadJSON(d.load.url,function(){
                eval(this.onComplete);
            });
    }
    return g;
}
function initChart(cell,data,actions){
    var d=data;
    var c=cell.attachChart(d.init);
    if (!!d.parse) c.parse(d.parse.data, d.parse.type);
    setActions(c,actions);
    return c

}
function initMap(cell,data,actions){
    var c=cell.attachMap(data);
    setActions(c,actions);
    return c

}
function initUrl(cell,data){
    var d=data;
    var c=cell.attachURL(d.url, d.async, d.postData);

    return c
}
function initSidebar(cell,data,actions){
    var d=data;
    var t=cell.attachSidebar(d);
    setActions(t,actions);
    return t;
}
function initItems(cell,data,screenName){
    var d=data;
    var it ;

    for(var i=0;i<d.length;i++){

        switch (d[i].type){
            case 'layout':it=initLayout(cell,d[i].data,d[i].actions,screenName);break;
            case 'form':it=initForm(d[i].container?d[i].container:cell,d[i].data,d[i].actions);break;
            case 'toolbar':it=initToolbar(cell,d[i].data,d[i].actions);break;
            case 'ribbon':it=initRibbon(cell,d[i].data,d[i].actions);break;
            case 'menu': if (!! d[i].context) it=initMenu(cell,d[i].data,d[i].actions,true,d[i].contextZone); else it=initMenu(cell,d[i].data,d[i].actions,false);break;
            case 'grid':it=initGrid(cell,d[i].data,d[i].actions);break;
            case 'tree':it=initTree(cell,d[i].data,d[i].actions);break;
            case 'accordion':it=initAccordion(cell,d[i].data,d[i].actions,screenName);break;
            case 'chart':it=initChart(cell,d[i].data,d[i].actions);break;
            case 'url':it=initUrl(cell,d[i].data,d[i].actions);break;
            case 'map':it=initMap(cell,d[i].data,d[i].actions);break;
            case 'sidebar':it=initSidebar(cell,d[i].data,d[i].actions);break;
            case 'statusbar':it=initStatusbar(cell,d[i].data);break;
            case 'list':it=initList(cell,d[i].data,d[i].actions);break;
            case 'tabbar':it=initTabbar(cell,d[i].data,d[i].actions,screenName);break;
            }
        if (!!screenName && d[i].id) eval('screens[screenName].ids.'+d[i].id+'=it');
        if (!!screenName && !!it) it.screenName=screenName;

        }
    return it;
}
function initWindow(data,screenName){
    if (!!data.id) data.data.id=data.id;
    else {
        data.id='id_'+window.dhx4.newId();
        data.data.id=data.id;
    }
    var w=myWins.createWindow(data.data);
    if (!w.isParkable()) w.button('park').disable();
    if (!w.isResizable()) w.button('minmax').disable();
    if (!!screenName) w.screenName=screenName;
    if (!!screenName && data.id) {
       eval('screens[screenName].ids.'+data.id+'=w');

   }
    if (!!data.data.items){
       initItems(w,data.data.items,screenName);
   }
}
function initList(cell,data,actions){
    var li=cell.attachList(data);
    setActions(li,actions);
    return li;
}
function initStatusbar(cell,data){
    var c=cell.attachStatusBar(data);
    return c;

}
function initTabbar(cell,data,actions,screenName){
    var d=data;
    var l=cell.attachTabbar(d);
    var n=-1;

    if(!!d.tabs) n=d.tabs.length;
    for(var i=0;i<n;i++){
        if (!!d.tabs[i].items) initItems(l.cells(d.tabs[i].id),d.tabs[i].items,screenName);
    }
    setActions(l,actions);
    return l;

}

function initPopup(screenName,item,text,position,id,show){
    if (!screens[screenName]) return false;
    if (typeof screens[screenName].popups == 'undefined')
            screens[screenName].popups=new  Array();
    if (typeof id == 'string' && typeof  screens[screenName].popups[id] == 'object')
        p=screens[screenName].popups[id];
    else
        var p =  new dhtmlXPopup({mode:position});
    if (typeof id == 'string' && typeof screens[screenName].popups[id] == 'undefined'){
        screens[screenName].popups[id]=p;
    }
    if (typeof id !='string') screens[screenName].popups.push(p);
    if (typeof text== 'string') p.attachHTML(text);
    if (!!show) p.showTo(item);
    return p;
}

function initScreen(cell,name,call_screen_func,path){
    var type=name.split("<::>")[0];
    path=path||system.appPath+'screens';
    if (!screens_type[type]) {
        screens_type[type]=loadJson(cell,path,type);

    }
    if (!screens[name] && !!screens_type[type]){
        screens[name]=clone(screens_type[type]);
        screens[name].ids=new Object();

        if (!!screens[name].actions){
            if (!!screens[name].actions.onBeforeInit){
                var str=screens[name].actions.onBeforeInit;
                val=eval(str);
                if (typeof val == 'undefined') val=true;
                if (!val) return false;
            }
        }
        if(screens[name].data[0].type=='window') {
            initWindow(screens[name].data[0],name);
            cell=screens[name];
        }
        else cell=initItems(cell,screens[name].data,name);
        if (typeof call_screen_func == "string") {
            eval("screens[name].functions."+call_screen_func+'()');
        }
        if (!!screens[name].actions){
            Object.keys(screens[name].actions).forEach(function(id){
                if (id=='onInitComplete') {
                    var str=screens[name].actions.onInitComplete;
                    if (typeof str == 'string') eval(str);
                    //if (typeof str == 'function') str.apply(this,)
                }
            })
        }
        return cell;
    }
}
function initMainApp(data){

    debugger;

    window.dhx.ajax.query({
        method: "POST",
        url: "php/load.php?op=sesiune",
        async: true,
        callback: function (loader) {
            var dat = JSON.parse(loader.xmlDoc.responseText);

            if(dat['status']== 'ok'){

                system.appPath='';
                initScreen(main.cells('a'),'main');
            }
            else {

                system.appPath='';
                initScreen(main.cells('a'),'login');

            }

        },
        headers: {
            "Content-type": "application/json"
        }

    });




};
function FatalError(){ Error.apply(this, arguments); this.name = "FatalError"; }
FatalError.prototype = Object.create(Error.prototype);

// and then, use this to trigger the error:


function parseLoadData(loader) {
    try {
       if (!loader || !loader.xmlDoc || !loader.xmlDoc.status) throw new Error('Eroare conectare la server');
       if (loader.xmlDoc.status!=200) throw new Error('Eroare conectare la server :'+loader.xmlDoc.status+' - '+loader.xmlDoc.statusText);
       data=JSON.parse(loader.xmlDoc.responseText);
       if (!data.status) throw new Error('Eroare obtinere raspuns de la server !!');
       switch (data.status){
           case 'err':if (!!data.err && data.err_code==2 ) return data; else throw ('Eroare :'+data.err);break;
           case 'OK': return data;
       }
    }catch(e) {
        _error('Eroare aplicatie !!',e);
        throw new FatalError("Something went badly wrong!");
    }
}
function parseLoadData2(data) {
    try {
        if (!data.status) throw new Error('Eroare obtinere raspuns de la server !!');
        switch (data.status){
            case 'err':throw ('Eroare :'+data.err);break;
            case 'OK': return data;
        }
    }catch(e) {
        _error('Eroare aplicatie !!',e);
        throw new FatalError("Something went badly wrong!");
    }
}

function doOnLoad() {
    //$.fn.snow({minSize: 5, maxSize: 15, newOn: 500,flakeColor: '#0099FF' });
    system.appPath='';
    myWins = new dhtmlXWindows({
        image_path: "codebase/imgs/",
        skin: "dhx_blue"
    });
    myWins.attachEvent('onClose', function (win) {
        if (!!screens[win.screenName].popups) {
            popups = screens[win.screenName].popups;
            Object.keys(popups).forEach(function (id_p) {
                popups[id_p].hide();
                popups[id_p].unload();
            });
        }
        ;

        if (!!screens[win.screenName].popups) delete screens[win.screenName].popups;
        delete screens[win.screenName];
        return true;
    });
    main = new dhtmlXLayoutObject({
        parent: document.body,
        pattern: "1C"
    });
    main.cells('a').hideHeader();


    initMainApp();
}

