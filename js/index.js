/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
//        document.addEventListener('deviceready',this.onDeviceReady, false);
		document.addEventListener('deviceready',this.scan, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
//        document.getElementById('encode').addEventListener('click', this.encode, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    scan: function() {
        console.log('scanning');
        document.getElementById('scan').style.display = "none";
		document.getElementById('logo').style.display = "none";
        cordova.plugins.barcodeScanner.scan( function (result) { 
/*            alert("We got a barcode\n" + 
            "Result: " + result.text + "\n" + 
            "Format: " + result.format + "\n" + 
            "Cancelled: " + result.cancelled);  
*/
			if(!result.cancelled){
				navigator.notification.vibrate(2500);
				result = result.text;
				alert(result);
				var res = result.split("size=100x100");
				if(res[0]!=undefined){
					alert(res[0]);
					$.ajax({
						url: "http://soporte.technit.com.mx/Kelder/checkQR.php",
						dataType: "jsonp",
						data: {qr:res[0]},
						timeout:3000,
						success: function (response) {
							if(response.success){
								document.getElementById('body').style.backgroundColor = "#4B946A";
								document.getElementById('title').innerHTML = res[1]+"<br>CORRECTO";
								setTimeout(function(){ document.getElementById('title').innerHTML = ""; document.getElementById('scan').style.display = "block"; document.getElementById('logo').style.display = "block"; document.getElementById('body').style.backgroundColor = "#fff"; },3000);
							}else{
								document.getElementById('body').style.backgroundColor = "#f33";
								document.getElementById('title').innerHTML = "INCORRECTO";
								setTimeout(function(){ document.getElementById('title').innerHTML = ""; document.getElementById('scan').style.display = "block"; document.getElementById('logo').style.display = "block"; document.getElementById('body').style.backgroundColor = "#fff"; },3000);
							}
						},
						error: function(objRequest,errortype){
							document.getElementById('body').style.backgroundColor = "#f33";
							document.getElementById('title').innerHTML = "INCORRECTO";
							setTimeout(function(){ document.getElementById('title').innerHTML = ""; document.getElementById('scan').style.display = "block"; document.getElementById('logo').style.display = "block"; document.getElementById('body').style.backgroundColor = "#fff"; },3000);	
						}
					});
				}else{
					document.getElementById('body').style.backgroundColor = "#f33";
					document.getElementById('title').innerHTML = "INCORRECTO";
					setTimeout(function(){ document.getElementById('title').innerHTML = ""; document.getElementById('scan').style.display = "block"; document.getElementById('logo').style.display = "block"; document.getElementById('body').style.backgroundColor = "#fff"; },3000);
				}
			}else{
				document.getElementById('title').innerHTML = "";
				document.getElementById('scan').style.display = "block";
				document.getElementById('logo').style.display = "block";
				document.getElementById('body').style.backgroundColor = "#fff";
			}

        }, function (error) { 
            console.log("Scanning failed: ", error); 
			document.getElementById('title').innerHTML = "";
			document.getElementById('scan').style.display = "block";
			document.getElementById('logo').style.display = "block";
			document.getElementById('body').style.backgroundColor = "#fff";
        } );
    }
};
