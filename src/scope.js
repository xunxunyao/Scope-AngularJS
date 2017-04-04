/**
 * Created by yaoxunxun on 2017/4/2.
 */
/* jshint globalstrict: true */
'use strict';
function Scope() {
    //存储所有被注册的监听器
    //$$在AngularJS中哦被认为是私有变量，不应该被外部调用
    this.$$watchers = [];
    //想要每一个Scope对象都有$watch函数，将它添加到Scope原型中；
    //todo $watch就是监听对象，将进行相应操作的listenerFn存储起来
    Scope.prototype.$watch = function (watchFn, listenerFn) {
        var watcher = {
            watchFn: watchFn,
            listenerFn: listenerFn
        };
        this.$$watchers.unshift(watcher);//将监听器存储到$$watchers数组，添加到数组开头
    };
    //todo $digest就是调用所有的监听函数listenerFn
    Scope.prototype.$digest = function() {
        var length = this.$$watchers.length;
        var watcher;
        //注意到我们在开始时正向添加监视器数组然后逆序迭代它。这样的做法将会让我们在实现移除监视器时轻松一点
        while (length--) {
            watcher = this.$$watchers[length];
            watcher.listenerFn();
        }
    };
}