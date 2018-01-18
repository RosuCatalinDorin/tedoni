// noinspection JSAnnotator
data=[
    {parent : "rb",
        icons_path : "../../../samples_common/ribbon/",
        arrows_mode: "auto",
        tabs: [
            { //1st tab
                id: "tab_id",
                text: "Ribbon tab 1",
                items: []
            },
            { //2nd tab
                id: "tab_id2",
                text: "Ribbon_tab 2",
                items: [
                    {type:"block", text:"Group 1", text_pos: "bottom", mode:"cols",
                        list:[                                  //1st block
                            {type:"button", text:"New"},        //1st row, 1st item
                            {type:"button", text:"Open"},       //1st row, 2nd item
                            {type:"button", text:"Save"},       //1st row, 3rd item
                            {type:"newLevel"},                  //moves down into a new row
                            {type:"button", text:"Edit"},       //2nd row, 1st item
                        ]},
                    {type:"block", text:"Group 2", text_pos:"bottom",
                        list:[{
                            //2nd block
                        }]}
                ]
            }
        ]
    }
];
functions={
    submitForm:function () {
        obj={

            "op":"shop",

        };
        screens.requestID.ids.requestID.progressOn('rangeValidated','Salvez confirmarea plajelor');
        window.dhx.ajax.query({
            method:"GET",
            url:"php/load.php",
            data:JSON.stringify(obj),
            async:true,
            callback:function(loader){
                

            },
            headers:{
                "Content-type":"application/json"
            }
        })
    }

},
actions={

}