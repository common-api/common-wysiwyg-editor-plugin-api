(function() {

    var popup_tinymce = {
        init : function(plugin_name) {
            // Load the TinyMCE Popup script
            this.loadScript('../../../3rd-party/tinymce/jscripts/tiny_mce/tiny_mce_popup.js');

            var commonAPI = this.getWin().commonAPI;
            this.commonAPI = commonAPI.bind(plugin_name, commonAPI.tinymce);
            this._init();
        },

        _init : function() {
            var win = this.getWin();
            win.tinyMCE.activeEditor.dom.bind(win, "ready", this._onDOMLoaded, this);
        },

        _onDOMLoaded : function() {
            if (document.body === null) {
                window.setTimeout(function() { popup._onDOMLoaded(); }, 100);
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
            tinyMCEPopup.close();
        },

        getWindowArg : function(arg, default_value) {
           return tinyMCEPopup.getWindowArg(arg, default_value);
        }
    }

    var commonAPI = commonAPIPopup.getWin().commonAPI;
    var popup = commonAPI.extend({}, commonAPIPopup);
    popup_tinymce = commonAPI.extend(popup, popup_tinymce);
    window.commonAPIPopup = popup_tinymce;
})();
