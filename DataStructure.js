var DataStructure = (function(){

    function Map(){
      var items = {},
          len = 0;

        this.has = function hasKey(key){

          return items.hasOwnProperty(key);

        };

        this.set = function setKey(key, value){

          items[key] = value;
          len++;

          return this;

        };

        this.remove = function removeKey(key){

          //check if Map has provided key before deleting
          if(this.has(key)){
            delete items[key];
            len--;
            return true;
          }

          return false;

        };

        this.get = function getValue(key){

            //return the value if key is present, undefined otherwise.
            return this.has(key)? items[key] : undefined;

        };

        this.values = function getValues(){

          var values = [];

          //iterate through own keys
          for(var key in items){

            if(this.has(key)){
              //store the value of own key into array
              values.push(items[key]);
            }

          };

          //return array
          return values;

        };
        this.getItems = function getItems(){

          return items;

        };
        this.keys = function getKeys(){

            var keys = [];

            for(var key in items){

              if(this.has(key)){
                keys.push(key);
              }

            }

            return keys;

        };

        this.clear = function emptyOut(){

          items = {};
          len = 0;

          return this;

        };

        this.size = function getSize(){

          return len;

        };

    }

    function HashTable(){

      var table = [],
          item = function(key, value){
            this.key = key;
            this.value = value;
            this.toString = function() {
    return '[' + this.key + ' - ' + this.value + ']';
  };
          };

      var loselosehash = function hashFunc(key){
        var sum = 0,
            len = key.length;

        while( (len -= 1) >= 0) sum += key.charCodeAt(len);

        return (sum % 37);

      };

      this.put = function put(key, value){

        var position = loselosehash(key);

        //check if position is free, create linked list first, append following items after that.
        if(table[position] === undefined){

            table[position] = new LinkedList();

        }

        //since spot is not empty in table, append to linked list
        table[position].append(new item(key, value));


        return this;

      };

      this.get = function getItem(key){

          var position = loselosehash(key);

          //return undefined if position is empty on Hash table.
          if(table[position] === undefined){
            return undefined;
          }


          var current = table[position].getHead();

              //while the next node is defined (iterate until tail);
          while(current.next){

            if(current.element.key === key){
              return current.element.value;
            }

            //update current with next item.
            current = current.next;

          }

          //check in case first or last element
          if (current.element.key === key){
              return current.element.value;
          }


      };

      this.remove = function removeItem(key){

          var position = loselosehash(key);

          //cant remove an item from an empty table index
          if(table[position] === undefined){
              return false;
          }

          //current spot is known to be filled with a linkedlist
          var index = 0,
              linkedList = table[position],
              current = linkedList.getHead();

            //while the current element is defined
          while(current){

            //check if current element in list matches the key we looking for.
            if(current.element.key === key){

                //if it does remove it from the current index
                linkedList.removeAt(index);
                //if that was the last element in the linkedlist, empty out the position from our table
                table[position] = linkedList.isEmpty()? undefined : linkedList;

                return true;

            }

            //update current and counter for index
            current = current.next;
            index++;

          }

          //no element was found with key provided.
          return false;

      };

      this.print = function () {
        for (var i = 0; i < table.length; ++i) {  //{1}
            if (table[i] !== undefined) {         //{2}
                console.log(i + ": " + table[i]); //{3}
            }
        }
      };



    }

    function Set(){
      var items = {},
          length = 0;

      this.size = function getSize(){
        return length;
      };
      this.has = function isIn(value){
        return items.hasOwnProperty(value);
      }
      this.add = function addItem(item){
        if(!this.has(item)){
          items[item] = item;
          length += 1;
          return true;
        }
        return false;
      };
      this.remove = function removeItem(item){
        if(this.has(item)){
          delete items[item];
          length -= 1;
          return true;
        }
        return false;
      };
      this.clear = function empty(){
        items = {};
        length = 0;
        return this;
      };
      this.values = function getValues(){
        var keys = [];

        for(var item in items){
          if(this.has(item)){
            keys.push(item);
          }
        }
        return keys;

      };
      this.union = function uniteSets(other){
        var newSet = new Set(),
            values = this.values().concat(other.values());

            for(var i=0; i<values.length; i++){

              newSet.add(values[i]);

            }

            return newSet;

      };
      this.intersection = function intersect(other){
          var newSet = new Set(),
              values = this.values();

            for(var i = 0; i<values.length; i++){
                var currentValue = values[i];


              if(other.has(currentValue)){
                newSet.add(currentValue);
              }

            }

            return newSet;

      };

      //what is unique of set A with respect to other.
      this.difference = function getDifference(other){
        var newSet = new Set(),
            values = this.values();

            for(var i=0; i<values.length; i++){

              //add the values to our new set that are NOT found in the other set.
              var currentValue = values[i];
              if(!other.has(currentValue)){
                newSet.add(currentValue);
              }

            }

            return newSet;

      };
      this.subset = function checkSubset(other){

        //get the values of subset
        var values = this.values();

            //if the size of our subset A is greater than other return false
            if(this.size() >= other.size()){
              return false;
            }

            for(var i=0; i<values.length; i++){
              var currentValue = values[i];

            //as soon as it has been confirmed that an item doesn't exist in the other set
            //it means it is not a subset so change bool value
              if(!other.has(currentValue)){
                return false;
              }

            }

            return true;

      };

    }

    function Stack(){
      var items = [];

      this.isEmpty = function(){
        return (items.length === 0);
      };
      this.peek = function(){
        return items[items.length-1];
      };
      this.pop = function(){
        items.pop();
        return this;
      };
      this.push = function(item){
        items.push(item);
        return this;
      };
      this.print = function () {
        return items.toString();
      };
    }

    function QueueElement(element, priority){
        this.element = element;
        this.priority = priority;
    }

    function Queue(){

      this.items = [];
      var items = this.items;

      this.isEmpty = function isEmpty() {
        return items.length === 0;
      };
      this.enqueue = function enqueue(element){

        items.push(element);

        return this;

      };

      this.dequeue = function dequeue(item){
        return items.shift();
      };
      this.front = function front(){
        return items[0];
      };
      this.size = function size(){
        return items.length;
      };
      this.print = function print(){
        console.log(items.toString());
      };
      this.clear = function clear(){
        items = [];
      };
    }

    function PrioritiyQueue(){

      Queue.call(this);

      var items = this.items;

      this.enqueue = function enqueue(element, priority){
        //queues always add elements to the end of the queue or based on priority
        var qElement = new QueueElement(element, priority),
            hasAdded = false,
            currentElement;

          //if empty just add element to the queue
        if(this.isEmpty()){
          items.push(qElement);
        }else{

          //check all items in queue and compare their priority
          for(var i=0; i<items.length; i++){
            currentElement = items[i];
            //if the new element priority exceeds the current element, take its place
            if(qElement.priority < currentElement.priority){
              items.splice(i, 0, qElement);
              hasAdded = true;
              break;
            }
          }

          //if no new element has been added and iteration finished just add to the end.
          if(!hasAdded){
            items.push(qElement);
          }

        }

        return this;

      };
    }

    function LinkedList(){

      var head = null, length = 0,
          Node = function(element){
            this.element = element;
            this.next = null;
          };


      this.append = function(element){
        var newNode = new Node(element),
            current = null;

        if(head === null){
          head = newNode;
        }else{

          //set the current to the head to start iteration
          current = head;

          //while the next element is defined loop
          while(current.next){

              //update current element with next
            current = current.next;

          }

          //point the final element next attribute to the new node.
          current.next = newNode;

        }

        length += 1;

      };
      this.insert = function(position, element){

        var index = 0, current = head, previous = null, newNode = null;

        //position cannot be less than 0 or greater than the last index
        if(position < 0 || position > (length - 1)){
          return false;
        }else if(position === 0){
          newNode = new Node(element);
          newNode.next = head;
          head = newNode;
          return true;
        }

        newNode = new Node(element);

        //iterate until one before the position.
        while(index < position){
          previous = current;
          current = current.next;
          index += 1;
        }

        //set the previous item to the new node and
        //new node to point to the current item.
        previous.next = newNode;
        newNode.next = current;

        length += 1;

        return true;

      };
      this.removeAt = function(position){

        var current = head, previous = null, index = 0;

        if(position < 0 || position > (length-1)){
          return null;
        }else if(position === 0){
          head = head.next;
          return current.element;
        }

        //while the index is less than the position, move references by 1
        while(index < position){

          previous = current;
          current = current.next;
          index += 1;

        }

        //point the previous next to item that follows the current one to eliminate the reference to the current element
        //so it gets garbaged collected
        previous.next = current.next;
        length -= 1;

        return current.element;

      };
      this.remove = function(element){
        //returns the removed element
          return this.removeAt(this.indexOf(element));

      };
      this.indexOf = function(element){
        var index = 0, current = head;

        while(current){

          //if the currrent element is the same break out of loop and return;
          if(current.element === element){
            return index;
          }

          //update current with next item.
          current = current.next;
          index += 1;

        }

        //since method didn't return from inside the while loop element was not found return -1

        return -1;


      };
      this.isEmpty = function() {
        return length === 0;
      };
      this.size = function() {
        return length;
      };
      this.toString = function(){

        var output = "",
            current = head;

            while(current){

              output += current.element+" ";
              current = current.next;

            }

          return output;


      };
      this.print = function(){
        console.log(this.toString());
      };
      this.getHead = function(){
          return head;
      };


    }

    function DoubleLinkedList(){

      var head = null, length = 0, tail = null,
          Node = function(element){
            this.element = element;
            this.next = null;
            this.prev = null;
          };

      this.iterateTo = function iterateTo(position, callback){

        var index = 0; current = null, previous = null, fromEnd = false;

        //get negative pos with respect to index
        position = (position < 0)? (length+position) : position;

        if(position > (length-1) || position < -length){
          return false;
        }else if(position === 0){

          current = head;
          previous = current.prev;
          callback(current, previous, index);
          return true;

        }else if(position === (length-1)){

          current = tail;
          previous = tail.prev;
          callback(current, previous, position);
          return true;

        }

        //check if index is greater than half to pick where to start
        fromEnd = (position > Math.floor(length/2))? true : false;


        //if starting from the end run this
        if(fromEnd){

          //set the index to the last.
          index = length-1;
          current = tail;
          previous = tail.prev;

          //while index is greater than position iterate.
          while(index > position){

            //move the references by one to the left
            current = current.prev;
            previous = current.prev;
            index -= 1;

            //call cb with current values since we are iterating backwards
            callback(current, previous, index);


          }

        }else{

          //since starting from beginning set current to head
          current = head;
          previous = head.prev;

          while(index < position){


            //update values and index for next iteration.
            current = current.next;
            previous = current.prev;
            index++;

            //call cb with current values since iterating forward
            callback(current, previous, index);

          }

        }

        //returns true once it has finished successfully iterating.
        return true;

      };

      this.print2 = function(){

        var output = "";

        this.iterateTo((length-1), function(current, previous, index){

          output += current.element+ " ";

        });

        console.log(output);
        return true;


      };

      this.append = function(element){
        var newNode = new Node(element),
            current = null,
            previous = null;

        if(head === null){
          head = newNode;
          tail = newNode;
        }else{

          //add new node to end
          newNode.prev = tail;
          tail.next = newNode;
          tail = newNode;

        }

        length += 1;

      };
      this.insert = function(position, element){

        var current = null, previous = null, newNode = null, cbOutput = false;

        //iterate to the specified position
        cbOutput = this.iterateTo(position, function(currentElement, previousElement, index){

          //update local references on every iteration.
          current = currentElement;
          previous = previousElement;

        });

          //return out if iteration failed
        if(!cbOutput){

          return false;

        }

        //insert inbetween current and previous and update length
        newNode = new Node(element);
        newNode.prev = previous;
        newNode.next = current;
        previous.next = newNode;
        current.prev = newNode;

        length += 1;

        return true;

      };
      this.removeAt = function(position){

        var current = null, previous = null, output = null;

        //iterate to position to get references
        output = this.iterateTo(position, function(currentElement, previousElement, index){
          current = currentElement;
          previous = previousElement;
          position = index;
        });

        //return null if position is nonsense
        if(!output){
          return null;
        }

        //if at end cut the tail off
        if(position === (length-1)){

          previous.next = null;
          current.prev = null;
          current.next = null;
          tail = previous;
          length -= 1;

          ///return the tail element value
          return current.element;

          //if at start cut the head and assign head to index 2 element.
        }else if(position === 0){

          current.next.prev = null;
          head = current.next;
          current.next = null;
          length -= 1;

          return current.element;


        }

        //if in the middle of list, cut reference to current element.
        previous.next = current.next;
        current.next.prev = previous;
        current.next = null;
        current.prev = null;
        length -= 1;


        return current.element;

      };
      this.remove = function(element){
        //returns the removed element
          return this.removeAt(this.indexOf(element));

      };
      this.indexOf = function(element){
        var index = 0, current = head;

        while(current){

          //if the currrent element is the same break out of loop and return;
          if(current.element === element){
            return index;
          }

          //update current with next item.
          current = current.next;
          index += 1;

        }

        //since method didn't return from inside the while loop element was not found return -1

        return -1;


      };
      this.isEmpty = function() {
        return length === 0;
      };
      this.size = function() {
        return length;
      };
      this.toString = function(){

        var output = "",
            current = head;

            while(current){

              output += current.element+" ";
              current = current.next;

              console.log(current);


            }



          return output;


      };

      this.print = function(){
        console.log(this.toString());
      };
      this.getHead = function(){
          return head;
      };




    }





  return {
    Map : Map,
    Set : Set,
    HashTable : HashTable,
    Stack : Stack,
    Queue : Queue,
    PrioritiyQueue : PrioritiyQueue,
    LinkedList : LinkedList,
    DoubleLinkedList : DoubleLinkedList
  };


})();
