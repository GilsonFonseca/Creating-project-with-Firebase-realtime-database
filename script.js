/* Initialize Firebase*/
var config = {
	apiKey: "AIzaSyCutLckzqorRT3Pc82eyGUVhYlbl_hIt4o",
	authDomain: "objeto-2b485.firebaseapp.com",
	databaseURL: "https://objeto-2b485.firebaseio.com",
	projectId: "objeto-2b485",
	storageBucket: "objeto-2b485.appspot.com",
	messagingSenderId: "66980502381"
};
firebase.initializeApp(config); 
var db = firebase.database();
// variable for the list
var ol = document.getElementById("object_list");
// variable for the object
var dbRef = db.ref('objeto');
//Retrieve the data from firebase
dbRef.on('value', retrieveData, error);
var li;

/*		This function receive the data entry from the input when the insert button is clicked, after that creates an object on dbRef
	and if the data isn't empty populate the dbRef with them, after doing that calls the retriever to refresh the list and clean the input fields, 
	but if one of the data is empty calls an alert window*/
function writeObjectData() {
	var data1 = document.getElementById("data1").value;
	var data2 = document.getElementById("data2").value;
	var data3 = document.getElementById("data3").value;
	var postId = dbRef.push().getKey();
	if((data1 && data2 && data3) != ''){
		dbRef.child(postId).set({
		id : postId,
		data1: data1,
		data2: data2,
		data3 : data3
		});
		dbRef.on('value', retrieveData, error);
		document.getElementById("data1").value = '';
		document.getElementById("data2").value = '';
		document.getElementById("data3").value = '';
	}	
	else{
		alert("Please, fill all the fields");
	}
}

/*		Gets the data from firebase and if its not null or undefined make the array numerable and use it in a for to
	get the length of the array and goes inside the objects to get the data then generate the list with those informations
	lastly if the firebase data is empty or something the list is setted to empty*/
function retrieveData(data){
	var objects = data.val();
	if (objects !== 'undefined' && objects !== null) {
		var keys = Object.keys(objects);
		//clear the list, for not getting repeated values
		ol.innerHTML = "";	
		for(var i = 0; i < keys.length; i++) {
		var aux = keys[i];
		var rData1 = objects[aux].data1;
		var rData3 = objects[aux].data3;
		var rData2 = objects[aux].data2;
		var rId = objects[aux].id;
		generateList(rData1, rData3, rData2, rId);			
	}
	}else{
		ol.innerHTML = "";	
		console.log("Vazio");
	}
}

/*		If some error occurred this is called and show in the console*/
function error(){
	console.log('Error!');
	console.log(err);
}

/*		Gets the data from retrieveData and create the list. First creates a line then append to it a node with the data
	after set to that line the id of the object to make easy to handle it. Than append that line with the list*/
function generateList(rData1, rData3, rData2, id) {
	li = document.createElement('li');
	li.appendChild(document.createTextNode(rData1+" "+rData2+" "+rData3));
	li.setAttribute("id", id);
	ol.appendChild(li);
}
/* 		Those functions handle the delete from firebase. First when you click on a item the getEventTarget gets the position where you clicked and 
	the onclick send an alert saying that the data will be removed than set the dbRef from the object null*/
function getEventTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement; 
}
ol.onclick = function(event) {
	var target = getEventTarget(event);
	alert("O objeto de id: "+target.id+" será apagado.");
	dbRef.child(target.id).set(
	null
);

}


