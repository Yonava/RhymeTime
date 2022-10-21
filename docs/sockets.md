# Web Socket Documentation
Find the code for all socket endpoints here: [server/sockets.js](https://github.com/Yonava/RhymeTime/blob/main/server/sockets.js)

Socket endpoints are split into 2 categories: <a href="#connection">Connection Endpoints</a> & <a href="#gameplay">Gameplay Endpoints</a>
<br><br>
Connection endpoints are endpoints that exist solely to facilitate the function of connecting clients together for the purpose of making gameplay possible
<br><br>
Gameplay endpoints, in the other hand, are endpoints that are used by each client during gameplay to send data like new prompts, which prompt another player votes for etc.

<div id="connection"></div>

## Connection Endpoints

### player-join
<b>Sender</b> `Player Client` -> <b>Recipient</b> `Host Client`
<br>
<b>Data in Payload</b> username: string
<br>
Used for players to tell the host that they have joined

### change-view
<b>Sender</b> `Host Client` -> <b>Recipient</b> `Player Client`
<br>
<b>Data in Payload</b> view: string
<br>
Used by host to tell that players and audience what component they should render

### host-present
<b>Sender</b> `Host Client` -> <b>Recipient</b> `Player Client`
<br>
<b>Data in Payload</b> none
<br>
Lets host send a confirmation to players in room to confirm that the host is connected

### report-to-host
<b>Sender</b> `Host Client` -> <b>Recipient</b> `Player Client`
<br>
<b>Data in Payload</b> none
<br>
Used by host to probe for which players are still connected

### get-game-state
<b>Sender</b> `Player Client` -> <b>Recipient</b> `Host Client`
<br>
<b>Data in Payload</b> none
<br>
Used for players to tell the host that they need the current state of the game to stay in sync. Called when player joins mid-game or player has disconnected breifly before reconnecting again

