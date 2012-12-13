(function(win) {
    var commonAPI = {
        plugins : {},

        extend : function(destination, source) {   
              for (var property in source) {
                destination[property] = source[property];
              }

              return destination;
        },

        getLanguages : function() {
            var langs = this.getTranslations();
            var plugin_langs = [];

            for (var lang in langs) {
                if (langs.hasOwnProperty(lang))
                    plugin_langs.push(lang);
            }

            return plugin_langs;
        },

        getTranslations : function() {
            return this.plugin.getTranslations();
        },

        setPlugin : function(plugin) {
            this.plugin = plugin;
        },

        addPlugin : function(plugin) {
            this.plugins[plugin.name] = plugin;
        },

        bind : function(plugin_name, editor_api) {
            var commonapi = commonAPI.extend({}, editor_api);
            var plugin = commonAPI.extend({}, commonAPI.plugins[plugin_name]);

            plugin.commonAPI = commonapi;
            commonapi.plugin = plugin;

            return commonapi;
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
        }
    };

    win.commonAPI = commonAPI;
})(window);
