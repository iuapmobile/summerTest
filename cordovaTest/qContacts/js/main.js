//ios 没有执行方法 bug编号UMP-8777
function test1(){
	summer.contacts.find(
			{'filter':'海','multiple':true,
			'fieldType':[navigator.contacts.fieldType.name],
			'hasPhoneNumber':true},
			function (contacts) {
			     $alert(contacts.length);
			     $alert(navigator.contacts.fieldType);
			},
			function (contactError) {
			    alert('onError!');
			})	
}

function test2(){	
		summer.contacts.save(
			{'displayName':'海滨1','nickName':'qq'},
			function (contact) {
			    $alert(contact.displayName);
			},		
			function (contactError) {
			    alert("Error = " + contactError.code);
			})
}


