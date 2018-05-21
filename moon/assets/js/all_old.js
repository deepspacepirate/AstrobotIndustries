var s = story.state;
s.readSpeed = 100;
s.player = {
	name: '',
	socksCollected: 0,
	robotsAggravated: 0,
	equipmentBusted: 0,
	aviorAffinity: 0
};

const modes = {
	Overwrite: "overwrite", 
	Append: "append"
};

var TxtType = function(el, toRotate, period, speed, loop, mode) {
	this.el = el; // element to place text
	this.toRotate = toRotate; // array of strings
	this.period = parseInt(period, 10) || 1000; // pause after line
	this.speedMult = parseInt(speed, 10) || 1;
	this.typeSpeed = s.readSpeed * this.speedMult;
	this.loop = loop || false; // whether to loop text
	this.mode = mode || modes.Append;
	
	this.txt = ''; // contents of element
	this.txtPos = 0;
	this.isDeleting = false;
	this.loopNum = 0;
	this.tick();
};

TxtType.prototype.tick = function() {
	var that = this;

	if (document.getElementById("speedSlider") != null){
		document.getElementById("speedSlider").oninput = function() {
			s.readSpeed = this.max - this.value;
			that.typeSpeed = that.speedMult * s.readSpeed;
		};
	}

	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];
	
	var go = this.loop || !(this.loopNum == this.toRotate.length-1  && this.txtPos == fullTxt.length-1);
	
	switch(this.mode){
		case (modes.Overwrite):

			// delta control
			var delta;

			if (this.isDeleting) {
				var len = this.txt.length;
				this.txt = this.txt.substring(0, len - 1);
				this.el.innerHTML = '<span class="wrap active">'+this.txt+'</span>';
			}
			else {
				if (fullTxt.charAt(this.txtPos) === '@') delta = 800;
				else {
					delta = this.typeSpeed - Math.random() * 100;
					this.txt += fullTxt.charAt(this.txtPos);
					this.el.innerHTML = '<span class="wrap active">'+this.txt+'</span>';
				}
				this.txtPos++;
			}

			if (this.isDeleting) delta /= 3;

			if (!this.isDeleting && this.txtPos == fullTxt.length) {
				delta = this.period;
				this.isDeleting = true;
			}

			else if (this.isDeleting && this.txt === '') {
				delta = 500; // pause before restart typing
				this.isDeleting = false;
				this.loopNum++;
				this.txtPos = 0;
				console.log('done deleting');
			}

			break;

		case (modes.Append):

			if (this.txtPos == 0) this.el = document.getElementsByClassName('wrap')[this.loopNum];
			if (this.txtPos == 1) this.el.classList.add('active');

			this.el.scrollIntoView({behavior: 'smooth'});
			
			var delta = this.typeSpeed - Math.random() * 100;

			if (fullTxt.charAt(this.txtPos) === '@') delta = 800;
			else {
				this.txt += fullTxt.charAt(this.txtPos);
				this.el.innerHTML = this.txt;
			}

			this.txtPos++;

			// at the end of line, but not end of array
			if (this.txtPos == fullTxt.length) {
				this.el.classList.remove('active');
				this.txt = '';
				this.txtPos = 0;
				this.loopNum++;
				delta = this.period;
					
				if (go){
					var parent = this.el.parentElement.parentElement;
					parent.innerHTML = parent.innerHTML  + '<p><span class="wrap"></span></p>'
				}
			}

			break;
	}

	if (go) setTimeout( function(){that.tick();} , delta);
	else {
		console.log('stopped');
		var choiceBoxEl = document.getElementsByClassName('choiceBox')[0];
		choiceBoxEl.classList.remove('disappeared');
		choiceBoxEl.scrollIntoView({behavior: 'smooth'});
	}
};

window.onload = function() {
	if (document.getElementsByClassName('typewrite').length > 0)
		callTerminal();
}

function callTerminal(){
	if (document.getElementsByClassName('choiceBox typewritePair').length > 0)
		document.getElementsByClassName('choiceBox typewritePair')[0].classList.add('disappeared');
	var elements = document.getElementsByClassName('typewrite');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		var speed = elements[i].getAttribute('data-speed');
		var loop = elements[i].getAttribute('data-loop');
		var mode = elements[i].getAttribute('data-mode');
		if (toRotate) {
		  new TxtType(elements[i], JSON.parse(toRotate), period, speed, loop, mode);
		}
	}
}