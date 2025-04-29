local towers = {}

local port = "8080"
rednet.open("right") 
local function scanTowers()
    towers = {}

    rednet.broadcast({request="identify"}, port)

    local timer = os.startTimer(2)

    while true do
        local event, id, message, _ = os.pullEvent()

        if event == "rednet_message" then
            if message.response == "tower" then
                if message.towerType == "waytower" or message.towerType == "supercomputer" or message.towerType == "xana" then
                else
                    table.insert(towers, {id=id, type=message.towerType})
                end
            end
        elseif event == "timer" and id == timer then
            break
        end
    end


    sleep(3)
end
local function sendCode()

    local selection = math.random(1, #towers)

    local selectedTower = towers[selection]
    rednet.send(selectedTower.id,{command="wake"}, port)
    sleep(4)
    local code = "xana control"

    rednet.send(selectedTower.id, {command=code}, port)
    rednet.send(74, {request="xana"}, port)
end
local function sendResetCode()
    rednet.broadcast({command="wake"}, port)
    sleep(4)
    local code = "code lyoko xana"

    rednet.broadcast({command=code}, port)
end
while true do
    local event, username, message, uuid, isHidden = os.pullEvent("chat")
    if event == "chat" and username == "sayCommand" and isHidden == true then
        if message == "xana attack trigger tower remove" then
            sendResetCode()
        elseif message == "xana attack trigger tower" then
            scanTowers()
            sendCode()
        end
    end
end