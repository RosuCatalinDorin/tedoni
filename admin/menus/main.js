data=[

    {id:"t1", text:"Operatiuni", img:"Favorites-icon.png" ,items:[
        //{id:"bulkRequst", text:"Emitere carduri bulk",img:"Excel-icon.png"},

    ]},
    {id:"raps",text:"Rapoarte",img:"line_chart256.png"},
    {id:"docs",text:"Formulare",img:"Printer.png"},
    {id:"admin",text:"Administrare",img:"Run-icon.png",hidden:true},
    {id:"project",text:"Plan de proiect",img:"project-plan.png",hidden:true},
    {id:"help",text:"Ajutor",img:"Help.png",items:[
        {id:"manual",text:"Manual de utilizare",img:"Address Book.png"},
        {id:"contact",text:"Contacteaza echipa de suport",img:"Pre-Mail-icon.png"}
        ]}


];
actions={
    "onClick":[
        {id:"contact",action:"window.location.href ='mailto:paul.sas@btrl.ro'"},
        {id:"manual",action:"popup('help/Manual de utilizare House Of Cards.pdf')"},
        {id:"project",action:"initScreen(screens['main'].functions.initCell('project','Plan de proiect','','',0,'project-plan.png',true),'project')"}


    ]
};