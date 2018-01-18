data=[
    {type:"layout",id:"layout",data:{
        pattern: "2E",
        cells: [
            {id: "a", header: false,text: "Adauga programari angajatilor:",items:[
                {type:"form",id:"form",
                    data:[
                        {type:"block", text:"Group 2", text_pos:"bottom",
                            list:[
                                {type:"hidden",name:"id",value:""},
                                {type:"input",name:"name",label:"Nume angajat:",disabled:true,offsetLeft:60,position:"label-top"},
                                {type: "calendar", name: "data", label: "Data programari:",offsetLeft:60,offsetTop:5,position:"label-top"},
                                {type:"combo",name:"ora",label:"Ora programarii:",inputWidth:150, required:true,offsetLeft:60,offsetTop:6,position:"label-top"},
                                {type: "input", name: "suma", label: "Suma:",offsetLeft:60,offsetTop:15,position:"label-top"},
                                {type:"newcolumn",offset:10,readonly:true},
                                {type:"combo",name:"tipe",label:"Tip operatie:",inputWidth:150, required:true,offsetLeft:60,offsetTop:115,position:"label-top"},
                                {type: "input", name: "numeClient", label: "Nume Client :",offsetLeft:60,offsetTop:15,position:"label-top"},
                                {type:"newcolumn",offset:10,readonly:true},
                                {type: "input", name: "telefon", label: "Telefon Client :",offsetLeft:60,offsetTop:15,offsetTop:190,position:"label-top"},
                                {type:"newcolumn",offset:10,readonly:true},
                                {type:"button",name:"save",value:"Salveaza programare",className:"button_approv",offsetLeft:78,offsetTop:210}
                            ]},





                    ],
                    actions:{
                        "onButtonClick":[
                            {id:"save",action:"screens.Adauga_programari.functions.saveProgramare()"}
                        ]
                    }
                }
                    ]},


            {id: "b", header: true,text:"Lista angajati",items:[

                {
                    type: "grid",
                    id: "gridangajati",
                    data: {
                        init: {
                            setImagePath: "codebase/imgs/",
                            setHeader: "ID,Nume, Prenume,Telefon,Adresa,Functie,Caracterizare,Rating,Company_id,E-mail",
                            setColTypes: "ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro",
                            setColAlign: "centre,center,center",
                            setColSorting: "str,str,str,str,str,str,str,str,str,str",
                            setInitWidths: "80,200,200,200,80,80,80,80,80,*",
                            attachHeader: "#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",
                            setColumnHidden:(0,false),
                            enableRowsHover:[false,'"hover"']
                        }
                    },
                    actions:{
                        "onXLE":"",
                        "onBeforeContextMenu":"return screens.Adauga_programari.functions.setContextMenu.apply(this,arguments)"
                    }
                },
                {type:"menu",id:"menu",
                    context:true,
                    data:[
                        {id:"addProgramare",text:"Adauga Programare",img:"Actions-plus-icon.png"},
                        {id:"addPres",text:"Adauga Angajat",img:"calendar.png"},
                        {id:"ref",text:"Incarca lista cu mesaje",img:"Arrow-refresh-icon.png"},




                    ],
                    actions:{
                        "onClick": [
                            {id:"ref",action:"screens.Adauga_programari.functions.reloadGridEvent()"},
                            {id:"addProgramare",action:"screens.Adauga_programari.functions.addPro()"},
                            {id:"addPres",action:"screens_functions.request.addEvent.call(screens.home.ids.grid)"},
                        ],
                        "onBeforeContextMenu":"return screens.Adauga_programari.functions.setContextMenu.apply(this,arguments)"
                    }
                }
            ]}
        ]
    }
    },
];
functions={

    reloadGridEvent:function () {
        var vargridin = screens.home.ids.grid;
        vargridin.clearAll();
        vargridin.load("php/load.php?op=getProgramri",'json');
    },


    onInitComplete:function () {

        screens.main.ids.sidebar.cells('Adauga_programari').setMenu(screens.Adauga_programari.ids.menu);
        screens.Adauga_programari.ids.gridangajati.enableContextMenu(screens.Adauga_programari.ids.menu);
        screens.Adauga_programari.ids.menu.addContextZone(screens.Adauga_programari.ids.gridangajati.objBox);


        var vargridin = screens.Adauga_programari.ids.gridangajati;
        vargridin.clearAll();
        vargridin.load("php/load.php?op=getAngajati",'json');




    },

    saveProgramare :function () {
        var f =  screens.Adauga_programari.ids.form;

        obj ={
            "op":"postProgramareCompany",
            "id_angajat" : f.getItemValue("id"),
            "data" : f.getItemValue("data",true),
            "ora" :  f.getItemValue("ora"),
            "tipe" :  f.getItemValue("tipe"),
            "numeClient" : f.getItemValue("numeClient"),
            "suma" :f.getItemValue("suma"),
            "telefon" : f.getItemValue("telefon"),
        };

        dhtmlx.confirm({
            title: "Initiere proramare",
            type: "confirm-warning",
            text: 'Confirmati inregistrarea programari la angajatul '+f.getItemValue('name')+'?',
            ok: "DA",
            cancel: "NU",
            callback: function (status) {
                if (status) {
                    window.dhx.ajax.query({
                        method: "POST",
                        url: "php/load.php",
                        data: JSON.stringify(obj),
                        async: true,
                        callback: function (loader) {
                            var dat = JSON.parse(loader.xmlDoc.responseText);

                            if(dat.status == "OK")
                            {
                                dhtmlx.alert("Programarea a fost aduagata cu succes");
                                screens.home.functions.loadRequests();
                                f.setItemValue("name","");
                                f.setItemValue("id","");
                                f.setItemValue("data","");
                                f.setItemValue("ora","");
                                f.setItemValue("tipe","");
                                f.setItemValue("numeClient","");
                                f.setItemValue("suma","");
                                f.setItemValue("telefon","");

                            }

                        },
                        headers: {
                            "Content-type": "application/json"
                        }

                    });

                }
            }
        });



    },

    addPro:function () {
        idRequest = screens.Adauga_programari.ids.gridangajati.getSelectedRowId();
        screens.Adauga_programari.ids.form.setItemValue('name',screens.Adauga_programari.ids.gridangajati.cells(idRequest , 1).getValue()+" "+screens.Adauga_programari.ids.gridangajati.cells(idRequest , 2).getValue());
        screens.Adauga_programari.ids.form.setItemValue('id',screens.Adauga_programari.ids.gridangajati.cells(idRequest , 0).getValue());

    },
    setContextMenu:function(id,ind,obj){
        var menu=screens.Adauga_programari.ids.menu;
        var grid=screens.Adauga_programari.ids.gridangajati;
        if (!!obj) obj.selectRowById(id);
        else if (arguments.length>0)  grid.clearSelection();

        if (!grid.getSelectedRowId())          {
            menu.hideItem('addProgramare');
        }
        else {
          menu.showItem('ref');menu.showItem('addProgramare');
            menu.showItem('addpres');
        }

        return true;
    },
}
actions={
    onInitComplete:"screens.Adauga_programari.functions.onInitComplete.call(screens.addEvent)"
}

