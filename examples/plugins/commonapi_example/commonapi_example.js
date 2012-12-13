(function(win) {

    win.commonAPI.addPlugin({
        commonAPI : {},

        namespace : 'commonAPI.plugins.ExamplePlugin',

        name : 'commonapi_example',

        getTranslations : function() {
            return {
                en : {
                    desc : 'This is just a template button',
                    dlg_title : 'Example Dialog Title'
                }
            }
        },

        aboutMe : function() {
            return {
                title : 'Example plugin',
                version : '1.0',
                my_name : 'Sam Jam',
                my_url : 'http://commonapi.org/plugins/example',
                help_url : 'http://commonapi.org/plugins/example/help',
                dev_url : 'http://commonapi.org/plugins/example/api'
            };
        }, 

        init : function() {
            var commonAPI = this.commonAPI;

            commonAPI.addCommand('example_command', function() {
                // Register the command so that it can be invoked by using commonAPI.execCommand('example_command');
                commonAPI.openWindow({
                    name : 'example_dialog',
                    title : 'Example Dialog',
                    file : commonAPI.getURL() + '/dialog.htm',
                    width : 320 + parseInt(commonAPI.translate('delta_width', 0)),
                    height : 120  + parseInt(commonAPI.translate('delta_height', 0)),
                    inline : 1
                }, {
                    plugin_url : commonAPI.getURL(),
                    some_custom_arg : 'custom arg'
                });

            });

            // Register example button
            commonAPI.addButton('example_button', {
                title : commonAPI.translate('desc'),
                command : 'example_command',
                //image : commonAPI.getURL() + '/img/example.gif'
                image : '/wysiwyg-plugin/examples/plugins/commonapi_example/img/example.gif'
            });

            // Add a node change handler, selects the button in the UI when an image is selected
            commonAPI.addEvent('node_change', function(node) {
                if (node.nodeName == 'IMG')
                    commonAPI.enable('example_button');
                else
                    commonAPI.disable('example_button');
            });
        },
    });
})(window);
