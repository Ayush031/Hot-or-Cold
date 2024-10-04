Tokens = Tokens or {}
Handlers.add("message", Handlers.utils.hasMatchingTag("Action", "smash"), function(msg)
    Tokens[msg.Data] = (Tokens[msg.Data] or 0) + 1;
    print("Smashed")
end)

json = require('json')
Handlers.add('get', Handlers.utils.hasMatchingTag("Action", "Get"), function(msg)
    ao.send({
        Target = msg.From,
        Action = "get",
        Data = json.encode(Tokens)
    })
    print("lets gooo")
end)
