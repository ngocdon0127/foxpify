console.log('invoked');
var iframeDisplayed = false;
var iframe = document.createElement('iframe');
iframe.id = 'foxpifyIframe'
iframe.name = 'foxpifyIframe'
iframe.setAttribute('style', 'position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:99999;')
var foxpifyButton = document.createElement('button');
foxpifyButton.id = 'foxpifyButton'
foxpifyButton.innerHTML = '<b>S</b>'
// foxpifyButton.setAttribute('class', 'btn btn-success')
foxpifyButton.addEventListener('click', function (evt) {
	foxpifyButtonClickHandler(evt.target)
})
document.body.append(foxpifyButton)

function foxpifyButtonClickHandler(btn) {
	console.log('invoked');
	iframeDisplayed = !iframeDisplayed;
	if (iframeDisplayed) {
		console.log('clicked');
		document.body.append(iframe)
		window.open('https://ngocdon0127.github.io/foxpify/iframe.html', 'foxpifyIframe')
	} else {
		console.log('now close iframe');
		document.getElementById('foxpifyIframe').remove()
	}
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