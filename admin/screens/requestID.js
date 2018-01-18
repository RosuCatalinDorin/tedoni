data=[
    {
        type: "window",
        id: "requestID",
        data: {
            left: 0, top: 0,
            width: window.dhx4.screenDim().right - 40 > 600 ? 600 : window.dhx4.screenDim().right - 40,
            height: window.dhx4.screenDim().bottom - 40 > 600 ? 500 : window.dhx4.screenDim().bottom - 40,
            text: "Adaugare mesaj nou",
            header: true, center: true, modal: true, resize: true, park: false,
            items: [

                {
                    type: "form", id: 'add_msg1',
                    data: [
                        {type: "settings", position: "label-top", inputWidth: 200, labelWidth: 200, offsetLeft:25},
                        {type: "hidden", name: "op",value:"postMesaj"},{type: "hidden", name: "maker",value:system.auth.user},
                        {type:"label", label:" <br>  Adaugare mesaje"},
                        {type: "input", name: "mesaj", label: "Mesaj nou: ", required: true,inputHeight:40,rows:3},
                        {type:"select",name:"tip_msg",label:"Tip mesaj:",inputHeight:25,options:[
                            {text:"Marketing",value:"marketing"},
                            {text:"Zi de nastere",value:"zi de nastere"},
                            {text:"Zi de nume",value:"zi de nume"},
                            {text:"Zi nationala",value:"zi nationala"}
                        ]},
                        {type: "calendar", name: "end_date", label: "Data scadenta mesaj:",validate:"ValidDate",  dateFormat:"%Y-%m-%d %H:%i",inputHeight:20,required: true},
                        {
                            type: "block", width: "radio", list: [
                            {type:"label", label:"Selecteaza fecventa"},
                            {type:"radio",name:"frecventa",value:"Zilnic",label:"Zilnic",position:"label-right",inputWidth:20,labelWidth:"auto",offsetLeft:0,checked:false},
                            {type:"radio",name:"frecventa",value:"Saptamanal",label:"Saptamanal",position:"label-right",inputWidth:20,labelWidth:"auto",offsetLeft:0,checked:false},

                        ]
                            //pt mai multe tipuri https://docs.dhtmlx.com/form__controls_list.html
                        },

                        {
                            type: "block", width: "auto", list: [
                            {type:"label", label:"<br>"},
                            {type: "button", name: "addMsg", value: "Salveaza mesajul creat",img:"User-Files-icon.png"},

                        ]
                            //pt mai multe tipuri https://docs.dhtmlx.com/form__controls_list.html
                        },
                        {type:"newcolumn",offset:50},
                        {type:"label", label:"<br>Parametrii"},
                     /*   {type: "container", name:"grid_parametri",inputWidth:200,inputHeight:200,offsetTop:10},*/
                        {type: "button", name: "nume", value: "Nume",width:100},
                        {type: "button", name: "an", value: "Anul nasterii",width:100},
                        {type: "button", name: "luna", value: "Luna nastere",width:100},
                        {type: "button", name: "zi", value: "Zi nastere",width:100},
                        {type: "button", name: "sysdate", value: "Ziua curenta",width:100},
                        {type:"radio",name:"frecventa",value:"Lunar",label:"Lunar",position:"label-right",labelWidth:"auto",offsetLeft:0,offset:100,checked:false},
                        {type:"radio",name:"frecventa",value:"Anual",label:"Anual",position:"label-right",labelWidth:"auto",offsetLeft:0,offset:100,checked:false},



                    ],
                    actions: {
                        onButtonClick: [
                            {id: "cancel", action: ""},
                          //  {id:"addMsg",action:"screens.requestID.functions.insertMesaj()"},
                            {id:"addMsg",action:"screens.requestID.functions.validare()"},
                            {id:"nume",action:"screens.requestID.functions.addName()"},
                            {id:"an",action:"screens.requestID.functions.addAn()"},
                            {id:"luna",action:"screens.requestID.functions.addLuna()"},
                            {id:"zi",action:"screens.requestID.functions.addZi()"},
                            {id:"sysdate",action:"screens.requestID.functions.addSys()"},


                        ]
                    }
                }

            ]

        }
    }
];
functions={
         onInitComplete:function () {
        f=this.ids.form;
        //f.allowDigitsOnly('FILE_CEC',false,3);f.allowDigitsOnly('FILE_CAMBIE',false,3);f.allowDigitsOnly('FILE_BO',false,3);f.allowDigitsOnly('FILE_ORN',false,3);
        //this.ids.requestID.maximize();
        screens.requestID.functions.initGrids();
    },

         insertMesaj: function () {

            f = screens.requestID.ids.add_msg1;
            f.send('php/load_ora.php',function (loader) {
            data=parseLoadData(loader);
            screens.requestID.ids.requestID.close();
            screens.home.functions.loadRequests();
        });
},
         initGrids:function () {
             var f_utiliz = screens.requestID.ids.add_msg1;
            var grid_superv = screens.requestID.ids.grid_parametri=new dhtmlXGridObject(f_utiliz.getContainer('grid_parametri'));
            grid_superv.setHeader('id_para,Parametrii');
       //     grid_superv.attachHeader(",#text_filter");
            //grid_superv.enableAutoHeight(true, 230);
            grid_superv.setInitWidths("0,*");
            grid_superv.init();
            grid_superv.addRow("1","1,Nume",1);
            grid_superv.addRow("2","2,Anul nasteri",2);
            grid_superv.addRow("2","3,Luna",3);
            grid_superv.addRow("2","4,Zi",4);



            grid_superv.attachEvent('onClick',function () {

                screens_functions.request.pramAdd();


            });
                                                         },


         addName:function () {
               msj = screens.requestID.ids.add_msg1.getItemValue('mesaj');


              mesajcomplet = msj + "{NUME}";

              addname = screens.requestID.ids.add_msg1.setItemValue('mesaj',mesajcomplet);
    },
         addAn:function () {

        msj = screens.requestID.ids.add_msg1.getItemValue('mesaj');


        mesajcomplet = msj + "{AN}";

        addname = screens.requestID.ids.add_msg1.setItemValue('mesaj',mesajcomplet);
    },
         addLuna:function () {

        msj = screens.requestID.ids.add_msg1.getItemValue('mesaj');


        mesajcomplet = msj + "{LUNA}";

        addname = screens.requestID.ids.add_msg1.setItemValue('mesaj',mesajcomplet);

    },
         addZi:function () {

        msj = screens.requestID.ids.add_msg1.getItemValue('mesaj');


        mesajcomplet = msj + "{ZI}";

        addname = screens.requestID.ids.add_msg1.setItemValue('mesaj',mesajcomplet);
    },
         addSys:function () {

        msj = screens.requestID.ids.add_msg1.getItemValue('mesaj');


        mesajcomplet = msj + "{DATA}";

        addname = screens.requestID.ids.add_msg1.setItemValue('mesaj',mesajcomplet);
    },
         validare: function () {
             debugger
        var f = screens.requestID.ids.add_msg1;
        var str = f.getItemValue("mesaj");


        var res = str.split(" ");

     var   mesaj="";

        for (i = 0; i < res.length; i++) {

            if(res[i]=="{NUME}" || res[i]=="{ZI}" || res[i]=="{AN}" || res[i]=="{LUNA}" || res[i]=="{DATA}" ||res[i]=="{NUME}," || res[i]=="{ZI}," || res[i]=="{AN}," || res[i]=="{LUNA}," || res[i]=="{DATA}," ||
                res[i]=="{NUME}!" || res[i]=="{ZI}!" || res[i]=="{AN}!" || res[i]=="{LUNA}!" || res[i]=="{DATA}!")
            {
                mesaj =    mesaj + res[i]
            }

            else
            {
               mesaj = mesaj  + "^"+res[i]+"^ ";
            }
        }


            f.setItemValue(mesaj,"test");

        var rezsplit = mesaj.split(" ");

        for (a = 0; a < rezsplit.length; a++)
        {

            if(rezsplit[a].startsWith("^") && rezsplit[a].endsWith("^"))
            {

                            if(rezsplit[a].includes("{") || rezsplit[a].includes("}"))
                            {

                                alert("Mesajul dumneavoastra contine caractere speciale.");
                                screens.requestID.ids.requestID.close();
                                screens.home.functions.loadRequests();

                            }
            }

                else
                    {
                        if(rezsplit[a].includes("NUME") || rezsplit[a].includes("AN") || rezsplit[a].includes("ZI") || rezsplit[a].includes("LUNA") || rezsplit[a].includes("DATA")) {

                            alert("Mesajul dumenavoastra a fot creat cu succes");

                                screens.requestID.functions.insertMesaj()

                        }


                    }


        }

    }

};

actions={
    onInitComplete:"screens.requestID.functions.onInitComplete.call(screens.requestID)"
}