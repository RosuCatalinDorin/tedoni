data=[
    {
        type: "window",
        id: "requestID",
        data: {
            left: 0, top: 0,
            width: window.dhx4.screenDim().right - 40 > 600 ? 600 : window.dhx4.screenDim().right - 40,
            height: window.dhx4.screenDim().bottom - 40 > 600 ? 500 : window.dhx4.screenDim().bottom - 40,
            text: "Creaza un cont nou",
            header: true, center: true, modal: true, resize: true, park: false,
            items: [

                {
                    type: "form", id: 'form',
                    data: [

                        {type:"settings",inputWidth:200,labelWidth:250,position:"label-top",offsetLeft:200,labelAlign:"left"},
                        {type:"select",name:"type",offsetTop:50,label:"Alege tipul de cont dorit:",inputHeight:30,options:[
                            {text:"Companie",value:"company"},
                            {text:"Angajat",value:"employees"},
                            {text:"Utilizator",value:"users"}
                        ]},
                        {type:"input",name:"nume",label:"Nume:"},
                        {type:"input",name:"prenume",label:"Prenume:"},
                        {type:"input",name:"companie",label:"Nume Companie:"},
                        {type:"input",name:"mail",label:"E-mail:", validate: "ValidEmail"},
                        {type:"password",name:"pass",label:"Parola:"},
                        {type:"password",name:"passre",label:"Parola:"},
                        {type:"input",name:"Adresa",label:"Adresa:", validate: "ValidEmail"},
                        {type:"input",name:"Localitate",label:"Localitate:", validate: "ValidEmail"},
                        {type:"input",name:"mail",label:"E-mail:", validate: "ValidEmail"},
                        {type:"input",name:"mail",label:"E-mail:", validate: "ValidEmail"},


                    ],
                    actions: {
                        onButtonClick: [
                            {id:"zi",action:"screens.requestID.functions.addZi()"},
                            {id:"sysdate",action:"screens.requestID.functions.addSys()"},


                        ],
                        onChange: [
                            {id: "type",action: "screens.createaAcc.functions.showItem()"}

                        ]
                    }
                }

            ]

        }
    }
];
functions={
    onInitComplete:function () {
        switch(f.getItemValue('type')){
            case "company" :

                f.hideItem("nume");
                f.hideItem("prenume");
                f.showItem('card_predat');
                f.showItem("card_predat");
                f.showItem("docCerere");



                break;
            case 'employees' :


                f.hideItem("docDeclaratie");
                f.hideItem("upload_cerere");

                break;

            case "users" :

                f.hideItem("docDeclaratie");
                f.hideItem("upload_cerere");

                break;

        }
    },

    showItem:function () {
        debugger;
        var f = screens.createaAcc.ids.form;
        switch(f.getItemValue('type')){
            case "company" :

                    f.hideItem("nume");
                    f.hideItem("prenume");
                    f.showItem('card_predat');
                    f.showItem("card_predat");
                    f.showItem("docCerere");



                break;
            case 'employees' :


                     f.hideItem("docDeclaratie");
                     f.hideItem("upload_cerere");

                break;

            case "users" :

                     f.hideItem("docDeclaratie");
                     f.hideItem("upload_cerere");

                break;

        }



    }


};

actions={
    onInitComplete:"screens.requestID.functions.onInitComplete.call(screens.requestID)"
}