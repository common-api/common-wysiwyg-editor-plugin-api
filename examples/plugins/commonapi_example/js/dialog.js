var ExampleDialog = {
	init : function() {
		var f = document.forms[0];

		// Get the selected contents as text and place it in the input
		f.someval.value = commonAPIPopup.commonAPI.getContent({format : 'text'});
		f.somearg.value = commonAPIPopup.getWindowArg('some_custom_arg');
	},

	insert : function() {
		// Insert the contents from the input into the document
                commonAPIPopup.commonAPI.execCommand('insertText', document.forms[0].someval.value);
		commonAPIPopup.close();
	}
};

commonAPIPopup.addEvent('init', ExampleDialog.init)
commonAPIPopup.init('commonapi_example');
