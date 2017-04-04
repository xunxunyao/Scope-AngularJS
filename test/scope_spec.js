/**
 * Created by yaoxunxun on 2017/3/24.
 */

/*jshint globalstrict:true*/
/*global Scope:false*/
'use strict';
describe('Scope',function () {
    it("can be constructed and used as an object",function () {
        var scope=new Scope();
        scope.aProperty=1;
        expect(scope.aProperty).toBe(1);
    });
    describe('digest',function () {
        var scope;
        beforeEach(function () {
            scope=new Scope();
        });
        it('calls this listener function of a watch on first $digest',function () {
            var watchFn=function () {
                return 'wat';
            };
            var listenerFn=jasmine.createSpy();//模拟一个函数，方便的回答这个函数是否被调用，使用哪个参数等
            scope.$watch(watchFn,listenerFn);
            scope.$digest();
            expect(listenerFn).toHaveBeenCalled();//，$digest执行了以后，listenerFn这个函数是否有被调用
        });
        it("calls the watch function with the scope as the argument",function(){
            var watchFn = jasmine.createSpy();
            var listenerFn = function(){};
            scope.$watch(watchFn,listenerFn);

            scope.$digest();

            expect(watchFn).toHaveBeenCalledWith(scope);
        });
        it("calls the listener function when the watched value changes", function() {
            scope.someValue = 'a';
            scope.counter = 0;
            scope.$watch(
                //监视函数是返回变化的数据，这个数据是存在scope中的某个东西
                function(scope) { return scope.someValue; },
                //每次发生变化，计数器的值就+1
                //有新值和旧值可以方便的直到发生了什么变化
                function(newValue, oldValue, scope) { scope.counter++; }
            );
            expect(scope.counter).toBe(0);
            scope.$digest();
            expect(scope.counter).toBe(1);
            scope.$digest();
            expect(scope.counter).toBe(1);
            scope.someValue = 'b';
            expect(scope.counter).toBe(1);
            scope.$digest();
            expect(scope.counter).toBe(2);
        });

    })
});
