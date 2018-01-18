
data=[
    {
        type:"layout",
        id:"admin",
        data: {
            pattern: "1C",
            cells: [
                {
                    id: "a", header: false, text: "Administrare:",
                    items: [
                        {
                            type: "toolbar",
                            id: "admin_tool",
                            data: {
                                init: {
                                    setIconSize: 32
                                },
                                items: [
                                    {type: "text", id: "t1", text: "Sucursala:"},
                                    {type: "buttonInput", id: "parent_branch",options:[]},
                                    {type: "text", id: "t2", text:"Agentia:"},
                                    {type: "buttonInput", id:"branch",options:[]},
                                    {type: "button", id:"transfer", text:"Transfera instrumente", img:"transfer_32x32.png"},
                                    {type:"button",id:"setAdminUnitate", text:"Seteaza-ma pe aceasta unitate",img:"administrator-icon.png", hidden:true}
                                ]
                            },
                            actions:{
                                "onClick":"screens.admin.functions.onClickAdminToolb(id)"
                            }
                        },
                        {type:"tabbar",
                            id:"id_tabbar",
                            data:{
                                tabs:[
                                    {id:"stoc_instr",text:"Stoc instrumente",active: true,items:[
                                        {type: "layout",
                                            id: "layout_admin_id",
                                            data: {
                                                pattern: "2U",
                                                cells: [
                                                    {id: "a", header: true,text: "Instrumente",
                                                        items: [
                                                            {
                                                                type:"grid",
                                                                id:"grid_instr",
                                                                data: {
                                                                    init: {
                                                                        setImagePath: "codebase/imgs/",
                                                                        setHeader: ",Serie,Inceput interval,Sfarsit interval,Cantitate,Tip fila,Stare",
                                                                        setColTypes: "ro,ro,ro,ro,ro,ro,ro",
                                                                        setColAlign: "left,left,right,right,right,center,center",
                                                                        setColSorting: "str,str,str,str,str,str,str",
                                                                        setInitWidths: "0,*,100,100,50,0,*",
                                                                        setColumnMinWidth: "0,100,100,100,50,0,100",
                                                                        attachHeader: "#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",
                                                                        setColumnHidden:[[5,true]]
                                                                        // enableSmartRendering: true
                                                                    }
                                                                },
                                                                actions:{
                                                                    onXLE:"this.groupBy(5)"
                                                                }
                                                            }

                                                        ]
                                                    },
                                                    {id: "b", header: true, setHeight: 250, text: "Solicitari transfer",
                                                        items: [
                                                            {
                                                                type: "toolbar",
                                                                id: "transf_req_tool",
                                                                data: {
                                                                    init: {
                                                                        setIconSize: 32
                                                                    },
                                                                    items: [
                                                                        {type: "button", id:"approve", text:"Aproba", img:"Thumbs_Up.png",hidden:true},
                                                                        {type: "button", id:"cancel", text:"Respinge", img:"Thumbs_down.png",hidden:true},
                                                                        {type:"button", id:"recept", text:"Receptie", img:"Tasks-icon.png",hidden:true},
                                                                        {type: "button", id:"refresh", text:"Refresh", img:"Arrow-refresh-icon.png"}
                                                                    ]
                                                                },
                                                                actions:{
                                                                    "onClick":[
                                                                        {id:"refresh", action:"screens.admin.functions.loadSolicitariTransfer()"},
                                                                        {id:"approve", action:"screens.admin.functions.approveTransfer()"},
                                                                        {id:"cancel", action:"screens.admin.functions.rejectTransfer()"},
                                                                        {id:"recept", action:"screens.admin.functions.receptTransfer()"}
                                                                    ]

                                                                }
                                                            },
                                                            {type: "grid",
                                                                id: 'grid_solicitari',
                                                                data: {
                                                                    init: {
                                                                        setImagePath: "codebase/imgs/",
                                                                        setHeader: ",Produs,Nr. file,Din unitatea,In unitatea,Status,Initiat de,Initiat la data",
                                                                        setColAlign: "left,left,right,left,left,left,left,left",
                                                                        setInitWidths: "50,120,50,*,*,0,*,100",
                                                                        setColTypes: "ro,ro,ro,ro,ro,ro,ro,ro",
                                                                        setColumnMinWidth: "50,100,50,150,150,0,100,100",
                                                                        attachHeader: "#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",
                                                                        setColumnHidden:[[5,true]]


                                                                    }
                                                                },
                                                                actions:
                                                                    {
                                                                        onRowSelect:"screens.admin.functions.showTransferActions.call(this,arguments)",
                                                                        onXLE:"screens.admin.functions.onXLESolicTransfer.apply(this)",
                                                                        onRowDblClicked:"screens.admin.popups.pop_history.showTo(this.cells(arguments[0],0).cell)"
                                                                    }

                                                            }
                                                        ]
                                                    }]
                                            }
                                        }

                                    ]},
                                    {id:"users",text:"Utilizatori",  items:[
                                        {type: "form", id: 'admin_form',
                                            data: [
                                                {type: "settings", position: "label-top", inputWidth: 200, labelWidth: 200, offsetLeft: 10},
                                                {type:"block",blockOffset:0,width:"auto",list:[
                                                    {type: "label", name:"l1", label:"Supervizori:" },
                                                    {type: "container", name:"grid_supervizori",inputWidth:620,inputHeight:400,offsetTop:10},
                                                    {type:"block",blockOffset:0,width:"auto",list:[
                                                        {type:"button",value:"Adauga supervizor",name:"addSupervizor",className:"button_add"},
                                                        {type:"newcolumn"},
                                                        {type:"button",value:"Sterge supervizor",name:"deleteSupervizor",className:"button_delete"}
                                                    ]}
                                                ]},
                                                {type:"newcolumn", offsetLeft:20},
                                                {type:"block",blockOffset:0,width:"auto",list:[
                                                    {type: "label", name:"l2", label:"Utilizatori:" },
                                                    {type: "container", name:"grid_utilizatori",inputWidth:620,inputHeight:400,offsetTop:10},
                                                    {type:"block",blockOffset:0,width:"auto",list:[
                                                        {type:"button",value:"Adauga utilizator",name:"addUtilizator",className:"button_add"},
                                                        {type:"newcolumn"},
                                                        {type:"button",value:"Sterge utilizator",name:"deleteUtilizator",className:"button_delete"}
                                                    ]}
                                                ]}
                                            ],
                                            actions: {
                                                onButtonClick: [
                                                    {id: "addSupervizor", action: "screens.admin.functions.addSupervizor()"},
                                                    {id: "deleteSupervizor", action: "screens.admin.functions.deleteSupervizor()"},
                                                    {id: "addUtilizator", action: "screens.admin.functions.addUtilizator()"},
                                                    {id: "deleteUtilizator", action: "screens.admin.functions.deleteUtilizator()"}
                                                ]
                                            }
                                        }
                                    ]}
                                ]
                            },
                            actions:{
                                "onTabClick":"screens.admin.functions.onTabSelect(id)"
                            }
                        }
                    ]
                }
            ]
        }
    }
];
functions = {
    onInitComplete:function(){
        var toolbar = screens.admin.ids.admin_tool;
        toolbar.inputToSelect('parent_branch',170,'parent_branch');
        toolbar.inputToSelect('branch',170,'branch');
        toolbar.selectAttachEvent('parent_branch','change',screens.admin.functions.reloadBranches);
        toolbar.selectAttachEvent('branch','change',screens.admin.functions.initGrids);

        screens.admin.functions.getParentBranch();

        var p=initPopup('admin',null,null,"right","pop_admin");
        p.attachEvent('onShow', function(r){
            fromdata =[
                {type:"settings",position:"label-top",labelWidth:160,inputWidth:260,offsetLeft:10},
                {type:"input",name:"username",label:"Nume utilizator:",required:true},
                {type:"hidden",name:"rang",value:""},
                {type:"block",blockOffset:0,width:"auto",list:[
                    {type:"button",name:"save",value:"Salveaza",className:"button_save",offsetLeft:15},
                    {type:"newcolumn",offset:10},
                    {type:"button",name:"cancel",value:"Renunta",className:"button_exit"}
                ]}
            ];
            var f = this.attachForm(fromdata);
            this.form=f;
            f.attachEvent('onButtonClick',function (id) {
                var toolbar=screens.admin.ids.admin_tool;
                var grid_utiliz =screens.admin.ids.grid_utiliz;
                var grid_superv =screens.admin.ids.grid_superv;

                if (id == 'cancel') screens.admin.popups.pop_admin.hide();
                else {
                    dhtmlx.confirm({
                        title: "Adauga utilizator",
                        type:"confirm-warning",
                        text: "Confirmati adaugarea utilizatorului <b>"+f.getItemValue('username')+"</b> ?",
                        ok:"DA",
                        cancel:"NU",
                        callback: function(status) {
                            if(status){
                                var obj={op:"addUser",username:f.getItemValue('username'),rang:f.getItemValue('rang'),branch:toolbar.selectGetSelectedValue('branch')};
                                screens.admin.ids.admin.progressOn();
                                dhx.ajax.post('php/save.php',$.param(obj),function(loader) {
                                    try {
                                        if (loader.xmlDoc.status != 200) throw (loader.xmlDoc.status + ' - '+loader.xmlDoc.statusText);
                                        res=JSON.parse(loader.xmlDoc.responseText);
                                        if(f.getItemValue('rang')==1){
                                            grid_superv.clearAll();
                                            grid_superv.load('php/load.php?'+$.param({op:'getUsers',branch:toolbar.selectGetSelectedValue('branch'),rang:1}),'json');
                                        }
                                        else{
                                            grid_utiliz.clearAll();
                                            grid_utiliz.load('php/load.php?'+$.param({op:'getUsers',branch:toolbar.selectGetSelectedValue('branch'),rang:2}),'json');
                                        }
                                    }
                                    catch (e) {
                                        _error('Adaugare user','Eroare adaugare user ' + e);
                                    }
                                    finally {
                                        screens.admin.ids.admin.progressOff();
                                    }
                                });
                            }
                        }
                    })
                }
            });
        });

        var p_hist=initPopup('admin',null,null,"left","pop_history");
        p_hist.attachEvent("onShow",function(){
            var layout = this.attachLayout(500, 400, "2E");
            layout.cells('a').hideHeader();
            layout.cells('b').hideHeader();

            var g_hist= layout.cells("a").attachGrid(500,200);
            g_hist.setHeader('#,Utilizator,Data,Stare');
            g_hist.setColTypes('cntr,ro,ro,ro');
            g_hist.setColAlign('center,left,center,left');
            g_hist.setInitWidths("40,*,150,120");
            g_hist.enableMultiline(true);
            g_hist.init();
            g_hist.load('php/load.php?'+$.param({op:"getIstoricTransfer",idcerere:screens.admin.ids.grid_solicitari.getSelectedId()}),'json');

            var g_plaje= layout.cells("b").attachGrid(500,200);
            g_plaje.setHeader('#,Serie,Start plaja,End plaja');
            g_plaje.setColTypes('cntr,ro,ro,ro');
            g_plaje.setColAlign('center,left,center,left');
            g_plaje.setInitWidths("40,*,150,120");
            g_plaje.enableMultiline(true);
            g_plaje.init();
            g_plaje.load('php/load.php?'+$.param({op:"getPlajeTransfert",idcerere:screens.admin.ids.grid_solicitari.getSelectedId()}),'json');
        });
    },
    reloadBranches: function(){
        var toolbar = screens.admin.ids.admin_tool;
        var grid_superv = screens.admin.ids.grid_superv;
        var grid_users = screens.admin.ids.grid_utiliz;

        toolbar.selectClear('branch');
        toolbar.selectLoad('branch','php/load.php?'+$.param({op:'getBranchList',parent_branch:toolbar.selectGetSelectedValue('parent_branch')}),'json',function(){
            grid_users.clearAll();
            grid_superv.clearAll();
            grid_superv.load('php/load.php?'+$.param({op:'getUsers',branch:toolbar.selectGetSelectedValue('branch'),rang:1}),'json');
            grid_users.load('php/load.php?'+$.param({op:'getUsers',branch:toolbar.selectGetSelectedValue('branch'),rang:2}),'json');
        },'output','value','text',false);

    },
    getParentBranch:function(){
        var toolbar = screens.admin.ids.admin_tool;

        window.dhx4.ajax.query({
            method: "GET",
            url: 'php/load.php?'+$.param({op:'getParentBranch',branch:system.auth.branch}),
            async: true,
            callback: function (loader) {
                try {
                    if (loader.xmlDoc.status != 200) throw (loader.xmlDoc.status + ' - '+loader.xmlDoc.statusText);
                    res=JSON.parse(loader.xmlDoc.responseText);
                    if(res.parent_branch=='000') system.auth.parent_branch=system.auth.branch;
                    else system.auth.parent_branch=res.parent_branch;

                    toolbar.selectLoad('parent_branch','php/load.php?'+$.param({op:'getBranchList',parent_branch:'000'}),'json',function(){
                        var tool=screens.admin.ids.admin_tool;
                        tool.selectSetValue('parent_branch',system.auth.parent_branch);
                    },'output','value','text',false);

                    toolbar.selectLoad('branch','php/load.php?'+$.param({op:'getBranchList',parent_branch:system.auth.parent_branch}),'json',function(){
                        var tool=screens.admin.ids.admin_tool;
                        tool.selectSetValue('branch',system.auth.branch);
                    },'output','value','text',false);
                    screens.admin.functions.showItemsByProfile();
                    screens.admin.functions.initGrids();
                }
                catch (e) {
                    _error('Eroare branch-uri',e);
                }
                finally {
                    screens.admin.ids.admin.progressOff();
                }
            },
            headers: {
                "Accept": "application/json"
            }
        });

    },
    showItemsByProfile:function(){
        var toolbar = screens.admin.ids.admin_tool;
        var form = screens.admin.ids.admin_form;
        switch (system.auth.profile) {
            case "0":
                toolbar.enableItem('branch');
                toolbar.enableItem('parent_branch');
                toolbar.setItemText('setAdminUnitate', 'Seteaza-ma pe ' +toolbar.selectGetSelecteText('branch'));
                toolbar.showItem('setAdminUnitate');
                break;
            case "1":
                toolbar.disableItem('parent_branch');
                if(system.auth.parent_branch!=system.auth.branch) toolbar.disableItem('branch');
                break;
            case "2":
                toolbar.disableItem('branch');
                toolbar.disableItem('parent_branch');
                form.disableItem('addSupervizor');  form.disableItem('deleteSupervizor');
                form.disableItem('addUtilizator');  form.disableItem('deleteUtilizator');
                break;
        }
    },
    initGrids:function () {
        var f_utiliz = screens.admin.ids.admin_form;
        var toolbar= screens.admin.ids.admin_tool;
        if(system.auth.profile==0)
            toolbar.setItemText('setAdminUnitate', 'Seteaza-ma pe ' +toolbar.selectGetSelecteText('branch'));
        if (!screens.admin.ids.grid_superv){
            var grid_superv = screens.admin.ids.grid_superv=new dhtmlXGridObject(f_utiliz.getContainer('grid_supervizori'));
            grid_superv.setHeader('idUser,Username,Adaugat de,Data adaugarii');
            grid_superv.attachHeader(",#text_filter,#text_filter,#text_filter");
            //grid_superv.enableAutoHeight(true, 230);
            grid_superv.setInitWidths("0,*,150,150");
            grid_superv.init();
            grid_superv.attachEvent('onXLE',function () {
                /// this.setSizes();
            });
        }else {
            grid_superv= screens.admin.ids.grid_superv;
        }

        grid_superv.load('php/load.php?'+$.param({op:'getUsers',branch:toolbar.selectGetSelectedValue('branch'),rang:1}),'json');

        if (!screens.admin.ids.grid_utiliz){
            var grid_users = screens.admin.ids.grid_utiliz= new dhtmlXGridObject(f_utiliz.getContainer('grid_utilizatori'));
            grid_users.setHeader('idUser,Username,Adaugat de,Data adaugarii');
            grid_users.attachHeader(",#text_filter,#text_filter,#text_filter");
            //grid_users.enableAutoHeight(true, 230);
            grid_users.setInitWidths("0,*,150,150");
            grid_users.init();
            grid_users.attachEvent('onXLE',function () {
                //this.setSizes();
            });
        }
        else {
            grid_users=screens.admin.ids.grid_utiliz;
        }

        grid_users.load('php/load.php?'+$.param({op:'getUsers',branch:toolbar.selectGetSelectedValue('branch'),rang:2}),'json');
        var grid_instrumente = screens.admin.ids.grid_instr;
        grid_instrumente.load('php/load.php?'+$.param({op:'getStocUnitate',branch:toolbar.selectGetSelectedValue('branch')}),'json');

        screens.admin.functions.loadSolicitariTransfer();

    },

    addSupervizor: function () {
        screens.admin.popups.pop_admin.showTo(screens.admin.ids.admin_form.getButton('addSupervizor'));
        screens.admin.popups.pop_admin.form.setItemValue('rang',1);
    },
    deleteSupervizor: function () {
        var grid_superv =screens.admin.ids.grid_superv;
        var rid=grid_superv.getSelectedRowId();
        if(!rid) {
            _error('Eroare stergere','Operatia de stergere nu se poate realiza deoarece nu ati selectat un rand din tabelul cu supervizori');
            return;
        } else {
            dhtmlx.confirm({
                title: "Stergere supervizor",
                type: "confirm-warning",
                text: "Confirmati stergerea supervizorului <b>" + grid_superv.cells(rid, 1).getValue() + "</b> ?",
                ok: "DA",
                cancel: "NU",
                callback: function (status) {
                    if (status) {
                        var obj = {op: "deleteUser", id: rid};
                        screens.admin.functions.doDeleteUser(obj,grid_superv,1);
                    }
                }
            })
        }
    },
    addUtilizator: function () {
        screens.admin.popups.pop_admin.showTo(screens.admin.ids.admin_form.getButton('addUtilizator'));
        screens.admin.popups.pop_admin.form.setItemValue('rang',2);
    },
    deleteUtilizator: function () {
        var grid_utiliz =screens.admin.ids.grid_utiliz;
        var rid=grid_utiliz.getSelectedRowId();
        if(!rid) {
            _error('Eroare stergere','Operatia de stergere nu se poate realiza deoarece nu ati selectat un rand din tabelul cu utilizatori');
            return;
        } else {
            dhtmlx.confirm({
                title: "Stergere utilizator",
                type:"confirm-warning",
                text: "Confirmati stergerea utilizatorului <b>"+grid_utiliz.cells(rid,1).getValue()+"</b> ?",
                ok:"DA",
                cancel:"NU",
                callback: function(status) {
                    if(status){
                        var obj={op:"deleteUser",id:rid};
                        screens.admin.functions.doDeleteUser(obj,grid_utiliz,2);
                    }
                }
            });
        }
    },
    doDeleteUser: function(postObj,grid,rang){
        var toolbar= screens.admin.ids.admin_tool;
        screens.admin.ids.admin.progressOn();
        dhx.ajax.post('php/save.php',$.param(postObj),function(loader) {
            try {
                if (loader.xmlDoc.status != 200) throw (loader.xmlDoc.status + ' - '+loader.xmlDoc.statusText);
                res=JSON.parse(loader.xmlDoc.responseText);
                if (!res || !res.response) throw('Error:'+loader.xmlDoc.responseText);
                if (res.response != "ok") throw('Error:'+res.response);
                grid.clearAll();
                grid.load('php/load.php?'+$.param({op:'getUsers',branch:toolbar.selectGetSelectedValue('branch'),rang:rang}),'json');
            }
            catch (e) {
                _error('Stergere user','Eroare steregere utilizator ' + e);
            }
            finally {
                screens.admin.ids.admin.progressOff();
            }
        });
    },

    onClickAdminToolb: function(id){
        var toolbar= screens.admin.ids.admin_tool;

        switch (id){
            case 'transfer':
                scr = initScreen(main,'transfer_instr');
                scr.ids.transfer_form.setItemValue('from_branch_value',toolbar.selectGetSelectedValue('branch'));
                scr.ids.transfer_form.setItemValue('from_branch',toolbar.selectGetSelecteText('branch'));
                var opts = toolbar.selectGetAlloptions('branch');
                scr.ids.transfer_form.reloadOptions("to_branch", opts);

                var obj={op:"getStoc",brn:toolbar.selectGetSelectedValue('branch')};
                window.dhx4.ajax.query({
                    method: "GET",
                    url: 'php/load.php?'+$.param(obj),
                    async: true,
                    callback: function (loader) {
                        try {
                            if (loader.xmlDoc.status != 200) throw (loader.xmlDoc.status + ' - '+loader.xmlDoc.statusText);
                            res=JSON.parse(loader.xmlDoc.responseText);
                            res=res[0];
                            scr.ids.transfer_form.setNote('cec',{text:'<span style="color:red">Stoc valabil ' +res.FILE_CEC_STOC});
                            scr.ids.transfer_form.setNote('cambie',{text:'<span style="color:red">Stoc valabil ' +res.FILE_CAMBIE_STOC});
                            scr.ids.transfer_form.setNote('bo',{text:'<span style="color:red">Stoc valabil '+res.FILE_BO_STOC});
                            scr.ids.transfer_form.setNote('orn',{text:'<span style="color:red">Stoc valabil '+res.FILE_ORN_STOC});
                            scr.ids.transfer_form.setItemValue('stoc_cec',res.FILE_CEC_STOC);
                            scr.ids.transfer_form.setItemValue('stoc_cambie',res.FILE_CAMBIE_STOC);
                            scr.ids.transfer_form.setItemValue('stoc_bo',res.FILE_BO_STOC);
                            scr.ids.transfer_form.setItemValue('stoc_orn',res.FILE_ORN_STOC);
                        }
                        catch (e) {
                            _error('Eroare aducere stoc pe unitate ',e);
                        }
                        finally {
                        }
                    },
                    headers: {
                        "Accept": "application/json"
                    }
                });
                break;
            case 'setAdminUnitate':
                system.auth.branch=toolbar.selectGetSelectedValue('branch');
                dhtmlx.message({text:'Branch schimbat...',expire:2000});
                main.statusbar.setText(system.auth.nume+" | Branch:"+system.auth.branch+" | Nivel de acces:"+system.auth.nivelAcces);
                screens.home.functions.loadRequests();
                break;
        }
    },

    approveTransfer: function(){
        var grid_solicitari = screens.admin.ids.grid_solicitari;
        var rid=grid_solicitari.getSelectedRowId();

        dhtmlx.confirm({
            title: "Aprobare cerere de transfer",
            type: "confirm-warning",
            text: "Confirmati aprobarea cererii de transfer ?",
            ok: "DA",
            cancel: "NU",
            callback: function (status) {
                if (status) {
                    obj = {op: 'approveTransfer', idTransfer: rid};
                    screens.admin.ids.admin.progressOn();
                    dhx.ajax.post('php/save.php', $.param(obj), function (loader) {
                        try {
                            if (loader.xmlDoc.status != 200) throw (loader.xmlDoc.status + ' - ' + loader.xmlDoc.statusText);
                            res = JSON.parse(loader.xmlDoc.responseText);
                            if (!res || !res.status) throw('Error:' + loader.xmlDoc.responseText);
                            if (res.status != "OK") throw('Error:' + res.status);
                            screens.admin.functions.loadSolicitariTransfer();
                        }
                        catch (e) {
                            _error('Eroare aprobare', 'Eroare aprobare ' + e);
                        }
                        finally {
                            screens.admin.ids.admin.progressOff();
                        }
                    });
                }
            }
        });
    },
    rejectTransfer: function(){
        var grid_solicitari = screens.admin.ids.grid_solicitari;
        var rid=grid_solicitari.getSelectedRowId();

        dhtmlx.confirm({
            title: "Respinge cerere de transfer",
            type: "confirm-warning",
            text: "Confirmati respingerea cererii de transfer ?",
            ok: "DA",
            cancel: "NU",
            callback: function (status) {
                if (status) {
                    obj = {op: 'rejectTransfer', idTransfer: rid};
                    screens.admin.ids.admin.progressOn();
                    dhx.ajax.post('php/save.php', $.param(obj), function (loader) {
                        try {
                            if (loader.xmlDoc.status != 200) throw (loader.xmlDoc.status + ' - ' + loader.xmlDoc.statusText);
                            res = JSON.parse(loader.xmlDoc.responseText);
                            if (!res || !res.response) throw('Error:' + loader.xmlDoc.responseText);
                            if (res.response != "ok") throw('Error:' + res.response);
                            screens.admin.functions.loadSolicitariTransfer();
                        }
                        catch (e) {
                            _error('Eroare aprobare', 'Eroare aprobare ' + e);
                        }
                        finally {
                            screens.admin.ids.admin.progressOff();
                        }
                    });
                }
            }
        });
    },
    receptTransfer: function(){
        var grid_solicitari = screens.admin.ids.grid_solicitari;
        var rid=grid_solicitari.getSelectedRowId();

        obj = {op: 'receptieTransfer', idTransfer: rid};
        screens.admin.ids.admin.progressOn();
        dhx.ajax.post('php/save.php', $.param(obj), function (loader) {
            try {
                if (loader.xmlDoc.status != 200) throw (loader.xmlDoc.status + ' - ' + loader.xmlDoc.statusText);
                res = JSON.parse(loader.xmlDoc.responseText);
                if (!res || !res.response) throw('Error:' + loader.xmlDoc.responseText);
                if (res.response != "ok") throw('Error:' + res.response);
                screens.admin.functions.loadSolicitariTransfer();

            }
            catch (e) {
                _error('Eroare aprobare', 'Eroare aprobare ' + e);
            }
            finally {
                screens.admin.ids.admin.progressOff();
            }
        });
    },
    loadSolicitariTransfer: function () {
        var toolbar= screens.admin.ids.admin_tool;
        var grid_soliciatri=screens.admin.ids.grid_solicitari;
        grid_soliciatri.clearAll();
        grid_soliciatri.load('php/load.php?'+$.param({op:'getSolicitariTransfer',branch:toolbar.selectGetSelectedValue('branch')}),'json');

        if(screens.admin.ids.id_tabbar.getActiveTab()=='stoc_instr'){
            screens.admin.ids.transf_req_tool.hideItem('cancel');
            screens.admin.ids.transf_req_tool.hideItem('approve');
            screens.admin.ids.transf_req_tool.hideItem('recept');
        }
    },
    showTransferActions: function(args){
        var rid=args[0];
        var grid=screens.admin.ids.grid_solicitari;
        var agentie = screens.admin.ids.admin_tool.selectGetSelecteText('branch');
        var transf_req_tool= screens.admin.ids.transf_req_tool;

        switch (grid.cells(rid,5).getValue().toLowerCase()){
            case "aprobat": if(agentie.indexOf(grid.cells(rid,4).getValue())>=0){
                transf_req_tool.hideItem('cancel');
                transf_req_tool.hideItem('approve');
                transf_req_tool.showItem('recept');
            }else{
                transf_req_tool.hideItem('cancel');
                transf_req_tool.hideItem('approve');
                transf_req_tool.hideItem('recept');
            }
                break;
            case "asteapta aprobare": transf_req_tool.showItem('cancel');
                transf_req_tool.showItem('approve');
                transf_req_tool.hideItem('recept');
                break;
            default: transf_req_tool.hideItem('cancel');
                transf_req_tool.hideItem('approve');
                transf_req_tool.hideItem('recept');
                break;
        }

    },
    onXLESolicTransfer: function () {
        var grid_soliciatri=screens.admin.ids.grid_solicitari;
        grid_soliciatri.groupBy(5);

        grid_soliciatri.forEachRow(function (row_id) {
            var grid_soliciatri=screens.admin.ids.grid_solicitari;
            grid_soliciatri.cells(row_id, 0).setValue('<div class="dhxform_item_label_left button_ops" style="padding: 3px"><div dir="ltr" tabindex="0" role="link" class="dhxform_btn" onmouseover="this.className=\'dhxform_btn dhxform_btn_over\'" onmouseout="this.className=\'dhxform_btn\'" "style="margin: 0px;height:30px"><div class="dhxform_btn_txt" style="height: 30px;"></div></div></div>');
        });
    },
    show_menu:function (rid) {
        debugger;
        var grid_soliciatri=screens.admin.ids.grid_solicitari;
        screens.admin.popups.pop_history.showTo(grid_soliciatri.cells(arguments[0],0).cell);
    },

    onTabSelect: function(id){
        if(id=='stoc_instr'&&system.auth.profile!=2) {
            screens.admin.ids.admin_tool.showItem('transfer');
        }
        else {
            screens.admin.ids.admin_tool.hideItem('transfer');

        }
        return true;
    }

};
actions ={
    onInitComplete:"screens.admin.functions.onInitComplete()"
};

