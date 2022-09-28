(function(){"use strict";var t={8860:function(t,e,s){var i=s(144),o=s(3726),n=function(){var t=this,e=t._self._c;return e(o.Z,[t.password===t.key?e("div",[e("router-view"),e("button",{staticClass:"close-sesame",on:{click:function(e){t.password=""}}},[t._v("close sesame")])],1):e("center",[e("h1",[t._v("RhymeTime Coming Soon")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input-box",attrs:{type:"text"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])],1)},r=[],a={data(){return{password:localStorage.password,key:"open sesame"}},watch:{password(t){localStorage.setItem("password",t)}}},c=a,l=s(1001),u=(0,l.Z)(c,n,r,!1,null,null,null),d=u.exports,h=s(154);i.ZP.use(h.Z);var p=new h.Z({}),m=s(8345),v=s(9988),f=s(1819),y=s(7894),g=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"},[e(f.Z,{attrs:{fluid:"","fill-height":""}},[e(y.Z,{staticClass:"mt-1",attrs:{align:"center",justify:"center"}},[e("div",{staticClass:"text-h4"},[t._v("Welcome To RhymeTime")])]),e(y.Z,{staticClass:"mt-5",attrs:{align:"center",justify:"center"}},[e(v.Z,{staticClass:"ma-3",attrs:{color:"blue",dark:""},on:{"~click":function(e){return t.host.apply(null,arguments)}}},[t._v("Host A Game")]),e(v.Z,{staticClass:"ma-3",attrs:{color:"green",dark:""},on:{"~click":function(e){return t.join.apply(null,arguments)}}},[t._v("Join Active Session")])],1)],1)],1)},w=[],b={name:"HomeView",data(){return{}},methods:{host(){this.$store.state.roomid=Math.random().toString().substring(2,6),this.$router.push({name:"host"})},join(){this.$router.push({name:"join"})}}},k=b,_=(0,l.Z)(k,g,w,!1,null,null,null),x=_.exports,C=s(9088),R=s(2515),Z=s(2732),$=function(){var t=this,e=t._self._c;return e("div",[e(Z.Z,[e(C.Z,{on:{click:function(e){return e.stopPropagation(),t.exit.apply(null,arguments)}}},[t._v("mdi-chevron-left")]),e("div",{staticClass:"text-h6"},[t._v("playing in room "+t._s(t.$store.state.roomid))]),e(R.Z),"waiting"!=t.currentView?e("div",{staticClass:"text-p"},[t._v("round "+t._s(t.roundCount)+" out of "+t._s(t.totalRounds))]):t._e()],1),e(t.currentView,{ref:"hostComponents",tag:"component",attrs:{playerList:t.playerList,promptResponses:t.promptResponses,socketInstance:t.socket,winningResponse:t.winningResponse,song:t.song},on:{"round-winner":function(e){return t.addWinnerToSong(e)},"change-view":function(e){t.currentView=e},"round-over":t.roundOver,"round-change":function(e){t.totalRounds=e},"restart-game":t.restartGame}})],1)},T=[],P=s(1584),S=s(5449),I=function(){var t=this,e=t._self._c;return e("div",[e("center",[e("div",{staticClass:"text-h6 mt-3"},[t._v(" Scan QR Code or Enter With RoomID "+t._s(t.$store.state.roomid)+" to Join ")]),e("div",{staticStyle:{width:"50%"}},[e(P.Z,{staticClass:"my-4",attrs:{src:t.qrCodeAPI,width:"200"}}),e(S.Z,{attrs:{label:"How many rounds are we playing?",filled:"",type:"number","max-width":"10px"},model:{value:t.rounds,callback:function(e){t.rounds=e},expression:"rounds"}})],1),e(v.Z,{staticClass:"white--text mb-3",attrs:{color:"green",rounded:"",large:"",disabled:!t.playerList.length},on:{click:function(e){return e.stopPropagation(),t.next.apply(null,arguments)}}},[e(C.Z,{staticClass:"mr-2"},[t._v("mdi-play")]),t._v(" Start Game ")],1),e("div",{staticClass:"text-h5"},[t._v("Players In Room:")]),t._l(t.playerList,(function(s){return e("div",{key:s.id},[e("div",{staticClass:"text-h6"},[t._v(" "+t._s(s)+" ")])])})),t.playerList.length?t._e():e("div",{staticClass:"text-h6 red--text"},[t._v("No Players Have Joined Yet")])],2)],1)},L=[],j=s(7935),V=function(){var t=this,e=t._self._c;return e("div",{staticClass:"center pa-4 clock-parent",style:`background-color: ${t.backgroundColor}`},[e("div",{staticClass:"text-h6 mb-2"},[t._v(" "+t._s(t.title)+" ")]),e(j.Z,{staticClass:"mr-2 pa-12",attrs:{value:t.progress,size:"30",color:t.color}},[e("div",{staticClass:"text-h3"},[t._v(" "+t._s(t.timeLeft)+" ")])])],1)},D=[],O={props:{totalTime:{type:Number,required:!0},timeLeft:{type:Number,required:!0},title:{type:String,required:!1,default:"Moving On In"}},data(){return{backgroundColor:"rgb(245, 245, 245)"}},computed:{progress(){return this.timeLeft/this.totalTime*100},color(){const t=[0,this.totalTime/2,this.totalTime];let e=[0,0,0];return e[0]=(t[2]-this.timeLeft)/(t[2]-t[1])*255,e[1]=this.timeLeft/t[1]*255,`rgb(${e[0]}, ${e[1]}, ${e[2]})`}},watch:{timeLeft(t){t<5&&(this.backgroundColor="rgb(255, 225, 225)",setTimeout((()=>{this.backgroundColor="rgb(245, 245, 245)"}),250))}}},E=O,q=(0,l.Z)(E,V,D,!1,null,"d2d6c9c8",null),B=q.exports,M={data(){return{totalTime:30,timeRemaining:30,timerDisabled:!1,timerRunning:!1,audio:void 0,beepSound:new Audio(s(936)),testMode:!1,testView:""}},components:{Clock:B},props:{promptResponses:{type:Array,required:!0},playerList:{type:Array,require:!0},song:{type:Array,required:!0},socketInstance:{required:!0}},mounted(){switch(this.testMode&&this.$parent.currentView!==this.testView&&(this.$emit("change-view",this.testView),this.timerDisabled=!0),this.$parent.currentView){case"respond":this.timeRemaining=10,this.audio=new Audio(s(8332));break;case"vote":this.timeRemaining=20,this.audio=new Audio(s(9112));break;case"recap":this.timeRemaining=10,this.audio=void 0;break;case"waiting":this.audio=new Audio(s(2396)),this.timerDisabled=!0;break;case"intro":this.audio=void 0,this.timerDisabled=!0;break;case"outro":this.audio=void 0,this.timerDisabled=!0;break;default:return console.error("Uncaught Case Passed Down to HostMixin")}this.totalTime=this.timeRemaining,this.audio?.play()&&this.audio.play(),this.startTimer()},destroyed(){clearInterval(this.timer),this.audio?.pause()&&(this.audio.pause(),this.audio=void 0)},methods:{startTimer(){this.timerRunning||this.timerDisabled||(this.timer=setInterval((()=>{this.timeRemaining--,this.timeRemaining<0?this.next():this.timeRemaining<5&&this.playEffect("beep")}),1e3),this.timerRunning=!0)},stopTimer(){this.timerRunning&&(clearInterval(this.timer),this.timerRunning=!1)},pauseGame(){this.stopTimer(),this.audio?.pause()&&this.audio.pause()},unpauseGame(){this.testMode||this.startTimer(),this.audio?.play()&&this.audio.play()},playEffect(t){switch(t){case"beep":this.beepSound.currentTime=0,this.beepSound.play();break}}}},A={mixins:[M],methods:{next(){this.$emit("change-view","intro")}},data(){return{rounds:3}},computed:{url(){return`\n        ${window.location.href.substring(0,window.location.href.length-5)}/join?room=${this.$store.state.roomid}\n      `},qrCodeAPI(){return`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.url}`}},watch:{rounds(t){const e=parseInt(t);isNaN(e)||e<1||this.$emit("round-change",e)}}},N=A,W=(0,l.Z)(N,I,L,!1,null,null,null),H=W.exports,G=s(7024),J=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticStyle:{position:"absolute",top:"10%",left:"2%"}},[e("Clock",{attrs:{timeLeft:t.timeRemaining,totalTime:t.totalTime}})],1),e("div",{staticStyle:{position:"absolute",top:"10%",right:"2%"}},[e("Clock",{attrs:{timeLeft:t.timeRemaining,totalTime:t.totalTime}})],1),e("div",{staticClass:"center mt-5 mb-8"},[t._v(" Find a way to rhyme these "+t._s(t.words.length)+" words together: "),e("div",{staticClass:"text-h3"},[t._v(t._s(t.prompt))])]),e("div",{staticClass:"center"},[e("div",{staticStyle:{width:"60%"}},[e(y.Z,{attrs:{align:"center",justify:"center"}},t._l(t.playerList,(function(s){return e(G.Z,{key:s.id,attrs:{cols:"6"}},[e("ResponseCard",{attrs:{playerName:s,hasResponded:t.respondents.includes(s)}})],1)})),1)],1)])])},Y=[],z=s(3816),F=s(5255),Q=s(7690),U=function(){var t=this,e=t._self._c;return e(z.Z,{staticClass:"mx-auto",attrs:{"max-width":"400",outlined:""}},[e(F.EB,{staticClass:"white--text",style:`word-break: break-word; background-color: ${t.cardTitleColor}`},[t._v(" "+t._s(t.playerName)+" "+t._s(t.suffix)+" ")]),e(Q.Z),e(F.ZB,{staticClass:"pa-10"},[e("div",{staticClass:"center"},[t.hasResponded?e(C.Z,{staticStyle:{position:"absolute"},attrs:{large:""}},[t._v(" mdi-comment-check-outline ")]):e("div",[e("div",{staticClass:"snippet",staticStyle:{position:"absolute"},attrs:{"data-title":".dot-pulse"}},[e("div",{staticClass:"stage"},[e("div",{staticClass:"dot-pulse"})])])])],1)])],1)},K=[],X={props:{playerName:{type:String,required:!0},hasResponded:{type:Boolean,required:!0}},computed:{suffix(){return this.hasResponded?" is ready!":" is thinking..."},cardTitleColor(){return this.hasResponded?"#228B22":"#D2042D"}}},tt=X,et=(0,l.Z)(tt,U,K,!1,null,"7f201d10",null),st=et.exports,it={mixins:[M],components:{ResponseCard:st},data(){return{words:[],respondents:[],hasResponded:!1}},mounted(){const t=[["ground","pound","round"],["crown","grown"],["paid","afraid","laid"],["elaborate","vacate"]];this.words=t[Math.floor(Math.random()*t.length)],this.socketInstance.emit("new-words",this.words)},computed:{prompt(){let t="";for(let e=0;e<this.words.length;e++)this.words.length-1===e?t+=", and ":0!==e&&(t+=", "),t+=this.words[e];return t}},methods:{next(){this.testMode||this.$emit("change-view","vote")}},watch:{promptResponses:{immediate:!0,handler(t){this.respondents=t.map((t=>t.player)),this.respondents.length===this.playerList.length&&(this.stopTimer(),setTimeout((()=>{this.next()}),3e3))}}}},ot=it,nt=(0,l.Z)(ot,J,Y,!1,null,null,null),rt=nt.exports,at=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticStyle:{position:"absolute",top:"10%",left:"2%"}},[e("Clock",{attrs:{timeLeft:t.timeRemaining,totalTime:t.totalTime,title:"Polls Close In"}})],1),e("div",{staticStyle:{position:"absolute",top:"10%",right:"2%"}},[e("Clock",{attrs:{timeLeft:t.timeRemaining,totalTime:t.totalTime,title:"Polls Close In"}})],1),t._m(0),e(y.Z,{staticClass:"pa-4",attrs:{justify:"center"}},t._l(t.promptResponses,(function(t){return e(G.Z,{key:t.id,attrs:{cols:"2"}},[e("DisplayResponse",{attrs:{response:t}})],1)})),1),t._m(1),e("div",{staticClass:"bar-parent"},t._l(t.candidates,(function(s){return e("div",{key:s.id,staticClass:"center voter-bar",style:`height: ${s.votes}%;`},[e("div",{staticClass:"text-p white--text name-tag"},[t._v(" "+t._s(s.player)+" ")])])})),0)],1)},ct=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"center mt-5"},[e("div",{staticClass:"text-h4"},[t._v("Your Submissions")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"center"},[e("div",{staticClass:"text-h4 mt-5"},[t._v("Live Voting Results")])])}],lt=function(){var t=this,e=t._self._c;return e(z.Z,[e("div",{staticClass:"center",staticStyle:{"word-break":"break-word","background-color":"purple"}},[e(F.EB,{staticClass:"white--text"},[t._v(" "+t._s(t.response.player)+" ")])],1),e(F.ZB,[e("div",{staticClass:"text-p"},[t._v(" "+t._s(t.response.response)+" ")])])],1)},ut=[],dt={props:{response:{type:Object,required:!0}}},ht=dt,pt=(0,l.Z)(ht,lt,ut,!1,null,null,null),mt=pt.exports,vt={mixins:[M],components:{DisplayResponse:mt},data(){return{voteCount:{},ballotBox:{},candidates:[]}},destroyed(){this.candidates.sort(((t,e)=>e.votes-t.votes));const t=this.candidates[0]?.player??"Nobody",e=this.promptResponses[this.promptResponses.findIndex((e=>e.player===t))]?.response??"A response hasnt been given";this.$emit("round-winner",{player:t,response:e})},mounted(){this.promptResponses.forEach((t=>{this.candidates.push({player:t.player,votes:100})})),this.calculatePercentage(),this.socketInstance.emit("candidate-list",this.promptResponses.map((t=>t.player)))},methods:{countVotes(t){this.promptResponses.map((t=>t.player)).forEach((t=>this.voteCount[t]=0));const e=Object.keys(t)[0];this.ballotBox[e]=t[e],Object.keys(this.ballotBox).forEach((t=>{const e=[...this.ballotBox[t]].reverse();for(let s=0;s<e.length;s++)this.voteCount[e[s]]+=s})),this.candidates=[],Object.keys(this.voteCount).forEach((t=>{this.candidates.push({player:t,votes:this.voteCount[t]})})),this.calculatePercentage()},calculatePercentage(){const t=this.candidates.map((t=>t.votes)).reduce(((t,e)=>t+e));this.candidates.forEach((e=>{e.votes=Math.round(e.votes/t*100),e.votes<8&&(e.votes=8)}))},next(){this.testMode||this.$emit("change-view","recap")}}},ft=vt,yt=(0,l.Z)(ft,at,ct,!1,null,"56607438",null),gt=yt.exports,wt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"center mt-5"},[e("div",{staticClass:"text-h4",staticStyle:{width:"40%","text-align":"center"}},[t._v(" just close your eyes and imagine there is a tutorial video now playing in front of you, if you really set your mind on it, you may manifest it into reality. ")]),e(v.Z,{staticClass:"white--text mt-8",attrs:{color:"red"},on:{click:function(e){return e.stopPropagation(),t.next.apply(null,arguments)}}},[t._v("Skip intro")])],1)},bt=[],kt={mixins:[M],methods:{next(){this.testMode||this.$emit("change-view","respond")}}},_t=kt,xt=(0,l.Z)(_t,wt,bt,!1,null,null,null),Ct=xt.exports,Rt=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticStyle:{position:"absolute",top:"10%",left:"2%"}},[e("Clock",{attrs:{timeLeft:t.timeRemaining,totalTime:t.totalTime,title:"Next Round Starting In"}})],1),e("div",{staticStyle:{position:"absolute",top:"10%",right:"2%"}},[e("Clock",{attrs:{timeLeft:t.timeRemaining,totalTime:t.totalTime,title:"Next Round Starting In"}})],1),e("div",{staticClass:"center"},[t._v(" Time Left: "+t._s(t.timeRemaining)+" "),e("br"),t._v(" This Rounds Winner Was... "),e("br"),e("b",[t._v(t._s(t.winningResponse.player))]),e("br"),e("b",[t._v("Who Wrote:")]),e("br"),e("div",{staticClass:"box"},[e("i",[t._v(t._s(t.displayedResponse))])]),e("div",[t._v("What Poetry!")]),e(v.Z,{on:{click:t.next}},[t._v("next")])],1)])},Zt=[],$t={mixins:[M],data(){return{displayedResponse:""}},props:{winningResponse:{type:Object,required:!0,default:()=>({player:"Nobody",response:":("})}},mounted(){let t=0;this.writeText=setInterval((()=>{this.displayedResponse==this.winningResponse.response?clearInterval(this.writeText):(this.displayedResponse+=this.winningResponse.response[t],t++)}),50)},methods:{next(){this.testMode||this.$emit("round-over")}}},Tt=$t,Pt=(0,l.Z)(Tt,Rt,Zt,!1,null,"c455400c",null),St=Pt.exports,It=function(){var t=this,e=t._self._c;return e("div",{staticClass:"center"},[e(z.Z,[e(F.EB,[t._v(t._s(t.scoreCard[0].player)+" Won!")]),e(F.ZB,[t._v(" "+t._s(t.scoreCard[0].player)+" managed to win a whopping "+t._s(t.scoreCard[0].score)+" rounds! ")])],1),t._l(t.song,(function(s){return e("div",{key:s.id},[e("b",[t._v(t._s(s.player))]),e("br"),e("i",[t._v(t._s(s.response))])])})),e(v.Z,{attrs:{color:"green white--text"},on:{click:function(e){return e.stopPropagation(),t.$emit("restart-game")}}},[t._v("Play again")]),e(v.Z,{attrs:{color:"red white--text"},on:{click:function(e){return e.stopPropagation(),t.$router.push("/")}}},[t._v("end the party")])],2)},Lt=[],jt={mixins:[M],data(){return{winner:"",scoreCard:[]}},mounted(){const t=this.song.map((t=>t.player));t.forEach((t=>{const e=this.scoreCard.findIndex((e=>e.player===t));-1===e?this.scoreCard.push({player:t,score:1}):this.scoreCard[e].score++})),this.scoreCard.sort(((t,e)=>e.score-t.score))}},Vt=jt,Dt=(0,l.Z)(Vt,It,Lt,!1,null,null,null),Ot=Dt.exports,Et=s(7359),qt={components:{waiting:H,respond:rt,vote:gt,intro:Ct,recap:St,outro:Ot},data(){return{connectionStatus:!1,socket:null,currentView:"waiting",playerList:[],promptResponses:[],roundCount:1,totalRounds:3,winningResponse:{player:"",response:""},song:[]}},destroyed(){this.socket?.connected&&this.socket.disconnect(),document.removeEventListener("visibilitychange",this.emitVisibility)},mounted(){this.connectSocket(),document.addEventListener("visibilitychange",this.emitVisibility)},methods:{connectSocket(){const t=window.location.href.includes("localhost")?"http://localhost:3000":"/";this.socket?.connected||(this.socket=(0,Et.ZP)(t),this.socket.on("connect",(()=>{this.socket.emit("join-room",this.$store.state.roomid,(t=>{"connected"===t&&(this.connectionStatus=!0,this.socket.emit("host-present"),this.socket.emit("report-to-host"))}))})),this.socket.on("player-join",(t=>{this.playerList.push(t)})),this.socket.on("report-to-players",(()=>{this.socket.emit("host-present")})),this.socket.on("roll-call",(()=>{this.playerList=[],this.socket.emit("host-present")})),this.socket.on("player-prompt-submission",(t=>{this.promptResponses.push(t)})),this.socket.on("ballot-collector",(t=>{this.$refs.hostComponents.countVotes(t)})),this.socket.on("broadcast-current-view",(()=>{this.socket.emit("change-view",this.currentView)})))},emitVisibility(){"hidden"===document.visibilityState?this.$refs.hostComponents.pauseGame():this.$refs.hostComponents.unpauseGame(),this.socket.emit("visibility-handler",document.visibilityState)},exit(){this.forceDisconnect(),this.$router.push("/")},forceDisconnect(){this.socket.disconnect(),this.connectionStatus=!1},addWinnerToSong(t){this.song.push(t),this.winningResponse=t},roundOver(){if(this.roundCount===this.totalRounds)return this.currentView="outro";this.promptResponses=[],this.roundCount++,this.currentView="respond"},restartGame(){this.roundCount=1,this.currentView="waiting",this.song=[],this.promptResponses=[]}},watch:{currentView(t){Object.keys(this.$options.components).includes(t)&&this.socket.emit("change-view",t)}}},Bt=qt,Mt=(0,l.Z)(Bt,$,T,!1,null,null,null),At=Mt.exports,Nt=s(3643),Wt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"center"},[e("div",{staticClass:"text-h4 mb-5"},[t._v("Player View")]),e(v.Z,{attrs:{text:""},on:{click:function(e){t.forceDisconnect(),t.$router.push("/")}}},[t._v("Back")]),e(t.currentView,{tag:"component",attrs:{wordsInPrompt:t.wordsInPrompt,socketInstance:t.socket}}),e(Nt.Z,{attrs:{persistent:"","max-width":"290"},model:{value:t.showPauseDialog,callback:function(e){t.showPauseDialog=e},expression:"showPauseDialog"}},[e(z.Z,[e(F.EB,{staticClass:"text-h5"},[t._v(" Game Paused! ")]),e(F.ZB,[t._v(" Host screen is currently not visible. Once host screen becomes visible again, the game may resume. ")])],1)],1),e(Nt.Z,{attrs:{persistent:"","max-width":"290"},model:{value:t.hostLeft,callback:function(e){t.hostLeft=e},expression:"hostLeft"}},[e(z.Z,[e(F.EB,{staticClass:"text-h5"},[t._v(" Host Jumped Ship! ")]),e(F.ZB,[t._v(" It looks like the host of your session left. Ask your host to create a new session to keep playing. ")]),e(F.h7,[e(v.Z,{attrs:{color:"red white--text",block:""},on:{click:function(e){e.stopPropagation(),t.forceDisconnect(),t.$router.push("/")}}},[t._v("Leave session")])],1)],1)],1)],1)},Ht=[],Gt=function(){var t=this,e=t._self._c;return e("div",[t._v(" Vote For The Most 🔥 Bar "),e("draggable",{model:{value:t.$parent.candidates,callback:function(e){t.$set(t.$parent,"candidates",e)},expression:"$parent.candidates"}},t._l(t.$parent.candidates,(function(s){return e("div",{key:s.id},[e("h3",[t._v(t._s(s))])])})),0)],1)},Jt=[],Yt=s(9980),zt=s.n(Yt),Ft={components:{draggable:zt()},props:{socketInstance:{required:!0}},mounted(){setTimeout((()=>this.watchCandidates()),1e3)},methods:{watchCandidates(){this.$watch((()=>this.$parent.candidates),(t=>{const e={};e[this.$store.state.nickname]=t,this.socketInstance.emit("submit-ballot",e)}))}}},Qt=Ft,Ut=(0,l.Z)(Qt,Gt,Jt,!1,null,null,null),Kt=Ut.exports,Xt=s(2379),te=function(){var t=this,e=t._self._c;return e("div",[t.submitted?e("div",[!0===t.submissionReceived?e("div",[t._v(" Your response has been submitted. Waiting on other player... ")]):!1===t.submissionReceived?e("div",[t._v(" Error encountered while sending your response to the host. This could be an internet connectivity issue "),e("br"),e(v.Z,{attrs:{text:""},on:{click:function(e){return e.stopPropagation(),t.sendResponseToHost.apply(null,arguments)}}},[t._v("Try Again")])],1):e("div",[t._v(" Sending Response To Host... ")])]):e("div",[t._v(" Respond To The Prompt On Screen: "),e(Xt.Z,{attrs:{label:"Your Response","no-resize":"",maxlength:"1000"},model:{value:t.response,callback:function(e){t.response=e},expression:"response"}}),e("br"),e(v.Z,{on:{"~click":function(e){return t.submitResponse.apply(null,arguments)}}},[t._v(" Submit ")])],1)])},ee=[],se={data(){return{response:"",submitted:!1,submissionReceived:void 0}},props:{wordsInPrompt:{type:Array,required:!0},socketInstance:{required:!0,validator:t=>t?.connected}},methods:{submitResponse(){this.submitted=!0,this.sendResponseToHost()},sendResponseToHost(){const t={player:this.$store.state.nickname,response:this.response};this.socketInstance.emit("player-prompt-response",t,(t=>{this.submissionReceived="sent"===t}))}}},ie=se,oe=(0,l.Z)(ie,te,ee,!1,null,null,null),ne=oe.exports,re=function(){var t=this,e=t._self._c;return e("div",[t._v("Waiting for game to begin...")])},ae=[],ce={},le=(0,l.Z)(ce,re,ae,!1,null,null,null),ue=le.exports,de=function(){var t=this,e=t._self._c;return e("div",[t._v(" Please direct your attention to the hosts screen while introduction is rolling... ")])},he=[],pe={},me=pe,ve=(0,l.Z)(me,de,he,!1,null,null,null),fe=ve.exports,ye=function(){var t=this,e=t._self._c;return e("div",[t._v("Take a look at the round recap")])},ge=[],we={},be=(0,l.Z)(we,ye,ge,!1,null,null,null),ke=be.exports,_e=function(){var t=this,e=t._self._c;return e("div",[t._v(" This game has concluded. Winners are being announced by the host ")])},xe=[],Ce={},Re=(0,l.Z)(Ce,_e,xe,!1,null,null,null),Ze=Re.exports,$e={components:{vote:Kt,respond:ne,waiting:ue,intro:fe,recap:ke,outro:Ze},data(){return{connectionStatus:!1,socket:null,showPauseDialog:!1,currentView:"waiting",hostPresent:!0,hostLeft:!1,wordsInPrompt:[],candidates:[]}},destroyed(){this.socket?.connected&&this.forceDisconnect()},mounted(){this.connectSocket()},methods:{connectSocket(){const t=window.location.href.includes("localhost")?"http://localhost:3000":"/";this.socket?.connected||(this.socket=(0,Et.ZP)(t),this.socket.on("connect",(()=>{this.socket.emit("join-room",this.$store.state.roomid,(t=>{"connected"===t&&(this.connectionStatus=!0,this.socket.emit("player-join",this.$store.state.nickname),this.hostCountdown(),this.socket.emit("report-to-players"),this.socket.emit("get-current-view"))}))})),this.socket.on("visibility-handler",(t=>{this.showPauseDialog="hidden"===t})),this.socket.on("change-view",(t=>{this.currentView=t})),this.socket.on("roll-call",(()=>{this.socket.emit("player-join",this.$store.state.nickname),this.hostCountdown()})),this.socket.on("host-present",(()=>{this.hostPresent=!0})),this.socket.on("report-to-host",(()=>{this.socket.emit("player-join",this.$store.state.nickname)})),this.socket.on("new-words",(t=>{this.wordsInPrompt=t})),this.socket.on("candidate-list",(t=>{this.candidates=t})))},forceDisconnect(){this.socket.disconnect(),this.connectionStatus=!1},hostCountdown(){this.hostPresent=!1,setTimeout((()=>{this.hostLeft=!this.hostPresent}),3e3)}}},Te=$e,Pe=(0,l.Z)(Te,Wt,Ht,!1,null,null,null),Se=Pe.exports,Ie=function(){var t=this,e=t._self._c;return e(z.Z,{staticClass:"fix-to-middle",attrs:{width:"350"}},[e(F.EB,[t._v(" Join A Room ")]),e("div",{staticClass:"px-5"},[e(S.Z,{attrs:{label:"Enter a nickname"},model:{value:t.$store.state.nickname,callback:function(e){t.$set(t.$store.state,"nickname",e)},expression:"$store.state.nickname"}}),e(S.Z,{attrs:{label:"Enter a room ID"},model:{value:t.$store.state.roomid,callback:function(e){t.$set(t.$store.state,"roomid",e)},expression:"$store.state.roomid"}})],1),e(F.h7,[e(v.Z,{staticClass:"white--text",attrs:{disabled:!t.canJoin,color:"purple",block:""},on:{click:t.play}},[t._v("jump in!")])],1),e(F.h7,[e(v.Z,{attrs:{block:"",color:"red",dark:""},on:{click:function(e){return t.$router.push("/")}}},[t._v("go back :(")])],1)],1)},Le=[],je={mounted(){this.$store.state.roomid=this.$route.query.room||""},methods:{play(){this.$router.push({name:"play"})}},computed:{canJoin(){return this.$store.state.nickname&&this.$store.state.roomid}}},Ve=je,De=(0,l.Z)(Ve,Ie,Le,!1,null,"25a39dcd",null),Oe=De.exports;i.ZP.use(m.ZP);const Ee=[{path:"/",name:"home",component:x},{path:"/host",name:"host",component:At},{path:"/play",name:"play",component:Se},{path:"/join",name:"join",component:Oe}],qe=new m.ZP({mode:"history",base:"/",routes:Ee});var Be=qe,Me=s(629);i.ZP.use(Me.ZP);var Ae=new Me.ZP.Store({state:{nickname:"",roomid:""},getters:{},mutations:{},actions:{},modules:{}});i.ZP.config.productionTip=!1,new i.ZP({vuetify:p,router:Be,store:Ae,render:t=>t(d)}).$mount("#app")},936:function(t,e,s){t.exports=s.p+"media/beep.8341a396.mp3"},8332:function(t,e,s){t.exports=s.p+"media/respond.242bba8d.mp3"},9112:function(t,e,s){t.exports=s.p+"media/vote.a111df66.mp3"},2396:function(t,e,s){t.exports=s.p+"media/waiting.3731c068.mp3"}},e={};function s(i){var o=e[i];if(void 0!==o)return o.exports;var n=e[i]={exports:{}};return t[i].call(n.exports,n,n.exports,s),n.exports}s.m=t,function(){var t=[];s.O=function(e,i,o,n){if(!i){var r=1/0;for(u=0;u<t.length;u++){i=t[u][0],o=t[u][1],n=t[u][2];for(var a=!0,c=0;c<i.length;c++)(!1&n||r>=n)&&Object.keys(s.O).every((function(t){return s.O[t](i[c])}))?i.splice(c--,1):(a=!1,n<r&&(r=n));if(a){t.splice(u--,1);var l=o();void 0!==l&&(e=l)}}return e}n=n||0;for(var u=t.length;u>0&&t[u-1][2]>n;u--)t[u]=t[u-1];t[u]=[i,o,n]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){s.p="/"}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,i){var o,n,r=i[0],a=i[1],c=i[2],l=0;if(r.some((function(e){return 0!==t[e]}))){for(o in a)s.o(a,o)&&(s.m[o]=a[o]);if(c)var u=c(s)}for(e&&e(i);l<r.length;l++)n=r[l],s.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return s.O(u)},i=self["webpackChunkclient"]=self["webpackChunkclient"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998],(function(){return s(8860)}));i=s.O(i)})();
//# sourceMappingURL=app.f2020d8d.js.map