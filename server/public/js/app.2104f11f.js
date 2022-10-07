(function(){var t={6609:function(t,e,s){var o={"./beep.mp3":5237,"./responseReceived.mp3":4806};function i(t){var e=n(t);return s(e)}function n(t){if(!s.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}i.keys=function(){return Object.keys(o)},i.resolve=n,t.exports=i,i.id=6609},685:function(t,e,s){"use strict";var o=s(144),i=s(3726),n=function(){var t=this,e=t._self._c;return e(i.Z,[t.password===t.key?e("div",[e("router-view"),e("button",{staticClass:"close-sesame",on:{click:function(e){t.password=""}}},[t._v("close sesame")])],1):e("center",[e("h1",[t._v("RhymeTime Coming Soon")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input-box",attrs:{type:"text"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])],1)},r=[],a={data(){return{password:localStorage.password,key:"open sesame"}},watch:{password(t){localStorage.setItem("password",t)}}},c=a,l=s(1001),u=(0,l.Z)(c,n,r,!1,null,null,null),d=u.exports,h=s(154);o.ZP.use(h.Z);var p=new h.Z({}),m=s(8345),v=s(9988),f=s(7509),y=s(7894),g=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"},[e(f.Z,{attrs:{fluid:"","fill-height":""}},[e(y.Z,{staticClass:"mt-1",attrs:{align:"center",justify:"center"}},[e("div",{staticClass:"text-h4"},[t._v("Welcome To RhymeTime")])]),e(y.Z,{staticClass:"mt-5",attrs:{align:"center",justify:"center"}},[e(v.Z,{staticClass:"ma-3",attrs:{color:"blue",dark:""},on:{"~click":function(e){return t.host.apply(null,arguments)}}},[t._v("Host A Game")]),e(v.Z,{staticClass:"ma-3",attrs:{color:"green",dark:""},on:{"~click":function(e){return t.join.apply(null,arguments)}}},[t._v("Join Active Session")])],1)],1)],1)},w=[],b={name:"HomeView",data(){return{}},methods:{host(){this.$store.state.roomid=Math.random().toString().substring(2,6),this.$router.push({name:"host"})},join(){this.$router.push({name:"join"})}}},k=b,_=(0,l.Z)(k,g,w,!1,null,null,null),x=_.exports,C=s(9088),R=function(){var t=this,e=t._self._c;return e("div",[e("div",[e(C.Z,{staticClass:"mx-7 my-5",attrs:{large:""},on:{click:function(e){e.stopPropagation(),t.isPaused=!t.isPaused}}},[t._v(t._s(t.pausePlayIcon))]),e("span",[t._v(t._s(t.isPaused?"Paused":"Playing"))])],1),e(t.currentView,{tag:"component",attrs:{playerList:t.playerList,promptResponses:t.promptResponses,socketInstance:t.socket,winningResponse:t.winningResponse,song:t.song,isPaused:t.isPaused},on:{"round-winner":function(e){return t.addWinnerToSong(e)},"change-view":function(e){t.currentView=e},"round-over":t.roundOver,"round-change":function(e){t.totalRounds=e},"restart-game":t.restartGame}})],1)},$=[],Z=s(1584),P=s(5449),S=function(){var t=this,e=t._self._c;return e("div",[e("center",[e("div",{staticClass:"text-h6 mt-3"},[t._v(" Scan QR Code or Enter With RoomID "+t._s(t.$store.state.roomid)+" to Join ")]),e("div",{staticStyle:{width:"50%"}},[e(Z.Z,{staticClass:"my-4",attrs:{src:t.qrCodeAPI,width:"200"}}),e(P.Z,{attrs:{label:"How many rounds are we playing?",filled:"",type:"number","max-width":"10px"},model:{value:t.rounds,callback:function(e){t.rounds=e},expression:"rounds"}})],1),e(v.Z,{staticClass:"white--text mb-3",attrs:{color:"green",rounded:"",large:"",disabled:!t.playerList.length},on:{click:function(e){return e.stopPropagation(),t.next.apply(null,arguments)}}},[e(C.Z,{staticClass:"mr-2"},[t._v("mdi-play")]),t._v(" Start Game ")],1),e("div",{staticClass:"text-h5"},[t._v("Players In Room:")]),t._l(t.playerList,(function(s){return e("div",{key:s.id},[e("div",{staticClass:"text-h6"},[t._v(" "+t._s(s)+" ")])])})),t.playerList.length?t._e():e("div",{staticClass:"text-h6 red--text"},[t._v("No Players Have Joined Yet")])],2)],1)},T=[],O=s(7935),I=function(){var t=this,e=t._self._c;return e("div",{staticClass:"center pa-4 clock-parent",style:`background-color: ${t.backgroundColor}`},[e("div",{staticClass:"text-h6 mb-2"},[t._v(" "+t._s(t.title)+" ")]),e(O.Z,{staticClass:"mr-2 pa-12",attrs:{value:t.progress,size:"30",color:t.color}},[e("div",{staticClass:"text-h3"},[t._v(" "+t._s(t.$store.state.timeRemaining)+" ")])])],1)},j=[],D={props:{title:{type:String,required:!1,default:"Moving On In"}},data(){return{backgroundColor:"rgb(245, 245, 245)"}},mounted(){this.$watch((()=>this.$store.state.timeRemaining),(t=>{t<=this.$store.state.almostOutOfTime&&(this.backgroundColor="rgb(255, 225, 225)",setTimeout((()=>{this.backgroundColor="rgb(245, 245, 245)"}),250))}))},computed:{progress(){return this.$store.state.timeRemaining/this.$store.state.totalTime*100},color(){const t=[0,this.$store.state.totalTime/2,this.$store.state.totalTime];let e=[0,0,0];return e[0]=(t[2]-this.$store.state.timeRemaining)/(t[2]-t[1])*255,e[1]=this.$store.state.timeRemaining/t[1]*255,`rgb(${e.join(",")})`}}},E=D,B=(0,l.Z)(E,I,j,!1,null,"2c91bfa9",null),V=B.exports,q=s(629);o.ZP.use(q.ZP);var L=new q.ZP.Store({state:{nickname:"",roomid:"",sfxEnabled:!0,timeRemaining:30,totalTime:30,almostOutOfTime:5},getters:{},mutations:{},actions:{},modules:{}});function M(t,e=".mp3"){if(!L.state.sfxEnabled)return"Client has disabled sound effects";try{const o=new Audio(s(6609)(`./${t}${e}`));o.play()}catch(o){return console.warn(o),`An error was encountered whilst running sound: ${t}`}return`Soundboard ran sound: ${t}`}L.getters.config;var A={data(){return{timerDisabled:!1,timerRunning:!1,audio:void 0,testMode:!1,testView:"respond"}},components:{Clock:V},props:{promptResponses:{type:Array,required:!0},playerList:{type:Array,require:!0},song:{type:Array,required:!0},isPaused:{type:Boolean,required:!0},socketInstance:{required:!0}},mounted(){switch(this.testMode&&this.$parent.currentView!==this.testView&&this.$emit("change-view",this.testView),this.testMode&&(this.timerDisabled=!0),this.$parent.currentView){case"respond":this.$store.state.timeRemaining=90,this.audio=new Audio(s(8332));break;case"vote":this.$store.state.timeRemaining=30,this.audio=new Audio(s(9112));break;case"recap":this.$store.state.timeRemaining=15,this.audio=void 0;break;case"waiting":this.audio=new Audio(s(2396)),this.timerDisabled=!0;break;case"intro":this.audio=void 0,this.timerDisabled=!0;break;case"outro":this.audio=void 0,this.timerDisabled=!0;break;default:return console.error("Uncaught Case Passed Down to HostMixin")}this.$store.state.totalTime=this.$store.state.timeRemaining,this.audio?.play()&&this.audio.play(),this.startTimer()},destroyed(){clearInterval(this.timer),this.audio?.pause()&&(this.audio.pause(),this.audio=void 0)},methods:{startTimer(){this.timerRunning||this.timerDisabled||(this.timer=setInterval((()=>{this.$store.state.timeRemaining--,0===this.$store.state.timeRemaining&&(this.stopTimer(),setTimeout((()=>this.next()),500)),this.$store.state.timeRemaining<=this.$store.state.almostOutOfTime&&M("beep")}),1e3),this.timerRunning=!0)},stopTimer(){this.timerRunning&&(clearInterval(this.timer),this.timerRunning=!1)},pauseGame(){this.stopTimer(),this.audio?.pause()&&this.audio.pause()},unpauseGame(){this.testMode||this.startTimer(),this.audio?.play()&&this.audio.play()}},watch:{isPaused:{immediate:!0,handler(t){t?this.pauseGame():this.unpauseGame()}}}},H={mixins:[A],methods:{next(){this.$emit("change-view","intro")}},data(){return{rounds:3}},computed:{url(){return`\n        ${window.location.href.substring(0,window.location.href.length-5)}/join?room=${this.$store.state.roomid}\n      `},qrCodeAPI(){return`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.url}`}},watch:{rounds(t){const e=parseInt(t);isNaN(e)||e<1||this.$emit("round-change",e)}}},N=H,W=(0,l.Z)(N,S,T,!1,null,null,null),G=W.exports,J=s(7024),Y=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticStyle:{position:"absolute",top:"10%",left:"2%"}},[e("Clock")],1),e("div",{staticStyle:{position:"absolute",top:"10%",right:"2%"}},[e("Clock")],1),e("Prompt",{attrs:{words:t.words},on:{"prompt-intro-over":function(e){t.preIntroResponseStyles=""}}}),e("div",{staticClass:"center"},[e("div",{style:`transition: 3s; width: 60%; ${t.preIntroResponseStyles}`},[e(y.Z,{attrs:{align:"center",justify:"center"}},t._l(t.playerList,(function(s){return e(J.Z,{key:s.id,attrs:{cols:"6"}},[e("ResponseCard",{attrs:{playerName:s,hasResponded:t.respondents.includes(s)}})],1)})),1)],1)]),e("Outro",{attrs:{show:t.playOutro,outroDur:t.outroDur}})],1)},z=[],U=s(3816),F=s(5255),Q=s(7690),K=function(){var t=this,e=t._self._c;return e(U.Z,{staticClass:"mx-auto",attrs:{"max-width":"400",outlined:""}},[e(F.EB,{staticClass:"white--text",style:`word-break: break-word; background-color: ${t.cardTitleColor}`},[t._v(" "+t._s(t.playerName)+" "+t._s(t.suffix)+" ")]),e(Q.Z),e(F.ZB,{staticClass:"pa-10"},[e("div",{staticClass:"center"},[t.hasResponded?e(C.Z,{staticStyle:{position:"absolute"},attrs:{large:""}},[t._v(" mdi-comment-check-outline ")]):e("div",[e("div",{staticClass:"snippet",staticStyle:{position:"absolute"},attrs:{"data-title":".dot-pulse"}},[e("div",{staticClass:"stage"},[e("div",{staticClass:"dot-pulse"})])])])],1)])],1)},X=[],tt={props:{playerName:{type:String,required:!0},hasResponded:{type:Boolean,required:!0}},computed:{suffix(){return this.hasResponded?" is ready!":" is thinking..."},cardTitleColor(){return this.hasResponded?"#228B22":"#D2042D"}}},et=tt,st=(0,l.Z)(et,K,X,!1,null,"7f201d10",null),ot=st.exports,it=function(){var t=this,e=t._self._c;return e("div",{staticClass:"center mt-5 mb-8"},[e("span",{style:`transition: 1s; opacity: ${t.subHeadingOpacity};`},[t._v(" Find a way to rhyme these "+t._s(t.words.length)+" words together: ")]),e("div",{staticClass:"text-h3 prompt center",style:t.transformEffect},[t._v(" "+t._s(t.prompt)+" "),e("div",{staticClass:"mt-2",style:`transition: width 2s; ${t.borderBottom}`})])])},nt=[],rt={props:{words:{type:Array,required:!0}},data(){return{transformEffect:"transform: translateY(22vw) scale(2.2);",subHeadingOpacity:0,borderBottom:"width: 0"}},mounted(){this.startUpSequence()},computed:{prompt(){let t="";for(let e=0;e<this.words.length;e++)this.words.length-1===e?t+=", and ":0!==e&&(t+=", "),t+=this.words[e];return t}},methods:{startUpSequence(){const t=2e3,e=3e3;setTimeout((()=>{this.borderBottom="width: 150%; height: 5px; background-color: #000"}),50),setTimeout((()=>{this.transformEffect="",this.$emit("prompt-intro-over")}),t),setTimeout((()=>{this.subHeadingOpacity=1}),t+e)}}},at=rt,ct=(0,l.Z)(at,it,nt,!1,null,"042e2380",null),lt=ct.exports,ut=function(){var t=this,e=t._self._c;return e(U.Z,{staticClass:"outro-card pa-10",style:t.outroStyles,attrs:{width:t.width,height:t.height,elevation:"8",color:"red"}},[e(y.Z,{attrs:{align:"center",justify:"center"}},[e(F.EB,{staticClass:"text-h3 white--text"},[t._v(" Responses Have Closed ")])],1)],1)},dt=[],ht={props:{show:{type:Boolean,required:!0},outroDur:{type:Number,required:!0}},data(){return{width:800,height:150,outroStyles:"top: -100%;"}},watch:{show(t){if(t){const t=2e3;this.outroStyles="",setTimeout((()=>{this.outroStyles=`transition: ${this.outroDur-t}ms`,this.width=3e3,this.height=3e3}),t)}else this.width=800,this.height=150,this.outroStyles="top: -20%;"}}},pt=ht,mt=(0,l.Z)(pt,ut,dt,!1,null,"2c8c804a",null),vt=mt.exports,ft={mixins:[A],components:{ResponseCard:ot,Prompt:lt,Outro:vt},data(){return{words:[],respondents:[],hasResponded:!1,preIntroResponseStyles:"opacity: 0; transform: translateY(-10%); width: 50%; height: 100%",acceptingSubmissions:!0,playOutro:!1,outroDur:6e3}},mounted(){const t=[["ground","pound","round"],["crown","grown"],["paid","afraid","laid"],["elaborate","vacate"]];this.words=t[Math.floor(Math.random()*t.length)],this.socketInstance.emit("new-words",this.words),this.socketInstance.on("player-prompt-submission",(t=>{this.acceptingSubmissions&&(M("responseReceived"),setTimeout((()=>{this.promptResponses.push(t)}),350))}))},methods:{next(){this.acceptingSubmissions=!1,this.playOutro=!0,this.testMode||setTimeout((()=>{this.$emit("change-view","vote")}),this.outroDur)}},watch:{promptResponses:{immediate:!0,handler(t){this.respondents=t.map((t=>t.player)),this.respondents.length===this.playerList.length&&(this.stopTimer(),setTimeout((()=>{this.next()}),3e3))}}}},yt=ft,gt=(0,l.Z)(yt,Y,z,!1,null,null,null),wt=gt.exports,bt=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticStyle:{position:"absolute",top:"10%",left:"2%","z-index":"2"}},[e("Clock",{attrs:{title:"Polls Close In"}})],1),e("div",{staticStyle:{position:"absolute",top:"10%",right:"2%","z-index":"2"}},[e("Clock",{attrs:{title:"Polls Close In"}})],1),t._m(0),e("div",{staticClass:"center"},[e("div",{staticStyle:{width:"75%"}},[e(y.Z,{staticClass:"pa-4"},t._l(t.promptResponses,(function(t){return e(J.Z,{key:t.id},[e("DisplayResponse",{attrs:{response:t}})],1)})),1)],1)]),t._m(1),e("div",{staticClass:"bar-parent"},t._l(t.candidates,(function(s){return e("div",{key:s.id,staticClass:"center voter-bar",style:`height: ${s.votes}%;`},[e("div",{staticClass:"text-p white--text name-tag"},[t._v(" "+t._s(s.player)+" ")])])})),0)])},kt=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"center mt-5"},[e("div",{staticClass:"text-h4"},[t._v("Your Submissions")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"center"},[e("div",{staticClass:"text-h4 mt-5"},[t._v("Live Voting Results")])])}],_t=function(){var t=this,e=t._self._c;return e(U.Z,[e("div",{staticClass:"center",staticStyle:{"word-break":"break-word","background-color":"purple"}},[e(F.EB,{staticClass:"white--text"},[t._v(" "+t._s(t.response.player)+" ")])],1),e(F.ZB,[e("div",{staticClass:"text-p"},[t._v(" "+t._s(t.response.response)+" ")])])],1)},xt=[],Ct={props:{response:{type:Object,required:!0}}},Rt=Ct,$t=(0,l.Z)(Rt,_t,xt,!1,null,null,null),Zt=$t.exports,Pt={mixins:[A],components:{DisplayResponse:Zt},data(){return{voteCount:{},ballotBox:{},candidates:[]}},destroyed(){this.candidates.sort(((t,e)=>e.votes-t.votes));const t=this.candidates[0]?.player??"Nobody",e=this.promptResponses[this.promptResponses.findIndex((e=>e.player===t))]?.response??"A response hasnt been given";this.$emit("round-winner",{player:t,response:e})},mounted(){this.socketInstance.emit("candidate-list",this.promptResponses.map((t=>t.player))),this.promptResponses.forEach((t=>{this.candidates.push({player:t.player,votes:100})})),this.calculatePercentage(),this.socketInstance.on("ballot-collector",(t=>{this.countVotes(t)}))},methods:{countVotes(t){this.promptResponses.map((t=>t.player)).forEach((t=>this.voteCount[t]=0));const e=Object.keys(t)[0];this.ballotBox[e]=t[e],Object.keys(this.ballotBox).forEach((t=>{const e=[...this.ballotBox[t]].reverse();for(let s=0;s<e.length;s++)this.voteCount[e[s]]+=s})),this.candidates=[],Object.keys(this.voteCount).forEach((t=>{this.candidates.push({player:t,votes:this.voteCount[t]})})),this.calculatePercentage()},calculatePercentage(){if(!this.candidates.length)return;const t=this.candidates.map((t=>t.votes)).reduce(((t,e)=>t+e));this.candidates.forEach((e=>{e.votes=Math.round(e.votes/t*100),e.votes<8&&(e.votes=8)}))},next(){this.testMode||this.$emit("change-view","recap")}}},St=Pt,Tt=(0,l.Z)(St,bt,kt,!1,null,"71ab1e5f",null),Ot=Tt.exports,It=function(){var t=this,e=t._self._c;return e("div",{staticClass:"center mt-5"},[e("div",{staticClass:"text-h4",staticStyle:{width:"40%","text-align":"center"}},[t._v(" just close your eyes and imagine there is a tutorial video now playing in front of you, if you really set your mind on it, you may manifest it into reality. ")]),e(v.Z,{staticClass:"white--text mt-8",attrs:{color:"red"},on:{click:function(e){return e.stopPropagation(),t.next.apply(null,arguments)}}},[t._v("Skip intro")])],1)},jt=[],Dt={mixins:[A],methods:{next(){this.testMode||this.$emit("change-view","respond")}}},Et=Dt,Bt=(0,l.Z)(Et,It,jt,!1,null,null,null),Vt=Bt.exports,qt=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticStyle:{position:"absolute",top:"10%",left:"2%"}},[e("Clock",{attrs:{title:"Next Round Starting In"}})],1),e("div",{staticStyle:{position:"absolute",top:"10%",right:"2%"}},[e("Clock",{attrs:{title:"Next Round Starting In"}})],1),e("div",{staticClass:"center"},[t._v(" This Rounds Winner Was... "),e("br"),e("b",[t._v(t._s(t.winningResponse.player))]),e("br"),e("b",[t._v("Who Wrote:")]),e("br"),e("div",{staticClass:"box"},[e("i",[t._v(t._s(t.displayedResponse))])]),e("div",[t._v("What Poetry!")]),e(v.Z,{on:{click:t.next}},[t._v("next")])],1)])},Lt=[],Mt={mixins:[A],data(){return{displayedResponse:""}},props:{winningResponse:{type:Object,required:!0,default:()=>({player:"Nobody",response:":("})}},mounted(){let t=0;this.writeText=setInterval((()=>{this.displayedResponse==this.winningResponse.response?clearInterval(this.writeText):(this.displayedResponse+=this.winningResponse.response[t],t++)}),50)},methods:{next(){this.testMode||this.$emit("round-over")}}},At=Mt,Ht=(0,l.Z)(At,qt,Lt,!1,null,"f848e616",null),Nt=Ht.exports,Wt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"center"},[e(U.Z,[e(F.EB,[t._v(t._s(t.scoreCard[0].player)+" Won!")]),e(F.ZB,[t._v(" "+t._s(t.scoreCard[0].player)+" managed to win a whopping "+t._s(t.scoreCard[0].score)+" rounds! ")])],1),t._l(t.song,(function(s){return e("div",{key:s.id},[e("b",[t._v(t._s(s.player))]),e("br"),e("i",[t._v(t._s(s.response))])])})),e(v.Z,{attrs:{color:"green white--text"},on:{click:function(e){return e.stopPropagation(),t.$emit("restart-game")}}},[t._v("Play again")]),e(v.Z,{attrs:{color:"red white--text"},on:{click:function(e){return e.stopPropagation(),t.$router.push("/")}}},[t._v("end the party")])],2)},Gt=[],Jt={mixins:[A],data(){return{winner:"",scoreCard:[]}},mounted(){const t=this.song.map((t=>t.player));t.forEach((t=>{const e=this.scoreCard.findIndex((e=>e.player===t));-1===e?this.scoreCard.push({player:t,score:1}):this.scoreCard[e].score++})),this.scoreCard.sort(((t,e)=>e.score-t.score))}},Yt=Jt,zt=(0,l.Z)(Yt,Wt,Gt,!1,null,null,null),Ut=zt.exports,Ft=s(7359),Qt={components:{waiting:G,respond:wt,vote:Ot,intro:Vt,recap:Nt,outro:Ut},data(){return{connectionStatus:!1,socket:null,currentView:"waiting",playerList:[],promptResponses:[],roundCount:1,totalRounds:3,winningResponse:{player:"",response:""},song:[],isPaused:!1}},destroyed(){this.socket?.connected&&this.socket.disconnect(),document.removeEventListener("visibilitychange",this.emitVisibility)},mounted(){this.connectSocket(),document.addEventListener("visibilitychange",this.emitVisibility)},computed:{pausePlayIcon(){return this.isPaused?"mdi-play":"mdi-pause"}},methods:{connectSocket(){const t=window.location.href.includes("localhost")?"http://localhost:3000":"/";this.socket?.connected||(this.socket=(0,Ft.ZP)(t),this.socket.on("connect",(()=>{this.socket.emit("join-room",this.$store.state.roomid,(t=>{"connected"===t&&(this.connectionStatus=!0,this.socket.emit("host-present"),this.socket.emit("report-to-host"))}))})),this.socket.on("player-join",(t=>{this.playerList.push(t)})),this.socket.on("report-to-players",(()=>{this.socket.emit("host-present")})),this.socket.on("roll-call",(()=>{this.playerList=[],this.socket.emit("host-present")})),this.socket.on("broadcast-game-state",(()=>{this.socket.emit("change-view",this.currentView)})))},emitVisibility(){this.isPaused||(this.isPaused="hidden"===document.visibilityState,this.socket.emit("visibility-handler",document.visibilityState))},exit(){this.forceDisconnect(),this.$router.push("/")},forceDisconnect(){this.socket.disconnect(),this.connectionStatus=!1},addWinnerToSong(t){this.song.push(t),this.winningResponse=t},roundOver(){if(this.roundCount===this.totalRounds)return this.currentView="outro";this.promptResponses=[],this.roundCount++,this.currentView="respond"},restartGame(){this.roundCount=1,this.currentView="waiting",this.song=[],this.promptResponses=[]}},watch:{currentView(t){Object.keys(this.$options.components).includes(t)&&this.socket.emit("change-view",t)}}},Kt=Qt,Xt=(0,l.Z)(Kt,R,$,!1,null,null,null),te=Xt.exports,ee=s(3643),se=function(){var t=this,e=t._self._c;return e("div",{staticClass:"center"},[e("div",{staticClass:"text-h4 mb-5"},[t._v("Player View")]),e(v.Z,{attrs:{text:""},on:{click:function(e){t.forceDisconnect(),t.$router.push("/")}}},[t._v("Back")]),e(t.currentView,{tag:"component",attrs:{wordsInPrompt:t.wordsInPrompt,socketInstance:t.socket}}),e(ee.Z,{attrs:{persistent:"","max-width":"290"},model:{value:t.showPauseDialog,callback:function(e){t.showPauseDialog=e},expression:"showPauseDialog"}},[e(U.Z,[e(F.EB,{staticClass:"text-h5"},[t._v(" Game Paused! ")]),e(F.ZB,[t._v(" Host screen is currently not visible. Once host screen becomes visible again, the game may resume. ")])],1)],1),e(ee.Z,{attrs:{persistent:"","max-width":"290"},model:{value:t.hostLeft,callback:function(e){t.hostLeft=e},expression:"hostLeft"}},[e(U.Z,[e(F.EB,{staticClass:"text-h5"},[t._v(" Host Jumped Ship! ")]),e(F.ZB,[t._v(" It looks like the host of your session left. Ask your host to create a new session to keep playing. ")]),e(F.h7,[e(v.Z,{attrs:{color:"red white--text",block:""},on:{click:function(e){e.stopPropagation(),t.forceDisconnect(),t.$router.push("/")}}},[t._v("Leave session")])],1)],1)],1)],1)},oe=[],ie=function(){var t=this,e=t._self._c;return e("div",[t._v(" Vote For The Most 🔥 Bar "),e("draggable",{model:{value:t.$parent.candidates,callback:function(e){t.$set(t.$parent,"candidates",e)},expression:"$parent.candidates"}},t._l(t.$parent.candidates,(function(s){return e("div",{key:s.id},[e("h3",[t._v(t._s(s))])])})),0)],1)},ne=[],re=s(9980),ae=s.n(re),ce={components:{draggable:ae()},props:{socketInstance:{required:!0}},mounted(){setTimeout((()=>this.watchCandidates()),1e3)},methods:{watchCandidates(){this.$watch((()=>this.$parent.candidates),(t=>{const e={};e[this.$store.state.nickname]=t,this.socketInstance.emit("submit-ballot",e)}))}}},le=ce,ue=(0,l.Z)(le,ie,ne,!1,null,null,null),de=ue.exports,he=s(2379),pe=function(){var t=this,e=t._self._c;return e("div",[t.submitted?e("div",[!0===t.submissionReceived?e("div",[t._v(" Your response has been submitted. Waiting on other player... ")]):!1===t.submissionReceived?e("div",[t._v(" Error encountered while sending your response to the host. This could be an internet connectivity issue "),e("br"),e(v.Z,{attrs:{text:""},on:{click:function(e){return e.stopPropagation(),t.sendResponseToHost.apply(null,arguments)}}},[t._v("Try Again")])],1):e("div",[t._v(" Sending Response To Host... ")])]):e("div",[t._v(" Respond To The Prompt On Screen: "),e(he.Z,{attrs:{label:"Your Response","no-resize":"",maxlength:"1000"},model:{value:t.response,callback:function(e){t.response=e},expression:"response"}}),e("br"),e(v.Z,{on:{"~click":function(e){return t.submitResponse.apply(null,arguments)}}},[t._v(" Submit ")])],1)])},me=[],ve={data(){return{response:"",submitted:!1,submissionReceived:void 0}},props:{wordsInPrompt:{type:Array,required:!0},socketInstance:{required:!0,validator:t=>t?.connected}},methods:{submitResponse(){this.submitted=!0,this.sendResponseToHost()},sendResponseToHost(){const t={player:this.$store.state.nickname,response:this.response};this.socketInstance.emit("player-prompt-response",t,(t=>{this.submissionReceived="sent"===t}))}}},fe=ve,ye=(0,l.Z)(fe,pe,me,!1,null,null,null),ge=ye.exports,we=function(){var t=this,e=t._self._c;return e("div",[t._v("Waiting for game to begin...")])},be=[],ke={},_e=(0,l.Z)(ke,we,be,!1,null,null,null),xe=_e.exports,Ce=function(){var t=this,e=t._self._c;return e("div",[t._v(" Please direct your attention to the hosts screen while introduction is rolling... ")])},Re=[],$e={},Ze=$e,Pe=(0,l.Z)(Ze,Ce,Re,!1,null,null,null),Se=Pe.exports,Te=function(){var t=this,e=t._self._c;return e("div",[t._v("Take a look at the round recap")])},Oe=[],Ie={},je=(0,l.Z)(Ie,Te,Oe,!1,null,null,null),De=je.exports,Ee=function(){var t=this,e=t._self._c;return e("div",[t._v(" This game has concluded. Winners are being announced by the host ")])},Be=[],Ve={},qe=(0,l.Z)(Ve,Ee,Be,!1,null,null,null),Le=qe.exports,Me={components:{vote:de,respond:ge,waiting:xe,intro:Se,recap:De,outro:Le},data(){return{connectionStatus:!1,socket:null,showPauseDialog:!1,currentView:"waiting",hostPresent:!0,hostLeft:!1,wordsInPrompt:[],candidates:[]}},destroyed(){this.socket?.connected&&this.forceDisconnect()},mounted(){this.connectSocket()},methods:{connectSocket(){const t=window.location.href.includes("localhost")?"http://localhost:3000":"/";this.socket?.connected||(this.socket=(0,Ft.ZP)(t),this.socket.on("connect",(()=>{this.socket.emit("join-room",this.$store.state.roomid,(t=>{"connected"===t&&(this.connectionStatus=!0,this.socket.emit("player-join",this.$store.state.nickname),this.hostCountdown(),this.socket.emit("report-to-players"),this.socket.emit("get-current-view"))}))})),this.socket.on("visibility-handler",(t=>{this.showPauseDialog="hidden"===t})),this.socket.on("change-view",(t=>{this.currentView=t,window.scrollTo(0,0)})),this.socket.on("roll-call",(()=>{this.socket.emit("player-join",this.$store.state.nickname),this.hostCountdown()})),this.socket.on("host-present",(()=>{this.hostPresent=!0})),this.socket.on("report-to-host",(()=>{this.socket.emit("player-join",this.$store.state.nickname)})),this.socket.on("new-words",(t=>{this.wordsInPrompt=t})),this.socket.on("candidate-list",(t=>{this.candidates=t})))},forceDisconnect(){this.socket.disconnect(),this.connectionStatus=!1},hostCountdown(){this.hostPresent=!1,setTimeout((()=>{this.hostLeft=!this.hostPresent}),3e3)}}},Ae=Me,He=(0,l.Z)(Ae,se,oe,!1,null,null,null),Ne=He.exports,We=function(){var t=this,e=t._self._c;return e(U.Z,{staticClass:"fix-to-middle",attrs:{width:"350"}},[e(F.EB,[t._v(" Join A Room ")]),e("div",{staticClass:"px-5"},[e(P.Z,{attrs:{label:"Enter a nickname"},model:{value:t.$store.state.nickname,callback:function(e){t.$set(t.$store.state,"nickname",e)},expression:"$store.state.nickname"}}),e(P.Z,{attrs:{label:"Enter a room ID"},model:{value:t.$store.state.roomid,callback:function(e){t.$set(t.$store.state,"roomid",e)},expression:"$store.state.roomid"}})],1),e(F.h7,[e(v.Z,{staticClass:"white--text",attrs:{disabled:!t.canJoin,color:"purple",block:""},on:{click:t.play}},[t._v("jump in!")])],1),e(F.h7,[e(v.Z,{attrs:{block:"",color:"red",dark:""},on:{click:function(e){return t.$router.push("/")}}},[t._v("go back :(")])],1)],1)},Ge=[],Je={mounted(){this.$store.state.roomid=this.$route.query.room||""},methods:{play(){this.$router.push({name:"play"})}},computed:{canJoin(){return this.$store.state.nickname&&this.$store.state.roomid}}},Ye=Je,ze=(0,l.Z)(Ye,We,Ge,!1,null,"25a39dcd",null),Ue=ze.exports;o.ZP.use(m.ZP);const Fe=[{path:"/",name:"home",component:x},{path:"/host",name:"host",component:te},{path:"/play",name:"play",component:Ne},{path:"/join",name:"join",component:Ue}],Qe=new m.ZP({mode:"history",base:"/",routes:Fe});var Ke=Qe;o.ZP.config.productionTip=!1,new o.ZP({vuetify:p,router:Ke,store:L,render:t=>t(d)}).$mount("#app")},8332:function(t,e,s){"use strict";t.exports=s.p+"media/respond.242bba8d.mp3"},5237:function(t,e,s){"use strict";t.exports=s.p+"media/beep.8341a396.mp3"},4806:function(t,e,s){"use strict";t.exports=s.p+"media/responseReceived.58d2cb1c.mp3"},9112:function(t,e,s){"use strict";t.exports=s.p+"media/vote.a111df66.mp3"},2396:function(t,e,s){"use strict";t.exports=s.p+"media/waiting.3731c068.mp3"}},e={};function s(o){var i=e[o];if(void 0!==i)return i.exports;var n=e[o]={exports:{}};return t[o].call(n.exports,n,n.exports,s),n.exports}s.m=t,function(){var t=[];s.O=function(e,o,i,n){if(!o){var r=1/0;for(u=0;u<t.length;u++){o=t[u][0],i=t[u][1],n=t[u][2];for(var a=!0,c=0;c<o.length;c++)(!1&n||r>=n)&&Object.keys(s.O).every((function(t){return s.O[t](o[c])}))?o.splice(c--,1):(a=!1,n<r&&(r=n));if(a){t.splice(u--,1);var l=i();void 0!==l&&(e=l)}}return e}n=n||0;for(var u=t.length;u>0&&t[u-1][2]>n;u--)t[u]=t[u-1];t[u]=[o,i,n]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var o in e)s.o(e,o)&&!s.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){s.p="/"}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,o){var i,n,r=o[0],a=o[1],c=o[2],l=0;if(r.some((function(e){return 0!==t[e]}))){for(i in a)s.o(a,i)&&(s.m[i]=a[i]);if(c)var u=c(s)}for(e&&e(o);l<r.length;l++)n=r[l],s.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return s.O(u)},o=self["webpackChunkclient"]=self["webpackChunkclient"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=s.O(void 0,[998],(function(){return s(685)}));o=s.O(o)})();
//# sourceMappingURL=app.2104f11f.js.map