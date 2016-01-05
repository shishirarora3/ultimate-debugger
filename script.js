


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
// Demethodizing the Array method, forEach(),  into a generic "each"
var each = Function.prototype.call.bind([].forEach);

var nodeList = document.querySelectorAll("p");

each(nodeList,bold);

function bold(node){
   node.style.fontWeight ="bold";
}

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
		$('body').dynatable();
		$('body').generateTable(pObjA);
		return pObjA;
	};
	
})();

ct= consoleTableNew;

var data = eval('[{"createAble":false,"updateAble":false,"searchAble":true,"referenceTypes":null,"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Case ID","length":18,"key":"Id","type":"ID"},{"createAble":false,"updateAble":false,"searchAble":true,"referenceTypes":null,"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Deleted","length":0,"key":"IsDeleted","type":"BOOLEAN"},{"createAble":true,"updateAble":true,"searchAble":true,"referenceTypes":["CONTACT"],"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Contact ID","length":18,"key":"ContactId","type":"REFERENCE"},{"createAble":true,"updateAble":true,"searchAble":true,"referenceTypes":["ACCOUNT"],"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Account ID","length":18,"key":"AccountId","type":"REFERENCE"},{"createAble":true,"updateAble":true,"searchAble":true,"referenceTypes":[],"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Asset ID","length":18,"key":"AssetId","type":"REFERENCE"},{"createAble":true,"updateAble":true,"searchAble":true,"referenceTypes":["CASE"],"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Parent Case ID","length":18,"key":"ParentId","type":"REFERENCE"},{"createAble":false,"updateAble":false,"searchAble":true,"referenceTypes":null,"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Closed","length":0,"key":"IsClosed","type":"BOOLEAN"},{"createAble":true,"updateAble":true,"searchAble":true,"referenceTypes":["USER"],"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Owner ID","length":18,"key":"OwnerId","type":"REFERENCE"},{"createAble":false,"updateAble":false,"searchAble":true,"referenceTypes":["USER"],"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Created By ID","length":18,"key":"CreatedById","type":"REFERENCE"},{"createAble":false,"updateAble":false,"searchAble":true,"referenceTypes":null,"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Last Modified Date","length":0,"key":"LastModifiedDate","type":"DATETIME"},{"createAble":false,"updateAble":false,"searchAble":true,"referenceTypes":["USER"],"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Last Modified By ID","length":18,"key":"LastModifiedById","type":"REFERENCE"},{"createAble":false,"updateAble":false,"searchAble":true,"referenceTypes":null,"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"System Modstamp","length":0,"key":"SystemModstamp","type":"DATETIME"},{"createAble":false,"updateAble":false,"searchAble":true,"referenceTypes":null,"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Last Viewed Date","length":0,"key":"LastViewedDate","type":"DATETIME"},{"createAble":false,"updateAble":false,"searchAble":true,"referenceTypes":null,"picklistValues":null,"picklistValuesLabels":null,"controllingFieldKey":null,"pickListFieldValues":null,"required":false,"label":"Last Referenced Date","length":0,"key":"LastReferencedDate","type":"DATETIME"}]');

$(function(){
	$('body').generateTable(data,['label','key','type'])
    .find('table').bootstrapTable({
            data: data,
            idField: 'name',
      	search: true
	});
});



/**
var o=ct(obj[0].associatedAppDataList,['applicationMessageType','applicationParentMessageId']);
$($.makeTable(o)).appendTo("#TableCont");
**/

