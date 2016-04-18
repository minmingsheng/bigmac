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
	sidemenu: "images/sidemenu-22.png",
	questionMark: "images/questionMark-23.png",
	toolbarInfo: "images/toolbar-info.png",
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
				}, 2000)
			}
		}
		function addLoad(){
			var parent = document.querySelector(".centerbox");
			var load = document.createElement("div");
			load.style.marginTop = "2em";
			load.innerHTML = "<img src="+img.load+" style='opacity:0.5' />";
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
		ToolBar.addFn(); /*<----------------*/
		Dock.addFn(); /*<-----------------*/
	}
}

// child of Desktop
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

var Dock = {
	el: document.createElement("div"),
	template: "",
	className: ["dock"],
	addFn: function(){
		this.el.classList.add(this.className[0]);
		this.el.innerHTML = "<h1>Dock</h1>";
		Desktop.el.appendChild(this.el);
	}
}

// child of ToolBar
var toolBarMenu = {
	leftTemplate: "<div><img src=" + img.apple + "  /></div><div>JASON</div><div>File</div><div>Edit</div><div>View</div><div>Go</div><div>Window</div><div>About Me</div>",
	rightTemplate: "<div class='day'>Tue</div><div class='month'>Apr</div><div class='realtime'>00:00:00</div><div><img src="+ img.ampifier +"  /></div><div><img class='sidemenu' src="+ img.sidemenu +"  /></div>",
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
				/*open slide menu*/
				sideMenu.addFn();
				setTimeout(function(){
				sideMenu.el.style.right = '0';
				}, 2);
				toggle = false;
			}else{
				/*close slide menu*/
				sideMenu.el.style.right = -sideMenu.el.getClientRects()[0].width+"px";
				toggle = true
			}
			
		}
		this.realTime();
	},
	realTime: function(){
		var days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var months = ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var currentTime = new Date();
		console.log(days[currentTime.getDay()]);
		console.log(months[currentTime.getMonth()]);
		document.querySelector(".day").innerHTML = days[currentTime.getDay()];
		document.querySelector(".month").innerHTML = months[currentTime.getMonth()];
		setInterval(function(){
			var currentTime = new Date();
			var hours = function(){
				if(parseInt(currentTime.getHours())<10){
					return "0"+currentTime.getHours();
				}else{
					return currentTime.getHours();
				};
			}
			var minutes =function(){
				if(parseInt(currentTime.getMinutes())<10){
					return "0"+currentTime.getMinutes();
				}else{
					return currentTime.getMinutes();
				};
			}
		   	var seconds = function(){
				if(parseInt(currentTime.getSeconds())<10){
					return "0"+currentTime.getSeconds();
				}else{
					return currentTime.getSeconds();
				};
			}
			document.querySelector('.realtime').innerHTML =hours() +":"+minutes()+":"+ seconds(); 		
		}, 1000)
	}
}
// child of Desktop
var sideMenu = {
	el: document.createElement("div"),
	className: ["slideMenu"],
	addFn: function(){

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
			console.log("todayContainer.el",todayContainer.el);
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
				todayContainer.el.style.display = "block";
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
				todayContainer.el.classList.add("dispear");
				animated(todayContainer.el, function(){
					todayContainer.el.style.display = 'none';
					todayContainer.el.classList.remove("dispear");
				})
				tabNotifications = true;
			}
		}
		this.el.appendChild(todayContainer.addFn());/*<------------------*/
		/*from child(titlebody)*/
		todayBody.clickQuestionFn();
	}
}

// child of sidemenu
var sideMenuTab = {
	el: document.createElement("div"),
	className : ["sideMenuTab"],
	addFn: function(){
		this.el.classList.add(this.className[0]);
		this.el.innerHTML = "<div class='today activeTab'>Me</div><div class='notifications'>Notifications</div>";
		return this.el;
	}
}

// child of sidemenu
var todayContainer = {
	el: document.createElement("div"),
	className : ["todayContainer"],
	addFn: function(){
		this.el.classList.add(this.className[0]);
		this.el.innerHTML = "<div class='resume-title'><div>Resume</div></div>";
		this.el.appendChild(todayBody.el())
		this.el.appendChild(todayTitle.addFn()) /*<-----------*/
		return this.el;
	}
}
var todayBody = {
	el: function(){
		var el = document.createElement("div");
		el.innerHTML = "<h1>Jason Sheng (Available)</h1>"
		el.innerHTML += "<p>Interdisciplinary Designer <span class='interQuestion' ><img src="+ img.questionMark+ "  /></span></p>"
		el.innerHTML += "<p>Based In Toronto</p>"
		el.classList.add("todayBody");

		return el;
	},
	clickQuestionFn: function(){
		document.querySelector('.interQuestion').addEventListener("click", function	(){
			infoWindow.addFn();
			infoWindow.buttonFn();
			infoWindow.drag();
		})
	}
}

var titles = ["Education","Proficiencies","Personal Skill"];
//child of todayContainer
var todayTitle = {
	el: document.createElement("div"),
	className : ["todayTitle"],
	addFn: function(){
		var resume ;
		this.el.classList.add(this.className[0]);
		var inner;
		this.el.innerHTML = "";
		var _this = this;
		ajax("resume.json", function(xhttp){
			resume = JSON.parse(xhttp.responseText);
			console.log(resume);
			for(var prop in resume){
				var title = document.createElement("div");
				title.classList.add(prop.replace(" ", ''));
				title.classList.add("todayTitles");
				title.innerHTML = "<h1>"+prop+"</h1>";/*<-----------Education*/
				if(prop == "Education"){
					var text = document.createElement("div");
					resume[prop].map(function(e){
						var eudlists = document.createElement('div');
						// eudlists.textContent = e;
						for(var a in e){
							var li = document.createElement("div");
							li.textContent = e[a];
							eudlists.appendChild(li)
						}
						text.appendChild(eudlists);
					})
					title.appendChild(text);

				}else if(prop == "Proficiencies"){
					console.log("Proficiencies:", resume[prop]);
					var text = document.createElement("div");
					text.classList.add("pros");
					for(var prolist in resume[prop]){
						/*get title of proficiency, eg: Graphic/programming/other*/
						console.log("prolist:", resume[prop][prolist]);
						var prolistEl =  document.createElement("div");
						prolistEl.innerHTML = "<h5>"+prolist+"</h5>";
						resume[prop][prolist].map(function(e){
							var li = document.createElement("div");
							li.textContent = e;
							prolistEl.appendChild(li);
						})
						text.appendChild(prolistEl);
					}
					title.appendChild(text);
				}else{
					for(var sub in resume[prop]){
						var text = document.createElement("div");
						text.textContent = resume[prop][sub];
						title.appendChild(text);
					}	
				}
				
				_this.el.appendChild(title);	
			}
		});

		return this.el;
	}
}

/******************************* winddow ******************************/
var infoWindow = {
	el: document.createElement("div"),
	className: ["window", "info-window"],
	addFn: function(){
		this.el.classList.add(this.className[0]);
		this.el.classList.add(this.className[1]);
		this.el.style.top = "30%"
		this.el.style.left = "30%";
		this.el.innerHTML = "<div class='title'></div>"
		this.el.innerHTML += "<div class='body'><div><img src="+ img.toolbarInfo +"  /></div><div><h1>Interdisciplinary Designer</h1><p>Interdisciplinary designers' areas are never limited, they use design thinking to define and solve problems. They are T-shape designers </p><button>ok</button></div></div>"
		Desktop.el.appendChild(this.el);
	},
	buttonFn: function(){
		this.el.querySelector("button").addEventListener("click", function(){
			this.parentElement.parentElement.parentElement.remove();
		})
	},
	drag: function(){
		var drag = false;
		this.el.querySelector(".title").addEventListener("mousedown", mousedown)
		function mousedown (e) {
			var _this = this; 
			var _width = _this.getClientRects()[0].width;
			var _height = _this.getClientRects()[0].height;
			var _left = _this.getClientRects()[0].left;
			var _top = _this.getClientRects()[0].top;
			var _distanceX = e.clientX-_left;
			var _distanceY = e.clientY-_top;
			console.log(_distanceX);
			console.log(_distanceY);
			this.style.cursor = "default";
			window.onmousemove = function(e){
				var _x = Math.max(e.clientX-_distanceX);
				var _y = Math.max(25,e.clientY-_distanceY);
				var _window  = _this.parentElement;
				_window.style.top = _y+ "px";
				_window.style.left = _x + "px";
			}
		}
		this.el.querySelector(".title").addEventListener("mouseup", function(e){
			window.onmousemove = "";
		})
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

function ajax(url, fn){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      	fn(xhttp);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}