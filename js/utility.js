var tools = {
	versionComponents: function () {
		var info = [[NSBundle mainBundle] infoDictionary];
		var items = [[(info["CFBundleShortVersionString"]) componentsSeparatedByString:"."] mutableCopy];

		while([items count] < 3)
			[items addObject:"0"];

		return items;
	},

	majorVersion: function () {
		var items = tools.versionComponents();

		return items[0];
	},

	minorVersion: function () {
		var items = tools.versionComponents();

		return items[1];
	},

	convertToString: function (objectString){
		var i = 0;
		normalString = "";
		while(objectString[i] !== null) normalString += objectString[i];
		return normalString;
	},

	saveFile: function (path, data){
		var someContent = NSString.stringWithString_(data)
		var path = path
		someContent.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(path, true)
	},

	pluginPath: function(){
		if(tools.majorVersion() == 3){
			var pluginFolder = scriptPath.match(/Plugins\/([\w -])*/)[0] + "/";
			var sketchPluginsPath = scriptPath.replace(/Plugins([\w \/ -])*.sketchplugin$/, "");
			return pluginFolder;
		}
	},

	getPluginRootPath: function () {
		var script_path = sketch.scriptPath;

	  var all_plugins_root_folder = '/Plugins/';
	  var all_plugins_root_end_index = script_path.indexOf(all_plugins_root_folder) + all_plugins_root_folder.length;
	  var all_plugins_root_path = script_path.slice(0, all_plugins_root_end_index);

	  var this_plugin_root_end_index = script_path.indexOf('/', all_plugins_root_end_index) + 1;
	  var this_plugin_root_path = script_path.slice(0, this_plugin_root_end_index);
	  return this_plugin_root_path;
	}
};

function alert(msg, title) {
  title = title || "Whoops";
  var app = [NSApplication sharedApplication];
  [app displayDialog:msg withTitle:title];
}

function info(msg) {
	[doc showMessage: msg];
}

function deleteLayer(layer){
	var parent = [layer parentGroup];
	if(parent) [parent removeLayer: layer];
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function getJSON(url) {
	var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
	var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
	var responseObject = [NSJSONSerialization JSONObjectWithData: response options: nil error: nil];
	return responseObject;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
