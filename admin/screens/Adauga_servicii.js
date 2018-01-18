data=[
    {
        type: "layout",
        id: "layout_id",
        data: {
            pattern: "2E", // 2 celule (pt. mai multe patternuri https://docs.dhtmlx.com/layout__patterns.html)
            cells: [
                {
                    id: "a", header: false, setHeight: 250, text: "Adaugare eveniment",
                    items: [
                        {
                            type: "form", id: 'form',
                            data: [
                                {
                                    type: "settings",
                                    position: "label-top",
                                    inputWidth: 200,
                                    labelWidth: 200,
                                    offsetLeft: 25
                                },
                                {type: "label", label: " <br>  Adaugare angajat"},
                                {type: "input", name: "nume", label: "Nume operatie: ", required: true},
                                {type: "input", name: "description", label: "Descriere: ", required: true},
                                {type: "input", name: "pret", label: "Pret", required: true},
                                {type: "newcolumn", offset: 20},
                                {type: "label", label: "<br>"},
                                {type: "label", label: "<br>"},
                                {type: "label", label: "<br>"},
                                {type: "label", label: "<br>"},
                                /*   {type: "container", name:"grid_parametri",inputWidth:200,inputHeight:200,offsetTop:10},*/
                                {type: "button", name: "addauga", value: "Adauga servicii", width: 55}


                            ],
                            actions: {
                                onButtonClick: [
                                    {id: "addauga", action: "screens.Adauga_servicii.functions.addService()"},



                                ],
                                onChange: [
                                    {id: "data_event", action: "screens.Adauga_servicii.functions.reloadGridEvent()"},

                                ]
                            }
                        }
                    ]
                },
                {
                    id: "b", header: false, setHeight: 250, text: "",
                    items: [

                        {
                            type: "grid",
                            id: 'grid_event',
                            data: {
                                init: {
                                    setImagePath: "codebase/imgs/",
                                    setHeader: "ID ,Nume Serviciu ,User ID ,Company ID,Descriere,Angajat ID,Pret",
                                    setColTypes: "ro,ro,ro,ro,ro,ro,ro",
                                    setColAlign: "center,center,center,center,center,center,center",
                                    setColSorting: "str,str,str,str,str,str,str",
                                    setInitWidths: "80,*,100,150,100,150,150",
                                    setColumnMinWidth: "80,210,150,150,100,100,100",
                                    attachHeader: "#text_filter,#text_filter,#select_filter,#select_filter,#text_filter,#select_filter,#select_filter",
                                    setColumnHidden: [[0, false]],
                                    enableRowsHover: [true, '"hover"']
                                }
                            }
                        }
                    ]
                }]
        }
    }
];
functions= {

    reloadGridEvent: function () {
        var vargridin = screens.Adauga_servicii.ids.grid_event;
        vargridin.clearAll();
        vargridin.load("php/load.php?op=getService", 'json');
    },
    onInitComplete: function () {

        screens.Adauga_servicii.functions.reloadGridEvent()

    },
    addService: function () {
        var f = screens.Adauga_servicii.ids.form;

        obj = {
            "op": "postServiceCompani",
            "nume": f.getItemValue("nume"),
            "description": f.getItemValue("description"),
            "pret": f.getItemValue("pret"),

        };

        dhtmlx.confirm({
            title: "Initiere proramare",
            type: "confirm-warning",
            text: 'Confirmati inregistrarea programari la angajatul ' + f.getItemValue('name') + '?',
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

                            if (dat.status == "OK") {
                                dhtmlx.alert("Programarea a fost aduagata cu succes");
                                screens.Adauga_servicii.functions.reloadGridEvent()
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
}
actions={
    onInitComplete:"screens.Adauga_servicii.functions.onInitComplete.call(screens.Adauga_servicii)"
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
