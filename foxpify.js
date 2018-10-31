console.log('invoked with url:');
// console.log(window.location); // cannot get by this

var scripts = document.getElementsByTagName('script');
var foxpifyScript = scripts[scripts.length - 1];
// console.log(foxpifyScript.src);
var queryStr = foxpifyScript.src.replace(/^[^\?]+\??/,'');
// console.log(queryStr);

var foxpifyQueryRegex = /shop=([^&]+)/;
var foxpifyQueryMatches = queryStr.match(foxpifyQueryRegex)

if (foxpifyQueryMatches.length < 2) {
	console.log('missing shop domain');
} else {
	console.log('shop:', foxpifyQueryMatches[1]);
}

function ob(x) {
	return document.getElementById(x)
}

var iframeDisplayed = false;
var iframe = document.createElement('iframe');
iframe.id = 'foxpifyIframe'
iframe.name = 'foxpifyIframe'
iframe.setAttribute('style', 'position:fixed; top:0px; right:0px; bottom:0px; width:75%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:99999;')


function renderFoxpifyButton() {
	var foxpifyButton = document.createElement('button');
	foxpifyButton.id = 'foxpifyButton'
	foxpifyButton.innerHTML = '<b>S</b>'
	// foxpifyButton.setAttribute('class', 'btn btn-success')
	foxpifyButton.addEventListener('click', function (evt) {
		foxpifyButtonClickHandler(evt.target)
	})
	document.body.append(foxpifyButton)
}

renderFoxpifyButton()

function foxpifyButtonClickHandler(btn) {
	console.log('invoked');
	// iframeDisplayed = !iframeDisplayed;
	// if (iframeDisplayed) {
		console.log('clicked');
		document.body.append(iframe)
		// window.open('https://ngocdon0127.github.io/foxpify/iframe.html', 'foxpifyIframe')
		window.open('iframe.html', 'foxpifyIframe')
	// } else {
	// 	console.log('now close iframe');
	// 	document.getElementById('foxpifyIframe').remove()
	// }
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
		width: 50px;
		height: 50px;
		position: fixed;
		bottom: 25px;
		right: 25px;
		z-index: 999999;
		cursor: pointer;
	}

	#foxpifyButton:hover {
		background-color: #5fc15f;
	}
</style>`

document.body.append(btnStyle)
console.log('here');

window.addEventListener('message', function (msg) {
	// console.log(msg);
	try {
		var data = JSON.parse(msg.data);
		if (data.msg == 'closeFoxpifyIFrame') {
			console.log(msg);
			ob('foxpifyButton').style.display = 'block'
			document.getElementById('foxpifyIframe').remove()
		} else {

		}
	} catch (e) {
		// console.log(e);
	}
})