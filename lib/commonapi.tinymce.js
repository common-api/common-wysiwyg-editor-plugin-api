(function(win) {
    var commonAPI = win.commonAPI;

    // Copy standard functions
    commonAPI.tinymce = commonAPI.extend({}, commonAPI);

    var commonapi_tinymce = {
        plugin : {},

        getNamespace : function() {
            return this.plugin.namespace;
        },

        getName : function() {
            return this.plugin.name;
        },

        getLang : function() {
            return this.getName();
        },

        loadLang : function() {
            var languages = this.getTranslations();
            for (var language in languages) {
                tinyMCE.addI18n(language + '.' + this.getLang(), languages[language]);
            }
        },

        init : function(opts) {
            this.ed = opts.ed;
            this.url = opts.url;

            this.plugin.init();
        },

        getURL : function() {
            return this.url;
        },

        translate : function(property, default_value) {
            if (property.indexOf('.') === -1) {
                var lang = this.getLang();
                if (!lang.length) {
                    // We won't be able to translate without knowing which language pack to use, so we return the default_value.
                    // Maybe should throw an error here.
                    return default_value;
                }

                property = lang + '.' + property;
            }

            return tinyMCE.activeEditor.getLang(property, default_value);
        },

        translateHTML : function(html) {
            var f = function(scope) {
                return function(match, p1, p2, offset, strings) {
                    return tinyMCE.activeEditor.getLang(p2, p2);
                };
            };

            return html.replace(/({#([a-zA-Z._]+)})/g, f(this));
        },

        addCommand : function(name, func) {
            this.ed.addCommand(name, func);
        },

        openWindow : function(settings, opts) {
            var args = {};

            for (var setting in settings) {
                switch (setting) {
                    case 'title':
                        args.title = settings[setting];
                        break;
                    case 'file':
                        args.file = settings[setting];
                        break;
                    case 'width':
                        args.width = settings[setting];
                        break;
                    case 'height':
                        args.height = settings[setting];
                        break;
                    case 'resizable':
                        args.resizable = settings[setting];
                        break;
                    case 'maximizable':
                        args.maximizable = settings[setting];
                        break;
                    case 'inline':
                        args.inline = settings[setting];
                        break;
                    case 'css':
                        args.popup_css = settings[setting];
                        break;
                    case 'translate':
                        args.translate_i18n = settings[setting];
                        break;
                    case 'close':
                        args.close_previous = settings[setting];
                        break;
                    case 'scrollbars':
                        args.scrollbars = settings[setting];
                        break;
                };
            }

            this.ed.windowManager.open(args, opts);
        },

        addButton : function(name, settings) {
            var args = {};
            for (var setting in settings) {
                switch (setting) {
                    case 'title':
                        args.title = settings[setting];
                        break;
                    case 'command':
                        args.cmd = settings[setting];
                        break;
                    case 'image':
                        args.image = settings[setting];
                        break;
                }
            }

            this.ed.addButton(name, args);
        },

        addEvent : function(event_name, func) {
            var f = function(ed, cm, n) {
                       func(n);
                    };

            switch (event_name) {
                case 'node_change':
                    this.ed.onNodeChange.add(f);
                    break;
            }
        },

        enable : function(id) {
            tinyMCE.activeEditor.controlManager.setActive(id, true);
        },

        disable : function(id) {
            tinyMCE.activeEditor.controlManager.setActive(id, false);
        },

        aboutMe : function() {
            var settings = this.plugin.aboutMe();
            var args = {};

            for (var setting in settings) {
                switch (setting) {
                    case 'title':
                        args.longname = settings[setting];
                        break;
                    case 'my_name':
                        args.author = settings[setting];
                        break;
                    case 'my_url':
                        args.authorurl = settings[setting];
                        break;
                    case 'help_url':
                        args.infourl = settings[setting];
                        break;
                    case 'version':
                        args.version = settings[setting];
                        break;
                }
            }

            return args;
        },

        getContent : function(settings) {
            var args = {};

            for (var setting in settings) {
                switch (setting) {
                    case 'format':
                        args.format = settings[setting];
                        break;
                }
            }

            return tinyMCE.activeEditor.selection.getContent(args);
        },

        execCommand : function(command, args) {
            switch (command) {
                case 'insertText':
                    command = 'mceInsertContent';
                    break;
                case 'insertHTML':
                    command = 'mceInsertContent';
                    break;
            }

            tinyMCE.activeEditor.execCommand('mceInsertContent', false, args);
        }

    };

    // Copy TinyMCE functions
    commonAPI.extend(commonAPI.tinymce, commonapi_tinymce);
})(window);
