data=[
    {
        type: "tabbar",
        id: "tabbar",
        data: {
            arrows_mode:"auto",
            tabs: [
                {id: "details", text: "Detalii client",width:200,active:true,items: [
                    {
                        type:"form",
                        id :'form',
                        data:[
                            {type:"settings",position:"label-top",labelWidth:360,inputWidth:360},

                            {type:"hidden",name:"FIRST_NAME",value:""},
                            {type:"hidden",name:"LAST_NAME",value:""},
                            {type:"hidden",name:"CUSTOMER_TYPE",value:""},
                            {type:"hidden",name:"ADRESA_CORESPONDENTA",value:""},
                            {type:"hidden",name:"CONVENTION_ID",value:""},
                            {type:"hidden",name:"SEX"},
                            {type:"hidden",name:"RESIDENT_STATUS"},
                            {type:"hidden",name:"EMPLOYER"},
                            {type:"hidden",name:"STAFF"},
                            {type:"hidden",name:"CLIENT_VBR"},

                            {type:"block",blockOffset:20,width:"auto", list:[

                                    {type:"input",name:"CUTOMER_NAME1",label:"Nume client:",required:true,readonly:true,labelWidth:350,inputWidth:360},
                                    {type:"newcolumn",offset:20},
                                    {type:"input",name:"CUSTOMER_NO",value:"",label:"Cod client:",required:true,readonly:true,labelWidth:170,inputWidth:170},
                                    {type:"newcolumn",offset:20},
                                    {type:"input",name:"SHORT_NAME",label:"CUI \\ CNP:",required:true,readonly:true,labelWidth:170,inputWidth:170}
                            ]},
                            {type:"block", blockOffset:20,width:"auto", list:[
                                    {type:"input",name:"CUSTOMER_CATEGORY",label:"Tip client:",readonly:true,labelWidth:170,inputWidth:170},
                                    {type:"newcolumn",offset:20},
                                    {type:"input",name:"DATE_OF_BIRTH",label:"Data nasterii:",readonly:true,labelWidth:170,inputWidth:170},
                                    {type:"newcolumn",offset:20},
                                    {type:"input",name:"EMAIL",label:"Email:",readonly:true,labelWidth:170,inputWidth:170},
                                    {type:"newcolumn",offset:20},
                                    {type:"input",name:"MOBILE_NUMBER",label:"Telefon :",required:true,readonly:true,labelWidth:170,inputWidth:170}
                            ]},
                            {type:"block", blockOffset:20,width:"auto", list:[
                                {type:"input",name:"ADRESS_LINE",label:"Adresa:",inputWidth:745,readonly:true}
                            ]},
                            {type:"fieldset",label:'Informare pentru Instrumente de debit', offsetLeft:20,width:"auto",list:[
                                {type:"block", blockOffset:0,width:"auto",name:"no_conv",hidden:true, list:[
                                {type:"label",label:"Clientul nu are Informarea pentru Instrumente de debit. Se va tipari in 2 exemplare, un exemplar semnat de client va ramane in evidentele bancii!! ",name:"lbl_no_conv",labelWidth:533,className:"error"},
                                {type:"newcolumn",offset:10},
                                {type:"button",name:"conventie", value:"Listeaza conventie",className:"button_print"}
                                ]},
                                {type:"block", blockOffset:0,width:"auto",name:"conv", list:[
                                    {type:"input",name:"idconventie",label:"Nr. conventie:",required:true,readonly:true,labelWidth:170,inputWidth:170},
                                    {type:"newcolumn",offset:13.33},
                                    {type:"input",name:"addtime",label:"Data convente :",readonly:true,labelWidth:170,inputWidth:170},
                                    {type:"newcolumn",offset:13.33},
                                    {type:"input",name:"imputer",label:"Reprezentant :",readonly:true,labelWidth:170,inputWidth:170},
                                    {type:"newcolumn",offset:13.33},
                                    {type:"input",name:"calitate",label:"Tip semnatura:",readonly:true,labelWidth:170,inputWidth:170}
                                ]}
                            ]},
                            {type:"fieldset",label:'Operatiuni client', offsetLeft:20,width:"auto",list:[
                                {type:"block", blockOffset:0,width:"auto", list:[
                                    {type:"combo",name:"REPREZENTANT",label:"Solicitant:",required:true,options:[],labelWidth:340,inputWidth:340},
                                    {type:"hidden",name:"REPREZENTANT_NAME"},
                                    {type:"newcolumn",offset:20},
                                    {type:"input",name:"REPREZENTANT_CNP",label:"CNP :",required:true,disabled:true,labelWidth:143.33,inputWidth:143.33,offsetTop:3},
                                    {type:"newcolumn",offset:10},
                                    {type:"input",name:"REPREZENTANT_SR",label:"CI Seria :",required:true,disabled:true,labelWidth:83.33,inputWidth:83.33,offsetTop:3},
                                    {type:"newcolumn",offset:10},
                                    {type:"input",name:"REPREZENTANT_NR",label:"CI Numarul :",required:true,disabled:true,labelWidth:113.33,inputWidth:113.33,offsetTop:3}
                                ]},
                                {type:"block", blockOffset:0,width:"auto", list:[
                                    {type:"combo",name:"CONT",label:"Cont eliberare ID:",required:true,options:[],labelWidth:340,inputWidth:340},
                                    {type:"newcolumn",offset:10},
                                    {type:"button",name:"eliberare", value:"Eliberare file ID",className:"button_accept",offsetTop:25},
                                    {type:"newcolumn",offset:10},
                                    {type:"button",name:"stop_file_id", value:"Stopare file ID",className:"button_cancel",offsetTop:25}

                                ]},
                                {type:"block", blockOffset:0,width:"auto",name:'blk_notif', list:[
                                    {type:"combo",name:"ABON_NOTIF",label:"Conventie notificare sms:",required:true,options:[],labelWidth:340,inputWidth:340},
                                    {type:"newcolumn",offset:10},
                                    {type:"button",name:"close_abon", value:"Anulare conventie notificare",className:"button_cancel",offsetTop:25}

                                ]}


                                /*{type:"input",name:"FILE_CEC",label:"File CEC:",disabled:true,value:"0",labelWidth:160,inputWidth:160},
                                {type:"hidden",name:"CEC_CERTIFICAT",value:"0"},
                                {type:"input",name:"FILE_CAMBIE",label:"File Cambie:",disabled:true,value:"0",labelWidth:160,inputWidth:160},
                                {type:"newcolumn",offset:20},
                                {type:"input",name:"FILE_BO",label:"Bilete la ordin:",disabled:true,value:"0",labelWidth:160,inputWidth:160},
                                {type:"input",name:"FILE_ORN",label:"File ORN:",disabled:true,value:"0",labelWidth:160,inputWidth:160}*/

                            ]},
                           /* {type:"block",blockOffset:20,width:"auto", list:[
                                {type: "container", name: "cont_grid", label: "Conturi pentru eliberare ID:", inputWidth: 745, inputHeight: 150},
                                {type: "container", name: "cont_imp", label: "Imputerniciti pe conturi:", inputWidth: 745, inputHeight: 150}
                            ]},*/
                            {type:"block",blockOffset:20,width:"auto",list:[
                                {type:"button",name:"close", value:"Inchide",className:"button_close"}
                            ]}
                        ],
                        actions:{
                            "onButtonClick":[
                                {id:"close",action:"screens.main.functions.removeItem(this.screenName);"},
                                {id:"eliberare",action:"screens_functions.clientDetails.requestID.call(this,false);"}

                            ],
                            "onChange":[
                                {id:"",action:"screens_functions.clientDetails.onChangedClientDetails.apply(this,arguments)"}
                            ],
                            //"onValidateError":"screens_functions.client_details.validateFormMesseges(arguments[0],this.screenName)",
                            "onFocus":"this.resetValidateCss()"
                        }
                    },
                    {type:"menu",id:"details_menu",
                        context:true,
                        data:[

                        ],
                        actions:{
                            "onClick": [

                            ],
                            "onBeforeContextMenu":"return screens.adminApp.functions.setContextMenu.apply(this,arguments)"
                        }
                    }
                ]},
                {id: "requests", text: "Cereri client",width:200,items: [
                    {
                        type: "grid", id: "santier_grid", data: {
                        init: {
                            setImagePath: "codebase/imgs/",
                            setIconsPath: "icons/",
                            setHeader: "Nr.crt.,Nr. cerere,Stare,Cont,IBAN,Solicitant,CNP solicitant,Tel. contact,Data cerere,Sucusala,Unitatea,File CEC,#cspan,File cambie,#csapn,File Bilet ordin,#csapn,File ORN,#cspan",
                            attachHeader: [
                                "#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,Solicitate,Aprobate,Solicitate,Aprobate,Solicitate,Aprobate,Solicitate,Aprobate",
                                "#rspan,#numeric_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#rspan,#rspan,#select_filter,#select_filter,#numeric_filter,#numeric_filter,#numeric_filter,#numeric_filter,#numeric_filter,#numeric_filter,#numeric_filter,#numeric_filter"

                            ],
                            setColTypes: "cntr,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro",
                            //setColAlign: "center,center,left,left,center",
                            //setColSorting: "na,int,str,str,str",
                            //setInitWidths: "40,60,*,100,100",
                            //setColumnMinWidth: "40,60,200,100,100",

                            enableMultiline: true


                            //setColumnHidden: [12, true]
                        }
                    },
                        actions:{
                            "onBeforeContextMenu":"return screens.adminApp.functions.setContextMenu.apply(this,arguments)",
                            "onCheck":"screens.adminApp.functions.onActivateSantier.apply(this,arguments)",
                            "onRowDblClicked":"screens.adminApp.functions.editSantier.apply(this,arguments)"
                        }
                    },
                    {type:"menu",id:"santier_menu",
                        context:true,
                        data:[
                            {id:"santier_add",text:"Adauga santier",img:"Actions-plus-icon.png"},
                            {id:"santier_mod",text:"Modifica denumire santier",img:"Actions-document-edit-icon.png"},
                            {id:"santier_sep1",type:"separator"},
                            {id:"santier_ref",text:"Incarca lista de santiere",img:"Arrow-refresh-icon.png"}


                        ],
                        actions:{
                            "onClick": [
                                {id: "santier_add", action: "initScreen(main,'santier_add')"},
                                {id: "santier_ref", action: "screens.adminApp.functions.load_santier.call(screens.adminApp)"},
                                {id: "santier_mod", action: "screens.adminApp.functions.editSantier()"}
                            ],
                            "onBeforeContextMenu":"return screens.adminApp.functions.setContextMenu.apply(this,arguments)"
                        }
                    }
                ]}

            ]
        },
        actions:{
            onSelect:"return screens_functions.clientDetails.tabSelected.apply(this,arguments)"
        }
    }
];
actions={
    onInitComplete:"screens_functions.clientDetails.onInitComplete()"
}