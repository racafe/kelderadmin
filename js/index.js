			document.addEventListener("touchmove", function(e){
				e.preventDefault();
			  });
			document.addEventListener("deviceready", init, false);
			function init() {
				document.querySelector("#scan").addEventListener("click", startScan, false);
				navigator.notification.vibrate(2500);
				
				setTimeout(function(){
					$('#splash').fadeOut(function(){
						StatusBar.overlaysWebView(true);
						StatusBar.show();
					});
				},3000);
			}
			
			function startScan() {
				$('#scan').fadeOut('fast');
				cordova.plugins.barcodeScanner.scan(
					function (result) {
						if(!result.cancelled){
							navigator.notification.vibrate(2500);
							result = result.text;
							var res = result.split("size=100x100");
							if(res[0]!=undefined){
								$.ajax({
									url: "http://soporte.technit.com.mx/Kelder/responses/checkQR.php",
									dataType: "jsonp",
									data: {qr:res[0]},
									timeout:3000,
									success: function (response) {
										if(response.success){
											$('#found').fadeIn('fast',function(){
												$('#found h2').html(response.nombre);
												$('#found h4 span').html(response.descuento);
											});
										}else{
											$('#notfound').fadeIn();
										}
									},
									error: function(objRequest,errortype){
										alert("Ocurrió un error. Favor de intentar nuevamente");
									}
								});
							}else{
								$('#notfound').fadeIn();
							}
						}else{
							$('#scan').fadeIn('fast');
						}
					}, 
					function (error) {
						alert("Ocurrió un error. Favor de intentar nuevamente");
						//$('#notfound').fadeIn();
					}
				);
			}
			function rescan(){
				$('#found').fadeOut('fast',function(){
					$('#found h2').html('&nbsp;');
					$('#found h4 span').html('&nbsp;');
					$('#scan').fadeIn('fast');
				});
			}