data=[
    {
        type: "window",
        id: "del_msg_id",
        data: {
            left: 0, top: 0,
            width: window.dhx4.screenDim().right - 40 > 400 ? 400 : window.dhx4.screenDim().right - 40,
            height: window.dhx4.screenDim().bottom - 40 > 400 ? 400 : window.dhx4.screenDim().bottom - 40,
            text: "Sterge mesaj",
            header: true, center: true, modal: true, resize: true, park: false,
            items: [

                {type: "form", id: 'form_del_id',
                    data: [
                        {type: "settings", position: "label-top", inputWidth: 250, labelWidth: 250, offsetLeft: 30},
                        {type: "hidden", name: "hiddenId"}, {type: "hidden", name: "op",value:"delMesaj"},{type: "hidden", name: "maker",value:system.auth.user },
                        {type: "input", name: "idmsgdel", label: "Id Mesaj : ",readonly :true},
                        {type: "input", name: "mesajdel", label: "Mesaj nou: ", required: true,inputHeight:80,readonly :true,rows:3},
                        {
                            type: "block", width: "auto", list: [
                            {type: "button", name: "del", value: "Stergere mesaj"},

                        ],
                        }



            ],
                    actions: {
                        onButtonClick: [

                            {id:"del",action:"screens.stergeMesaj.functions.delMesaj()"},

                        ]
                    }
                }

            ]

        }
    }
];
functions={


    onInitComplete:function () {
        feDel=this.ids.form;
    },

    delMesaj: function () {

        feDel = screens.stergeMesaj.ids.form_del_id;
        feDel.send('php/load_ora.php',function (loader) {
            data=parseLoadData(loader);
            screens.stergeMesaj.ids.del_msg_id.close();
            screens.home.functions.loadRequests();
        });


    }
};
actions={
    onInitComplete:"screens.stergeMesaj.functions.onInitComplete.call(screens.stergeMesaj)"
}