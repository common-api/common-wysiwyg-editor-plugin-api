(function() {
    /**
     * Basic sample plugin inserting current date and time into CKEditor editing area.
     */

    var commonapi = commonAPI.bind('commonapi_example', commonAPI.ckeditor);

    // Register the plugin with the editor.
    // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.plugins.html

    CKEDITOR.plugins.add( commonapi.getName(),
    {
            // The plugin initialization logic goes inside this method.
            // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.pluginDefinition.html#init
            init : function(editor)
            {
                    commonapi.loadLang();
                    commonapi.init({ed: editor, plugin: this});
            },

            lang : commonapi.getLanguages(),

            langEntries : commonapi.getTranslations(),
    });
})();
