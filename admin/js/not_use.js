m.attachEvent('onClick', function (id) {
    if (id == 'bulkRequst')initScreen(screens['main'].functions.initCell('bulkRequest', 'Emitere carduri bulk', '0 cereri incarcate', '', 0, 'Excel-icon.png', true), 'bulkRequest');
    if (id == 'borderouDaily')cell = screens['main'].functions.initCell('borderouDaily', 'Borderou zilnic', '0 cereri incarcate', '', 0, 'evolution-tasks2.png', true);
    window.dhx4.ajax.cache = true;
    cell.attachURL('http://rap01cj001/ReportServer/Pages/ReportViewer.aspx?%2fRaportInstallment_CIF%2fReport_Installment_CIF_CLINET&rs:Command=Render');
    ;
})