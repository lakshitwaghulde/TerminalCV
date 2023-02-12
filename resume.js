var cmd_list = [];
var cmd_index = 0;
var available_cmd = ["about", "education", "projects", "skills", "contact", "download", "help", "clear"];

var cmd = document.getElementById("command");

cmd.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        run_command();
    }

    else if(event.keyCode === 38){
        event.preventDefault();
        cycle_command("up");
    }

    else if(event.keyCode === 40){
        event.preventDefault();
        cycle_command("down");
    }

    else if(event.keyCode === 16){
        event.preventDefault();
        tab_completion();
    }
});

function run_command(){
    var cmd = document.getElementById("command");
    var input = cmd.value;
    var output;

    if(input != ''){
        var element = document.getElementById(input);

        if(available_cmd.indexOf(input) < 0){
            element = document.getElementById('error');
        }

        if(input == 'download'){
            window.open('./resume.pdf' , '_blank');
        }
        else if(input == 'clear'){
            clear_console();
            return;
        }

        output = element.cloneNode(true);
        output.style = "display:block";
    }
    var color  = "#39FF14";
    var cmd_output = document.createElement("div");
    var container = document.createElement("div");
    var br = document.createElement('br');
    container.appendChild(br);
    var node = document.createTextNode("lakshit@waghulde:-$ " + input);
    cmd_output.appendChild(container);
    container.appendChild(node);
    container.style.color = color;

    if(input != ''){
        cmd_output.appendChild(output);
        cmd_list.push(input);
    }

    var element = document.getElementById("executed_commands");
    element.appendChild(cmd_output);

    cmd.value = "";
    cmd_index = cmd_list.length - 1;

    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

function cycle_command(direction){
    if(direction === "up"){
        if(cmd_index > 0){
            cmd_index -= 1;
        }
    }
    else if(direction === "down"){
        if(cmd_index < cmd_list.length - 1){
            cmd_index += 1;
        }
    }

    var cmd = document.getElementById("command");
    cmd.value = cmd_list[cmd_index];
}

function tab_completion(){
    var cmd = document.getElementById("command");
    var input = cmd.value;

    for(index=0;index<available_cmd.length;index++){
        if(available_cmd[index].startsWith(input)){
            cmd.value = available_cmd[index];
            break;
        }
    }
}

function clear_console(){
    document.getElementById("executed_commands").innerHTML = "";
    document.getElementById("command").value = "";
}
