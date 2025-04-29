rednet.open("right") 
while true do 
    local event, id, message, port = os.pullEvent()
    repeat
        event, id, message, port = os.pullEvent()
    until event == "rednet_message" and port == "8080"
    if event == "rednet_message" then
        if message.request == "endtower" then
            print("ending Xana Attack")
            commands.exec("towerend")
        elseif message.request == "xana" then
            print("starting Xana Attack")
        end
    end
end
