(function() {

    var popup_ckeditor = {
        init : function(plugin_name) {
            var commonAPI = this.getWin().commonAPI;
            this.commonAPI = commonAPI.bind(plugin_name, commonAPI.ckeditor);
            this._init();
        },

        _addListener : function(eventName, listener) {
            if (document.addEventListener) {
                document.addEventListener(eventName, listener, false);
            } else {
                document.attachEvent("on" + eventName, listener);
            }
        },

        _callback : function(scope, func) {
            return function() {
                scope[func]();
            }
        },

        _init : function() {
            this._addListener("DOMContentLoaded", this._callback(this, '_onDOMLoaded'));
        },

        _onDOMLoaded : function() {
            if (document.body === null) {
                window.setTimeout(function() { commonAPIPopup._onDOMLoaded(); }, 100);
                return;
            }

            if (this._events['init'] !== undefined) {
                for (var func in this._events['init']) { 
                    this._events['init'][func]();
                }
            }

            var translation;
            var html = document.body.innerHTML;
            if ((translation = this.commonAPI.translateHTML(html)) && translation != html) {
                document.body.innerHTML = translation;
            }

            var title = document.title;
            if ((translation = this.commonAPI.translateHTML(title)) && translation != title) {
                document.title = translation;
            }
        },

        close : function() {
            this.getWin().CKEDITOR.dialog.getCurrent().hide();
        },

        getWindowArg : function(arg, default_value) {
           return '';//tinyMCEPopup.getWindowArg(arg, default_value);
        }
    }

    var commonAPI = commonAPIPopup.getWin().commonAPI;
    var popup = commonAPI.extend({}, commonAPIPopup);
    popup_ckeditor = commonAPI.extend(popup, popup_ckeditor);
    window.commonAPIPopup = popup_ckeditor;
})();
