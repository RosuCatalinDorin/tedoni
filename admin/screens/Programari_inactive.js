data=[
    {type:"layout",id:"layout",data:{
        pattern: "1C",
        cells: [
            {id: "a", header: false,items:[

                {
                    type: "grid",
                    id: "gridInactive",
                    data: {
                        init: {
                            setImagePath: "codebase/imgs/",
                            setHeader: "ID MSG, MESAJ,DATA ACTIVARII, DATA MODIFICARII, MODIFIER ID, STATUS",
                            setColTypes: "ro,ro,ro,ro,ro,ro",
                            setColAlign: "centre,center,center",
                            setColSorting: "str,str,str,str,str,str",
                            setInitWidths: "80,*,200,200,80,80",
                            setColumnMinWidth: "80,500,200,200,80,80",
                            attachHeader: "#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",
                            setColumnHidden:(0,false),
                            enableRowsHover:[false,'"hover"']
                        }
                    },
                    actions:{
                        "onXLE":"",
                        "onBeforeContextMenu":"return screens.Programari_inactive.functions.setContextMenu.apply(this,arguments)"
                    }
                }
            ]}
        ]
    }
    },
    {type:"menu",id:"menu_inactive",
        context:true,
        data:[

            {id:"reload_mesaje_inactive",text:"Incarca lista de Programari_inactive",img:"Arrow-refresh-icon.png"}
        ],
        actions:{
            "onClick": [
                {id:"reload_mesaje_inactive",action:"screens.Programari_inactive.functions.loadRequests()"}

            ],
            "onBeforeContextMenu":"return screens.Programari_inactive.functions.setContextMenu.apply(this,arguments)"
        }
    }
];
functions= {
    onInitComplete: function () {
        var vargridin = screens.Programari_inactive.ids.gridInactive;
        vargridin.load('php/load_ora.php?op=getMesajeInactive', 'json');

        screens.main.ids.sidebar.cells('Programari_inactive').setMenu(screens.Programari_inactive.ids.menu_inactive);
        screens.Programari_inactive.ids.gridInactive.enableContextMenu(this.ids.menu_inactive);
        screens.Programari_inactive.ids.ids.menu_inactive.addContextZone(this.ids.gridInactive.objBox);
        screens.Programari_inactive.ids.functions.loadRequests();
    },
    loadRequests: function () {

        var vargrid = screens.Programari_inactive.ids.gridInactive;
        vargrid.load('php/load_ora.php?op=getMesajeInactive', 'json');

    },
    /*onGridXLE: function () {
        screens.main.ids.sidebar.cells('mesaje_inactive').setText({text2: this.getRowsNum() + ' cererei in lucru'})
        this.groupBy(5)
    },*/
    setContextMenu: function (id, ind, obj) {
        var menu = screens.Programari_inactive.ids.menu_inactive;
        var grid = screens.Programari_inactive.ids.gridInactive;
        if (!!obj) obj.selectRowById(id);
        else if (arguments.length > 0) grid.clearSelection();

        if (!grid.getSelectedRowId()) {
            menu.hideItem('open_client');
            menu.hideItem('detalii');
            menu.hideItem('sep1');
        }
        else {
            menu.showItem('open_client');
            menu.showItem('detalii');
            menu.showItem('sep1');
        }

        return true;
    },
    exportData: function () {
        screens.Programari_inactive.ids.grid.toExcel('codebase/grid-excel-php/generate.php');
    },
}
actions={
    onInitComplete:"screens.Programari_inactive.functions.onInitComplete.call(screens.mesaje_inactive)"
};