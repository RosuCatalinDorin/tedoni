/**
 * Created by Paul.Sas on 22/06/2015.
 */
function eXcell_sub_row(a) {
    if (a) {
        this.cell = a;
        this.grid = this.cell.parentNode.grid
    }
    this.getValue = function () {
        return this.grid.getUserData(this.cell.parentNode.idd, "__sub_row")
    };
    this._setState = function (c, g) {
        (g || this.cell).innerHTML = "<img src='" + this.grid.imgURL + c + "' width='18' height='18' />";
        (g || this.cell).firstChild.onclick = this.grid._expandMonolite
    };
    this.open = function () {
        this.cell.firstChild.onclick(null, true)
    };
    this.close = function () {
        this.cell.firstChild.onclick(null, false, true)
    };
    this.isOpen = function () {
        return !!this.cell.parentNode._expanded
    };
    this.setValue = function (c) {
        if (c) {
            this.grid.setUserData(this.cell.parentNode.idd, "__sub_row", c)
        }
        this._setState(c ? "plus.gif" : "blank.gif")
    };
    this.setContent = function (c) {
        if (this.cell.parentNode._expanded) {
            this.cell.parentNode._expanded.innerHTML = c;
            this.resize()
        } else {
            this.cell._previous_content = null;
            this.setValue(c);
            this.cell._sub_row_type = null
        }
    };
    this.resize = function () {
        this.grid._detectHeight(this.cell.parentNode._expanded, this.cell, this.cell.parentNode._expanded.scrollHeight)
    },
    this.isDisabled = function () {
        return true
    };
    this.getTitle = function () {
        return this.grid.getUserData(this.cell.parentNode.idd, "__sub_row") ? "click to expand|collapse" : ""
    }
}
eXcell_sub_row.prototype = new eXcell;
function eXcell_sub_row_ajax(a) {
    this.base = eXcell_sub_row;
    this.base(a);
    this.setValue = function (c) {
        if (c) {
            this.grid.setUserData(this.cell.parentNode.idd, "__sub_row", c)
        }
        this.cell._sub_row_type = "ajax";
        this.cell._previous_content = null;
        this._setState(c ? "plus.gif" : "blank.gif")
    }
}
eXcell_sub_row_ajax.prototype = new eXcell_sub_row;
function eXcell_sub_row_grid(a) {
    this.base = eXcell_sub_row;
    this.base(a);
    this.setValue = function (c) {
        if (c) {
            this.grid.setUserData(this.cell.parentNode.idd, "__sub_row", c)
        }
        this.cell._sub_row_type = "grid";
        this._setState(c ? "plus.gif" : "blank.gif")
    };
    this.getSubGrid = function () {
        if (!a._sub_grid) {
            return null
        }
        return a._sub_grid
    }
}
eXcell_sub_row_grid.prototype = new eXcell_sub_row;
dhtmlXGridObject.prototype._expandMonolite = function (a, u, m) {
    var g = this.parentNode;
    var v = g.parentNode;
    var q = v.grid;
    if (a || window.event) {
        if (!m && !v._expanded) {
            q.editStop()
        }
        (a || event).cancelBubble = true
    }
    var s = q.getUserData(v.idd, "__sub_row");
    if (!q._sub_row_editor) {
        q._sub_row_editor = new eXcell_sub_row(g)
    }
    if (!s) {
        return
    }
    if (v._expanded && !u) {
        q._sub_row_editor._setState("plus.gif", g);
        g._previous_content = v._expanded;
        q.objBox.removeChild(v._expanded);
        v._expanded = false;
        v.style.height = (v.oldHeight || 20) + "px";
        g.style.height = (v.oldHeight || 20) + "px";
        if (q._fake) {
            q._fake.rowsAr[v.idd].style.height = (v.oldHeight || 20) + "px";
            q._fake.rowsAr[v.idd].firstChild.style.height = (v.oldHeight || 20) + "px"
        }
        for (var l = 0; l < v.cells.length; l++) {
            v.cells[l].style.verticalAlign = "middle"
        }
        delete q._flow[v.idd];
        q._correctMonolite();
        v._expanded.ctrl = null
    } else {
        if (!v._expanded && !m) {
            q._sub_row_editor._setState("minus.gif", g);
            v.oldHeight = g.offsetHeight - 4;
            if (g._previous_content) {
                var r = g._previous_content;
                r.ctrl = g;
                q.objBox.appendChild(r);
                q._detectHeight(r, g, parseInt(r.style.height))
            } else {
                var r = document.createElement("DIV");
                r.ctrl = g;
                if (g._sub_row_type) {
                    q._sub_row_render[g._sub_row_type](q, r, g, s)
                } else {
                    r.innerHTML = s
                }
                r.style.cssText = "position:absolute; left:0px; top:0px; overflow:auto; font-family:Tahoma; font-size:8pt; margin-top:2px; margin-left:4px;";
                r.className = "dhx_sub_row";
                q.objBox.appendChild(r);
                q._detectHeight(r, g)
            }
            if (!q._flow) {
                q.attachEvent("onGridReconstructed", function () {
                    if ((this.pagingOn && !this.parentGrid) || this._srnd) {
                        this._collapsMonolite()
                    } else {
                        this._correctMonolite()
                    }
                });
                q.attachEvent("onResizeEnd", function () {
                    this._correctMonolite(true)
                });
                q.attachEvent("onAfterCMove", function () {
                    this._correctMonolite(true)
                });
                q.attachEvent("onDrop", function () {
                    this._correctMonolite(true)
                });
                q.attachEvent("onBeforePageChanged", function () {
                    this._collapsMonolite();
                    return true
                });
                q.attachEvent("onGroupStateChanged", function () {
                    this._correctMonolite();
                    return true
                });
                q.attachEvent("onFilterEnd", function () {
                    this._collapsMonolite()
                });
                q.attachEvent("onUnGroup", function () {
                    this._collapsMonolite()
                });
                q.attachEvent("onPageChanged", function () {
                    this._collapsMonolite()
                });
                q.attachEvent("onXLE", function () {
                    this._collapsMonolite()
                });
                q.attachEvent("onClearAll", function () {
                    for (var c in this._flow) {
                        if (this._flow[c] && this._flow[c].parentNode) {
                            this._flow[c].parentNode.removeChild(this._flow[c])
                        }
                    }
                    this._flow = []
                });
                q.attachEvent("onEditCell", function (w, n, x) {
                    if ((w !== 2) && this._flow[n] && this.cellType[x] != "ch" && this.cellType[x] != "ra") {
                        this._expandMonolite.apply(this._flow[n].ctrl.firstChild, [0, false, true])
                    }
                    return true
                });
                q.attachEvent("onCellChanged", function (x, n) {
                    if (!this._flow[x]) {
                        return
                    }
                    var w = this.cells(x, n).cell;
                    w.style.verticalAlign = "top"
                });
                q._flow = []
            }
            q._flow[v.idd] = r;
            q._correctMonolite();
            var o = q._srdh > 30 ? 11 : 3;
            if (q.multiLine) {
                o = 0
            }
            for (var l = 0; l < v.cells.length; l++) {
                v.cells[l].style.verticalAlign = "top"
            }
            if (q._fake) {
                var h = q._fake.rowsAr[v.idd];
                for (var l = 0; l < h.cells.length; l++) {
                    h.cells[l].style.verticalAlign = "top"
                }
            }
            v._expanded = r
        }
    }
    if (q._ahgr) {
        q.setSizes()
    }
    if (q.parentGrid) {
        q.callEvent("onGridReconstructed", [])
    }
    q.callEvent("onSubRowOpen", [v.idd, (!!v._expanded)])
};
dhtmlXGridObject.prototype._sub_row_render = {
    ajax: function (that, d, td, c) {
        d.innerHTML = "Loading...";
        dhx4.ajax.get(c, function (xml) {
            d.innerHTML = xml.xmlDoc.responseText;
            var z = xml.xmlDoc.responseText.match(/<script[^>]*>([^\f]+?)<\/script>/g);
            if (z) {
                for (var i = 0; i < z.length; i++) {
                    eval(z[i].replace(/<([\/]{0,1})s[^>]*>/g, ""))
                }
            }
            that._detectHeight(d, td);
            that._correctMonolite();
            that.setUserData(td.parentNode.idd, "__sub_row", xml.xmlDoc.responseText);
            td._sub_row_type = null;
            if (that._ahgr) {
                that.setSizes()
            }
            that.callEvent("onSubAjaxLoad", [td.parentNode.idd, xml.xmlDoc.responseText])
        })
    },
    grid: function (a, g, l, h) {

        l._sub_grid = new dhtmlXGridObject(g);
        if (a.skin_name) {
            l._sub_grid.setSkin(a.skin_name)
        }
        l._sub_grid.parentGrid = a;
        l._sub_grid.imgURL = a.imgURL;
        l._sub_grid.iconURL = a.iconURL;
        l._sub_grid.enableAutoHeight(true,200);
        l._sub_grid.enableAutoWidth(true);
        l._sub_grid._delta_x = l._sub_grid._delta_y = null;
        l._sub_grid.attachEvent("onGridReconstructed", function () {
            a._detectHeight(g, l, l._sub_grid.objBox.scrollHeight + l._sub_grid.hdr.offsetHeight + (this.ftr ? this.ftr.offsetHeight : 0));
            a._correctMonolite();
            this.setSizes();
            if (a.parentGrid) {
                a.callEvent("onGridReconstructed", [])
            }
        });
        if (!a.callEvent("onSubGridCreated", [l._sub_grid, l.parentNode.idd, l._cellIndex, h])) {
            l._sub_grid.objBox.style.overflow = "hidden";
            l._sub_row_type = null
        } else {
            //debugger;
            /*l._sub_grid.loadXML(h, function () {
                debugger;
                a._detectHeight(g, l, l._sub_grid.objBox.scrollHeight + l._sub_grid.hdr.offsetHeight + (l._sub_grid.ftr ? l._sub_grid.ftr.offsetHeight : 0));
                l._sub_grid.objBox.style.overflow = "hidden";
                a._correctMonolite();
                l._sub_row_type = null;
                if (!a.callEvent("onSubGridLoaded", [l._sub_grid, l.parentNode.idd, l._cellIndex, h])) {
                    return
                }
                if (a._ahgr) {
                    a.setSizes()
                }
            })*/
            l._sub_grid.load(h,function(){

                a._detectHeight(g, l, l._sub_grid.objBox.scrollHeight + l._sub_grid.hdr.offsetHeight + (l._sub_grid.ftr ? l._sub_grid.ftr.offsetHeight : 0));
                //l._sub_grid.objBox.style.overflow = "hidden";
                a._correctMonolite();
                l._sub_row_type = null;
                if (!a.callEvent("onSubGridLoaded", [l._sub_grid, l.parentNode.idd, l._cellIndex, h])) {
                    return
                }
                if (a._ahgr) {
                    a.setSizes()
                }
            },'json')
        }
    }
};
dhtmlXGridObject.prototype._detectHeight = function (n, o, c) {
    var a = o.offsetLeft + o.offsetWidth;
    n.style.left = a + "px";
    n.style.width = Math.max(0, o.parentNode.offsetWidth - a - 4) + "px";
    var c = c || n.scrollHeight;
    n.style.overflow = "hidden";
    n.style.height = c + "px";
    var m = o.parentNode;
    o.parentNode.style.height = (m.oldHeight || 20) + c * 1 + "px";
    o.style.height = (m.oldHeight || 20) + c * 1 + "px";
    if (this._fake) {
        var g = this._fake.rowsAr[o.parentNode.idd];
        g.style.height = (m.oldHeight || 20) + c * 1 + "px";
        g.firstChild.style.height = (m.oldHeight || 20) + c * 1 + "px"
    }
};
dhtmlXGridObject.prototype._correctMonolite = function (h) {
    if (this._in_correction) {
        return
    }
    this._in_correction = true;
    for (var g in this._flow) {
        if (this._flow[g] && this._flow[g].tagName == "DIV") {
            this._flow[g].style.border="1px solid #a4bed4";
            if (this.rowsAr[g]) {
                if (this.rowsAr[g].style.display == "none") {
                    this.cells4(this._flow[g].ctrl).close();
                    continue
                }
                this._flow[g].style.top = this.rowsAr[g].offsetTop + (this.rowsAr[g].oldHeight || 20) + "px";
                if (h) {
                    var c = this._flow[g].ctrl.offsetLeft + this._flow[g].ctrl.offsetWidth;
                    this._flow[g].style.left = c + "px";
                    this._flow[g].style.width = this.rowsAr[g].offsetWidth - c - 4 + "px"
                }
            } else {
                this._flow[g].ctrl = null;
                this.objBox.removeChild(this._flow[g]);
                delete this._flow[g]
            }
        }
    }
    this._in_correction = false
};
dhtmlXGridObject.prototype._collapsMonolite = function () {
    for (var c in this._flow) {
        if (this._flow[c] && this._flow[c].tagName == "DIV") {
            if (this.rowsAr[c]) {
                this.cells4(this._flow[c].ctrl).close()
            }
        }
    }
};

// Paging
dhtmlXGridObject.prototype.enablePaging = function (m, h, c, l, a, g) {
    this._pgn_parentObj = typeof(l) == "string" ? document.getElementById(l) : l;
    this._pgn_recInfoParentObj = typeof(g) == "string" ? document.getElementById(g) : g;
    this.pagingOn = m;
    this.showRecInfo = a;
    this.rowsBufferOutSize = parseInt(h);
    this.currentPage = 1;
    this.pagesInGroup = parseInt(c);
    this._init_pgn_events();
    this.setPagingSkin("default")
};
dhtmlXGridObject.prototype._init_pgn_events = function (a) {
    this.attachEvent("onXLE", this._page_skin_update);
    this.attachEvent("onClearAll", this._page_skin_update);
    this.attachEvent("onPageChanged", this._page_skin_update);
    this.attachEvent("onGridReconstructed", this._page_skin_update);
    this._init_pgn_events = function () {
    }
};
dhtmlXGridObject.prototype.setPagingSkin = function (a) {
    this._pgn_skin = this["_pgn_" + a];
    if (a == "toolbar") {
        this._pgn_skin_tlb = arguments[1]
    }
};
dhtmlXGridObject.prototype._page_skin_update = function (a) {
    if (!this.pagesInGroup) {
        this.pagesInGroup = Math.ceil(Math.min(5, this.rowsBuffer.length / this.rowsBufferOutSize))
    }
    var c = Math.ceil(this.rowsBuffer.length / this.rowsBufferOutSize);
    if (c && c < this.currentPage) {
        return this.changePage(c)
    }
    if (this.pagingOn && this._pgn_skin) {
        this._pgn_skin.apply(this, this.getStateOfView())
    }
};
dhtmlXGridObject.prototype.changePage = function (a) {
    if (arguments.length == 0) {
        a = this.currentPage || 0
    }
    a = parseInt(a);
    a = Math.max(1, Math.min(a, Math.ceil(this.rowsBuffer.length / this.rowsBufferOutSize)));
    if (!this.callEvent("onBeforePageChanged", [this.currentPage, a])) {
        return
    }
    this.currentPage = parseInt(a);
    this._reset_view();
    this._fixAlterCss();
    this.callEvent("onPageChanged", this.getStateOfView())
};
dhtmlXGridObject.prototype._pgn_toolbar = function (m, n, c) {
    if (!this.aToolBar) {
        this.aToolBar = this._pgn_createToolBar()
    }
    var l = Math.ceil(this.rowsBuffer.length / this.rowsBufferOutSize);
    if (this._WTDef[0]) {
        this.aToolBar.enableItem("right");
        this.aToolBar.enableItem("rightabs");
        this.aToolBar.enableItem("left");
        this.aToolBar.enableItem("leftabs");
        if (this.currentPage >= l) {
            this.aToolBar.disableItem("right");
            this.aToolBar.disableItem("rightabs")
        }
        if (this.currentPage == 1) {
            this.aToolBar.disableItem("left");
            this.aToolBar.disableItem("leftabs")
        }
    }
    if (this._WTDef[2]) {
        var h = this;
        this.aToolBar.forEachListOption("pages", function (o) {
            h.aToolBar.removeListOption("pages", o)
        });
        var a = {dhx_skyblue: 4, dhx_web: 0, dhx_terrace: 14}[this.aToolBar.conf.skin];
        for (var g = 0; g < l; g++) {
            this.aToolBar.addListOption("pages", "pages_" + (g + 1), NaN, "button", "<span style='padding: 0px " + a + "px 0px 0px;'>" + this.i18n.paging.page + (g + 1) + "</span>", "paging_page.gif")
        }
        this.aToolBar.setItemText("pages", this.i18n.paging.page + m)
    }
    if (this._WTDef[1]) {
        if (!this.getRowsNum()) {
            this.aToolBar.setItemText("results", this.i18n.paging.notfound)
        } else {
            this.aToolBar.setItemText("results", "<div style='width:100%; text-align:center'>" + this.i18n.paging.records + (n + 1) + this.i18n.paging.to + c + "</div>")
        }
    }
    if (this._WTDef[3]) {
        this.aToolBar.setItemText("perpagenum", this.rowsBufferOutSize.toString() + " " + this.i18n.paging.perpage)
    }
    this.callEvent("onPaging", [])
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
    var h = this;
    this.aToolBar.attachEvent("onClick", function (l) {
        l = l.split("_");
        switch (l[0]) {
            case"leftabs":
                h.changePage(1);
                break;
            case"left":
                h.changePage(h.currentPage - 1);
                break;
            case"rightabs":
                h.changePage(99999);
                break;
            case"right":
                h.changePage(h.currentPage + 1);
                break;
            case"perpagenum":
                if (l[1] === this.undefined) {
                    return
                }
                h.rowsBufferOutSize = parseInt(l[1]);
                h.changePage();
                h.aToolBar.setItemText("perpagenum", l[1] + " " + h.i18n.paging.perpage);
                break;
            case"pages":
                if (l[1] === this.undefined) {
                    return
                }
                h.changePage(l[1]);
                h.aToolBar.setItemText("pages", h.i18n.paging.page + l[1]);
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
            a = [10, 20, 30, 50, 100]
        }
        var c = {dhx_skyblue: 4, dhx_web: 0, dhx_terrace: 18}[this.aToolBar.conf.skin];
        for (var g = 0; g < a.length; g++) {
            this.aToolBar.addListOption("perpagenum", "perpagenum_" + a[g], NaN, "button", "<span style='padding: 0px " + c + "px 0px 0px;'>" + a[g] + " " + this.i18n.paging.perpage + "</span>", "paging_page.gif")
        }
    }
    return this.aToolBar
};
dhtmlXGridObject.prototype.setPagingWTMode = function (a, c, g, h) {
    this._WTDef = [a, c, g, h]
};
dhtmlXGridObject.prototype.i18n.paging = {
    results: "Resultate",
    records: "Inregistrari de la ",
    to: " la ",
    page: "Pagina ",
    perpage: "randuri pe pagina",
    first: "Prima pagina",
    previous: "Pagina anterioara",
    found: "Inregistrari gasite",
    next: "Pagina Urmatoare",
    last: "Ultima pagina",
    of: " din ",
    notfound: "Nu sunt inregistrari"
};
// Paging END

//INSER DELETE COLUMN
dhtmlXGridObject.prototype.insertColumn = function (g, o, r, a, n, q, u, c, l) {
    g = parseInt(g);
    if (g > this._cCount) {
        g = this._cCount
    }
    if (!this._cMod) {
        this._cMod = this._cCount
    }
    this._processAllArrays(this._cCount, g - 1, [(o || "&nbsp;"), (a || 100), (r || "ed"), (q || "left"), (u || ""), (n || "na"), (l || ""), "", this._cMod, (a || 100)]);
    this._processAllRows("_addColInRow", g);
    if (typeof(o) == "object") {
        for (var m = 1; m < this.hdr.rows.length; m++) {
            if (o[m - 1] == "#rspan") {
                var w = m - 1;
                var v = false;
                var s = null;
                while (!v) {
                    var s = this.hdr.rows[w];
                    for (var h = 0; h < s.cells.length; h++) {
                        if (s.cells[h]._cellIndex == g) {
                            v = h;
                            break
                        }
                    }
                    w--
                }
                this.hdr.rows[w + 1].cells[h].rowSpan = (this.hdr.rows[w].cells[h].rowSpan || 1) + 1
            } else {
                this.setHeaderCol(g, (o[m - 1] || "&nbsp;"), m)
            }
        }
    } else {
        this.setHeaderCol(g, (o || "&nbsp;"))
    }
    this.hdr.rows[0].cells[g];
    this._cCount++;
    this._cMod++;
    this._master_row = null;
    this.setSizes()
};
dhtmlXGridObject.prototype._addColInRow = function (o, m, a, h) {
    var l = m;
    if (o._childIndexes) {
        if (o._childIndexes[m - 1] == o._childIndexes[m] || !o.childNodes[o._childIndexes[m - 1]]) {
            for (var g = o._childIndexes.length; g >= m; g--) {
                o._childIndexes[g] = g ? (o._childIndexes[g - 1] + 1) : 0
            }
            o._childIndexes[m]--
        } else {
            for (var g = o._childIndexes.length; g >= m; g--) {
                o._childIndexes[g] = g ? (o._childIndexes[g - 1] + 1) : 0
            }
        }
        var l = o._childIndexes[m]
    }
    var q = o.childNodes[l];
    var n = document.createElement((h) ? "TD" : "TH");
    if (h) {
        n._attrs = {}
    } else {
        n.style.width = (parseInt(this.cellWidthPX[m]) || "100") + "px"
    }
    if (q) {
        o.insertBefore(n, q)
    } else {
        o.appendChild(n)
    }
    if (this.dragAndDropOff && o.idd) {
        this.dragger.addDraggableItem(o.childNodes[l], this)
    }
    for (var g = l + 1; g < o.childNodes.length; g++) {
        o.childNodes[g]._cellIndex = o.childNodes[g]._cellIndexS = o.childNodes[g]._cellIndex + 1
    }
    if (o.childNodes[l]) {
        o.childNodes[l]._cellIndex = o.childNodes[l]._cellIndexS = m
    }
    if (o.idd || typeof(o.idd) != "undefined") {
        this.cells3(o, m).setValue("");
        n.align = this.cellAlign[m];
        n.style.verticalAlign = this.cellVAlign[m];
        n.bgColor = this.columnColor[m]
    } else {
        if (n.tagName == "TD") {
            if (!o.idd && this.forceDivInHeader) {
                n.innerHTML = "<div class='hdrcell'>&nbsp;</div>"
            } else {
                n.innerHTML = "&nbsp;"
            }
        }
    }
};
dhtmlXGridObject.prototype.deleteColumn = function (a) {

    a = parseInt(a);
    if (this._cCount == 0) {
        return
    }
    if (!this._cMod) {
        this._cMod = this._cCount
    }
    if (a >= this._cCount) {
        return
    }
    this._processAllArrays(a, this._cCount - 1, [null, null, null, null, null, null, null, null, null, null, null]);
    this._processAllRows("_deleteColInRow", a);
    this._cCount--;
    this._master_row = null;
    this.setSizes();

};
dhtmlXGridObject.prototype._deleteColInRow = function (o, n) {
    var g = n;
    if (o._childIndexes) {
        n = o._childIndexes[n]
    }
    var q = o.childNodes[n];
    if (!q) {
        return
    }
    if (q.colSpan && q.colSpan > 1 && q.parentNode.idd) {
        var l = q.colSpan - 1;
        var a = this.cells4(q).getValue();
        this.setColspan(q.parentNode.idd, q._cellIndex, 1);
        if (l > 1) {
            var m = q._cellIndex * 1;
            this.setColspan(q.parentNode.idd, m + 1, l);
            this.cells(q.parentNode.idd, q._cellIndex * 1 + 1).setValue(a);
            o._childIndexes.splice(m, 1);
            for (var h = m; h < o._childIndexes.length; h++) {
                o._childIndexes[h] -= 1
            }
        }
    } else {
        if (o._childIndexes) {
            o._childIndexes.splice(g, 1);
            for (var h = g; h < o._childIndexes.length; h++) {
                o._childIndexes[h]--
            }
        }
    }
    if (q) {
        o.removeChild(q)
    }
    for (var h = n; h < o.childNodes.length; h++) {
        o.childNodes[h]._cellIndex = o.childNodes[h]._cellIndexS = o.childNodes[h]._cellIndex - 1
    }
};
dhtmlXGridObject.prototype._swapColumns = function (c) {
    var g = new Array();
    for (var a = 0; a < this._cCount; a++) {
        var h = c[this._c_order[a]];
        if (typeof(h) == "undefined") {
            h = ""
        }
        g[a] = h
    }
    return g
};
//END INSERT DELETE COLUMN

//GROUPING BY COLUMN

dhtmlXGridObject.prototype.groupBy = function (n, h) {
    if (this._groups) {
        this.unGroup()
    }
    this._dndProblematic = true;
    this._groups = {};
    if (!h) {
        h = ["#title"];
        for (var l = 1; l < this._cCount; l++) {
            h.push("#cspan")
        }
    }
    this._gmask = document.createElement("TR");
    this._gmask.origin = h;
    var m, g = 0;
    for (var l = 0; l < h.length; l++) {
        if (h[l] == "#cspan") {
            m.colSpan = (parseInt(m.colSpan) || 1) + 1
        } else {
            m = document.createElement("TD");
            m._cellIndex = l;
            if (this._hrrar[l]) {
                m.style.display = "none"
            }
            m.className = "group_row";
            m.innerHTML = "&nbsp;";
            if (h[l] == "#title") {
                this._gmask._title = g
            } else {
                m.align = this.cellAlign[l] || "left"
            }
            this._gmask.appendChild(m);
            if (h[l].indexOf("#stat") == 0) {
                this._gmask._math = true;
                m._counter = [this["_g_" + h[l].replace("#", "")], l, g]
            }
            g++
        }
    }
    for (var c in this._groups) {
        this._groups[c] = this.undefined
    }
    this._gIndex = n;
    if (this._fake && !this._realfake) {
        this._fake._groups = [];
        this._fake._gIndex = this._gIndex
    }
    this._nextRow = function (q, a) {
        var o = this.rowsCol[q + a];
        if (o && (o.style.display == "none" || o._cntr)) {
            return this._nextRow(q + a, a)
        }
        return o
    };
    if (!this.__sortRowsBG) {
        this._key_events = dhtmlx.extend({}, this._key_events);
        this._key_events.k38_0_0 = function () {
            if (this.editor && this.editor.combo) {
                this.editor.shiftPrev()
            } else {
                var a = this.row.rowIndex;
                if (!a) {
                    return
                }
                var o = this._nextRow(a - 1, -1);
                if (o) {
                    this.selectCell(o, this.cell._cellIndex, true)
                }
            }
        };
        this._key_events.k13_1_0 = this._key_events.k13_0_1 = function () {
        };
        this._key_events.k40_0_0 = function () {
            if (this.editor && this.editor.combo) {
                this.editor.shiftNext()
            } else {
                var a = this.row.rowIndex;
                if (!a) {
                    return
                }
                var o = this._nextRow(a - 1, 1);
                if (o) {
                    this.selectCell(o, this.cell._cellIndex, true)
                }
            }
        };
        this.attachEvent("onFilterStart", function () {
            if (this._groups) {
                this._groups = this.undefined
            }
            return true
        });
        this.attachEvent("onFilterEnd", function () {
            if (typeof this._gIndex != "undefined") {
                this.groupBy(this._gIndex, this._gmask.origin)
            }
        });
        this.sortRows_bg = this.sortRows;
        this.sortRows = function (q, o, a) {
            if (typeof(this._groups) == "undefined") {
                return this.sortRows_bg.apply(this, arguments)
            }
            o = o || "str";
            a = a || "asc";
            if (this.callEvent("onBeforeSorting", [q, o, a])) {
                if (typeof(this._groups) == "undefined") {
                    return true
                }
                if (q == this._gIndex) {
                    this._sortByGroup(q, o, a)
                } else {
                    this._sortInGroup(q, o, a)
                }
                this.setSortImgState(true, q, a);
                if (this._fake) {
                    this._mirror_rowsCol();
                    this._fake._groups = [];
                    this._fake._reset_view()
                }
                this.setSortImgState(true, q, a);
                this.callEvent("onAfterSorting", [q, o, a])
            }
            return false
        };
        this.attachEvent("onClearAll", function () {
            this.unGroup()
        });
        this.attachEvent("onBeforeRowDeleted", function (q) {
            if (!this._groups) {
                return true
            }
            if (!this.rowsAr[q]) {
                return true
            }
            var o = this.cells(q, this._gIndex).getValue();
            if (o === "") {
                o = " "
            }
            var a = this._groups[o];
            this._dec_group(a);
            return true
        });
        this.attachEvent("onAfterRowDeleted", function (a) {
            this.updateGroups()
        });
        this.attachEvent("onCheckbox", function (q, a, o) {
            this.callEvent("onEditCell", [2, q, a, (o ? 1 : 0), (o ? 0 : 1)])
        });
        this.attachEvent("onXLE", this.updateGroups);
        this.attachEvent("onColumnHidden", this.hideGroupColumn);
        this.attachEvent("onEditCell", function (C, s, y, x, D) {
            if (!this._groups) {
                return true
            }
            if (C == 2 && x != D && y == this._gIndex) {
                if (D === "") {
                    D = " "
                }
                this._dec_group(this._groups[D]);
                var a = this.rowsAr[s];
                var A = this.rowsCol._dhx_find(a);
                var v = this._inc_group(x);
                var w = this.rowsCol[v];
                if (a == w) {
                    w = w.nextSibling
                }
                var q = a.parentNode;
                var u = a.rowIndex;
                q.removeChild(a);
                if (w) {
                    q.insertBefore(a, w)
                } else {
                    q.appendChild(a)
                }
                this.rowsCol._dhx_insertAt(v, a);
                if (v < A) {
                    A++
                }
                this.rowsCol._dhx_removeAt(A, a);
                this._fixAlterCss()
            } else {
                if (C == 2 && x != D) {
                    this.updateGroups();
                    this._updateGroupView(this._groups[this.cells(s, this._gIndex).getValue() || " "])
                }
            }
            return true
        });
        this.__sortRowsBG = true
    }
    this._groupExisting();
    if (this._hrrar) {
        for (var l = 0; l < this._hrrar.length; l++) {
            if (this._hrrar[l]) {
                this.hideGroupColumn(l, true)
            }
        }
    }
    this.callEvent("onGroup", []);
    if (this._ahgr || this._awdth) {
        this.setSizes()
    }
};
dhtmlXGridObject.prototype._sortInGroup = function (g, o, h) {
    var q = this._groups_get();
    q.reverse();
    for (var m = 0; m < q.length; m++) {
        var n = q[m]._cntr._childs;
        var r = {};
        for (var l = 0; l < n.length; l++) {
            var s = this.cells3(n[l], g);
            r[n[l].idd] = s.getDate ? s.getDate() : s.getValue()
        }
        this._sortCore(g, o, h, r, n)
    }
    this._groups_put(q);
    this.setSizes();
    this.callEvent("onGridReconstructed", [])
};
dhtmlXGridObject.prototype._sortByGroup = function (l, n, g) {
    var c = this._groups_get();
    var h = [];
    for (var m = 0; m < c.length; m++) {
        c[m].idd = "_sort_" + m;
        h["_sort_" + m] = c[m]._cntr.text
    }
    this._sortCore(l, n, g, h, c);
    this._groups_put(c);
    this.callEvent("onGridReconstructed", []);
    this.setSizes()
};
dhtmlXGridObject.prototype._inc_group = function (l, g, a) {
    if (l === "") {
        l = " "
    }
    if (!this._groups[l]) {
        this._groups[l] = {text: l, row: this._addPseudoRow(), count: 0, state: g ? "plus" : "minus"}
    }
    var h = this._groups[l];
    h.row._cntr = h;
    var c = this.rowsCol._dhx_find(h.row) + h.count + 1;
    h.count++;
    if (!a) {
        this._updateGroupView(h);
        this.updateGroups()
    }
    return c
};
dhtmlXGridObject.prototype._dec_group = function (a) {
    if (!a) {
        return
    }
    a.count--;
    if (a.count == 0) {
        a.row.parentNode.removeChild(a.row);
        this.rowsCol._dhx_removeAt(this.rowsCol._dhx_find(a.row));
        delete this._groups[a.text]
    } else {
        this._updateGroupView(a)
    }
    if (this._fake && !this._realfake) {
        this._fake._dec_group(this._fake._groups[a.text])
    }
    this.updateGroups();
    return true
};
dhtmlXGridObject.prototype._insertRowAt_gA = dhtmlXGridObject.prototype._insertRowAt;
dhtmlXGridObject.prototype._insertRowAt = function (g, h, c) {
    if (typeof(this._groups) != "undefined") {
        if (this._realfake) {
            var l = this._fake._bfs_cells(g.idd, this._gIndex).getValue()
        } else {
            if (this._bfs_cells3) {
                var l = this._bfs_cells3(g, this._gIndex).getValue()
            } else {
                var l = this.cells3(g, this._gIndex).getValue()
            }
        }
        if (!l) {
            l = " "
        }
        h = this._inc_group(l, g.style.display == "none")
    }
    var a = this._insertRowAt_gA(g, h, c);
    if (typeof(this._groups) != "undefined") {
        this.expandGroup(l);
        this._updateGroupView(this._groups[l]);
        this.updateGroups()
    }
    return a
};
dhtmlXGridObject.prototype._updateGroupView = function (g) {
    if (this._fake && !this._realfake) {
        return g.row.firstChild.innerHTML = "&nbsp;"
    }
    var a = this._gmask || this._fake._gmask;
    var c = "<img style='margin-bottom:-4px' src='" + this.imgURL + g.state + ".gif'> ";
    if (this.customGroupFormat) {
        c += this.customGroupFormat(g.text, g.count)
    } else {
        c += g.text + " ( " + g.count + " ) "
    }
    g.row.childNodes[a._title].innerHTML = c
};
dhtmlXGridObject.prototype._addPseudoRow = function (l) {
    var a = this._gmask || this._fake._gmask;
    var h = a.cloneNode(true);
    for (var c = 0; c < h.childNodes.length; c++) {
        h.childNodes[c]._cellIndex = a.childNodes[c]._cellIndex;
        if (this._realfake) {
            h.childNodes[c].style.display = ""
        }
    }
    var g = this;
    h.onclick = function (m) {
        if (!g.callEvent("onGroupClick", [this._cntr.text])) {
            return
        }
        if (g._fake && g._realfake) {
            g._fake._switchGroupState(g._fake._groups[this._cntr.text].row)
        } else {
            g._switchGroupState(this)
        }
        (m || event).cancelBubble = "true"
    };
    h.ondblclick = function (m) {
        (m || event).cancelBubble = "true"
    };
    if (!l) {
        if (_isKHTML) {
            this.obj.appendChild(h)
        } else {
            this.obj.firstChild.appendChild(h)
        }
        this.rowsCol.push(h)
    }
    return h
};
dhtmlXGridObject.prototype._groups_get = function () {
    var c = [];
    this._temp_par = this.obj.parentNode;
    this._temp_par.removeChild(this.obj);
    var g = [];
    for (var h = this.rowsCol.length - 1; h >= 0; h--) {
        if (this.rowsCol[h]._cntr) {
            this.rowsCol[h]._cntr._childs = g;
            g = [];
            c.push(this.rowsCol[h])
        } else {
            g.push(this.rowsCol[h])
        }
        this.rowsCol[h].parentNode.removeChild(this.rowsCol[h])
    }
    return c
};
dhtmlXGridObject.prototype._groups_put = function (a) {
    var l = this.rowsCol.stablesort;
    this.rowsCol = new dhtmlxArray(0);
    this.rowsCol.stablesort = l;
    for (var h = 0; h < a.length; h++) {
        var g = a[h]._cntr;
        this.obj.firstChild.appendChild(g.row);
        this.rowsCol.push(g.row);
        g.row.idd = null;
        for (var c = 0; c < g._childs.length; c++) {
            this.obj.firstChild.appendChild(g._childs[c]);
            this.rowsCol.push(g._childs[c])
        }
        delete g._childs
    }
    this._temp_par.appendChild(this.obj)
};
dhtmlXGridObject.prototype._groupExisting = function (c) {
    if (!this.getRowsNum()) {
        return
    }
    var c = [];
    this._temp_par = this.obj.parentNode;
    this._temp_par.removeChild(this.obj);
    var g = [];
    var h = this.rowsCol.length;
    for (var l = 0; l < h; l++) {
        var n = this.cells4(this.rowsCol[l].childNodes[this._gIndex]).getValue();
        this.rowsCol[l].style.display = "";
        if (!n) {
            n = " "
        }
        if (!this._groups[n]) {
            this._groups[n] = {text: n, row: this._addPseudoRow(true), count: 0, state: "minus"};
            var m = this._groups[n];
            m.row._cntr = m;
            this._groups[n]._childs = [];
            c.push(m.row)
        }
        this._groups[n].count++;
        this._groups[n]._childs.push(this.rowsCol[l]);
        this.rowsCol[l].parentNode.removeChild(this.rowsCol[l])
    }
    for (var l = 0; l < c.length; l++) {
        this._updateGroupView(c[l]._cntr)
    }
    this._groups_put(c);
    if (this._fake && !this._realfake) {
        this._mirror_rowsCol();
        this._fake._groups = [];
        this._fake._reset_view()
    }
    this.callEvent("onGridReconstructed", []);
    this.updateGroups()
};
dhtmlXGridObject.prototype._switchGroupState = function (h) {
    var g = h._cntr;
    if (this._fake && !this._realfake) {
        g.state = this._fake._groups[h._cntr.text].row._cntr.state;
        this._fake._switchGroupState(this._fake._groups[h._cntr.text].row)
    }
    var c = this.rowsCol._dhx_find(g.row) + 1;
    g.state = g.state == "minus" ? "plus" : "minus";
    var a = g.state == "plus" ? "none" : "";
    while (this.rowsCol[c] && !this.rowsCol[c]._cntr) {
        this.rowsCol[c].style.display = a;
        c++
    }
    this._updateGroupView(g);
    this.callEvent("onGroupStateChanged", [g.text, (g.state == "minus")]);
    this.setSizes()
};
dhtmlXGridObject.prototype.expandGroup = function (a) {
    if (this._groups[a].state == "plus") {
        this._switchGroupState(this._groups[a].row)
    }
};
dhtmlXGridObject.prototype.collapseGroup = function (a) {
    if (this._groups[a].state == "minus") {
        this._switchGroupState(this._groups[a].row)
    }
};
dhtmlXGridObject.prototype.expandAllGroups = function () {
    for (var a in this._groups) {
        if (this._groups[a] && this._groups[a].state == "plus") {
            this._switchGroupState(this._groups[a].row)
        }
    }
};
dhtmlXGridObject.prototype.collapseAllGroups = function () {
    for (var a in this._groups) {
        if (this._groups[a] && this._groups[a].state == "minus") {
            this._switchGroupState(this._groups[a].row)
        }
    }
};
dhtmlXGridObject.prototype.hideGroupColumn = function (m, l) {
    if (this._fake) {
        return
    }
    var h = -1;
    var n = this._gmask.childNodes;
    for (var g = 0; g < n.length; g++) {
        if (n[g]._cellIndex == m) {
            h = g;
            break
        }
    }
    if (h == -1) {
        return
    }
    for (var c in this._groups) {
        this._groups[c].row.childNodes[h].style.display = l ? "none" : ""
    }
};
dhtmlXGridObject.prototype.groupStat = function (c, h, g) {
    g = this["_g_" + (g || "stat_total")];
    var l = 0;
    var a = 0;
    this.forEachRowInGroup(c, function (m) {
        l = g(l, this.cells(m, h).getValue() * 1, a);
        a++
    });
    return l
};
dhtmlXGridObject.prototype.forEachRowInGroup = function (a, h) {
    var l = this._groups[a].row.nextSibling;
    if (l) {
        while (l && !l._cntr) {
            h.call(this, l.idd);
            l = l.nextSibling
        }
    } else {
        var g = this._groups[a]._childs;
        if (g) {
            for (var c = 0; c < g.length; c++) {
                h.call(this, g[c].idd)
            }
        }
    }
};
dhtmlXGridObject.prototype.updateGroups = function () {
    if (!this._gmask || !this._gmask._math || this._parsing) {
        return
    }
    var c = this._gmask.childNodes;
    for (var a = 0; a < c.length; a++) {
        if (c[a]._counter) {
            this._b_processing.apply(this, c[a]._counter)
        }
    }
};
dhtmlXGridObject.prototype.unGroup = function () {
    if (!this._groups) {
        return
    }
    this._dndProblematic = false;
    delete this._groups;
    delete this._gIndex;
    if (this._fake) {
        this._mirror_rowsCol()
    }
    this.forEachRow(function (a) {
        this.rowsAr[a].style.display = ""
    });
    this._reset_view();
    this.callEvent("onGridReconstructed", []);
    this.callEvent("onUnGroup", [])
};