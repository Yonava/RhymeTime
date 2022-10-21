# Web Socket Documentation
Find the code for all socket endpoints here: [server/sockets.js](https://github.com/Yonava/RhymeTime/blob/main/server/sockets.js)

Our project utilizes tooling built by [Socket.io](https://socket.io/docs/v4/) for implementing sockets that use the websocket protocol integrated with http for automatic reconnection

```npm install socket.io```
[npm](https://www.npmjs.com/package/socket.io)

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

### pause-state
<b>Sender</b> `Host Client` -> <b>Recipient</b> `Player Client`
<br>
<b>Data in Payload</b> pauseState: { gamePaused: boolean, reason: string }
<br>
Used by host to tell player clients if they need to go into a pause state and why

<div id="gameplay"></div>

## Gameplay Endpoints

### player-prompt-response
<b>Sender</b> `Player Client` -> <b>Recipient</b> `Host Client`
<br>
<b>Data in Payload</b> playerResponse: { player: string, response: string }
<br>
Used by player to send their submitted prompt response to host

### new-words
<b>Sender</b> `Host Client` -> <b>Recipient</b> `Player Client`
<br>
<b>Data in Payload</b> newWords: []string
<br>
Used by host to send a new prompt to players

### candidate-list
<b>Sender</b> `Host Client` -> <b>Recipient</b> `Player Client`
<br>
<b>Data in Payload</b> list: []string
<br>
Used by host to tell players who they can vote for

### submit-ballot
<b>Sender</b> `Player Client` -> <b>Recipient</b> `Host Client`
<br>
<b>Data in Payload</b> ballot: { "nickname of sender client" : []string }
<br>
Used by player to send their "ballot" to the host. Ballot contains information on who the player voted for

### skip-vote
<b>Sender</b> `Player Client` -> <b>Recipient</b> `Host Client`
<br>
<b>Data in Payload</b> pauseState: { playerName: string, wantsToSkip: boolean }
<br>
Used by players to vote on whether to skip the tutorial playing on host
