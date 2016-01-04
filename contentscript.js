
/*
print({a1:{a:'1',b:'2'},b1:{a:'11',b:'21'}});
*/
var nodE = document.head||document.documentElement;
var s = document.createElement('script');
s.src = chrome.extension.getURL('jquery.js');
s.onload = function() {
		var s2 = document.createElement('script');
		s2.src = chrome.extension.getURL('generate-table.js');
		s2.onload = function() {
				
		};
		nodE.appendChild(s2);


		var s3 = document.createElement('script');
		s3.src = chrome.extension.getURL('script.js');
		s3.onload = function() {
			//nodE.appendChild(s);
		};

		nodE.appendChild(s3);
};

nodE.appendChild(s);

 













