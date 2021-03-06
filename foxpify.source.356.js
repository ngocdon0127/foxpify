function initFoxpify() {
	// console.log('invoked with url:');
	// var foxpifyIframeUrl = 'iframe.html'
	var foxpifyIframeUrl = 'https://lucky-wheel.foxpify.com/ui/iframe.html'
	// var foxpifyIframeUrl = 'https://ngocdon0127.github.io/foxpify/iframe.html'
	// console.log(window.location); // cannot get by this

	var scripts = document.getElementsByTagName('script');
	// console.log(`total ${scripts.length} scripts imported`);
	var foxpifyScript = -1;
	for(var i = 0; i < scripts.length; i++) {
		var s = scripts[i]
		// console.log(s);
		// console.log('script src:', s.src)
		if (s.src && /\/foxpify\.js/.test(s.src)) {
			// foxpify script tag
			foxpifyScript = i
		}
	}
	if (foxpifyScript == -1) {
		// console.log('foxpify script not found');
		return
	}
	foxpifyScript = scripts[foxpifyScript];
	// console.log('src:', foxpifyScript.src);
	var queryStr = foxpifyScript.src.replace(/^[^\?]+\??/,'');
	// console.log('query:', queryStr);

	var foxpifyQueryRegex = /shop=([^&]+)/;
	var foxpifyQueryMatches = queryStr.match(foxpifyQueryRegex)

	if (!foxpifyQueryMatches || (foxpifyQueryMatches.length < 2)) {
		// console.log('missing shop domain');
		return
	} else {
		// console.log('shop:', foxpifyQueryMatches[1]);
	}

	function ob(x) {
		return document.getElementById(x)
	}

	var foxpifyIframeEle = document.createElement('iframe');
	foxpifyIframeEle.id = 'foxpifyIframe'
	foxpifyIframeEle.name = 'foxpifyIframe'
	foxpifyIframeEle.setAttribute('style', 'position:fixed; top:0px; left:0%; bottom:0px; width:100%; height:100%; border:none; padding:0; margin-top: 0; overflow:hidden; z-index:99999;')


	function renderFoxpifyButton() {
		// var foxpifyButton = document.createElement('button');
		var foxpifyButton = document.createElement('img');
		foxpifyButton.id = 'foxpifyButton'
		// foxpifyButton.innerHTML = '<b>S</b>'
		foxpifyButton.src = "https://lucky-wheel.foxpify.com/ui/gambler.png";
		// foxpifyButton.setAttribute('class', 'btn btn-success')
		foxpifyButton.addEventListener('click', function (evt) {
			foxpifyButtonClickHandler(evt.target)
		})
		document.body.append(foxpifyButton)
		setTimeout(function () {
			foxpifyButton.style.transform = 'rotateZ(2160deg)'
			foxpifyButton.style.transition = 'linear 1s'
			foxpifyButton.style.width = '100px'
			foxpifyButton.style.height = '100px'
			foxpifyButton.style.right = '0px'
			foxpifyButton.style.bottom = '0px'
			foxpifyButton.style.opacity = '0.9'

			setTimeout(function () {
				foxpifyButton.style.transform = 'rotateZ(0deg)'
				foxpifyButton.style.width = '50px'
				foxpifyButton.style.height = '50px'
				foxpifyButton.style.right = '25px'
				foxpifyButton.style.bottom = '25px'
				setTimeout(function () {
					foxpifyButton.style.transition = 'linear 0.2s'
					// foxpifyButton.style.transform = 'rotateZ(0deg)'
				}, 1000)
			}, 1000)
		}, 1000)
	}

	// $.ajax({
 //    url: `https://dev.foxpify.com:50001/luckywheel/campaigns/${foxpifyQueryMatches[1]}`,
 //    headers: {
 //        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjcsInNob3AiOiJsdWNreS13aGVlbC1kZW1vLm15c2hvcGlmeS5jb20iLCJpYXQiOjE1MzkwOTg2MDB9.iBOQUa2MZKmv7UDEWAUy5m7i5SXTtF9qyw7jAExV4YI'
 //    },
 //    success: function (res) {
 //      if (res.hasOwnProperty('id')) {
 //      	var c = {}
	// 			try {
	// 				c = JSON.parse(foxpifyGetCookie('foxpify'))
	// 			} catch (e) {

	// 			}
	// 			if (!c.hasOwnProperty(data.campaignId)) {
	// 				renderFoxpifyButton()
	// 			}
 //      }
 //    },
 //    error: function (err) {
 //    	console.log(err);
 //    }
 //  })

  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function (status) {
  	// console.log(this.readyState);
  	// console.log(this.status);
  	if ((this.readyState == 4) && (this.status == 200)) {
  		// console.log(this.responseText);
  		var res = {}
  		try {
  			res = JSON.parse(this.responseText)
  		} catch (e) {
  			// console.log(e);
  		}
  		// console.log(res);
  		if (res.hasOwnProperty('id')) { // has 1 campaign running
  			var c = {}
				try {
					c = JSON.parse(foxpifyGetCookie('foxpify'))
				} catch (e) {

				}
				if (!c.hasOwnProperty(res.id)) {
					renderFoxpifyButton()
				}
				if (!c.hasOwnProperty('auto-open-popup-' + res.id)) {
					// new campaign. auto open popup
					foxpifyButtonClickHandler(document.getElementById('foxpifyButton'));
				}
  		}
  	}
  }
  xhr.open('GET', `https://lucky-wheel.foxpify.com/api/campaigns/${foxpifyQueryMatches[1]}`)
  xhr.send()

	function foxpifyButtonClickHandler(btn) {
		// console.log('invoked');
		// console.log('clicked');
		document.body.append(foxpifyIframeEle)
		window.open(foxpifyIframeUrl, 'foxpifyIframe')
		ob('foxpifyButton').style.display = 'none'
	}

	var btnStyle = document.createElement('div');
	btnStyle.innerHTML = 
	`<style>
		#foxpifyButton {
			background-color: #5cb85c;
			border: none;
			border-radius: 50%;
			color: #fff;
			width: 20px;
			height: 20px;
			position: fixed;
			bottom: 40px;
			right: 40px;
			z-index: 999999;
			cursor: pointer;
			opacity: 0.0;
			transition: linear 0.2s;
		}

		#foxpifyButton:hover {
			background-color: #5fc15f;
			width: 60px !important;
			height: 60px !important;
			bottom: 20px !important;
			right: 20px !important;
			opacity: 1;
			transform: rotateZ(360deg) !important;
		}
	</style>`

	document.body.append(btnStyle)
	// console.log('here');

	window.addEventListener('message', function (msg) {
		// console.log(msg);
		var data = {}
		try {
			var data = JSON.parse(msg.data);
		} catch (e) {
			// console.log(e);
		}
		if (data.msg == 'closeFoxpifyIFrame') {
			// console.log(msg);
			ob('foxpifyButton').style.display = 'block'
			document.getElementById('foxpifyIframe').remove()
			// mark that user clicked close-button
			// 'auto-open-popup-' + res.id
			var c = {}
			try {
				c = JSON.parse(foxpifyGetCookie('foxpify'))
			} catch (e) {

			}
			c['auto-open-popup-' + data.campaignId] = false
			foxpifySetCookie('foxpify', JSON.stringify(c))
		} else if (data.msg == 'iframeInitialized') {
			foxpifyIframeEle.contentWindow.postMessage(JSON.stringify({
				msg: 'initialize',
				shop: foxpifyQueryMatches[1]
			}), '*')
			// console.log('message initialize sent to iframe');
		} else if (data.msg == 'markUser') {
			var c = {}
			try {
				c = JSON.parse(foxpifyGetCookie('foxpify'))
			} catch (e) {

			}
			if (c.hasOwnProperty(data.campaignId) && (c[data.campaignId] instanceof Array)) {
				c[data.campaignId].push(data.email)
			} else {
				c[data.campaignId] = [data.email]
			}
			foxpifySetCookie('foxpify', JSON.stringify(c))
		}
	})
}

function foxpifySetCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function foxpifyGetCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

initFoxpify()