/**
 * Created by yaoxunxun on 2017/4/2.
 */
/* jshint globalstrict: true */
'use strict';
function Scope() {
    //存储所有被注册的监听器
    //$$在AngularJS中哦被认为是私有变量，不应该被外部调用
    this.$$watchers = [];
}
//JavaScript中的函数是所谓的引用值 - 它们除了自己谁都不相等
function initWatchVal() {
    
}
//想要每一个Scope对象都有$watch函数，将它添加到Scope原型中；
//todo $watch就是返回变化的数据，将进行相应操作的listenerFn存储起来
Scope.prototype.$watch = function (watchFn, listenerFn) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function() {},
        last: initWatchVal
    };
    this.$$watchers.unshift(watcher);//将监听器存储到$$watchers数组，添加到数组开头
};
//todo $digest就是判断是否有变化，调用所有的监听函数listenerFn
//$digest函数的职责是调用监视函数并将它的返回值与上一次的返回值进行对比。
//如果两次的返回值不同，那么监视器就是dirty的，并且他的监听器函数应该被调用。
Scope.prototype.$$digestOnce = function () {
    var length = this.$$watchers.length;
    var watcher, newValue, oldValue,dirty;
    //注意到我们在开始时正向添加监视器数组然后逆序迭代它。这样的做法将会让我们在实现移除监视器时轻松一点
    while (length--) {
        watcher = this.$$watchers[length];
        newValue = watcher.watchFn(this);
        oldValue = watcher.last;
        if(newValue !== oldValue){
            watcher.last = newValue;
            watcher.listenerFn(newValue, oldValue, this);
            dirty=true;
        }
    }
    return dirty;
};
//$digest现在会在所有的监视器上至少运行一次。
//如果，在第一次循环后，被监视的值改变了，那么这次循环被标记为dirty，所有的监视器将会运行第二次。
//循环将会一直进行到没有任何监视值发生变化并且状态稳定为止。
Scope.prototype.$digest = function(){
    var dirty;
    do {
        dirty = this.$$digestOnce();
    } while (dirty);
};