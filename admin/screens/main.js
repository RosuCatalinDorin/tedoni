/**
 * Created by Paul.Sas on 14/06/2017.
 */
data=[
     {
        type:"sidebar",
        id:"sidebar",
        data:{
            template:"two_lines",
            icons_path:'icons/',
            width:215,
            header:true,
            autohide: true,
            items:[
                {id: "home", text: "Programari active",text2:"", enable_progress: "disable_progress", icon: "calendar.png",selected:true},
                {id: "Programari_inactive", text: "Programari inactive",text2:"", enable_progress: "disable_progress", icon: "Trash_bw.png"},
                {id: "Adauga_programari", text: "Adauga Programari",text2:"", enable_progress: "disable_progress", icon: "Trash_bw.png"},
                {id: "Adauga_angajat", text: "Adauga Angajat",text2:"", enable_progress: "disable_progress", icon: "Client.png"},
                {id: "Adauga_servicii", text: "Adauga Servicii",text2:"", enable_progress: "disable_progress", icon: "Address Book.png"},

                {type: "separator"},
                {id: "deconectare", text: "Deconectare",text2:"", enable_progress: "disable_progress", icon: "Exit.png"},
                {id: "test", text: "Test",text2:"", enable_progress: "disable_progress", icon: "Exit.png"}

            ]
        },
        actions:{
            "onSelect":"screens.main.functions.onTabSelected.apply(this,arguments)"
            }

    }
];
functions={
    onInitComplete:function(){
    main.cells('a').hideHeader();

        var a =  main.cells('a').attachToolbar();
        a.addButton('test', 'auto', 'Test','icons/Actions-plus-icon.png');
        a.addButton('test', 'auto', 'Test');
        a.addButton('test', 'auto', 'Test');
        a.addButton('test', 'auto', 'Test');
        a.addButton('test', 'auto', 'Test');


        initScreen(this.ids.sidebar.cells('home'),'home');

    },
    onTabSelected:function(id, lastId,cell){
        if (id=='logout'){
            screens.main.functions.doLogout();
            this.items(lastId).setActive();
            return;
        }
        if (!screens[id]) initScreen(this.cells(id),id);

        //this.hideSide();
    },
    removeItem:function(item){

        var s = screens['main'].ids.sidebar;
        s._removeFromStream(item);
        s.items(item).remove(s.activeStream[s.activeStream.length-1]);

    }

};
actions={
    onInitComplete:"screens.main.functions.onInitComplete.call(screens.main)"
}