(function(win) {
    var commonAPI = win.commonAPI;

    // Copy standard functions
    commonAPI.ckeditor = commonAPI.extend({}, commonAPI);

    var commonapi_ckeditor = {
        plugin : {},

        getNamespace : function() {
            return this.plugin.namespace;
        },

        getName : function() {
            return this.plugin.name;
        },

        loadLang : function() {
            var languages = this.getTranslations();
            for (var language in languages) {

                if (languages.hasOwnProperty(language)) {
                    CKEDITOR.plugins.setLang(this.getName(), language, languages[language]);
                }
            }
        },

        init : function(opts) {
            this.ed = opts.ed;
            this.url = opts.plugin.path;
            if (this.url[this.url.length - 1] == '/')
                this.url = this.url.substr(this.url, this.url.length - 1);

            this.plugin.init();
        },

        getURL : function() {
            return this.url;
        },

        translate : function(property, default_value) {
            var name = this.getName();

            if (this.ed.lang[name].hasOwnProperty(property))
                return this.ed.lang[name][property];
            else
                return default_value;
        },

        translateHTML : function(html) {
            var f = function(scope) {
                return function(match, p1, p2, p3, offset, strings) {
                    var ed = CKEDITOR.currentInstance;
                    if (ed.lang[p2] !== undefined && ed.lang[p2][p3] !== undefined)
                        return ed.lang[p2][p3];
                    else
                        return p2 + p3;
                };
            };

            return html.replace(/({#([a-zA-Z_]+)[.]([a-zA-Z_]+)})/g, f(this));
        },

        openWindow : function(settings, opts) {
            var args = {};

            CKEDITOR.dialog.addIframe(settings.name, settings.title, settings.file, settings.width, settings.height);
            var dialog = new CKEDITOR.dialog(this.ed, settings.name);
            dialog.show();
        },

        addCommand : function(name, func) {
            this.ed.addCommand( name, {
                exec : function(editor) {
                    func();
                },
            });
        },

        addButton : function(name, settings) {
            var args = {};
            for (var setting in settings) {
                switch (setting) {
                    case 'title':
                        args.label = settings[setting];
                        break;
                    case 'command':
                        args.command = settings[setting];
                        break;
                    case 'image':
                        args.icon = settings[setting];
                        break;
                }
            }

            CKEDITOR.skin.addIcon(name, settings.image);
            this.ed.ui.addButton(name, settings);
        },

        addEvent : function(event_name, func) {
            switch (event_name) {
                case 'node_change':
                    this.ed.on('change', func);
                    break;
            }
        },

        enable : function(id) {
            var command = this._getButtonCommand(id);
            if (command) {
                this.ed.getCommand(command).setState(CKEDITOR.TRISTATE_ENABLED);
            }
        },

        disable : function(id) {
            var command = this._getButtonCommand(id);
            if (command) {
                this.ed.getCommand(command).setState(CKEDITOR.TRISTATE_DISABLED);
            }
        },

        _getButtonCommand : function(button) {
            if (this.ed.ui.items[button] !== undefined) {
                return this.ed.ui.items[button].command;
            } else {
                return null;
            }
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
                        if (settings.format == 'html')
                            return CKEDITOR.currentInstance.getSelection().getSelectedElement().innerHTML;
                        if (settings.format == 'text')
                            return CKEDITOR.currentInstance.getSelection().getSelectedText();
                        break;

                    default:
                        return CKEDITOR.currentInstance.getSelection().getSelectedText();
                }
            }
        },

        execCommand : function(command, args) {
            switch (command) {
                case 'insertText':
                    CKEDITOR.currentInstance.insertText(args);
                    break;
                case 'insertHTML':
                    CKEDITOR.currentInstance.insertHTML(args);
                    break;
                default:
                    CKEDITOR.currentInstance.execCommand(command, args);
            }
        }
    };

    // Copy TinyMCE functions
    commonAPI.extend(commonAPI.ckeditor, commonapi_ckeditor);
})(window);
