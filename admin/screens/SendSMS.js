data=[
    {
        type: "window",
        id: "edit_msg_id",
        data: {
            left: 0, top: 0,
            width: window.dhx4.screenDim().right - 40 > 600 ? 600 : window.dhx4.screenDim().right - 40,
            height: window.dhx4.screenDim().bottom - 40 > 600 ? 500 : window.dhx4.screenDim().bottom - 40,
            text: "Adaugare mesaj nou",
            header: true, center: true, modal: true, resize: true, park: false,
            items: [


                {
                    type: "grid",
                    id: 'grid_mesaje_curente',
                    data: {
                        init: {
                            setImagePath: "codebase/imgs/",
                            setHeader: "MESAJ, CIF ,DATA_TRIMITERE",
                            setColTypes: "ro,ed,ed",
                            setColAlign: "left,center,center",
                            setColSorting: "str,str,str",
                            setInitWidths: "*,100,100",
                            setColumnMinWidth: "150,100,100",
                            attachHeader: "#text_filter,#text_filter,#select_filter",
                            setColumnHidden:[[0,false]],
                            enableRowsHover:[true,'"hover"']
                        }
                    },
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
        window.dhx4.ajax.query({
            method:"GET",
            url:"php/load_ora.php?op=sendSMS",
            //data:JSON.stringify(obj),
            async:true,
            callback:function(loader){
            },
            headers:{
                "Content-type":"application/json"
            }
        })
        var vargridin = screens.SendSMS.ids.grid_mesaje_curente;
        vargridin.load('php/load_ora.php?op=getSendSMS', 'json');
    },

};
actions={
    onInitComplete:"screens.SendSMS.functions.onInitComplete.call(screens.SendSMS)"
}