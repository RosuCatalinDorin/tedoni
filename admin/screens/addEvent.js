data=[
    {
        type: "window",
        id: "addEvent",
        data: {
            left: 0, top: 0,
            width: window.dhx4.screenDim().right - 40 > 600 ? 900 : window.dhx4.screenDim().right - 40,
            height: window.dhx4.screenDim().bottom - 40 > 600 ? 600 : window.dhx4.screenDim().bottom - 40,
            text: "Adaugare mesaj nou",
            header: true, center: true, modal: true, resize: true, park: false,
            items: [


                layout = {
                    type: "layout",
                    id: "layout_id",
                    data: {
                        pattern: "2E", // 2 celule (pt. mai multe patternuri https://docs.dhtmlx.com/layout__patterns.html)
                        cells: [
                            {id: "a", header: false, setHeight: 250, text: "Adaugare eveniment",
                                items: [
                                    {
                    type: "form", id: 'addevent',
                    data: [
                        {type: "settings", position: "label-top", inputWidth: 200, labelWidth: 200, offsetLeft:25},
                        {type:"label", label:" <br>  Adaugare mesaje"},
                        {type: "calendar", name: "data_event", label: "Data event :",validate:"ValidDate",  dateFormat:"%m-%d",inputHeight:20,required: true},
                        {type: "input", name: "add", label: "Adauga prenume: ", required: true},
                        {type:"newcolumn",offset:20},
                        {type:"label", label:"<br>"},
                        {type:"label", label:"<br>"},
                        {type:"label", label:"<br>"},
                        {type:"label", label:"<br>"},
                        /*   {type: "container", name:"grid_parametri",inputWidth:200,inputHeight:200,offsetTop:10},*/
                        {type: "button", name: "nume", value: "+",width:55}



                    ],
                    actions: {
                        onButtonClick: [
                            {id:"addMsg",action:"screens.addEvent.functions.insertMesaj()"},
                            {id:"nume",action:"screens.addEvent.functions.insertEvent()"},



                        ],
                        onChange:[
                            {id:"data_event",action:"screens.addEvent.functions.reloadGridEvent()"},

                        ]
                    }
                }
                                ]
                            },
                            {id: "b", header: false, setHeight: 250, text: "",
                                items: [

                                    {
                                        type: "grid",
                                        id: 'grid_event',
                                        data: {
                                            init: {
                                                setImagePath: "codebase/imgs/",
                                                setHeader: "Data event ,Prenume sarnatoriti,Maker ID ,Data activari",
                                                setColTypes: "ro,ro,ro,ro",
                                                setColAlign: "center,center,center,center",
                                                setColSorting: "str,str,str,str",
                                                setInitWidths: "80,*,100,150",
                                                setColumnMinWidth: "80,210,150,150",
                                                attachHeader: "#text_filter,#text_filter,#select_filter,#select_filter",
                                                setColumnHidden:[[0,false]],
                                                enableRowsHover:[true,'"hover"']
                                            }
                                        }}
                                ]
                            }]
                    }
                }
            ]

        }
    }
];
functions={

    reloadGridEvent:function () {
        var vargridin = screens.addEvent.ids.grid_event;
        f = screens.addEvent.ids.addevent;
        vargridin.clearAll();
        vargridin.load("php/load_ora.php?op=VerEvent&data=" + f.getItemValue('data_event', true),'json');
    },
    onInitComplete:function () {


    },

    insertEvent:function () {

        f = screens.addEvent.ids.addevent;
        var vargridin = screens.addEvent.ids.grid_event;
        var exist = vargridin.getRowsNum();


         if (exist == 0) {

             alert("NU EXISTA");

             window.dhx.ajax.query({
                 method: "POST",
                 url: "php/load_ora.php?op=InsertEvent&value=" + f.getItemValue('add') + "&data=" + f.getItemValue('data_event', true) + "&maker=" + system.auth.user,
                 async: true,
                 callback: function (loader) {
                     var dat = JSON.parse(loader.xmlDoc.responseText);
                      screens.addEvent.functions.reloadGridEvent()
                 },
                 headers: {
                     "Content-type": "application/json"
                 }
             })

         }
         else {



             alert("EXISTA");
             window.dhx.ajax.query({
                 method: "POST",
                 url: "php/load_ora.php?op=UpdateEvent&value=" + f.getItemValue('add') + "&data=" + f.getItemValue('data_event', true) + "&maker=" + system.auth.user,
                 async: true,
                 callback: function (loader) {
                     var dat = JSON.parse(loader.xmlDoc.responseText);
                     screens.addEvent.functions.reloadGridEvent()
                 },
                 headers: {
                     "Content-type": "application/json"
                 }

             });
         }


    }}
actions={
    onInitComplete:"screens.addEvent.functions.onInitComplete.call(screens.addEvent)"
}


/*
scr=screens_functions.activeScreen();
f=screens[scr].ids.client_details_form;
postObj ={
    "P_CNP" : f.getItemValue("SHORT_NAME"),
    "P_CIF" : f.getItemValue("CUSTOMER_NO"),
    "P_FIRST_NAME" :  f.getItemValue("FIRST_NAME"),
    "P_LAST_NAME" :  f.getItemValue("LAST_NAME"),
    "P_REQ_TYPE" :  "PRESCORING",
    "P_PRODUCT_TYPE" :  "",
    "P_USER_AD" :  system.auth.user,
    "P_BRANCH_ID": system.auth.branch
};*/
