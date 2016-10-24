//here is your code...
summerready = function () {
};
function call(){
	$tel.call('13261813382')
}
function sendMessage(){
	$tel.sendMsg({
		tel:'13261813382',
		body:'收到请回复'
	})
	
}
function sendMail(){
	$tel.sendMail('wuxlr@yonyou.com','我是谁？','收到勿回');
	
}
function saveContact(){
	$tel.saveContact( {
		tel:"18210773633",//手机号码
		employeename:"鬼杀",//联系人名称
		jobname:"国务院总理",//职位
		orgname:"暗杀部",//部门名称
		address:"天通苑1号",//单位地址
		email:"1234@163.com",//邮箱
		officetel:"010-897657"//办公电话
	});
	
}
