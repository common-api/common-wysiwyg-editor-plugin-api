(function() {

        var commonapi = commonAPI.bind('commonapi_example', commonAPI.tinymce);

        // Load plugin specific language pack
	commonapi.loadLang();

	tinymce.create('tinymce.plugins.' + commonapi.getName(), {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
                        commonapi.init({ed: ed, url: url}); 
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
                        return commonapi.aboutMe();
		}
	});

	// Register plugin
	tinymce.PluginManager.add(commonapi.getName(), tinymce.plugins[commonapi.getName()]);
})();
