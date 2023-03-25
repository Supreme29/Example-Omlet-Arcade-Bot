const SocketIO = require(`socket.io-client`);

Client = SocketIO(`https://omapi.ru`);
Client.on(`connect`, 
	function() {
		console.log(`Successful connection!`);
	}
);

Client.on(`connect`, 
    async function() {
        console.log(`Successful connection!`);
        
        const AuthInfo = {
            token: ..., // Your API key is here
            username: ... // Your username is here
        };
        
        const Response = await fetch(`https://omapi.ru/api/user/getSocketAccess/?token=${AuthInfo.token}&username=${AuthInfo.username}`);
        const ReponseJSON = await Response.json();
        const AccessToken = ReponseJSON.result;
        
        Client.emit(`createSocketConnection`, AuthInfo.username, AuthInfo.token, AccessToken, 
            function() {
                console.log(`Successful Auth!`);		
                
                Client.on("onChatMessage", 
                    function(username, message, messageID) {
                        if (message == `!discord`) {
                            Client.emit(`createChatMessage`, `📌 discord.gg/9wsunfPTeD`, console.log);
                        };
                    }
                );

                setInterval(
                    function() {
                        Client.emit(`createChatMessage`, `📌 discord.gg/9wsunfPTeD`, console.log);
                    }, 60000 * 5
                )
            }
        );
    }
);
