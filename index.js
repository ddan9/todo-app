"use strict"

Vue.component("app-loading", {

	props: {

		loadingshow: Boolean

	},

	template: `

		<transition name="fade">

			<div v-show="loadingshow" style="z-index: 1000; background: white; position: fixed; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center">

				<div class="preloader-wrapper big active">

					<div class="spinner-layer spinner-teal-only">

						<div class="circle-clipper left">

							<div class="circle">

							</div>

						</div>

						<div class="gap-patch">

							<div class="circle">

							</div>

						</div>

						<div class="circle-clipper right">

							<div class="circle">

							</div>

						</div>

					</div>

				</div>

			</div>

		</transition>

	`

})

Vue.component("app-unloader", {

	props: {

		unloadershow: Boolean

	},

	template: `

		<transition name="fade">

			<div v-show="unloadershow" style="z-index: 999; background: white; position: fixed; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center">

			</div>

		</transition>

	`

})

Vue.component("custom-navbar", {

	props: {

		search: Function,

		reload: Function

	},

	template: `

		<div class="navbar-fixed">

			<nav class="teal darken-1" role="navigation">

				<div class="nav-wrapper container">

					<a v-on:click="reload" href="#!" class="brand-logo left notranslate" translate="no">

						<i class="material-icons notranslate" translate="no">

							task

						</i>

						TODO

					</a>

					<ul class="right">

						<li>

							<a v-on:click="search" href="#!">

								<i class="material-icons notranslate" translate="no">

									search

								</i>

							</a>

						</li>

						<li>

							<a v-on:click="reload" href="#!">

								<i class="material-icons notranslate" translate="no">

									settings

								</i>

							</a>

						</li>

					</ul>

				</div>

			</nav>

		</div>

	`

})

Vue.component("task-list", {

	props: {

		changefullname: Function,

		todos: Array,

		date: String,

		fullname: String,

		greetingtime: String,

		removetask: Function,

		edittask: Function,

		showswapbutton: Function,

		swaptask: Function,

		dropdowninit: Function,

		selectelement: Function

	},

	template: `

		<ul class="collection with-header" id="collection">

			<li class="collection-header">

				<div class="container">

					<h5 v-on:click="changefullname">

						Good {{ greetingtime + fullname }}

					</h5>

					<h6>

						Today: {{ date }}

					</h6>

					<h6>

						Tasks: {{ todos.length }}

					</h6>

				</div>

			</li>

			<li v-for="(todo, index) in todos" tabindex="0" v-on:focus="selectelement(index, true)" v-on:click="selectelement(index, true)" v-on:blur="selectelement(index, false)" v-bind:["id"]="'collection-element-' + index" class="collection-item collection-background-transition" style="overflow: hidden; overflow-wrap: break-word; word-wrap: break-word; white-space: normal; padding-bottom: 0; margin-bottom: 0; padding-left: 1vh; padding-right: 0">

				<div class="row valign-wrapper container" style="padding-bottom: 0; margin-bottom: 2vh; margin-top: 1vh">

					<div class="col s11 container left notranslate" translate="no">

						{{ todo.task }}

					</div>

					<a class='dropdown-trigger secondary-content' v-on:click.once.capture="dropdowninit(index)" href='#' v-bind:["id"]="'button-dropdown-' + index" v-bind:["data-activates"]="'dropdown-' + index" v-bind:["data-target"]="'dropdown-' + index">

						<i class="material-icons notranslate" translate="no">

							more_horiz

						</i>

					</a>

					<ul v-on:focus="selectelement(index, true)" v-on:blur="selectelement(index, false)" v-bind:["id"]="'dropdown-' + index" class='dropdown-content'>

						<li v-show="showswapbutton(index, 'up')">

							<a v-on:click="swaptask(index, 'up')" href="#!">

								<i class="material-icons notranslate" translate="no">

									move_up

								</i>

								Move up

							</a>

						</li>

						<li class="divider" tabindex="-1">

						</li>

						<li>

							<a v-on:click="removetask(index)" href="#!">

								<i class="material-icons notranslate" translate="no">

									delete

								</i>

								Delete

							</a>

						</li>

						<li>

							<a v-on:click="edittask(index)" href="#!">

								<i class="material-icons notranslate" translate="no">

									edit

								</i>

								Edit

							</a>

						</li>

						<li class="divider" tabindex="-1">

						</li>

						<li v-show="showswapbutton(index, 'down')">

							<a v-on:click="swaptask(index, 'down')" href="#!">

								<i class="material-icons notranslate" translate="no">

									move_down

								</i>

								Move down

							</a>

						</li>

					</ul>

				</div>

			</li>

		</ul>

	`

})

Vue.component("form-task", {

	props: {

		addtask: Function,

		scrollfocused: Function,

		todos: Array,

		clear: Function,

		cleartextarea: Function,

		cleartextareabutton: Boolean,

		cleartextareastate: Function

	},

	template: `

		<div class="row container">

			<form class="col s12">

				<div class="row">

					<div class="input-field col s12">

						<i v-if="cleartextareabutton" v-on:click="cleartextarea" class="tiny material-icons prefix notranslate" translate="no">

							clear

						</i>

						<textarea id="textarea1" class="materialize-textarea" v-on:keydown.enter="addtask" v-on:keypress="scrollfocused" v-on:keydown="scrollfocused" v-on:keyup="cleartextareastate" v-on:keyup.delete="cleartextareastate" v-on:click="scrollfocused"></textarea>

						<label for="textarea1">

							New task

						</label>

						<transition name="fade">

						  	<button v-if="todos.length > 2" v-on:click="clear" class="btn waves-effect waves-light left flow-text truncate" type="submit" name="action" style="max-width: 49.5%">

								<i class="material-icons left notranslate" translate="no">

									delete

								</i>

								<div class="truncate" style="max-width: 80%">

						  			Clean up

						  		</div>

							</button>

						</transition>

						<button v-on:click="addtask" class="btn waves-effect waves-light right flow-text truncate" type="submit" name="action" style="max-width: 49.5%">

							<i class="material-icons left notranslate" translate="no">

								add

							</i>

							<div class="truncate" style="max-width: 80%">

								Add

							</div>

						</button>

					</div>

				</div>

			</form>

		</div>

	`

})

Vue.component("float-button", {

	props: {

		todos: Array,

		changestatement: Function,

		floatbuttonscroll: Function,

		statement: String

	},

	template: `

		<div v-if="todos.length > 20" style="z-index: 500; display: block; position: fixed; right: 2vh; bottom: 2vh">

			<a v-on:click="changestatement" v-on:click="floatbuttonscroll" class="btn-floating btn-large waves-effect waves-light teal lighten-2">

				<i class="material-icons notranslate" translate="no">

					{{ statement }}

				</i>

			</a>

		</div>

	`

})

Vue.component("custom-footer", {

	props: {

		checkconnection: Function,

		todos: Array,

		date: String,

		currenttip: String

	},

	template: `

		<footer class="teal darken-1 page-footer" style="bottom: 0; left: 0; width: 100%; ">

			<div class="container">

				<div class="row">

					<div class="col l6 s12">

						<h5 class="white-text">

							TODO: To-do list app

						</h5>

						<p class="grey-text text-lighten-4">

							Created just while learning Web, <a class="grey-text text-lighten-3" href="https://pages.github.com" v-on:click.stop.prevent="checkconnection"> GH-Pages</a>, <a class="grey-text text-lighten-3" href="https://vuejs.org" v-on:click.stop.prevent="checkconnection"> Vue.js </a> and <a class="grey-text text-lighten-3" href="https://materializecss.com" v-on:click.stop.prevent="checkconnection"> Materialize.css</a> with a lot of pain. This simple app will helps you to manage your tasks or just store your notes if you have memory problems, for example

						</p>

						<transition name="fade">

							<p v-if="todos.length < 1" class="grey-text text-lighten-4">

								You can enter your tasks here

							</p>

						</transition>

					</div>

					<div class="col l4 offset-l2 s12">

						<h5 class="white-text">

							Contacts

						</h5>

						<ul>
							<li>

								<a class="grey-text text-lighten-3" href="https://ddan9.github.io" v-on:click.stop.prevent="checkconnection">

									GitHub

								</a>

							</li>

							<li>

								<a class="grey-text text-lighten-3" href="https://freelance.habr.com/freelancers/r3ddan9" v-on:click.stop.prevent="checkconnection">

									Habr

								</a>

							</li>

							<li>

								<a class="grey-text text-lighten-3" href="mailto:ddan9.github@rambler.ru" v-on:click.stop.prevent="checkconnection">

									Email

								</a>

							</li>

							<li>

								<a class="grey-text text-lighten-3" href="https://t.me/ddan9_tg" v-on:click.stop.prevent="checkconnection">

									Telegram

								</a>

							</li>

						</ul>

					</div>

					<div class="col s12">

						<transition name="fade">

							<p id="footer-tip" class="center grey-text text-lighten-4 footer-tip-transition">

								{{ currenttip }}

							</p>

						</transition>

					</div>

				</div>

			</div>

			<div class="footer-copyright">

				<div class="container center">

					<a class="grey-text text-lighten-3" href="https://ddan9.github.io/todo-app/LICENSE" v-on:click.stop.prevent="checkconnection"> © {{ new Date().getFullYear() }} Licenced by GNU GPL v3 </a>

				</div>

			</div>

		</footer>

	`

})

var app = new Vue({

	el: "#app",

	data: {

		title: "TODO",

		firstName: "Your",

		lastName: "Name",

		loadingShow: true,

		unloaderShow: false,

		previousSearch: "",

		statement: "arrow_downward",

		toggleFocusElement: false,

		clearTextAreaButton: false,

		tips: [

			"Nice day today, isn't it?",

			"Click add button for add a task",

			"If you find a bug please let me know"

		],

		currentTip: null,

		todos: [ ]

	},

	methods: {

		showSwapButton: function(index, route) {

			if (route == "up") {

				if (index > 0 && index < this.todos.length) {

					return true

				} else {

					return false

				}

			}

			if (route == "down") {

				if (index > -1 && index < this.todos.length-1) {

					return true

				} else {

					return false

				}

			}

		},

		swapTask: function(index, route) {

			event.preventDefault()

			var element = document.getElementById("collection-element-" + index)

			if (route == "up") {

				if (index > 0 && index < this.todos.length) {

					var currentTask = this.todos[index].task

					var replaceTask = this.todos[index-1].task

					this.todos.splice(index, 1, {task: replaceTask})

					this.todos.splice(index-1, 1, {task: currentTask})

					setTimeout(() => {

						element.style.background = "white"

					}, 0 )

				} else {

					setTimeout(() => {

						element.style.background = "white"

					}, 0 )

					return false

				}

			}

			if (route == "down") {

				if (index > -1 && index < this.todos.length-1) {

					var currentTask = this.todos[index].task

					var replaceTask = this.todos[index+1].task

					this.todos.splice(index, 1, {task: replaceTask})

					this.todos.splice(index+1, 1, {task: currentTask})

					setTimeout(() => {

						element.style.background = "white"

					}, 0 )

				} else {

					setTimeout(() => {

						element.style.background = "white"

					}, 0 )

					return false

				}

			}

		},

		scrollFocused: function() {

			var textarea = document.getElementById("textarea1")

			textarea.focus()

			textarea.scrollIntoView({block: "center", inline: "center", behavior: "smooth"})

		},

		loadingHide: function() {

			setTimeout(() => {

				this.loadingShow = false

			}, 1500 )

		},

		addTask: function() {

			event.preventDefault()

			var textarea = document.getElementById("textarea1")

			textarea.scrollIntoView({block: "center", inline: "center", behavior: "smooth"})

			textarea.focus()

			var input = textarea.value.trim()

			if (input) {

				this.todos.push({ task: input })

			} else {

				return false

			}

			textarea.value = ""

			textarea.value.trim()

			this.clearTextAreaButton = false

			M.textareaAutoResize(textarea)

			textarea.focus()

			textarea.click()

		},

		clear: function() {

			event.preventDefault()

			var textarea = document.getElementById("textarea1")

			if (this.todos) {

				if ( confirm("Do you really want to remove all your tasks?") ) {

					this.todos = [ ]

					this.clearTextAreaButton = false

					textarea.value = ""

					textarea.value.trim()

					M.textareaAutoResize(textarea)

					textarea.focus()

					textarea.blur()

				} else {

					return false

				}

			}

			window.scrollTo({top: 0, behavior: "smooth"});

		},

		clearTextArea: function() {

			event.preventDefault()

			this.clearTextAreaButton = false

			var textarea = document.getElementById("textarea1")

			textarea.value = ""

			textarea.value.trim()

			M.textareaAutoResize(textarea)

			textarea.focus()

			textarea.click()

		},

		clearTextAreaState: function() {

			var textareaValue = document.getElementById("textarea1").value

			if (textareaValue) {

				this.clearTextAreaButton = true

			} else {

				this.clearTextAreaButton = false

			}

		},

		checkConnection: function() {

			event.preventDefault()

			if (navigator.onLine) {

				this.unloaderShow = true

				document.location.href = event.currentTarget.href

			} else {

				alert("Lost internet connection!")

				return false

			}

		},

		changeFullName: function() {

			event.preventDefault()

			var input = prompt("Enter your name", this.fullName.replace(/\, /g, ""))

			if (input != null) {

				input = input.replace(/ +/g, " ").trim()

				var sinput = input.split(" ")

				if (sinput[0]) {

					this.firstName = sinput[0]

				} else {

					this.firstName = ""

				}

				if (sinput.length > 1) {

					this.lastName = sinput[1]

					for (var i = 2; i < sinput.length; i++) {

						this.lastName += " " + sinput[i]

					}

				} else {

					this.lastName = ""

				}

			} else {

				return false

			}

		},

		search: function() {

			event.preventDefault()

			var input = prompt("Write text for search", this.previousSearch)

			if (input) {

				this.previousSearch = input

				window.find(input)

			} else {

				return false

			}

		},

		reload: function() {

			event.preventDefault()

			if (navigator.onLine) {

				this.unloaderShow = true

				document.location.reload()

			} else {

				return false

			}

		},

		removeTask: function(index) {

			event.preventDefault()

			var element = document.getElementById("collection-element-" + index)

			if ( confirm("Remove task: \"" + this.todos[index].task + "\"?") ) {

				setTimeout(() => {

					element.style.background = "white"

				}, 0 )

				this.todos.splice(index, 1)

			} else {

				setTimeout(() => {

					element.style.background = "white"

				}, 0 )

				return false

			}

		},

		editTask: function(index) {

			event.preventDefault()

			var element = document.getElementById("collection-element-" + index)

			var input = prompt("Edit this task?", this.todos[index].task)

			if (input) {

				setTimeout(() => {

					element.style.background = "white"

				}, 0 )

				this.todos.splice(index, 1, {task: input})

			} else {

				setTimeout(() => {

					element.style.background = "white"

				}, 0 )

				return false

			}

		},

		changeStatement: function() {

			if ( this.statement != "arrow_downward") {

				this.statement = "arrow_downward"

			} else {

				this.statement = "arrow_upward"

			}

		},

		floatButtonScroll: function() {

			switch(this.statement) {

				case "arrow_downward": {

					window.scrollTo({ top: 0, behavior: "smooth" })

					break

				}

				case "arrow_upward": {

					window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })

					break

				}

				default: {

					break

				}

			}

		},

		materializeComponentsInitialization: function() {

			M.AutoInit()

			document.addEventListener('DOMContentLoaded', function() {

				var elems = document.querySelectorAll('.dropdown-trigger')

				var options = {

					constrainWidth: false

				}

				var instances = M.Dropdown.init(elems, options)

			})

		},

		databasesInitialization: function() {

			if (localStorage.todos) {

				this.todos = JSON.parse(localStorage["todos"])

			}

			if (localStorage.firstName) {

				this.firstName = JSON.parse(localStorage["firstName"])

			}

			if (localStorage.lastName) {

				this.lastName = JSON.parse(localStorage["lastName"])

			}

		},

		dropdownInitialize: function(index) {

			var elem = document.getElementById("collection-element-" + index).querySelectorAll(".dropdown-trigger")

			var options = {

				constrainWidth: false

			}

			var instance = M.Dropdown.init(elem, options)

		},

		selectElement: function(index, statement) {

			var element = document.getElementById("collection-element-" + index)

			var elementColor = document.getElementById("collection-element-" + index).style.background

			if (statement == true && elementColor != "whiteSmoke") {

				if (this.toggleFocusElement != false) {

					element.style.background = "white"

					this.toggleFocusElement = false

				}

				if (this.toggleFocusElement != true) {

					element.style.background = "whiteSmoke"

					this.toggleFocusElement = true

				}

			}

			if (statement == false && elementColor != "white") {

				element.style.background = "white"

				this.toggleFocusElement = false

			}

		},

		serviceWorkerRegister: function() {

			if("serviceWorker" in navigator) {

				navigator.serviceWorker.register("./serviceWorker.js", { scope: "./" })

			}

		},

		getRandomInt: function(max) {

			return Math.floor(Math.random() * max);

		}

	},

	computed: {

		dateNow: function() {

			var fullDate = new Date()

			return fullDate.toLocaleDateString("ru-RU")

		},

		greetingTime: function() {

			var Time = new Date().getHours()

			switch(Time) {

				case 6: case 7: case 8: case 9: case 10: case 11: {

					return "morning"

					break

				}

				case 12: case 13: case 14: case 15: case 16: case 17: {

					return "afternoon"

					break

				}

				case 18: case 19: case 20: case 21: case 22: case 23: {

					return "evening"

					break

				}

				case 0: case 1: case 2: case 3: case 4: case 5: {

					return "night"

					break

				}

				default: {

					return "day"

					break

				}

			}

		},

		fullName: function() {

			if (this.firstName) {

				return ", " + this.firstName + " " + this.lastName

			} else {

				return this.firstName + " " + this.lastName

			}

		}

	},

	watch: {

		todos(TodosDB) {

			localStorage["todos"] = JSON.stringify(TodosDB)

		},

		firstName(firstNameDB) {

			localStorage["firstName"] = JSON.stringify(firstNameDB)

		},

		lastName(lastNameDB) {

			localStorage["lastName"] = JSON.stringify(lastNameDB)

		},

		unloaderShow: {

			handler(unloaderShow) {

				if (this.unloaderShow) {

					setTimeout(() => {

						this.unloaderShow = false

					}, 2000 )

				} else {

					return false

				}

			},

			deep: true

		}

	},

	created: function() {

		console.log("Hello there! \nSeems like all is ok :) \nWelcome!")

		document.title = this.title

	},

	mounted() {

		this.databasesInitialization()

		this.materializeComponentsInitialization()

		this.serviceWorkerRegister()

		var footerTip = document.getElementById("footer-tip")

		this.currentTip = this.tips[this.getRandomInt(this.tips.length)]

		setInterval(() => {

			var randomTip = this.tips[this.getRandomInt(this.tips.length)]

			if (this.currentTip != randomTip) {

				footerTip.style.opacity = 0

			}

			setTimeout(() => {

				this.currentTip = randomTip

			}, 500 )

			setTimeout(() => {

				footerTip.style.opacity = 1

			}, 500 )

		}, 60*1000 )

		if (navigator.onLine) {

			this.loadingHide()

		} else {

			if (confirm("No internet connection. Continue?") == true) {

				this.loadingHide()

			} else {

				return false

			}

		}

	}

})
