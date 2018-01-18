data=[
    {
        type: "window",
        id: "edit_msg_id",
        data: {
            left: 0, top: 0,
            width: window.dhx4.screenDim().right - 40 > 400 ? 400 : window.dhx4.screenDim().right - 40,
            height: window.dhx4.screenDim().bottom - 40 > 400 ? 400 : window.dhx4.screenDim().bottom - 40,
            text: "Adaugare mesaj nou",
            header: true, center: true, modal: true, resize: true, park: false,
            items: [

                {type: "form", id: 'form_edit_id',
                    data: [
                        {type: "settings", position: "label-top", inputWidth: 250, labelWidth: 250, offsetLeft: 30},
                        {type: "hidden", name: "hiddenId"}, {type: "hidden", name: "op",value:"editMesaj"},{type: "hidden", name: "maker",value:system.auth.user},
                        {type: "input", name: "idmsg", label: "Id Mesaj : ", required: true,readonly :true},
                        {type: "input", name: "mesaj", label: "Mesaj nou: ", required: true,inputHeight:80,rows:3},
                        {type: "calendar", name: "start_date", label: "Data scadenta mesaj:",validate:"ValidDate", dateFormat:"%Y-%m-%d %H:%i",required: true ,inputHeight:25},
                        {
                            type: "block", width: "auto", list: [
                            {type: "button", name: "edit", value: "Salveaza mesaj"},

                        ],
                          }



                    ],
                    actions: {
                        onButtonClick: [

                            {id:"edit",action:"screens.edit_msg.functions.editMesaj()"},

                        ]
                    }
                }

            ]

        }
    }
];
functions={


    onInitComplete:function () {
        fe=this.ids.form;
    },

    editMesaj: function () {

             fe = screens.edit_msg.ids.form_edit_id;
             fe.send('php/load_ora.php',function (loader) {

                     data=parseLoadData(loader);
                     screens.edit_msg.ids.edit_msg_id.close();
                     screens.home.functions.loadRequests();
        });


    }
};
actions={
    onInitComplete:"screens.edit_msg.functions.onInitComplete.call(screens.edit_msg)"
}