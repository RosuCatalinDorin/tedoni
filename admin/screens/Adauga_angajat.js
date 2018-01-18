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
                                {type: "input", name: "nume", label: "Nume: ", required: true},
                                {type: "input", name: "prenume", label: "Prenume: ", required: true},
                                {type: "input", name: "mail", label: "E-mail: ", required: true},
                                {type: "input", name: "telefon", label: "Telefon: ", required: true},
                                {type: "input", name: "adresa", label: "adresa: ", required: true},
                                {type: "input", name: "functie", label: "Functie: ", required: true},
                                {type: "input", name: "detalii", label: "Detalii angajat: ", required: true},
                                /*   {type: "container", name:"grid_parametri",inputWidth:200,inputHeight:200,offsetTop:10},*/
                                {type: "button", name: "addauga", value: "Adauga Angajat", width: 190}


                            ],
                            actions: {
                                onButtonClick: [
                                    {id: "addauga", action: "screens.Adauga_angajat.functions.adaugaAngajat()"},


                                ],
                                onChange: [
                                    {id: "data_event", action: "screens.Adauga_angajat.functions.reloadGridEvent()"},

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
                            id: 'grid',
                            data: {
                                init: {
                                    setImagePath: "codebase/imgs/",
                                    setHeader: "ID Angajat ,Nume ,Prenume,Telefon,Adresa,Functie,Detalii,Rating,Id,Email",
                                    setColTypes: "ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro",
                                    setColAlign: "center,center,center,center,center,center,center,center,center",
                                    setColSorting: "str,str,str,st,rstr,str,str,str,str",
                                    setInitWidths: "80,*,100,150,100,150,100,150,100,300",
                                    setColumnMinWidth: "80,210,150,150,80,210,150,150,80,210,250",
                                    attachHeader: "#text_filter,#text_filter,#select_filter,#select_filter,#text_filter,#text_filter,#select_filter,#select_filter,#select_filter,#select_filter",
                                    setColumnHidden: [[8, true]],
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

    reloadGrid: function () {
        var vargridin = screens.Adauga_angajat.ids.grid;
        vargridin.clearAll();
        vargridin.load("php/load.php?op=getAngajati", 'json');
    },
    onInitComplete: function () {

        screens.Adauga_angajat.functions.reloadGrid();
    },
    adaugaAngajat: function () {
        var f = screens.Adauga_angajat.ids.form;

        obj = {
            "op": "createAngajat",
            "nume": f.getItemValue("nume"),
            "prenume": f.getItemValue("prenume"),
            "telefon": f.getItemValue("telefon"),
            "adresa": f.getItemValue("adresa"),
            "functie": f.getItemValue("functie"),
            "mail": f.getItemValue("mail"),
            "detalii": f.getItemValue("detalii")
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
                                screens.Adauga_angajat.functions.reloadGrid();
                                dhtmlx.alert("Programarea a fost aduagata cu succes");

                            }

                        },
                        headers: {
                            "Content-type": "application/json"
                        }

                    });

                }
            }
        });


    }
}
actions={
    onInitComplete:"screens.Adauga_angajat.functions.onInitComplete.call(screens.Adauga_angajat)"
}

