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
        })
    })
});