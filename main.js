window.onload = function(){

  var app = {};



function hotPotato(nameList, num){
  var queue = new DataStructure.Queue(),
      eliminated = "",
      winner = "";

  nameList.forEach(function(name){
    queue.enqueue(name);
  });

  while(queue.size() > 1){

    for(var i=0; i<num; i++){
      queue.enqueue(queue.dequeue());
    }

    eliminated = queue.dequeue();

    console.log(eliminated + " has been eliminated");


  }

  winner = queue.dequeue();

  return console.log('The winner is: '+winner);

}

function baseConverter(number, base){
    var remStack = new DataStructure.Stack(),
        rem = 0,
        output = "",
        digits = "0123456789ABCDEF";

    while(number > 0){
      rem = Math.floor(number % base);
      remStack.push(rem);
      number = Math.floor(number / base);
    }

    while(!remStack.isEmpty()){
      output += digits[remStack.peek()];
      remStack.pop();
    }

    return output;

}

app.baseConverter = baseConverter;
app.hotPotato = hotPotato;

window.app = app;


};
