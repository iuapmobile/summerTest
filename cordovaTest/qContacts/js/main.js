//ios 没有执行方法 bug编号UMP-8777
function test1(){
	function onSuccess(contacts) {
	    $summer.alert(contacts);
		alert('Found ' + contacts.length + ' contacts.');
	};

	function onError(contactError) {
		alert('onError!');
	};

// find all contacts with 'Bob' in any name field
	var options      = new ContactFindOptions();
	options.filter   = "屈";
	options.multiple = true;
	options.desiredFields = [navigator.contacts.fieldType.id];
	options.hasPhoneNumber = true;
	var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
	navigator.contacts.find(fields, onSuccess, onError, options);
}

function test2(){

	function onSuccess(contact) {
		alert("Save Success");
	};

	function onError(contactError) {
		alert("Error = " + contactError.code);
	};

// create a new contact object
	var contact = navigator.contacts.create();
	contact.displayName = "海滨2";
	contact.nickname = "qq2";            // specify both to support all devices

// populate some fields
	var name = new ContactName();
	name.givenName = "海滨1";
	name.familyName = "qq1";
	contact.name = name;

// save to device
	contact.save(onSuccess,onError);
}


