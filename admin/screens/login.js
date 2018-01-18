
data=[
    {type:"window",id:"fereastra",
        data: {
            top: 0,
            left: 0,
            center:true,
            width:400,
            height:250,
            text:"Autentificare user",
            items:[
                {type:"form",id:"form",
                    data:[
                        {type:"settings",inputWidth:180,labelWidth:100,position:"label-left",offsetLeft:10,labelAlign:"right"},
                        {tyoe:"hidden",name:'op',value:"login"},   {tyoe:"hidden",name:'mailsave'},   {tyoe:"hidden",name:'typesave'},
                        {type:"input",name:"mail",label:"E-mail:", validate: "ValidEmail"},
                        {type:"password",name:"pass",label:"Parola:"},
                        {type:"select",name:"type",label:"Tip user:",inputHeight:25,options:[
                            {text:"Companie",value:"company"},
                            {text:"Angajat",value:"employees"},
                            {text:"Utilizator",value:"users"}
                        ]},
                        {type:"button",name:"login",value:"LOG IN",offsetLeft:150,className:"button_login",label:"test"},
                        {type:"button",name:"addACC",value:"Create account",offsetLeft:15,offsetTop:15,className:"button_add"}


                    ],
                    actions:{
                        "onButtonClick":[
                            {id:"login",action:"screens.login.functions.doLogin.apply(this,arguments)"},
                            {id:"addACC",action:"screens.login.functions.addAccount()"}
            ]
                    }

                }
            ]
        }

    }
];
functions={

    iniMain:function () {
        system.appPath='';
        initScreen(main.cells('a'),'main');
        screens.login.ids.fereastra.close();
    },
    userdate:function () {

         f = screens.login.ids.form
        obj =
            {
                'mail': f.getItemValue('mail'),
                'pass': f.getItemValue('pass') ,
                'op': 'usersdate',
                'tabela' : f.getItemValue('type')
            }

        window.dhx.ajax.query({
            method:"POST",
            url:"php/load.php",
            data:JSON.stringify(obj),
            async:true,
            callback:function(loader){
                var dat = JSON.parse(loader.xmlDoc.responseText);

                if(dat['status']=='user incorect') {
                    _error('Userul sau parola nu este corecta!','Parola sau user nu este corecta!');
                }
                if(dat['status']=='ok'){

                    screens.login.functions.iniMain();
                }
            },
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            }
        });
    },


    doLogin:function(){
        data=this.getFormData();

        obj =
            {
                'mail': this.getItemValue('mail'),
                'pass': this.getItemValue('pass') ,
                'op': 'login',
                'tabela' : this.getItemValue('type')
            }
        window.dhx.ajax.query({
            method:"POST",
            url:"php/load.php",
            data:JSON.stringify(obj),
            async:true,
            callback:function(loader){
                var dat = JSON.parse(loader.xmlDoc.responseText);

                if(dat['status']=='user incorect') {
                    _error('Userul sau parola nu este corecta!','Parola sau user nu este corecta!');
                }
                if(dat['status']=='ok'){

                    screens.login.functions.userdate();
                    screens.login.functions.iniMain();
                }
            },
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            }
        });

    },
    addAccount:function () {

        initScreen(main.cells('a'),'createaAcc');

    }

};
actions={};