


//NON DHTMLX
if (!Object.keys) {
    Object.keys = (function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {

        var k;

        // 1. Let O be the result of calling ToObject passing
        //    the this value as the argument.
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get
        //    internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {
            return -1;
        }

        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }

        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            //    HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            //    i.  Let elementK be the result of calling the Get
            //        internal method of O with the argument ToString(k).
            //   ii.  Let same be the result of applying the
            //        Strict Equality Comparison Algorithm to
            //        searchElement and elementK.
            //  iii.  If same is true, return k.
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as the this value and
                // argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}
if (!Array.prototype.remove){
    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };
}
if (!Array.prototype.getAllIndexes){
    Array.prototype.getAllIndexes =function(val){
        var indexes = [], i;
        var arr=this;
        for(i = 0; i < arr.length; i++)
            if (arr[i] === val) indexes.push(i);
        return indexes;
    }
}
if (!String.prototype.addSlashes){
    String.prototype.addSlashes = function() {
       return (this + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    }
}
if (!String.prototype.trim) {
    (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(rtrim, '');
        };
    })();
}
Date.prototype.addDays = function (num) {
    var value = this.valueOf();
    value += 86400000 * num;
    return new Date(value);
}

Date.prototype.addSeconds = function (num) {
    var value = this.valueOf();
    value += 1000 * num;
    return new Date(value);
}

Date.prototype.addMinutes = function (num) {
    var value = this.valueOf();
    value += 60000 * num;
    return new Date(value);
}

Date.prototype.addHours = function (num) {
    var value = this.valueOf();
    value += 3600000 * num;
    return new Date(value);
}

Date.prototype.addMonths = function (num) {
    var value = new Date(this.valueOf());

    var mo = this.getMonth();
    var yr = this.getYear();

    mo = (mo + num) % 12;
    if (0 > mo) {
        yr += (this.getMonth() + num - mo - 12) / 12;
        mo += 12;
    }
    else
        yr += ((this.getMonth() + num - mo) / 12);

    value.setMonth(mo);
    value.setYear(yr);
    return value;
}
Date.prototype.substractMonths = function(num){
    var  value = new Date(this.valueOf());
    value.setMonth(value.getMonth()-num);
    return value;
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
function xml2json(xml, tab) {
    var X = {
        toObj: function(xml) {
            var o = {};
            if (xml.nodeType==1) {   // element node ..
                if (xml.attributes.length)   // element with attributes  ..
                    for (var i=0; i<xml.attributes.length; i++)
                        o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
                if (xml.firstChild) { // element has child nodes ..
                    var textChild=0, cdataChild=0, hasElementChild=false;
                    for (var n=xml.firstChild; n; n=n.nextSibling) {
                        if (n.nodeType==1) hasElementChild = true;
                        else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                        else if (n.nodeType==4) cdataChild++; // cdata section node
                    }
                    if (hasElementChild) {
                        if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                            X.removeWhite(xml);
                            for (var n=xml.firstChild; n; n=n.nextSibling) {
                                if (n.nodeType == 3)  // text node
                                    o["#text"] = X.escape(n.nodeValue);
                                else if (n.nodeType == 4)  // cdata node
                                    o["#cdata"] = X.escape(n.nodeValue);
                                else if (o[n.nodeName]) {  // multiple occurence of element ..
                                    if (o[n.nodeName] instanceof Array)
                                        o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                    else
                                        o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                }
                                else  // first occurence of element..
                                    o[n.nodeName] = X.toObj(n);
                            }
                        }
                        else { // mixed content
                            if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                            else
                                o["#text"] = X.escape(X.innerXml(xml));
                        }
                    }
                    else if (textChild) { // pure text
                        if (!xml.attributes.length)
                            o = X.escape(X.innerXml(xml));
                        else
                            o["#text"] = X.escape(X.innerXml(xml));
                    }
                    else if (cdataChild) { // cdata
                        if (cdataChild > 1)
                            o = X.escape(X.innerXml(xml));
                        else
                            for (var n=xml.firstChild; n; n=n.nextSibling)
                                o["#cdata"] = X.escape(n.nodeValue);
                    }
                }
                if (!xml.attributes.length && !xml.firstChild) o = null;
            }
            else if (xml.nodeType==9) { // document.node
                o = X.toObj(xml.documentElement);
            }
            else
                alert("unhandled node type: " + xml.nodeType);
            return o;
        },
        toJson: function(o, name, ind) {
            var json = name ? ("\""+name+"\"") : "";
            if (o instanceof Array) {
                for (var i=0,n=o.length; i<n; i++)
                    o[i] = X.toJson(o[i], "", ind+"\t");
                json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
            }
            else if (o == null)
                json += (name&&":") + "null";
            else if (typeof(o) == "object") {
                var arr = [];
                for (var m in o)
                    arr[arr.length] = X.toJson(o[m], m, ind+"\t");
                json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
            }
            else if (typeof(o) == "string")
                json += (name&&":") + "\"" + o.toString() + "\"";
            else
                json += (name&&":") + o.toString();
            return json;
        },
        innerXml: function(node) {
            var s = ""
            if ("innerHTML" in node)
                s = node.innerHTML;
            else {
                var asXml = function(n) {
                    var s = "";
                    if (n.nodeType == 1) {
                        s += "<" + n.nodeName;
                        for (var i=0; i<n.attributes.length;i++)
                            s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                        if (n.firstChild) {
                            s += ">";
                            for (var c=n.firstChild; c; c=c.nextSibling)
                                s += asXml(c);
                            s += "</"+n.nodeName+">";
                        }
                        else
                            s += "/>";
                    }
                    else if (n.nodeType == 3)
                        s += n.nodeValue;
                    else if (n.nodeType == 4)
                        s += "<![CDATA[" + n.nodeValue + "]]>";
                    return s;
                };
                for (var c=node.firstChild; c; c=c.nextSibling)
                    s += asXml(c);
            }
            return s;
        },
        escape: function(txt) {
            return txt.replace(/[\\]/g, "\\\\")
                .replace(/[\"]/g, '\\"')
                .replace(/[\n]/g, '\\n')
                .replace(/[\r]/g, '\\r');
        },
        removeWhite: function(e) {
            e.normalize();
            for (var n = e.firstChild; n; ) {
                if (n.nodeType == 3) {  // text node
                    if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                        var nxt = n.nextSibling;
                        e.removeChild(n);
                        n = nxt;
                    }
                    else
                        n = n.nextSibling;
                }
                else if (n.nodeType == 1) {  // element node
                    X.removeWhite(n);
                    n = n.nextSibling;
                }
                else                      // any other node
                    n = n.nextSibling;
            }
            return e;
        }
    };
    if (xml.nodeType == 9) // document node
        xml = xml.documentElement;
    var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
    return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}


var Base64 = {

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

function yyyy_mm_ddToDate(str){
    str=str.split("-");
    return new Date(str[0], str[1] - 1, str[2]);

}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function niceDate(){
    var monthNames = [
        "Ianuarie", "Februarie", "Martie","April", "Mai", "Iunie", "Iulie","August", "Septembrie", "Octombrie","Noiembrie", "Decembrie"
    ];

    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var h = addZero(date.getHours());
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());
    return day + ' ' + monthNames[monthIndex] + ' ' + year+' '+h+":"+m
}
function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)

}

function popup(url) {
    params  = 'width='+(screen.width-40);
    params += ', height='+(screen.height-120);
    params += ', top=10, left=10'
    params += '';

    newwin=window.open(url,'windowname4', params);
    if (window.focus) {newwin.focus()}
    return false;
}
function popup_file(url) {
    document.getElementById('download_frame').src = url;
}

var downloadFrame;
function downloadFile(url, params) {
    //downloadFile("download.php", this.getFormData());
    // create iframe once if needed
    if (downloadFrame == null) {
        downloadFrame = document.createElement("iframe");
        downloadFrame.className = "download_iframe";
        downloadFrame.name = "download_frame";
        downloadFrame.border = downloadFrame.frameBorder = 0;
        document.body.appendChild(downloadFrame);
    }

    // create form for download request
    var downloadForm = document.createElement("FORM");
    downloadForm.action = url;
    downloadForm.method = "POST";
    downloadForm.target = "download_frame";
    document.body.appendChild(downloadForm);

    // add params to form
    for (var a in params) {
        var input = document.createElement("INPUT");
        input.type = "hidden";
        input.name = a;
        input.value = params[a];
        downloadForm.appendChild(input);
        input = null;
    }

    // submit form
    downloadForm.submit();

    // clear form
    window.setTimeout(function () {
        document.body.removeChild(downloadForm);
        downloadForm = null;
    }, 1);
}
function getAge(d1, d2){
    d2 = d2 || new Date();
    var diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function isMobilePhone(val){
    if (val.length!=10) return false;
    return new RegExp("07[0-9]{8}").test(val);
}
function isXLS(val){
    return true;
}
function isProcent(val){
    if (val.toString().trim().length==0) return false;
    if (parseFloat(val)==val && val>=0 && val<=100) return true;
    return false;
}


function count(prop,data){
    return data.length;

}




screens_functions=new Object();
/* client_details */
screens_functions.activeScreen=function(){
    return screens.main.ids.sidebar.getActiveItem();
};
screens_functions.activeWindow=function(){
    var win=myWins.getTopmostWindow(true)
    return win.screenName;
};
screens_functions.clearHiddenFormContaine = function(){
    document.getElementById('hidden_form_container').innerHTML='';
};



screens_functions.setTimeOut = function(object,func,time_limit,repetitions){
    if (!object.timeout && typeof func == 'function') {
        object.timeout=new Object();
        object.timeout.contor=0;
        object.timeout.func= func;
        object.timeout.time_limit=time_limit;
        object.timeout.repetitions=repetitions;
        object.timeout.timer=null;

    }
    if (typeof object.timeout.repetitions == "number" && object.timeout.contor>=object.timeout.repetitions) {
        object.timeout.timer=null;
        return;
    }

    if (typeof object.timeout.func !="function" || typeof screens[object.screenName] !="object") {
        object.timeout.timer=null;
        return;
    }
    object.timeout.contor++;
    object.timeout.func();
    object.timeout.timer=setTimeout(function(){screens_functions.setTimeOut(object)},object.timeout.time_limit);
};

screens_functions.clientDetails={
    onInitComplete:function () {
        id=screens.main.ids.sidebar.getActiveItem();
        screen=screens[id];
        screen.screenName=id;
        screen.idClient=id.split("<::>")[1];
        screen.sideCell=screens.main.ids.sidebar.cells(id);
        combo=screen.ids.form.getCombo('CONT');
        combo.setTemplate({
            input:"#c5#",
            columns: [
                {header: "Cont",width:200,option: "#c1#"},
                {header: "Branch", width: 80,  option: "#c2#"},
                {header: "Clasa cont", width: 80,  option: "#c3#"},
                {header: "Valuta", width: 80,  option: "#c4#"},
                {header: "IBAN", width: 250,  option: "#c5#"}
            ]
        });
        combo=screen.ids.form.getCombo('REPREZENTANT');
        combo.setTemplate({
            input:"#c2# (CIF:#c1#)",
            columns: [
                {header: "Cod client",width:100,option: "#c1#"},
                {header: "Nume client", width:250,  option: "#c2#"},
                {header: "Tip semnatura", width: 120,  option: "#c3#"},
                {header: "Telefon", width: 120,  option: "#c4#"}
            ]
        });

        combo=screen.ids.form.getCombo('ABON_NOTIF');
        combo.setTemplate({
            input:"#c1#",
            columns: [
                {header: "IBAN",width:200,option: "#c1#"},
                {header: "Telefon", width:180,  option: "#c2#"},
                {header: "Email", width:200,  option: "#c3#"},
                {header: "Solicitant", width:180,  option: "#c4#"},
                {header: "CNP Solicitant", width:120,  option: "#c5#"},
                {header: "Data convnetie", width: 90,  option: "#c7#"},
                {header: "Incheiata de ", width: 120,  option: "#c6#"}
            ]
        });



        /*grid = new dhtmlXGridObject(screen.ids.form.getContainer("cont_grid"));
        screen.ids.accounts=grid;
        grid.screenName=id;
        grid.setHeader('Cont ,Branch,  Clasa cont,Valuta,IBAN,Elibereaza ID');
        grid.setColTypes("ro,ro,ro,ro,ro,img");
        grid.setInitWidths("160,80,80,80,*,100");
        grid.setColAlign("center,center,center,center,center,center");
        grid.enableAutoHeight(true,150,true);
        grid.attachEvent("onXLE",function(){
            this.forEachRow(function (id) {
                this.cells(id,5).setValue('icons/invoice-icon.png^Elibereaza ID cont '+id+'^javascript:screens_functions.clientDetails.getReprezentantDetails("'+this.screenName+'","'+id+'")')
            });
            this.setSizes();
            this.objBox.style.height=parseFloat(this.objBox.style.height)+1+'px';
            screens[this.screenName].sideCell.progressOff();


            // END ACCES_LEVEL
        });
        grid.init();*/

        /*grid = new dhtmlXGridObject(screen.ids.form.getContainer("cont_imp"));
        screen.ids.reprezentanti=grid;
        grid.screenName=id;
        grid.setHeader('Cod client ,Nume client,Tip semnatura,Detalii');
        grid.setColTypes("ro,ro,ro,img");
        grid.setInitWidths("100,*,100,100");
        grid.setColAlign("center,left,left,center");
        grid.enableAutoHeight(true,150,true);
        grid.attachEvent("onXLE",function(){
            this.forEachRow(function (id) {
                this.cells(id,3).setValue('icons/Address Book.png^Detalii imputernicit '+this.cells(id,1).getValue()+'^javascript:screens_functions.clientDetails.getReprezentantDetails("'+this.screenName+'","'+id+'")')
            });
            this.setSizes();
            this.objBox.style.height=parseFloat(this.objBox.style.height)+1+'px';
            screens[this.screenName].sideCell.progressOff();


            // END ACCES_LEVEL
        });
        grid.init();*/

        screens_functions.clientDetails.loadClientData.call(screen,screen.idClient);
    },
    closeClient:function () {

    },
    getReprezentantDetails:function(screenName,idReprezentant){
        if (!!idReprezentant){
            scr=initScreen(main,'reprezentant');
            scr.parentScreen=screenName;
            scr.functions.loadData.call(scr,idReprezentant,screenName);
        }
    },
    loadClientData:function () {
        this.sideCell.progressOn(1,'Incarc datele clientuli');
        this.ids.form.loadJSON('php/rest_call.php?op=clientData&CUSTOMER_NO='+this.idClient,function (data, form, err,fulldata) {
            if (!data || !fulldata.dbQueryCustomersOutput) {
                _error('Eroare aplicatie','Clientul nu a fost gasit !');
                screens.main.functions.removeItem(this.screenName);
                return;
            }
            screens.main.ids.sidebar.cells(this.screenName).setText({text:data.CUTOMER_NAME1});
            screens.main.ids.sidebar.cells(this.screenName).setHeaderText(data.CUSTOMER_NO+' - '+data.CUTOMER_NAME1);
            screens[this.screenName].sideCell.progressOff(1);
            screens_functions.clientDetails.loadClientDetails.call(screens[this.screenName]);

        },'dbQueryCustomersOutput[0]');
    },
    loadClientDetails:function(){

        this.sideCell.progressOn('3','Client identificat ... incarc date aditionale');
        this.ids.form.loadJSON('php/load.php?'+$.param({op:'getClientStatus',cust_no:this.idClient}),function (data, form, err,fulldata) {
            data=parseLoadData2(data);
            if(!data.idconventie){
                this.hideItem('conv');this.showItem('no_conv');this.disableItem('eliberare');this.disableItem('reject');
            }
            screens[this.screenName].sideCell.progressOff(3);
        })

        combo=this.ids.form.getCombo('CONT');
        combo.screenName=this.screenName;
        combo.attachEvent("onXLS", function(){
            screens[this.screenName].sideCell.progressOn(1,'Incarc conturile clientului');
        });
        combo.attachEvent("onXLE", function(){
            screens[this.screenName].sideCell.progressOff(1);
        });
        combo.load('php/soap_call.php?'+$.param({op:'clientAccountCombo',cust_no:this.idClient}));

        combo=this.ids.form.getCombo('REPREZENTANT');
        combo.screenName=this.screenName;
        combo.attachEvent("onXLS", function(){
            screens[this.screenName].sideCell.progressOn(2,'Incarc reprezentantii clientului');
        });
        combo.attachEvent("onXLE", function(){
            screens[this.screenName].sideCell.progressOff(2);
        });
        combo.load('php/soap_call.php?'+$.param({op:'clientReprezentantCombo',cust_no:this.idClient}));

        combo=this.ids.form.getCombo('ABON_NOTIF');
        combo.screenName=this.screenName;
        combo.attachEvent("onXLS", function(){
            screens[this.screenName].sideCell.progressOn(3,'Incarc conventii notificare');
        });
        combo.attachEvent("onXLE", function(){
            if (this.getOptionsCount()==0){
                f=screens[this.screenName].ids.form;
                f.hideItem('blk_notif');
            }
            screens[this.screenName].sideCell.progressOff(3);

        });
        combo.load('php/load.php?'+$.param({op:'clientAbonNotif',cust_no:this.idClient}));

        /*

        this.ids.accounts.load('php/soap_call.php?op=clientAccount&cust_no='+this.idClient,'json');
        this.sideCell.progressOn();
        this.ids.reprezentanti.load('php/soap_call.php?op=clientReprezentant&cust_no='+this.idClient,'json');
        */
    },
    requestID:function (idRequest) {
        if (!idRequest){
            if (this.validateItem('idconventie') && this.validateItem('REPREZENTANT') && this.validateItem('REPREZENTANT_CNP') && this.validateItem('REPREZENTANT_SR') && this.validateItem('REPREZENTANT_NR') && this.validateItem('CONT')){
                scr=initScreen(main,'requestID');
                f=scr.ids.form;
                comboCont=this.getCombo('CONT');
                cont=this.getItemValue('CONT');
                f.setItemValue('CUTOMER_NAME1',this.getItemValue('CUTOMER_NAME1'));
                f.setItemValue('CUSTOMER_NO',this.getItemValue('CUSTOMER_NO'));
                f.setItemValue('SHORT_NAME',this.getItemValue('SHORT_NAME'));
                f.setItemValue('REPREZENTANT',this.getItemValue('REPREZENTANT'));
                f.setItemValue('REPREZENTANT_NAME',this.getItemValue('REPREZENTANT_NAME'));
                f.setItemValue('REPREZENTANT_CNP',this.getItemValue('REPREZENTANT_CNP'));
                f.setItemValue('REPREZENTANT_SR',this.getItemValue('REPREZENTANT_SR'));
                f.setItemValue('REPREZENTANT_NR',this.getItemValue('REPREZENTANT_NR'));
                f.setItemValue('CONT',cont);
                f.setItemValue('IBAN',comboCont.getOption(cont).text.c5);
                f.setItemValue('CLASA',comboCont.getOption(cont).text.c3);
                f.setItemValue('VALUTA',comboCont.getOption(cont).text.c4);
                scr.functions.setRequestType();
            }
        }


    },
    onChangedClientDetails:function(name, value){
        switch (name){
            case 'REPREZENTANT':
                screens_functions.clientDetails.getReprezentantDetails(this.screenName,value);
                break;
        }
    },
    tabSelected:function (id, lastId) {
        screenName=this.screenName;
        if (id=='requests'){

        }
        return true;
    }
};
screens_functions.request={
    openDetails:function(){
        //grid=this;
        idRequest=this.getSelectedRowId();
        scr=initScreen(main,'requestID');
        scr.fromScreen=this.screenName;


    },

    openEditMsg:function(){
        //grid=this;
        idRequest=this.getSelectedRowId();
        scr=initScreen(main,'edit_msg');
       // scr.fromScreen=this.screenName;
        scr.ids.form_edit_id.setItemValue('idmsg',idRequest);
        scr.ids.form_edit_id.setItemValue('mesaj',this.cells(idRequest , 1).getValue());

    },
    deleteMsg:function(){
        //grid=this;
        idRequest2=this.getSelectedRowId();
        sc=initScreen(main,'stergeMesaj');

        sc.ids.form_del_id.setItemValue('idmsgdel',idRequest2);
        sc.ids.form_del_id.setItemValue('mesajdel',this.cells(idRequest2 , 1).getValue());

    },
    sendSMS: function () {
        smssebt=initScreen(main,'SendSMS');
    },

    addEvent: function () {
        addevent=initScreen(main,'addEvent');
    },



}





