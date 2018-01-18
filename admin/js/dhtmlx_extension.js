var DOM = {
    insertAfter:function(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    remove:function(element){
         if (element)
            element.parentNode.removeChild(element);
    }
};

function _succes(title,msg){
    dhtmlx.alert({
        title:title,
        type:"alert",
        icon:"icons/Good.png",
        text:msg
    });
}
function _error(title,msg){
    dhtmlx.alert({
        title:title,
        type:"alert-error",
        icon:"icons/Error.png",
        text:msg
    });
}

dhtmlXAccordionCell.prototype.setText = function (a) {
    this.conf.text = a;
    if (this.cell.childNodes[this.conf.idx.hdr].firstChild.className=="dhx_cell_hdr_icon")
        this.cell.childNodes[this.conf.idx.hdr].children[1].innerHTML = "<span>" + a + "</span>";
    else this.cell.childNodes[this.conf.idx.hdr].firstChild.innerHTML = "<span>" + a + "</span>";
};

dhtmlXGridObject.prototype.countRowsWith = function(cell,value){
    r=0
    this.forEachRow(function(id){
        if (this.cells(id,cell).getValue()==value) r++;
    })
    return r;
}
dhtmlXGridObject.prototype.sumColumn=function(col) {
    grid=this;
    var out = 0;
    for (var i = 0; i < grid.getRowsNum(); i++) {
        val=parseFloat(grid.cells2(i, col).getValue());
        out +=isNaN(val)?0:val;
    }
    return out;
}


/*dhtmlXGridObject.prototype._parseHeadJson = function (s) {

    if (!s.head || !s.head.length) {
        return
    }
    var a = s.head;
    var h = s.settings;
    var n = "setInitWidths";
    var q = false;
    if (h && h.colwidth == "%") {
        n = "setInitWidthsP"
    }
    if (h && h.splitat == "%") {
        q = h.splitat
    }
    if (this.hdr.rows.length > 0) {
        this.clearAll(true)
    }
    var o = [[], [], [], [], [], [], []];
    var r = ["value", "width", "type", "align", "sort", "hidden", "id"];
    var v = ["", n, "setColTypes", "setColAlign", "setColSorting", "", "setColumnIds"];
    for (var m = 0; m < a.length; m++) {
        for (var l = 0; l < r.length; l++) {
            o[l].push(a[m][r[l]])
        }
    }
    this.setHeader(o[0]);
    for (var m = 0; m < v.length; m++) {
        if (v[m]) {
            this[v[m]](o[m].join(this.delim))
        }
    }
    for (var m = 0; m < a.length; m++) {
        var u = a[m].options;
        if (a[m].options) {
            if (this.cellType[m] == "clist") {
                this.registerCList(m, u)
            } else {
                var c = this.getCombo(m);
                for (var l = 0; l < u.length; l++) {
                    c.put(u[l].id, u[l].value)
                }
            }
        }
    }
    this.init();
    var g = o[5].join(this.delim);
    if (this.setColHidden && g.replace(/,/g, "") != "") {
        this.setColHidden(g)
    }
    if ((q) && (this.splitAt)) {
        this.splitAt(q)
    }
};
dhtmlXGridObject.prototype._process_json = function (data, mode) {
    // debugger;
    this._parsing = true;
    var data = data.responseText || data;
    if (typeof data == "string") {
        try{
            eval("dhtmlx.temp=" + data + ";");
        }
        catch (e){
            _error('Eroare incarcare date',data);
            this.callEvent("onDataReady", []);
            return;
        }
        data = dhtmlx.temp
    }
    if (mode == "js") {
        if (data.data) {
            data = data.data
        }
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var id = row.id || (i + 1);
            this.rowsBuffer.push({idd: id, data: row, _parser: this._process_js_row, _locator: this._get_js_data});
            this.rowsAr[id] = data[i]
        }
    }
    else {
        if (data !== null){
            if (data.head) {
                this._parseHeadJson(data)
            }
            if (!!data.userdata) {
                var k=Object.keys(data.userdata);
                for(var j = 0;j<k.length;j++){
                    this.setUserData("",k[j],data.userdata[k[j]]);
                }
            }
            for (var i = 0; i < data.rows.length; i++) {
                var id = data.rows[i].id;
                this.rowsBuffer.push({idd: id, data: data.rows[i], _parser: this._process_json_row, _locator: this._get_json_data});
                if (!!data.rows[i].userdata){
                    var k=Object.keys(data.rows[i].userdata);
                    for(var j = 0;j<k.length;j++){
                        this.setUserData(id,k[j],data.rows[i].userdata[k[j]]);
                    }
                }
                this.rowsAr[id] = data.rows[i]
            };
            if (data.dhx_security) {
                dhtmlx.security_key = data.dhx_security;
            }
        }

    }

    this.callEvent("onDataReady", []);
    this.render_dataset();
    this._parsing = false
}
dhtmlXGridObject.prototype._processAllArrays = function (r, a, q) {
    var m = ["hdrLabels", "initCellWidth", "cellType", "cellAlign", "cellVAlign", "fldSort", "columnColor", "_hrrar", "_c_order"];
    if (this.cellWidthPX.length) {
        m.push("cellWidthPX")
    }
    if (this.cellWidthPC.length) {
        m.push("cellWidthPC")
    }
    if (this._col_combos) {
        m.push("_col_combos")
    }
    if (this._mCols) {
        m[m.length] = "_mCols"
    }
    if (this.columnIds) {
        m[m.length] = "columnIds"
    }
    if (this._maskArr) {
        m.push("_maskArr")
    }
    if (this._drsclmW) {
        m.push("_drsclmW")
    }
    if (this._RaSeCol) {
        m.push("_RaSeCol")
    }
    if (this._hm_config) {
        m.push("_hm_config")
    }
    if (this._drsclmn) {
        m.push("_drsclmn")
    }
    if (this.clists) {
        m.push("clists")
    }
    if (this._validators && this._validators.data) {
        m.push(this._validators.data)
    }
    m.push("combos");
    if (this._customSorts) {
        m.push("_customSorts")
    }
    if (this._aggregators) {
        m.push("_aggregators")
    }
    var o = (r <= a);
    if (!this._c_order) {
        this._c_order = new Array();
        var g = this._cCount;
        for (var n = 0; n < g; n++) {
            this._c_order[n] = n
        }
    }
    for (var n = 0; n < m.length; n++) {
        var s = this[m[n]] || m[n];
        if (s) {
            if (o) {
                var c = s[r];
                for (var h = r; h < a; h++) {
                    s[h] = s[h + 1]
                }
                s[a] = c
            } else {
                var c = s[r];
                for (var h = r; h > (a + 1); h--) {
                    s[h] = s[h - 1]
                }
                s[a + 1] = c
            }
            if (q) {
                if (q[n]==null) s.splice(a + (o ? 0 : 1));
                else s[a + (o ? 0 : 1)] = q[n]
            }
        }
    }
};
dhtmlXGridObject.prototype._processAllRows = function (l, a, c) {

    this[l](this.obj.rows[0], a, c, 0);
    var h = this.hdr.rows.length;
    for (var g = 0; g < h; g++) {
        this[l](this.hdr.rows[g], a, c, g)
    }
    if (this.ftr) {
        var h = this.ftr.firstChild.rows.length;
        for (var g = 0; g < h; g++) {
            this[l](this.ftr.firstChild.rows[g], a, c, g)
        }
    }
    this.forEachRow(function (m) {
        if (this.rowsAr[m] && this.rowsAr[m].tagName == "TR") {
            this[l](this.rowsAr[m], a, c, -1)
        }
    })
};*/
/*dhtmlXGridObject.prototype._sub_row_render.grid=function (a, e, h, g) {
    h._sub_grid = new dhtmlXGridObject(e);
    if (a.skin_name) {
        h._sub_grid.setSkin(a.skin_name)
    }
    h._sub_grid.parentGrid = a;
    h._sub_grid.imgURL = a.imgURL;
    h._sub_grid.iconURL = a.iconURL;
    h._sub_grid.enableAutoHeight(true);
    h._sub_grid._delta_x = h._sub_grid._delta_y = null;
    h._sub_grid.attachEvent("onGridReconstructed", function () {
        a._detectHeight(e, h, h._sub_grid.objBox.scrollHeight + h._sub_grid.hdr.offsetHeight + (this.ftr ? this.ftr.offsetHeight : 0));
        a._correctMonolite();
        this.setSizes();
        if (a.parentGrid) {
            a.callEvent("onGridReconstructed", [])
        }
    });
    if (!a.callEvent("onSubGridCreated", [h._sub_grid, h.parentNode.idd, h._cellIndex, g])) {
        h._sub_grid.objBox.style.overflow = "hidden";
        h._sub_row_type = null
    } else {
        h._sub_grid.load(g, function () {
            a._detectHeight(e, h, h._sub_grid.objBox.scrollHeight + h._sub_grid.hdr.offsetHeight + (h._sub_grid.ftr ? h._sub_grid.ftr.offsetHeight : 0));
            h._sub_grid.objBox.style.overflow = "hidden";
            a._correctMonolite();
            h._sub_row_type = null;
            if (!a.callEvent("onSubGridLoaded", [h._sub_grid, h.parentNode.idd, h._cellIndex, g])) {
                return
            }
            if (a._ahgr) {
                a.setSizes()
            }
        },'json')
    }
}
dhtmlXGridObject.prototype._process_json = function (data, mode) {
    this._parsing = true;
    try {
        var data = data.responseText || data;
        if (typeof data == "string") {
            if (data == 'null') {
                data = {rows: []};
            }
            else {
                eval("dhtmlx.temp=" + data + ";");
                data = dhtmlx.temp
            }

        }
    } catch (e) {
        dhx.callEvent("onLoadXMLError", ["Incorrect JSON", (data.xmlDoc || data), this]);
        data = {rows: []}
    }
    if (this._refresh_mode) {
        return this._refreshFromJSON(data)
    }

    if (data.head) {

        this._parseHeadJson(data)
    }
    var cr = parseInt(data.pos || 0);
    var total = parseInt(data.total_count || 0);
    var reset = false;
    if (total) {
        if (!this.rowsBuffer[total - 1]) {
            if (this.rowsBuffer.length) {
                reset = true
            }
            this.rowsBuffer[total - 1] = null
        }
        if (total < this.rowsBuffer.length) {
            this.rowsBuffer.splice(total, this.rowsBuffer.length - total);
            reset = true
        }
    }
    var userdata = mode === "js" ? data.userdata : data;
    for (var key in userdata) {
        if (mode === "js" || key != "rows") {
            this.setUserData("", key, userdata[key])
        }
    }
    if (mode == "js" && data.collections) {
        for (var colkey in data.collections) {
            var index = this.getColIndexById(colkey);
            var colrecs = data.collections[colkey];
            if (index !== window.undefined) {
                if (this.cellType[index] == "clist") {
                    colplaindata = [];
                    for (var j = 0; j < colrecs.length; j++) {
                        colplaindata.push(colrecs[j].label)
                    }
                    this.registerCList(index, colplaindata)
                } else {
                    var combo = this.getCombo(index);
                    for (var j = 0; j < colrecs.length; j++) {
                        combo.put(colrecs[j].value, colrecs[j].label)
                    }
                }
            }
        }
    }
    if (this.isTreeGrid()) {
        return this._process_tree_json(data, null, null, mode)
    }
    if (mode == "js") {
        if (data.data) {
            data = data.data
        }
        for (var i = 0; i < data.length; i++) {
            if (this.rowsBuffer[i + cr]) {
                continue
            }
            var row = data[i];
            var id = row.id || (i + 1);
            this.rowsBuffer[i + cr] = {idd: id, data: row, _parser: this._process_js_row, _locator: this._get_js_data};
            this.rowsAr[id] = data[i]
        }
    }
    else {
        for (var i = 0; i < data.rows.length; i++) {
            if (this.rowsBuffer[i + cr]) {
                continue
            }
            var id = data.rows[i].id;
            this.rowsBuffer[i + cr] = {
                idd: id,
                data: data.rows[i],
                _parser: this._process_json_row,
                _locator: this._get_json_data
            };
            this.rowsAr[id] = data.rows[i]
        }
    }
    this.callEvent("onDataReady", []);
    if (reset && this._srnd) {
        var h = this.objBox.scrollTop;
        this._reset_view();
        this.objBox.scrollTop = h
    }
    else {
        this.render_dataset()
    }
    this._parsing = false
};
dhtmlXGridObject.prototype.serializeJSON = function(from_column,to_column,rowsName,userdata){
    if (!from_column) from_column=0;
    if (!to_column) to_column=this.getColumnsNum();
    if (!rowsName) rowsName='rowa';
    this._serJson={}
    if (!!userdata) this._serJson.data=userdata;
    this._serJson[rowsName]=[];
    this._serJson.row={};
    this.forEachRow(function(rid){
        this.forEachCell(rid,function(cell,idx){
            if (idx>=from_column && idx<=to_column)
                cell.grid._serJson.row['c'+idx]=cell.getValue();
       });
        this._serJson[rowsName].push(this._serJson.row);
        this._serJson.row={};
   });
    delete(this._serJson.row);
    var json=JSON.stringify(this._serJson);
    this._serJson=null;
    return json;

}
dhtmlXGridObject.prototype._processAllArrays = function (q, a, o) {
    var h = ["hdrLabels", "initCellWidth", "cellType", "cellAlign", "cellVAlign", "fldSort", "columnColor", "_hrrar", "_c_order"];
    if (this.cellWidthPX.length) {
        h.push("cellWidthPX")
    }
    if (this.cellWidthPC.length) {
        h.push("cellWidthPC")
    }
    if (this._col_combos) {
        h.push("_col_combos")
    }
    if (this._mCols) {
        h[h.length] = "_mCols"
    }
    if (this.columnIds) {
        h[h.length] = "columnIds"
    }
    if (this._maskArr) {
        h.push("_maskArr")
    }
    if (this._drsclmW) {
        h.push("_drsclmW")
    }
    if (this._RaSeCol) {
        h.push("_RaSeCol")
    }
    if (this._hm_config) {
        h.push("_hm_config")
    }
    if (this._drsclmn) {
        h.push("_drsclmn")
    }
    if (this.clists) {
        h.push("clists")
    }
    if (this._validators && this._validators.data) {
        h.push(this._validators.data)
    }
    h.push("combos");
    if (this._customSorts) {
        h.push("_customSorts")
    }
    if (this._aggregators) {
        h.push("_aggregators")
    }
    var n = (q <= a);
    if (!this._c_order) {
        this._c_order = new Array();
        var e = this._cCount;
        for (var m = 0; m < e; m++) {
            this._c_order[m] = m
        }
    }
    for (var m = 0; m < h.length; m++) {
        var r = this[h[m]] || h[m];
        if (r) {
            if (n) {
                var c = r[q];
                for (var g = q; g < a; g++) {
                    r[g] = r[g + 1]
                }
                r[a] = c
            } else {
                var c = r[q];
                for (var g = q; g > (a + 1); g--) {
                    r[g] = r[g - 1]
                }
                r[a + 1] = c
            }
            //debugger;
            if (o) {
                if (o[m]==null) {
                    delete(r[a + (n ? 0 : 1)]);
                    r.length--;
                }
                else r[a + (n ? 0 : 1)] = o[m]
            }
        }
    }
};
dhtmlXGridObject.prototype._get_json_data = function (c, a) {
    if (typeof c.data[a] == "object") {
        if (c.data[a]=== null) return "";
        return c.data[a].value
    } else {
        return c.data[a]
    }
};
dhtmlXGridObject.prototype.setFilterPlaceholder = function(cell,text){
    var elem=this.filters[cell][0];
    elem.placeholder=text;
    //$(elem).placeholder();
    return true;
};*/
dhtmlXGridObject.prototype.resetFilters = function(){
    if (!!this.filters){
        for(var i=0;i<this.filters.length;i++){
            if (!!this.filters[i][0]) {
                this.filters[i][0].old_value="";
                this.filters[i][0].value="";
            }
        }
        this.filterBy(0,"");
    }
};
dhtmlXGridObject.prototype._process_json = function (data, mode) {
    this._parsing = true;
    try {
        var data = data.responseText || data;
        if (typeof data == "string") {
            if (data == 'null') {
                data = {rows: []};
            }
            else {
                eval("dhtmlx.temp=" + data + ";");
                data = dhtmlx.temp
            }

        }
    } catch (e) {
        dhx4.callEvent("onLoadXMLError", ["Incorrect JSON", (data.xmlDoc || data), this]);
        data = {rows: []}
    }
    if (this._refresh_mode) {
        return this._refreshFromJSON(data)
    }

    if (data.head) {

        this._parseHeadJson(data)
    }
    var cr = parseInt(data.pos || 0);
    var total = parseInt(data.total_count || 0);
    var reset = false;
    if (total) {
        if (!this.rowsBuffer[total - 1]) {
            if (this.rowsBuffer.length) {
                reset = true
            }
            this.rowsBuffer[total - 1] = null
        }
        if (total < this.rowsBuffer.length) {
            this.rowsBuffer.splice(total, this.rowsBuffer.length - total);
            reset = true
        }
    }
    var userdata = mode === "js" ? data.userdata : data;
    for (var key in userdata) {
        if (mode === "js" || key != "rows") {
            this.setUserData("", key, userdata[key])
        }
    }
    if (mode == "js" && data.collections) {
        for (var colkey in data.collections) {
            var index = this.getColIndexById(colkey);
            var colrecs = data.collections[colkey];
            if (index !== window.undefined) {
                if (this.cellType[index] == "clist") {
                    colplaindata = [];
                    for (var j = 0; j < colrecs.length; j++) {
                        colplaindata.push(colrecs[j].label)
                    }
                    this.registerCList(index, colplaindata)
                } else {
                    var combo = this.getCombo(index);
                    for (var j = 0; j < colrecs.length; j++) {
                        combo.put(colrecs[j].value, colrecs[j].label)
                    }
                }
            }
        }
    }
    if (this.isTreeGrid()) {
        return this._process_tree_json(data, null, null, mode)
    }
    if (mode == "js") {
        if (data.data) {
            data = data.data
        }
        for (var i = 0; i < data.length; i++) {
            if (this.rowsBuffer[i + cr]) {
                continue
            }
            var row = data[i];
            var id = row.id || (i + 1);
            this.rowsBuffer[i + cr] = {idd: id, data: row, _parser: this._process_js_row, _locator: this._get_js_data};
            this.rowsAr[id] = data[i]
        }
    }
    else {
        if (!!data.rows )for (var i = 0; i < data.rows.length; i++) {
            if (this.rowsBuffer[i + cr]) {
                continue
            }
            var id = data.rows[i].id;
            this.rowsBuffer[i + cr] = {
                idd: id,
                data: data.rows[i],
                _parser: this._process_json_row,
                _locator: this._get_json_data
            };
            this.rowsAr[id] = data.rows[i]
        }
    }
    this.callEvent("onDataReady", []);
    if (reset && this._srnd) {
        var h = this.objBox.scrollTop;
        this._reset_view();
        this.objBox.scrollTop = h
    }
    else {
        this.render_dataset()
    }
    this._parsing = false
};
dhtmlXGridObject.prototype._process_tree_json = function (g, h, c, m) {
    this._parsing = true;
    var a = false;
    if (!h) {
        this.render_row = this.render_row_tree;
        a = true;
        h = g;
        c = h.parent || 0;
        if (c == "0") {
            c = 0
        }
        if (!this._h2) {
            this._h2 = this._createHierarchy()
        }
        if (this._fake) {
            this._fake._h2 = this._h2
        }
    }
    if (m == "js") {
        if (h.data && !c) {
            g = h.data
        }
        if (h.rows) {
            h = h.rows
        }
        for (var e = 0; e < h.length; e++) {
            var n = h[e].id;
            var l = this._h2.add(n, c);
            l.buff = {idd: n, data: h[e], _parser: this._process_js_row, _locator: this._get_js_data};
            if (h[e].open) {
                l.state = "minus"
            }
            this.rowsAr[n] = l.buff;
            if (h.rows[e].userData){
                var us_dat=h.rows[e].userData;
                var us_k=Object.keys(us_dat);
                for(us_i=0;us_i<us_k.length;us_i++)
                    this.setUserData(h.rows[e].id,us_k[us_i],us_dat[us_k[us_i]]);
            }
            this._process_tree_json(h[e], h[e], n, m)
        }
    } else {
        if (h.rows) {
            for (var e = 0; e < h.rows.length; e++) {
                var n = h.rows[e].id;
                var l = this._h2.add(n, c);
                l.buff = {idd: n, data: h.rows[e], _parser: this._process_json_row, _locator: this._get_json_data};
                if (h.rows[e].open) {
                    l.state = "minus"
                }
                this.rowsAr[n] = l.buff;
                if (h.rows[e].userData){
                    var us_dat=h.rows[e].userData;
                    var us_k=Object.keys(us_dat);
                    for(us_i=0;us_i<us_k.length;us_i++)
                        this.setUserData(h.rows[e].id,us_k[us_i],us_dat[us_k[us_i]]);
                }
                this._process_tree_json(h.rows[e], h.rows[e], n, m)
            }
        }
    }
    if (a) {
        if (c != 0) {
            this._h2.change(c, "state", "minus")
        }
        this._updateTGRState(this._h2.get[c]);
        this._h2_to_buff();
        this.callEvent("onDataReady", []);
        if (c != 0 && (this._srnd || this.pagingOn)) {
            this._renderSort()
        } else {
            this.render_dataset()
        }
        if (this._slowParse === false) {
            this.forEachRow(function (o) {
                this.render_row_tree(0, o)
            })
        }
        this._parsing = false;
        if (c != 0 && !this._srnd) {
            this.callEvent("onOpenEnd", [c, 1])
        }
    }
};
dhtmlXGridObject.prototype._pgn_createToolBar = function () {
    this.aToolBar = new dhtmlXToolbarObject({
        parent: this._pgn_parentObj,
        skin: (this._pgn_skin_tlb || this.skin_name),
        icons_path: this.imgURL
    });
    if (!this._WTDef) {
        this.setPagingWTMode(true, true, true, true)
    }
    var g = this;
    this.aToolBar.attachEvent("onClick", function (h) {
        h = h.split("_");
        switch (h[0]) {
            case"leftabs":
                g.changePage(1);
                break;
            case"left":
                g.changePage(g.currentPage - 1);
                break;
            case"rightabs":
                g.changePage(99999);
                break;
            case"right":
                g.changePage(g.currentPage + 1);
                break;
            case"perpagenum":
                if (h[1] === this.undefined) {
                    return
                }
                g.rowsBufferOutSize = parseInt(h[1]);
                g.changePage();
                g.aToolBar.setItemText("perpagenum", h[1] + " " + g.i18n.paging.perpage);
                break;
            case"pages":
                if (h[1] === this.undefined) {
                    return
                }
                g.changePage(h[1]);
                g.aToolBar.setItemText("pages", g.i18n.paging.page + h[1]);
                break
        }
    });
    if (this._WTDef[0]) {
        this.aToolBar.addButton("leftabs", NaN, null, "ar_left_abs.gif", "ar_left_abs_dis.gif");
        this.aToolBar.addButton("left", NaN, null, "ar_left.gif", "ar_left_dis.gif")
    }
    if (this._WTDef[1]) {
        this.aToolBar.addText("results", NaN, this.i18n.paging.results);
        this.aToolBar.setWidth("results", "150");
        this.aToolBar.disableItem("results")
    }
    if (this._WTDef[0]) {
        this.aToolBar.addButton("right", NaN, null, "ar_right.gif", "ar_right_dis.gif");
        this.aToolBar.addButton("rightabs", NaN, null, "ar_right_abs.gif", "ar_right_abs_dis.gif")
    }
    if (this._WTDef[2]) {
        if (this.aToolBar.conf.skin == "dhx_terrace") {
            this.aToolBar.addSeparator()
        }
        this.aToolBar.addButtonSelect("pages", NaN, "select page", [], "paging_pages.gif", null, false, true)
    }
    var a;
    if (a = this._WTDef[3]) {
        if (this.aToolBar.conf.skin == "dhx_terrace") {
            this.aToolBar.addSeparator()
        }
        this.aToolBar.addButtonSelect("perpagenum", NaN, "select size", [], "paging_rows.gif", null, false, true);
        if (typeof a != "object") {
            a = [50, 100, 200, 300, 500]
        }
        var c = {dhx_skyblue: 4, dhx_web: 0, dhx_terrace: 18}[this.aToolBar.conf.skin];
        for (var e = 0; e < a.length; e++) {
            this.aToolBar.addListOption("perpagenum", "perpagenum_" + a[e], NaN, "button", "<span style='padding: 0px " + c + "px 0px 0px;'>" + a[e] + " " + this.i18n.paging.perpage + "</span>", "paging_page.gif")
        }
    }
    return this.aToolBar
};
dhtmlXGridObject.prototype._in_header_stat_count_distinct=function(tag,index,data){
    var calck=function(){
        var dist=[];
        for(var i=0;i<this.rowsBuffer.length;i++){
            if (dist.indexOf(this.cellById(this.rowsBuffer[i].idd,index).getValue())<0) dist.push(this.cellById(this.rowsBuffer[i].idd,index).getValue());
        }
        return dist.length;
    }
    this._stat_in_header(tag,calck,index,data);
};
dhtmlXGridObject.prototype.getColTotal=function(index){
    index=parseInt(index);
    if (isNaN(index)) return;
    if (index<this.getColumnsNum()){
        t=0;
        this.forEachRow(function(id){
            val=parseFloat(this.cells(id,index).getValue());
            if (!isNaN(val))t+=val;
        })
    }
    return t;
}
dhtmlXGridObject.prototype.serializeJSON = function(from_column,to_column,rowsName,userdata){
    if (!from_column) from_column=0;
    if (!to_column) to_column=this.getColumnsNum();
    if (!rowsName) rowsName='rowa';
    this._serJson={}
    if (!!userdata) this._serJson.data=userdata;
    this._serJson[rowsName]=[];
    this._serJson.row={};
    this.forEachRow(function(rid){
        this.forEachCell(rid,function(cell,idx){
            if (idx>=from_column && idx<=to_column)
                cell.grid._serJson.row['c'+idx]=cell.getValue();
        });
        this._serJson[rowsName].push(this._serJson.row);
        this._serJson.row={};
    });
    delete(this._serJson.row);
    var json=JSON.stringify(this._serJson);
    this._serJson=null;
    return json;

}
dhtmlXGridObject.prototype.serializeJSONLoad = function(from_column,to_column){
    if (!from_column) from_column=0;
    if (!to_column) to_column=this.getColumnsNum();
    this._serJson={}
    this._serJson['rows']=[];
    this._serJson.row={};
    this.forEachRow(function(rid){
        this._serJson.row.id=rid;
        this._serJson.row.data=[]
        this.forEachCell(rid,function(cell,idx){
            if (idx>=from_column && idx<=to_column)
                cell.grid._serJson.row.data.push(cell.getValue());
        });
        this._serJson['rows'].push(this._serJson.row);
        this._serJson.row={};
    });
    delete(this._serJson.row);
    var json=JSON.stringify(this._serJson);
    this._serJson=null;
    return json;
}
dhtmlXGridObject.prototype.serializeJSONSimple = function(from_column,to_column,rowsName,userdata){
    if (!from_column) from_column=0;
    if (!to_column) to_column=this.getColumnsNum();
    if (!rowsName) rowsName='rows';
    this._serJson={};
    if (!!userdata) this._serJson.data=userdata;
    this._serJson[rowsName]=[];
    this._serJson.row=[];
    this.forEachRow(function(rid){
        this.forEachCell(rid,function(cell,idx){
            if (idx>=from_column && idx<=to_column)
                cell.grid._serJson.row.push(cell.getValue());
        });
        this._serJson[rowsName].push(this._serJson.row);
        this._serJson.row=[];
    });
    delete(this._serJson.row);
    var json=JSON.stringify(this._serJson);
    this._serJson=null;
    return json;
}
dhtmlXGridObject.prototype.rowsWhitValue = function(cInd,value) {
    var rows=[];
    this.forEachRow(function(id){
        if (this.cells(id,cInd).getValue()===value) rows.push(id);
    });
    return rows;
}
dhtmlXGridObject.prototype.countDistinctValues=function(cInd){

    values=this.collectValues(cInd);
    var obj=[];
    for(i=0;i<values.length;i++){
        obj.push({value:values[i],count:this.rowsWhitValue(cInd,values[i]).length})
    }
    return obj;
}

function eXcell_price2(a) {
    this.base = eXcell_ed;
    this.base(a);
    this.getValue = function () {
        //debugger;
        return this.cell.childNodes.length > 1 ? this.cell.childNodes[1].innerHTML.toString()._dhx_trim() : parseInt(this.cell.childNodes[0].innerHTML.replace(/\,/g,''));
    }
}
eXcell_price2.prototype = new eXcell_ed;
eXcell_price2.prototype.setValue = function (a) {
    isNaN(parseFloat(a)) && (a = this.val || 0);

    a=this.setCValue("<span style='padding-right:2px;'>" + a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  + "</span>", a)

};

function eXcell_procent(cell){ //the eXcell name is defined here
    if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){};  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; };
    this.setValue=function(val){
        this.setCValue(val+" %",val);
    };
    this.getValue=function(){
        return parseFloat(this.cell.innerHTML); // get button label
    };
}
eXcell_procent.prototype = new eXcell;



dhtmlXToolbarObject.prototype.inputToSelect = function(item,width,id){
    i=this.getInput(item);
    select = document.createElement("select");
    if (typeof id == 'string') select.id=id;
    select.style.width = (width?width:200)+"px";
    select.className='dhxtoolbar_input dhxtoolbar_select';
    DOM.insertAfter(select,i);
    DOM.remove(i);
};
dhtmlXToolbarObject.prototype.getSelect=function(item){
    return  typeof  item =="string"?this.getInput(item):item;
}
dhtmlXToolbarObject.prototype.selectClear=function(item){
    item=typeof  item =="string"?this.getInput(item):item;

    var l= item.options.length
    for (i = 0; i < l; i++) {
        select.options[0] = null;
    }
};
dhtmlXToolbarObject.prototype.selectAddItem = function (item,value,text){
    select=typeof  item =="string"?this.getInput(item):item;
    option = document.createElement("option");
    option.setAttribute("value",value);
    option.innerHTML = text;
    select.appendChild(option);
};
dhtmlXToolbarObject.prototype.selectLoad = function(item,url,type,postFunc,point,value,text,clearBeforeLoad){
    select=typeof  item =="string"?this.getInput(item):item;
    if (typeof clearBeforeLoad == 'undefined') clearBeforeLoad=true;
    if (clearBeforeLoad) this.selectClear(item);
    if (typeof type=="undefined"|| typeof type=="function") {postFunc=type;type='json';}
    if (typeof url == "string" && type=='json'){
        var loader = window.dhx.ajax.getSync(url);
        if (loader.xmlDoc.status==200){
            obj=JSON.parse(loader.xmlDoc.responseText);
            obj=point?eval('obj.'+point):obj;
            k=Object.keys(obj);
            for(i=0;i< k.length;i++){
                option = document.createElement("option");
                option.setAttribute("value", value?eval('obj[k[i]].'+value):obj[k[i]].value);
                option.innerHTML = text?eval('obj[k[i]].'+text):obj[k[i]].text;
                select.appendChild(option);
            }
        }
        if (typeof  postFunc == "function" ) postFunc();
    }
};
dhtmlXToolbarObject.prototype.selectSetValue = function(item,value){
    this.getSelect(item).value=value;
}
dhtmlXToolbarObject.prototype.selectGetSelecteText=function(item){
    return this.getSelect(item).options[this.getSelect(item).selectedIndex].firstChild.data
};
dhtmlXToolbarObject.prototype.selectGetSelectedValue=function(item){
    return this.getSelect(item).options[this.getSelect(item).selectedIndex].value
};
dhtmlXToolbarObject.prototype.selectAttachEvent = function(item,event,func){
    dhtmlxEvent(this.getSelect(item), event, func);
}
dhtmlXToolbarObject.prototype.inWindowToBottom=function(){

    cont=$(this._masterCell.base).children();
    tool=cont[0];
    cont=cont[cont.length-1];
    tool.id='aaa';
    cont.id='bbb';
    $(tool).insertAfter(cont);

};
dhtmlXToolbarObject.prototype.getButton = function(item){
    return this.objPull[this.idPrefix+item].obj;
};
dhtmlXToolbarObject.prototype.serialize= function(){
    var objs=Object.keys(this.objPull);
    var s='';
    for(var i=0;i<objs.length;i++){
        if (this.objPull[objs[i]].type=='buttonInput')
            s+=this.objPull[objs[i]].obj.idd+'='+encodeURIComponent(this.getValue(this.objPull[objs[i]].obj.idd))+'&'
    }
    s+='_nd='+window.dhx.newId();
    return s;
};


// used for buttonSelectGroup
dhtmlXToolbarObject.prototype.setAllInGroup = function (group,state){
    var objs=Object.keys(this.objPull);
    for(var i=0;i<objs.length;i++){

        if (this.objPull[objs[i]].group == group) {
            this.setItemState(this.objPull[objs[i]].obj.idd,state);
        }
    }
    return ;
};
dhtmlXToolbarObject.prototype.getItemGroup = function (id){
    return this.objPull[this.idPrefix+id].group;
};
dhtmlXToolbarObject.prototype.getGroupSelected = function(group){

    var objs=Object.keys(this.objPull);
    for(var i=0;i<objs.length;i++){
        if (this.objPull[objs[i]].group == group && this.objPull[objs[i]].obj.pressed) {
            return this.objPull[objs[i]].obj.idd;
        }
    }
    return false;
}
// end  used for buttonSelectGroup

dhtmlXToolbarObject.prototype.getAllItemsIDs = function (type){
    var objs=Object.keys(this.objPull);
    var s=[];
    for(var i=0;i<objs.length;i++){
        if (type) {
            if (this.objPull[objs[i]].type == type)
            {
                s.push(this.objPull[objs[i]].obj.idd);
            }

        } else s.push(this.objPull[objs[i]].obj.idd);
    }
    return s;
};


dhtmlXToolbarObject.prototype.inputToCalendar = function(item,readonly){
    item=typeof  item =="string"?this.getInput(item):item;
    cal = new dhtmlXCalendarObject(item);
    cal.setDateFormat("%Y-%m-%d");
    cal.hideTime();
    item.calendar=cal;
    if (readonly) item.readOnly=true;
    return cal;

};


dhtmlXForm.prototype.setSelectToLOV=function(item,lov){
    if (typeof lov=='string') lov=lov.split(",");
    if (typeof lov=='object')lov=lov[0].split(",");
    var selectobject=this.getSelect(item);
    for (var i=0; i<selectobject.length; i++){
        if (lov.indexOf(selectobject.options[i].value) == -1 )
        {selectobject.remove(i);i=-1;}
    };
};
dhtmlXForm.prototype.setSelectFromLOV=function(item,lov){
    name=item;
    item=typeof  item =="string"?this.getSelect(item):item;
    this.selectClear(item);
    l_lov=Object.keys(lov);
    for(i=0;i<l_lov.length;i++) {
        this.addToSelect(item,l_lov[i],lov[l_lov[i]]);
    }
    item.selectedIndex =0;
};
dhtmlXForm.prototype.addToSelect = function (item,value,text){
    select=typeof  item =="string"?this.getSelect(item):item;
    option = document.createElement("option");
    option.setAttribute("value",value);
    option.innerHTML = text;
    select.appendChild(option);
    return option;
};

dhtmlXForm.prototype.setMask = function (id,mask) {
    if (typeof this.userMask== "undefined") this.userMask=new Array();
    if (typeof this.userMask[id] == 'undefined')
    {
        $(this.doWithItem(id, "getInput")).mask(mask);
        this.userMask[id]=1;
    }
};
dhtmlXForm.prototype.hasMask = function(id){ if (typeof  this.userMask != 'undefined' ) return this.userMask[id]==1?true:false; else return false};
dhtmlXForm.prototype.allowDigitsOnly=function(id,allow_dot,digits_number){
    $(this.doWithItem(id, "getInput")).keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110,190]) !== -1 || // pentru punct adauga  190 in lista
                // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything

            if ($.inArray(e.keyCode,[110,190])!==-1 ) {

                if (arguments[0].target.value.count(".")>=allow_dot) e.preventDefault();
                else return;
            }
            else return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {

            e.preventDefault();
        }
        else {
            if (typeof digits_number=='undefined' || !digits_number ) digits_number=0;
            if (digits_number-1<arguments[0].target.value.length) e.preventDefault();

        }
    });
}

/*dhtmlXForm.prototype.loadJSON = function(url,postFunc,path){
    this.callEvent("onXLS", []);
    var loader = window.dhx.ajax.getSync(url);
    data=window.dhx.s2j(loader.xmlDoc.responseText);
    if (typeof path != 'undefined'){
        try {
            data=eval('data.'+path);
        }
        catch(err) {
            postFunc(data,this,err);
            return null;
        }
    }
   // debugger;
    this.setFormData(data);
    if (typeof postFunc=="function")postFunc(data,this);
    this.callEvent("onXLE", []);
    return data;

}*/
dhtmlXForm.prototype.loadJSON = function(url,postFunc,path,force_json_header){
    force_json_header=force_json_header||false;
    if (arguments.length==2 && typeof arguments[1]!='function') path=arguments[1];
    this.callEvent("onXLS", []);

    var f=this;
    var o = function(loader) {
        if (loader.xmlDoc.status==200){
            data = window.dhx4.s2j(loader.xmlDoc.responseText);
            fulldata=data;
            if (!!(typeof path != 'undefined' && path)) {
                try {

                    data = eval('data.' + path);
                }
                catch (err) {
                    postFunc.call(f,data, f, err,fulldata);
                    return null;
                }
            }
            //console.log(data);
            f.setFormData(data);
            if (typeof postFunc == "function")postFunc.call(f,data, f,null,fulldata);
            f.callEvent("onXLE", []);
        }
        else postFunc.call(f,null, f,loader.xmlDoc.status+' - '+loader.xmlDoc.statusText,null);

    };
    if (!force_json_header) var loader = window.dhx4.ajax.get(url,o);
    else var loader=window.dhx4.ajax.query({
        method:"get",
        url:url,
        async:true,
        callback:o,
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json; charset=UTF-8"
            //,'Access-Control-Request-Headers':"content-type"
        }
    });

    return ;

}
dhtmlXForm.prototype.sendJSON = function (link,func) {
    var data=this.serializeJSON();
    window.dhx.ajax._call('POST_JSON',link,data,true,func);

};

dhtmlXForm.prototype.selectClear=function(item){
    item=typeof  item =="string"?this.getSelect(item):item;
    l= item.options.length
    for (i = 0; i < l; i++) {
        item.options[0] = null;
    }
};
dhtmlXForm.prototype.selectGetSelectedText=function(item){
    item=typeof  item =="string"?this.getSelect(item):item;
    return item.options[item.selectedIndex].firstChild.data
}
dhtmlXForm.prototype.reloadOptionsJSON=function(item,url,postFunc,point,value,text,all){
    select=typeof  item =="string"?this.getSelect(item):item;
    this.selectClear(item);
    var f=this;
    var o = function(loader){
        if (loader.xmlDoc.status==200){
            var obj=JSON.parse(loader.xmlDoc.responseText);
            obj=point?eval('obj.'+point):obj;
            k=Object.keys(obj);
            if (all){
                option = document.createElement("option");
                all=all.split(":");
                option.setAttribute("value",all[0]);
                option.innerHTML = all[1];
                select.appendChild(option);
            }
            for(i=0;i< k.length;i++){
                option = document.createElement("option");
                option.setAttribute("value", value?eval('obj[k[i]].'+value):obj[k[i]].value);
                option.innerHTML = text?eval('obj[k[i]].'+text):obj[k[i]].text;
                select.appendChild(option);
            }
        }
        if (typeof  postFunc == "function" ) postFunc(f);
    }
    var loader = window.dhx.ajax.get(url,o);

};
/*dhtmlXForm.prototype.reloadOptionsJSON=function(item,url,postFunc,point,value,text,all){
    select=typeof  item =="string"?this.getSelect(item):item;
    this.selectClear(item);
    var loader = window.dhx.ajax.getSync(url);
    if (loader.xmlDoc.status==200){
        var obj=JSON.parse(loader.xmlDoc.responseText);
        obj=point?eval('obj.'+point):obj;
        k=Object.keys(obj);
        if (all){
            option = document.createElement("option");
            all=all.split(":");
            option.setAttribute("value",all[0]);
            option.innerHTML = all[1];
            select.appendChild(option);
        }
        for(i=0;i< k.length;i++){
            option = document.createElement("option");
            option.setAttribute("value", value?eval('obj[k[i]].'+value):obj[k[i]].value);
            option.innerHTML = text?eval('obj[k[i]].'+text):obj[k[i]].text;
            select.appendChild(option);
        }
    }
    if (typeof  postFunc == "function" ) postFunc(this);
};*/
dhtmlXForm.prototype.serialize = function () {
    if ( !this.validate()) return false;

    var l = this.getFormData(true);
    var j = [];
    for (var g in l) {
        j.push(g + "=" + encodeURIComponent(l[g]))
    }
   return j.join("&");
}
dhtmlXForm.prototype.serializeJSON = function () {
    if ( !this.validate()) return false;

    var l = this.getFormData(true);
    var j = [];
    for (var g in l) {
       /* if (l[g].trim().length>0)*/
        j.push('"'+g + '":"' + l[g].addSlashes()+'"')
    }
    return "{"+j.join(",")+"}";
}

dhtmlXForm.prototype.serializeArray = function () {
    if ( !this.validate()) return false;

    var l = this.getFormData(true);
    var j = [];
    for (var g in l) {
        if (l[g].trim().length>0) j[g]=l[g].addSlashes();
    }
    return j;

    //return eval("{"+j.join(",")+"}");
}

dhtmlXForm.prototype.setValidateCss = function (a, n, m) {
    var l = this[this.getItemType(a) == "radio" ? "_getRGroup" : "_getItemByName"](a);
    if (!l) {
        return
    }
    if (l._vcss != null) {
        this._resetValidateCss(l)
    }
    l._vcss = (typeof(m) == "string" ? m : "validate_" + (n === true ? "ok" : "error"));
    l.className += " " + l._vcss
};
dhtmlXForm.prototype.resetValidateCss = function (m) {
    for (var l in this.itemPull) {
        if (this.itemPull[l]._vcss != null) {
            this._resetValidateCss(this.itemPull[l])
        }
        if (this.itemPull[l]._list != null) {
            for (var n = 0; n < this.itemPull[l]._list.length; n++) {
                this.itemPull[l]._list[n].resetValidateCss()
            }
        }
    }
};

dhtmlXForm.prototype.getButton = function(id){
    return this._getItemByName(id).firstChild;
}

dhtmlXForm.prototype.items.image.setValue=function (e, h) {
    console.log('aaa');
    e._value = (h == null ? "" : h);
    if (!e._value || e._value==="") return;
    var c = e._url + (e._url.indexOf("?") >= 0 ? "&" : "?") + "action=loadImage&itemId=" + encodeURIComponent(e._idd) + "&itemValue=" + encodeURIComponent(e._value) + window.dhx4.ajax._dhxr("&");
    var g = e.childNodes[e._ll ? 1 : 0].childNodes[0].firstChild;
    if (g.nextSibling.tagName.toLowerCase() == "img") {
        g.nextSibling.src = c
    } else {
        var a = document.createElement("IMG");
        a.className = "dhxform_image_img";
        a.style.visibility = "hidden";
        a.onload = function () {
            this.style.visibility = "visible";
            this.parentNode.removeChild(this.nextSibling);
            this.onload = this.onerror = null
        };
        a.onerror = function () {
            this.onload.apply(this, arguments);
            this.style.visibility = "hidden"
        };
        g.parentNode.insertBefore(a, g);
        a.src = c;
        a = null;
        this.adjustImage(e)
    }
    g = null
}

function format_note(name,value){
    return "<div class='note_template'>"+value+"</div>";
}

dhtmlXPopup.prototype.showTo=function(obj){
    if (this.isVisible()) this.hide();
    var x = window.dhx.absLeft(obj);
    var y = window.dhx.absTop(obj);
    var w = obj.offsetWidth;
    var h = obj.offsetHeight;
    this.show(x, y, w, h);
}

/*
//daca vrei sa copiezi proprietati/functii de la alte obiecte
(function () {
    for (var c in {
        doAddLabel: 1,
        doAddInput: 1,
        destruct: 1,
        doUnloadNestedLists: 1,
        setText: 1,
        getText: 1,
        enable: 1,
        disable: 1,
        isEnabled: 1,
        setWidth: 1,
        setFocus: 1
    }) {
        dhtmlXForm.prototype.items.validateError[c] = dhtmlXForm.prototype.items.select[c]
    }
})(); */

dhtmlxValidation.isValidNumeric=function(a){
    return !!a.toString().match(/(^-?\d\d*[\.]\d*$)|(^-?\d\d*$)|(^-?[\.]\d\d*$)/)
};
dhtmlxValidation.isValidDate= function (a) {
    a=window.dhx.date2str(a, '%Y-%m-%d');
    var c = a.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return c && !!(c[1] <= 9999 && c[2] <= 12 && c[3] <= 31) || false
}

/*dhtmlXSideBar.prototype.hideSide=function(){
    //debugger;
    this._width=this.side.offsetWidth;
    for(i=this._width;i>2;i=i-2)
    {
        this.setSideWidth(i);
    }
}*/

dhtmlXSideBar.prototype._markActive=function(item){
    if (typeof this.activeStream == "undefined") this.activeStream=new Array();
    if (this.activeStream.length>0)
        if (this.activeStream[this.activeStream.length-1]!=item) this.activeStream.push(item);
        else;
    else this.activeStream.push(item);

}
dhtmlXSideBar.prototype._removeFromStream= function(item){
    this.activeStream.remove(item);
    if (typeof screens[item] == 'object')
            delete(screens[item]);
}

dhtmlXSideBar.prototype._setItemActive = function (g, c) {
    this._markActive(g);
    if (this.conf.selected == g) {
        return
    }
    if (typeof(c) == "undefined") {
        c = false
    }
    if (c == true && this.callEvent("onBeforeSelect", [g, this.conf.selected]) !== true) {
        return
    }
    var a = null;
    if (this.conf.selected != null) {
        a = this.conf.selected;
        this._setItemInactive(this.conf.selected)
    }
    if (this.t[g] != null) {
        this.conf.selected = g;
        this.t[g].selected = true;
        this.t[g].item.className += " dhxsidebar_item_selected";
        this.t[g].cell.cell.style.visibility = "visible";
        this.t[g].cell.cell.style.top = "0px";
        this.t[g].cell.cell.style.zIndex = 1
    } else {
        this.conf.selected = null
    }
    this._adjustCell(g);
    if (c == true) {
        this.callEvent("onSelect", [g, a])
    }
};

dhtmlXSideBar.prototype._set_close_button=function(item){

    var close_button=this.t[item].item.querySelector(".dhxsidebar_close_button");

    close_button.style.display="";
    close_button.sideBarParent=new Object();
    close_button.sideBarParent.sideBar=this;
    close_button.sideBarParent.id=item;
    close_button.sideBarParent.onCloseSelectItem=this.t[item].onClosSelectItem;
    dhtmlxEvent (close_button, "click", function(){
        var sideBarParent=this.sideBarParent?this.sideBarParent:arguments[0].srcElement.sideBarParent;
        sideBarParent.sideBar._removeFromStream(sideBarParent.id);
        var  goTo=sideBarParent.onClosSelectItem!=null?sideBarParent.onCloseSelectItem:sideBarParent.sideBar.activeStream[sideBarParent.sideBar.activeStream.length-1];
        sideBarParent.sideBar.items(sideBarParent.id).remove(goTo);
    });
}

dhtmlXSideBar.prototype.closeable = function(item,status,selectItem){

   if(typeof selectItem == 'undefined') selectItem=null;
   if (!status) {
       this.t[item].item.querySelector(".dhxsidebar_close_button").style.display="none";
       this.t[item].closeable=false;
   }
   else {
       this.t[item].closeable=true;
       this.t[item].onClosSelectItem=selectItem;
       this._set_close_button(item)
   }
}

dhtmlXSideBar.prototype._setItemText = function (j, g) {
    if (this.t[j] != null) {
        for (var c in g) {
            this.t[j].init[c] = g[c]
        }
        this.t[j].init.icons_path = this.conf.icons_path;
        this.t[j].item.innerHTML = window.dhx.template(this.conf.tpl_str, this.t[j].init)
        if (typeof this.t[j].closeable != 'undefined')
            if (!!this.t[j].closeable){
                    this._set_close_button(j);
            }
    }
};
dhtmlXSideBarCell.prototype.setMenu = function (menu){
    var nd=document.createElement('div');
    nd.className='dhx_cell_sidebar_hdr_menu_icon';
    nd.cell=this;
    DOM.insertAfter(nd,this.cell.firstChild.firstChild);
    this.headerMenu=menu;
    //menu.addContextZone(nd);
    dhtmlxEvent(nd,'click',function(ev){
        var a = (ev.target || ev.srcElement);
        var x = window.dhx.absLeft(a);
        var y = window.dhx.absTop(a);
        var w = a.offsetWidth;
        var h = a.offsetHeight;
        var menu=a.cell.headerMenu;
        if (menu.checkEvent('onBeforeContextMenu')) menu.callEvent('onBeforeContextMenu');
        menu.showContextMenu(x+w-2, y+h-1);
        ev.stopPropagation();
    })
};
dhtmlXSideBarCell.prototype.setNewMenu = function (menu){
    this.headerMenu=menu;
}


dhtmlXSideBar.prototype.templates.two_lines = "<img class='dhxsidebar_item_icon' src='#icons_path##icon#' border='0'>"+
    "<span class='dhxsidebar_close_button'  border='0' style='display: none'  ></span>"+
"<div class='dhxsidebar_item_text #enable_progress#'>"+
"<div>#text#</div>"+
"<div class='line_progress'><div class='filled_progress' style='width:#width#px;'></div></div>"+
"<div class='line_two'>#text2#</div>"+
"</div>";

dhtmlXCombo.prototype.loadSyncJson=function(url,json_node,op_value,op_text){
    if (!url) return;
    if (!json_node) json_node='options';
    if (!op_value) op_value='value';
    if (!op_text) op_text='text';
    var loader=window.dhx.ajax.getSync(encodeURI(url));
    var err=false;
    if (loader.xmlDoc.status==200 ) {
        try {
            var res = JSON.parse(loader.xmlDoc.responseText);
            res=eval('res.'+json_node);
        }
        catch (e) {
            err = true;
        }
        if (!err) {

            prod_data={options:[]}
            for(var i=0;i<res.length;i++)prod_data.options.push({text:eval('res[i].'+op_text),value:eval('res[i].'+op_value)})
            this.load(prod_data);
        }

    }
};
dhtmlXCombo.prototype.loadAsyncJson=function(url,json_node,op_value,op_text,callBack){
    if (!url) return;
    if (!json_node) json_node='options';
    if (!op_value) op_value='value';
    if (!op_text) op_text='text';

    var f=this;
    var o = function(loader){
        var err=false;
        var res_data=[];
        if (loader.xmlDoc.status==200 ) {

            try {
                var res = JSON.parse(loader.xmlDoc.responseText);
                if (res.Produse_client!==null)  res_data=eval('res.'+json_node);
            }
            catch (e) {
                err = true;
            }
            if (!err) {
                //if (res.)
                prod_data={options:[]};
                for(var i=0;i<res_data.length;i++)prod_data.options.push({text:eval('res_data[i].'+op_text),value:eval('res_data[i].'+op_value)})
                f.load(prod_data);
                if (typeof callBack == 'function') callBack(f,prod_data);
            }

        }
    };
    window.dhx.ajax.kerberosAuth.setReqAuth(true);
    window.dhx.ajax.get(encodeURI(url),o);

};
dhtmlXCombo.prototype.allwaysSelect=function(){
    this._confirmSelect = function (g, a ) {
        var c = true;
        if (typeof(a) == "undefined") {
            a = true
        }
        if (this.conf.f_server_tm) {
            window.clearTimeout(this.conf.f_server_tm)
        }
        if (this.conf.last_hover != null) {
            c = c || (this.conf.last_value != this._getOptionValue(this.conf.last_hover));
            this.conf.last_match = this.conf.last_selected = this.conf.last_hover;
            this.conf.last_value = this._getOptionValue(this.conf.last_selected);
            this.conf.last_text = this.base.firstChild.value = this.t[this.conf.last_selected].obj.getText(this.t[this.conf.last_selected].item, true);
            this.conf.f_server_last = this.base.firstChild.value.toLowerCase();
            this.base.childNodes[1].value = this.conf.last_value;
            this.base.childNodes[2].value = "false"
        } else {
            if (this.conf.allow_free_text || (this.base.firstChild.value == "" && this.conf.allow_empty_value)) {
                c = c || (this.conf.last_text != this.base.firstChild.value);
                this.conf.last_match = this.conf.last_value = this.conf.last_selected = null;
                this.conf.last_text = this.base.firstChild.value;
                this.conf.f_server_last = this.base.firstChild.value.toLowerCase();
                this.base.childNodes[1].value = this.conf.last_text;
                this.base.childNodes[2].value = "true"
            } else {
                this._cancelSelect();
                this._updateTopImage(this.conf.last_selected);
                return
            }
        }
        if (this.conf.f_ac && this.conf.f_mode == "start") {
            this.conf.f_ac_text = "";
            if (g != "blur") {
                this._selectRange(this.base.firstChild.value.length, this.base.firstChild.value.length)
            }
        }
        if (a) {
            this._hideList()
        }
        if (c == true && g != "onInit" && g != "onDelete") {
            this.callEvent("onChange", [this.conf.last_value, this.conf.last_text])
        }
    };
};
dhtmlXCombo.prototype.setComboText = function (a,unselect) {
    //debugger;
    if (typeof unselect == 'undefined') unselect=true;
    if (this.conf.allow_free_text != true) {
        return
    }
    if (unselect) this.unSelectOption();
    this.conf.last_text = this.base.firstChild.value = a;
    this.conf.f_server_last = this.base.firstChild.value.toLowerCase()
};
dhtmlXCombo.prototype.uncheckAll = function(){
    var checked=this.getChecked();
    for(i=0;i<checked.length;i++){
        this.setChecked(this.getIndexByValue(checked[i]),false);
    }
}
dhtmlXCombo.prototype.checkAll = function(){
    var checked=Object.keys(this.t);
    for(i=0;i<checked.length;i++){
        this.setChecked(this.getIndexByValue(this.t[checked[i]].item._conf.value),true);
    }
}


dhtmlXCellObject.prototype.progressOn = function (id,text) {
    if (!this.loadCount) this.loadCount=[];
    this.loadCount[id]=text;
    if (this.conf.progress == true) {
        text_box=this.cell.getElementsByClassName('dhx_cell_prtext')[0];
        text_box.innerHTML=this.loadCount.join("<br>");
        return;
    }
    this.conf.progress = true;
    var c = document.createElement("DIV");
    c.className = this.conf.idx_data.pr1;
    var a = document.createElement("DIV");
    if (this.conf.skin == "material" && (window.dhx4.isFF || window.dhx4.isChrome || window.dhx4.isOpera || window.dhx4.isEdge)) {
        a.className = this.conf.idx_data.pr3;
        a.innerHTML = '<svg class="dhx_cell_prsvg" viewBox="25 25 50 50"><circle class="dhx_cell_prcircle" cx="50" cy="50" r="20"/></svg><div class="dhx_cell_prtext"></div>'
    } else {
        a.className = this.conf.idx_data.pr2
    }
    text_box=a.getElementsByClassName('dhx_cell_prtext')[0];
    text_box.innerHTML=text;
    if (this.conf.idx.cover != null) {
        this.cell.insertBefore(a, this.cell.childNodes[this.conf.idx.cover])
    } else {
        this.cell.appendChild(a)
    }
    this.cell.insertBefore(c, a);
    c = a = null;
    this._updateIdx();
    this._adjustProgress()
};
dhtmlXCellObject.prototype.progressOff = function (id) {
    if (!!id ) {
        delete this.loadCount[id];
    }
    if (!!this.loadCount && Object.keys(this.loadCount).length>0) {
        text_box=this.cell.getElementsByClassName('dhx_cell_prtext')[0];
        text_box.innerHTML=this.loadCount.join("<br>");
        return false;
    }

    for (var c in {pr3: 3, pr2: 2, pr1: 1}) {
        var e = this.cell.childNodes[this.conf.idx[c]];
        if (e != null) {
            e.parentNode.removeChild(e)
        }
        e = null
    }
    this.conf.progress = false;
    this._updateIdx()
};



window.dhx.Base64 = {

// private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

// public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

// private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

// private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

window.dhx.ajax.BasicAUTH={
    user:"",
    pass:"",
    key: "", //"c29hX3Rlc3QyOlF3ZXIxMjMk"
    req:false,
    autoDisable:true,
    setCredentials:function(user,pass){
        this.user=user;
        this.pass=pass;
    },
    setAutoDisable:function(status){
        if (!status )this.autoDisable=true;
        else this.autoDisable=false;
    },
    setReqAuth:function(status){
        if (!!status) {
            this.key=window.dhx.Base64.encode(window.dhx.ajax.BasicAUTH.user + ":" + window.dhx.ajax.BasicAUTH.pass);
            this.req=true;
        }
        else this.req=false;
    }
};
window.dhx.ajax.kerberosAuth={
    req:false,
    autoDisable:true,
    setReqAuth:function(status){
        if (!!status)  this.req=true;
        else this.req=false;
    }
};
window.dhx.ajax.Headers=[];
window.dhx.ajax._call= function (a, c, g, l, n, r, j) {
    // a = post metod (post,get,put,post_json)
    // c = link endpoint
    // g = data
    // l = true-async, false - sync
    // n = callback function
    //NProgress.start();
    var q = (window.XMLHttpRequest && !dhx.isIE ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
    var m = (navigator.userAgent.match(/AppleWebKit/) != null && navigator.userAgent.match(/Qt/) != null && navigator.userAgent.match(/Safari/) != null);
    if (l == true) {
        q.onreadystatechange = function () {
          //  NProgress.inc();
            if ((q.readyState == 4) || (m == true && q.readyState == 3)) {
               // NProgress.done();
                if (q.status != 200 || q.responseText == "") {
                    if (!dhx.callEvent("onAjaxError", [q])) {
                        return
                    }
                }
                window.setTimeout(function () {
                    if (typeof(n) == "function") {
                        n.apply(window, [
                            {xmlDoc: q, filePath: c, async: l}
                        ])
                    }
                    if (r != null) {
                        if (typeof(r.postData) != "undefined") {
                            dhx.ajax.postLong(r.url, r.postData, n)
                        } else {
                            dhx.ajax.getLong(r.url, n)
                        }
                    }
                    n = null;
                    q = null
                }, 1)
            }
        }

    }
    if (a == "GET" && this.cache != true) {
        c += (c.indexOf("?") >= 0 ? "&" : "?") + "dhxr" + new Date().getTime() + "=1"
    }

    q.open(a, c, l);

    if (j != null) {
        var o =Object.keys(j);
        for (var _i=0;_i< o.length;_i++) {
            q.setRequestHeader(o[_i], j[o[_i]])
        }
    } else {
        if (a == "POST" || a == "PUT" || a == "DELETE") {
            q.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        }
        else{
            if (a == "GET") {
                g = null
            }
        }
    }
    if (!! this.BasicAUTH.req){
       q.setRequestHeader("Authorization", "Basic "+this.BasicAUTH.key);//"Basic " + Base64.encode(this.autorization.user + ":" + this.autorization.pass));
        if (!! this.BasicAUTH.autoDisable) this.BasicAUTH.req=false;
    }
    if ((!!this.kerberosAuth.req)&& (_isFF || _isChrome)) {
        q.withCredentials=true;
        if (!! this.kerberosAuth.autoDisable) this.kerberosAuth.req=false;
    }
    if (this.Headers.length>0){
        for(var i=0;i<this.Headers.length;i++)
            q.setRequestHeader(this.Headers[i].key,this.Headers[i].value);
        this.Headers=[];
    }
    try {
        q.send(g);
       // NProgress.set(0.4);
    }

    catch (e) {
       if (q.status!=1223) console.log(e);   // 1223 = 204 - No content
    }
    if (l == false) {
        //NProgress.done();
    }
    return{xmlDoc: q, filePath: c, async: l}
};



function isCNP(value){
    var szCod = value;
    var nTotal = 0;
    var nRet = false;
    if ( szCod.length == 13 ){
        nTotal  = (szCod.charCodeAt(0)-48)*2+(szCod.charCodeAt(1)-48)*7+(szCod.charCodeAt(2)-48)*9;
        nTotal += (szCod.charCodeAt(3)-48)*1+(szCod.charCodeAt(4)-48)*4+(szCod.charCodeAt(5)-48)*6;
        nTotal += (szCod.charCodeAt(6)-48)*3+(szCod.charCodeAt(7)-48)*5+(szCod.charCodeAt(8)-48)*8;
        nTotal += (szCod.charCodeAt(9)-48)*2+(szCod.charCodeAt(10)-48)*7+(szCod.charCodeAt(11)-48)*9;

        nTotal = nTotal % 11;

        if (nTotal == 10)   nTotal = 1;
        if (nTotal == szCod.charCodeAt(12)-48)  nRet = true;

    }
    return nRet;

}
function isCUI(Cod){
    //validare cod fiscal maxim 10
        try
        {
            if (Cod==null)  return 0;
            var szCod = '';
            szCod = Cod.toUpperCase();
            var Result = 0;
            var nTotal = 0;
            var nRet = false;
            if ( szCod.length <= 10  && szCod.length>=1)
            {
                var szCodNew = '';
                var nPad = 10-szCod.length;
                if (nPad>0)
                {
                    for (;nPad>0;nPad--)    if (nPad-1>=0)  szCodNew += '0';
                    szCodNew += szCod;
                }
                nTotal  = (szCodNew.charCodeAt(0)-48)*7+(szCodNew.charCodeAt(1)-48)*5+(szCodNew.charCodeAt(2)-48)*3;
                nTotal += (szCodNew.charCodeAt(3)-48)*2+(szCodNew.charCodeAt(4)-48)*1+(szCodNew.charCodeAt(5)-48)*7;
                nTotal += (szCodNew.charCodeAt(6)-48)*5+(szCodNew.charCodeAt(7)-48)*3+(szCodNew.charCodeAt(8)-48)*2;
                nTotal = nTotal*10 % 11;
                if (nTotal == 10)   nTotal = 0;
                if (nTotal == szCodNew.charCodeAt(9)-48)    nRet = true;

            }
            return nRet;
        }
        catch(e){debugApp(e.message);}



}
function isCUIorCNP(value){
    return isCNP(value)||isCUI(value);
}

function isCUIorCNP2(value){
    if (wind.isWindow('add_object')){
        w=wind.window('add_object');
        type= w.propietari.pop.myForm.getItemValue('TIP_PROPRIETAR');
    }
    else {
        type=myPop1.add_pop.myForm.getItemValue('TIP_PROPRIETAR');
    }
    if (type=='PF' && !isCNP(value)) return false;
    if (type=='PJ' && !isCUI(value)) return false;
    return true;
}


function ValidMobile(nr){
    if (nr.length!=10) return false;
    if (nr!=nr.replace(/[^0-9]+/g, '')) return false;
    if (nr.substr(0,1)!='0') return false;
    return true;

}


