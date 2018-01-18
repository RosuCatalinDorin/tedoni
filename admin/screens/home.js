data=[
    {type:"layout",id:"layout",data:{
        pattern: "1C",
        cells: [
            {id: "a", header: false,items:[
                {
                    type: "grid",
                    id: 'grid',
                    data: {
                        init: {
                            setImagePath: "codebase/imgs/",
                            setHeader: "ID APPOIMENTS, TIME,DATE, USER ID, PRICE, COMPANY,ANGAJAT,STATUS,TYPE,MAIL,TELEFON,MAKER,NUME",
                            setColTypes: "ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro",
                            setColAlign: "centre,center,center",
                            setColSorting: "str,str,str,str,str,str,str,str,str,str,str",
                            setInitWidths: "50,*,120,50,80,80,80,80,80,200,150,150,150",
                            setColumnMinWidth: "50,50,120,50,80,80,80,80,80,200,150,150,150",
                            attachHeader: "#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",
                
                            enableRowsHover:[true,'"hover"']


                        }
                    },
                    actions:{
                       // "onXLE":"",
                        "onBeforeContextMenu":"return screens.home.functions.setContextMenu.apply(this,arguments)"
                    }
                }
            ]}
            ]
    }
    },
    {type:"menu",id:"menu",
        context:true,
        data:[
            {id:"details",text:"Adaugare mesaj nou",img:"Actions-plus-icon.png"}, // aici este meniul contextual pentru grid care trebuie implementat
            {id:"open_client", text:"Modifica  mesaj",img:"Actions-document-edit-icon.png"},
            {id:"del",text:"Stergere mesaj",img:"Document-Delete-icon_bw.png"},
            {id:"send",text:"Trimite mesaje",img:"Generate-tables-icon.png"},
            {id:"addEvent",text:"Adauga Eveniment",img:"calendar.png"},
            {id:"sep1",type:"separator"},
            {id:"exp",text:"Exporta mesajele active",img:"Excel-icon.png"},
            {id:"ref",text:"Incarca lista cu mesaje",img:"Arrow-refresh-icon.png"},



        ],
        actions:{
            "onClick": [

                {id:"exp",action:"screens.home.functions.exportData()"},
                {id:"ref",action:"screens.home.functions.loadRequests()"},
                {id:"details",action:"screens_functions.request.openDetails.call(screens.home.ids.grid)"},
                {id: "open_client", action: "screens_functions.request.openEditMsg.call(screens.home.ids.grid)"},   // deleteMsg
                {id: "del", action: "screens_functions.request.deleteMsg.call(screens.home.ids.grid)"},
                {id:"send",action:"screens_functions.request.sendSMS()"},
                {id:"addEvent",action:"screens_functions.request.addEvent.call(screens.home.ids.grid)"},
            ],
            "onBeforeContextMenu":"return screens.home.functions.setContextMenu.apply(this,arguments)"
        }
    }
];
functions={
    onInitComplete:function(){
        screens.home.ids.grid.setColumnHidden(0,true);
        screens.home.ids.grid.setColumnHidden(5,true);
        screens.home.ids.grid.setColumnHidden(3,true);
        screens.home.ids.grid.setColumnHidden(6,true);
        screens.home.ids.grid.setColumnHidden(11,true);

        
        window.dhx.ajax.query({
            method: "POST",
            url: "php/load.php?op=sesiune",
            async: true,
            callback: function (loader) {
                var dat = JSON.parse(loader.xmlDoc.responseText);

                if(dat['status']== 'ok'){

                }
                else {
                    var mail = screens.login.ids.form.getItemValue('mail');
                    var type = screens.login.ids.form.getItemValue('type');
                    screens.login.ids.form.setItemValue('mailsave',mail);
                    screens.login.ids.form.setItemValue('typesave',type);

                }

            },
            headers: {
                "Content-type": "application/json"
            }

        });



        screens.main.ids.sidebar.cells('home').setMenu(screens.home.ids.menu);
        this.ids.grid.enableContextMenu(this.ids.menu);
        this.ids.menu.addContextZone(this.ids.grid.objBox);
        this.functions.loadRequests();
    },
    loadRequests:function(){



        var vargrid = screens.home.ids.grid;
        vargrid.load('php/load.php?op=getProgramri', 'json');
    },
    onGridXLE:function () {
        screens.main.ids.sidebar.cells('home').setText({text2:this.getRowsNum()+' cererei in lucru'})
        this.groupBy(5)
    },
    setContextMenu:function(id,ind,obj){
        var menu=screens.home.ids.menu;
        var grid=screens.home.ids.grid;
        if (!!obj) obj.selectRowById(id);
        else if (arguments.length>0)  grid.clearSelection();

        if (!grid.getSelectedRowId())          {
            menu.hideItem('open_client');menu.hideItem('detalii');menu.hideItem('sep1');
        }
        else {
            menu.showItem('open_client');menu.showItem('detalii');menu.showItem('sep1');
        }

        return true;
    },
    exportData: function () {
        screens.home.ids.grid.toExcel('codebase/grid-excel-php/generate.php');
    },


};
actions={
    onInitComplete:"screens.home.functions.onInitComplete.call(screens.home)"
};