
data=[
    {type:"window",id:"fereastra",
        data: {
            top: 0,
            left: 0,
            center:true,
            width:400,
            height:250,
            text:"Deconectare utilizator",
            items:[
                {
                    type: "form", id: 'addevent',
                    data: [
                        {type:"label", label:"<br>"},
                        {type:"label",offsetLeft:80, label:"Doriti deconectarea utilizatorului?"},
                        {type:"label", label:"<br>"},

                        {type: "button", name: "da", value: "Da",width:55 ,offsetLeft:50,icon:"Exit_s.png"},
                        {type:"newcolumn",offset:1},
                        {type:"label", label:"<br>"},
                        {type:"label", label:"<br>"},
                        {type:"label", label:"<br>"},

                        {type: "button", name: "nu", value: "Nu",width:55,icon:"Exit_s.png"}



                    ],
                    actions: {
                        onButtonClick: [
                            {id:"da",action:"screens.deconectare.functions.deconectare()"},
                            {id:"nu",action:"screens.deconectare.functions.nu()"},



                        ],
                        onChange:[
                            {id:"data_event",action:"screens.addEvent.functions.reloadGridEvent()"},

                        ]
                    }
                }

            ]
        }

    }
];
functions={

    deconectare:function(){

        debugger;

        window.dhx.ajax.query({
            method:"POST",
            url:"php/load.php?op=ofsesion",
            async:true,
            callback:function(loader){
                var dat = JSON.parse(loader.xmlDoc.responseText);
                screens.deconectare.ids.fereastra.close();
                location.reload(true);
                initScreen(main.cells('a'),'login');


            },
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            }
        });

    },

    nu:function () {
        screens.deconectare.ids.fereastra.close();

}
};
actions={

};