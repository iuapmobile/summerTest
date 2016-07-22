angular.module('starter.services', [])

    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: '阿基米德',
            textImg: 'img/ajimide2.jpg',
            lastText: '给我一个支点，我可以撬动整个地球。',
            lastTime: '15:00',
            face: 'img/ajimide.jpg'
        }, {
            id: 1,
            name: '牛顿',
            lastText: '愉快的生活是由愉快的思想造成的。',
            textImg:'img/niudun2.jpg',
            lastTime: '14:30',
            face: 'img/niudun.jpg'
        }, {
            id: 2,
            name: '本杰明·富兰克林',
            lastText: '正像新生的婴儿一样，科学的真理必将在斗争中不断发展，广泛传播，无往而不胜。',
            textImg:'img/fulankelin2.jpg',
            lastTime: '14:10',
            face: 'img/fulankelin.jpg'
        }, {
            id: 3,
            name: '乔布斯',
            lastText: '你想用卖糖水来度过余生，还是想要一个机会来改变世界?',
            textImg:'img/qiaobusi2.jpg',
            lastTime: '14:02',
            face: 'img/qiaobusi.jpg'
        }, {
            id: 4,
            name: '曹操',
            lastText: '宁可我负天下人，休叫天下人负我！',
            textImg:'img/caocao2.jpg',
            lastTime: '14:00',
            face: 'img/caocao.jpg'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Contacts', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var contacts = [{
            id: 0,
            name: '阿基米德',
            email:'123123@qq.com',
            tel:'1312313123',
            address:'北京市海淀区上地一街',
            face: 'img/ajimide.jpg'
        }, {
            id: 1,
            name: '牛顿',
            email:'xxxx@163.com',
            tel:'1372313123',
            address:'北京市海淀区上地二街',
            face: 'img/niudun.jpg'
        }, {
            id: 2,
            name: '本杰明·富兰克林',
            email:'venus@yeah.net',
            tel:'1302313123',
            address:'北京市海淀区上地三街',
            face: 'img/fulankelin.jpg'
        }, {
            id: 3,
            name: '乔布斯',
            email:'zzsdads@gmail.com',
            tel:'1342313123',
            address:'北京市海淀区上地四街',
            face: 'img/qiaobusi.jpg'
        }, {
            id: 4,
            name: '曹操',
            email:'mynmss@126.com',
            tel:'1332313123',
            address:'北京市海淀区上地五街',
            face: 'img/caocao.jpg'

        },{
            id: 5,
            name: '詹天佑',
            email:'123123@qq.com',
            tel:'1312313123',
            address:'北京市海淀区上地一街',
            face: 'img/zhantianyou.jpg'
        }, {
            id: 6,
            name: '达尔文',
            email:'xxxx@163.com',
            tel:'1372313123',
            address:'北京市海淀区上地二街',
            face: 'img/daerwen.jpg'
        }, {
            id: 7,
            name: '马克·吐温',
            email:'venus@yeah.net',
            tel:'1302313123',
            address:'北京市海淀区上地三街',
            face: 'img/maketuwen.jpg'
        }, {
            id: 8,
            name: '马克思',
            email:'zzsdads@gmail.com',
            tel:'1342313123',
            address:'北京市海淀区上地四街',
            face: 'img/makesi.jpg'
        }, {
            id: 9,
            name: '周恩来',
            email:'mynmss@126.com',
            tel:'1332313123',
            address:'北京市海淀区上地五街',
            face: 'img/zhouenlai.jpg'

        }];

        return {
            all: function () {
                return contacts;
            },
            remove: function (chat) {
                contacts.splice(contacts.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id === parseInt(chatId)) {
                        return contacts[i];
                    }
                }
                return null;
            }
        };
    });
