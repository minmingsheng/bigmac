// ****************************************************************************
// *                                  status                                  *
// ****************************************************************************
var tabToday = true;
var tabNotifications = false;


// ****************************************************************************
// *                                    img                                   *
// ****************************************************************************

var img = {
	wApple: "images/apple.png",
	blurBg:"images/blurBg-03.jpg",
	portrait:"images/portrait-04.png",
	load:"images/load.gif",
	toolBar: "images/toolBar-18.png",
	apple: "images/apple.png",
	battery: "images/battery-20.png",
	ampifier: "images/ampifier-21.png",
	sidemenu: "images/sidemenu-22.png"
};
var btnImg = {
	sleep: "images/Sleep-04.png",
	shut: "images/shut-06.png",
	restart: "images/restart-05.png",
}
// ****************************************************************************
// *                                 component                                *
// ****************************************************************************

/*loading page*/
var LoadingPage = {
	el: document.createElement("div"),
	template: "<div class='centerbox'><img src=" + img.wApple +" alt='' /><div class='loadBar'><div></div></div></div>",
	className: ["loadingPage"],
	addFn: function(){
		/*render*/
		this.el.classList.add(this.className[0]);
		this.el.innerHTML = this.template;
		document.body.appendChild(this.el)
		/*animation callback*/
		var _this = this;
		animated(this.el.querySelector(".loadBar>div"), function(){
			_this.el.remove();
			LogIn.addFn();
			LogIn.click();
		});


	},
	removeFn: function(){
		this.el.remove();
	}
}

/*desktop*/
// <div class="logIn"></div>

var ThreeBtn = {
	template1: "<div><img src='"+btnImg.sleep+"'/></div>",
	template2: "<div><img src='"+btnImg.shut+"'/></div>",
	template3: "<div><img src='"+btnImg.restart+"'/></div>"
}

var LogIn = {
	el: document.createElement("div"),
	template: "<div class='centerbox'><div class='circle'><img src="+img.portrait+"  /></div><p>Jason Sheng</p><div class='logIn-threeBtn'>"+ThreeBtn.template1+ThreeBtn.template2+ThreeBtn.template3+"</div></div>",
	className: ["logIn"],
	addFn: function(){
		/*render*/
		this.el.classList.add(this.className[0]);
		this.el.innerHTML = this.template;
		document.body.appendChild(this.el);
		/*animation callback*/
	},
	click: function(){
		var c = this.el.querySelector('.circle');
		console.info("ccccc:", c);
		c.addEventListener("click", onclick);
		c.addEventListener("touchstart", onclick);
		function onclick(){
			console.info(this);
			Input.addFn();
		}
	}
}

/*child of LogIN*/
var Input = {
	el: document.createElement("div"),
	template: "<i></i><div><input type='password' placeholder='Enter Passwoord'></div>",
	className:['logIn-input'],
	addFn: function(){
		this.el.classList.add(this.className[0]);
		this.el.innerHTML = this.template;
		LogIn.el.querySelector('.centerbox').appendChild(this.el);
		var arrow = this.el.querySelector("i");

		arrow.addEventListener("click", onclick);
		arrow.addEventListener("touchstart", onclick);
		function onclick(){
			this.parentElement.classList.add("dispear");
			var _this = this;
			animated(this.parentElement, function(){
				_this.parentElement.classList.remove("dispear");
				_this.parentElement.remove();
			})
			
		}

		var input = this.el.querySelector("input");
		input.addEventListener("keydown", onKeyDown);
		function onKeyDown(e){
			if(e.keyCode == 13) {
				addLoad();
				this.parentElement.parentElement.remove();
				console.log(this.parentElement.parentElement);
				setTimeout(function(){
					LogIn.el.remove();
					Desktop.addFn(); /*<----------------*/
					ToolBar.addFn(); /*<----------------*/
				}, 2000)
			}
		}
		function addLoad(){
			var parent = document.querySelector(".centerbox");
			var load = document.createElement("div");
			load.style.marginTop = "2em";
			load.innerHTML = "<img src="+img.load+" />";
			parent.appendChild(load);

		}
	}
}

/******************************* Desktop ********************************/
var Desktop = {
	el: document.createElement("div"),
	template: "",
	className:['desktop'],
	addFn: function(){
		this.el.classList.add(this.className[0]);
		this.el.innerHTML = this.template;
		document.body.appendChild(this.el);
	}
}

var ToolBar = {
	el: document.createElement("div"),
	template:"",
	className:['toolBar'],
	addFn: function(){
		this.el.classList.add(this.className[0]);
		this.el.innerHTML = this.template;
		Desktop.el.appendChild(this.el);
		this.el.appendChild(toolBarMenu.el()) /*<-----------*/
		toolBarMenu.activeSideMenu()
	}
}

// child of ToolBar
var toolBarMenu = {
	leftTemplate: "<div><img src=" + img.apple + "  /></div><div>JASON</div><div>File</div><div>Edit</div><div>View</div><div>Go</div><div>Window</div><div>About Me</div>",
	rightTemplate: "<div>Sat</div><div>Apr</div><div>Tue</div><div>01:27:00</div><div><img src="+ img.ampifier +"  /></div><div><img class='sidemenu' src="+ img.sidemenu +"  /></div>",
	el : function(){
		var el = document.createElement("div");
		el.setAttribute("class", "menu")
		el.innerHTML = "<div>"+this.leftTemplate+"</div>";
		el.innerHTML += "<div>"+this.rightTemplate+"</div>";
		return el;
	},
	activeSideMenu: function(){
		var t = document.querySelector(".sidemenu");
		t.addEventListener("mousedown", onclick);
		var toggle = true;
		function onclick(){
			if(toggle){
				sideMenu.addFn();
				setTimeout(function(){
				sideMenu.el.style.right = '0';
				}, 2);
				toggle = false;
			}else{
				sideMenu.el.style.right = '-18em';
				toggle = true
			}
			
		}
	}
}
// child of Desktop
var sideMenu = {
	el: document.createElement("div"),
	className: ["slideMenu"],
	addFn: function(){
		console.log("asdasdsasaadsa");
		this.el.classList.add(this.className[0])
		this.el.innerHTML = "";
		Desktop.el.appendChild(this.el);
		this.el.appendChild(sideMenuTab.addFn());/*<-----------------*/
		var today = document.querySelector(".today");
		var notifications = document.querySelector(".notifications");
		var tabs = [today,notifications];
		today.addEventListener("click", onMouseDownT);
		notifications.addEventListener("click", onMouseDownN);
		function onMouseDownT(){
			var b = new RegExp("activeTab").test(this.className);
			if(b){
				//when today tab already actived, set light color when active
				if (tabToday) {
					this.addEventListener("mousedown", function(){
						this.classList.add('tabBackgrond')
					})
					this.addEventListener("mouseup", function(){
						this.classList.remove('tabBackgrond')
					})
				}else{
					return
				};
				return
			}else{
				this.classList.add("activeTab");
				notifications.classList.remove("activeTab");
				tabToday = true;
				tabNotifications = false;
			}
		}
		function onMouseDownN(){
			var b = new RegExp("activeTab").test(this.className);
			if(b){
				//when today tab already actived, set light color when active
				if (tabNotifications) {
					this.addEventListener("mousedown", function(){
						this.classList.add('tabBackgrond')
					})
					this.addEventListener("mouseup", function(){
						this.classList.remove('tabBackgrond')
					})
				}else{
					return
				};
				return
			}else{
				this.classList.add("activeTab");
				today.classList.remove("activeTab");
				tabToday = false;
				tabNotifications = true;
			}
		}
		this.el.appendChild(todayContainer.addFn());/*<------------------*/
	}
}

// child of sidemenu
var sideMenuTab = {
	el: document.createElement("div"),
	className : ["sideMenuTab"],
	addFn: function(){
		this.el.classList.add(this.className[0]);
		this.el.innerHTML = "<div class='today activeTab'>Today</div><div class='notifications'>Notifications</div>";
		return this.el;
	}
}

// child of sidemenu
var todayContainer = {
	el: document.createElement("div"),
	className : ["todayContainer"],
	addFn: function(){
		this.el.classList.add(this.className[0]);
		this.el.innerHTML = "<div class='resume-title'>Resume</div>";
		this.el.innerHTML += "<h1 class='todayBody'>Jason Sheng</h1>"; /*temp*/
		this.el.innerHTML += "<p>Jason Sheng</p>"; /*temp*/
		this.el.innerHTML += "<p>Jason Sheng</p>"; /*temp*/
		this.el.appendChild(todayTitle.addFn()) /*<-----------*/
		return this.el;
	}
}

var titles = ["Education","Proficiencies","Personal Skill"];
//child of todayContainer
var todayTitle = {
	el: document.createElement("div"),
	className : ["todayTitle"],
	addFn: function(){
		this.el.classList.add(this.className[0]);
		var inner;
		this.el.innerHTML = "";
		for (var i = 0; i < titles.length; i++) {
			var title = document.createElement("div");
			title.classList.add("todayTitles");
			title.textContent = titles[i];/*<-----------*/
			this.el.appendChild(title);
		};
		return this.el;
	}
}

// ****************************************************************************
// *                                  render                                  *
// ****************************************************************************

LoadingPage.addFn();



// ****************************************************************************
// *                                  helper                                  *
// ****************************************************************************

function animated(el, fn){
	el.addEventListener("webkitAnimationEnd", fn,false);
	el.addEventListener("animationend", fn,false);
	el.addEventListener("oanimationend", fn,false);
}