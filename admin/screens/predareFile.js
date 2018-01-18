data=[
    {
        type: "window",
        id: "predareFile",
        data: {
            left: 0, top: 0,
            width: window.dhx4.screenDim().right - 40 > 1000 ? 1000 : window.dhx4.screenDim().right - 40,
            height: window.dhx4.screenDim().bottom - 40 > 900 ? 900 : window.dhx4.screenDim().bottom - 40,
            text: "Predare instrumente de debit ...",
            header: true, center: true, modal: true, resize: true, park: false,
            items: [
                {
                    type: "form",
                    id: 'form',
                    data: [
                        {type: "settings", position: "label-top", labelWidth: 180, inputWidth: 180},
                        {type:"hidden",name:"ALLOWED_FILES",value:""}
                        ]
                }
            ]
        }
    }
];
functions={

};
actions={

}