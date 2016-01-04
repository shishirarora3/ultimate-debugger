(function($) {
    $.eventReport = function(selector, root) {
        var s = [];
        $(selector || '*', root).addBack().each(function() {
            var e = $._data(this, 'events');
            if(!e) return;
            var tagGroup = this.tagName || "document";
            if(this.id) tagGroup += '#' + this.id;
            if(this.className) tagGroup += '.' + this.className.replace(/ +/g, '.');

            var delegates = [];
            for(var p in e) {
                var r = e[p];
                var h = r.length - r.delegateCount;

                if(h)
                    s.push([tagGroup, p + ' handler' + (h > 1 ? 's' : '')]);

                if(r.delegateCount) {
                    for(var q = 0; q < r.length; q++)
                        if(r[q].selector) s.push([tagGroup + ' delegates', p + ' for ' + r[q].selector]);
                }
            }
        });
        return s;
    }
    $.fn.eventReport = function(selector) {
        return $.eventReport(selector, this);
    }
})(jQuery);




//print in tabular form


/*
usage:

console.table($.eventReport())
require('backbone').Notifications.on("all", function(){
    console.log(arguments);
});

console.table.new(object, arrayOfColumnPaths);

arrayOfColumns would be like ['id','author.book.reviewer']

if object is of type array => rows will be indeces of this array

if object is of type object => rows will be keys of this object

ct([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);

ct({r1:{c1:1, c2:2, c3:3}, r2:{c1:"foo", c2:false, c3:undefined}});

ct([[1,2,3], [2,3,4]]);

columns will be sortable too :)

*/
var stringConversion = function(tempVal, curFinalizeValIter){
				var tempValType = [].toString.apply(tempVal||[]), resultString='';	
				if((tempValType.indexOf('Object') !== -1 || tempValType.indexOf('Arguments') !== -1)&& curFinalizeValIter<20){
					resultString += JSON.stringify(tempVal);
				}else{
					resultString += tempVal;
				}
				return resultString;
			},
finalizeVal = function(obj){
				var totalKeys = Object.keys(obj),
				scopeOuter = this,
				resultObj,
				columnKeys = this.columnKeys;
				

			resultObj = totalKeys.reduce(function(result,key,index){
				var tempVal = obj[key];
				result[key] = stringConversion(tempVal, 0);
				return result;
			},{});
			return	resultObj;
},
objectAdapter = function(orig,columnKeys){
	if(Array.isArray(orig) && columnKeys){
				var objArray =[],
				keyPaths = {};
			orig.forEach(function(obj){
				var newObj ={};
				columnKeys.forEach(function(key){
				
					newObj[key] = eval("obj" + JSON.stringify(key.split('.')).replace(',',']['));

				});
				objArray.push(newObj);
			});
			console.log(objArray);
			orig = objArray;
		}
		return orig;
},
consoleTableNew = (function(){
	return function(){
		var res, pObjA ={},//[],
		orig = arguments[0],
		columnKeys = arguments[1],
		totalKeys,
		typeOfString = typeof(orig);
		orig = objectAdapter(orig, columnKeys);
		totalKeys = Object.keys(orig);
		totalKeys.forEach(function(currentKey){
			var scope = {
					finalizeValIter: 0,
					finalVal: {},
					obj : {},
					typeOfString: typeOfString,
					columnKeys:columnKeys
			},
			obj = orig[currentKey];

			pObjA[currentKey] = finalizeVal.call(scope,obj);
		});
		console.table(pObjA);
		$('body').generateTable(pObjA);
		return pObjA;
	};
	
})();

ct= consoleTableNew;






/**
var o=ct(obj[0].associatedAppDataList,['applicationMessageType','applicationParentMessageId']);
$($.makeTable(o)).appendTo("#TableCont");
**/

