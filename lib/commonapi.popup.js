var commonAPIPopup = {
    getWin: function() {
        return (!window.frameElement && window.dialogArguments) || opener || parent || top;
    },

    addEvent : function(event_name, func) {
        if (this._events[event_name] === undefined)
            this._events[event_name] = [];

        this._events[event_name].push(func);
    },

        loadScript : function(src) {
            var fileref = window.document.createElement('script');

            fileref.setAttribute("type","text/javascript");
            fileref.setAttribute("src", src);

            if (typeof fileref != "undefined")
                window.document.getElementsByTagName("head")[0].appendChild(fileref)
         },

        loadStyle : function(src) {
            var fileref = document.createElement("link");

            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", src);

            if (typeof fileref != "undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref)
        },

    
    _events : {},

    commonAPI : {}
}
