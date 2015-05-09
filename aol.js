function check(){
	var temp = document.getElementById("search");
	console.log("hi- >"+ temp.value);
	if(temp.value == ""){
		alert("Please enter value");
	}else{		
        document.getElementById("videoCSS").style["background-color"]="white";

		//how jsonp worrks- http://www.w3resource.com/JSON/JSONP.php
		var script = document.createElement('script');		
		script.src = "http://api.5min.com/search/"+temp.value+"/videos.json?callback=processData";
		document.body.appendChild(script);
		document.body.removeChild(script);
	}
}

function processData(data)
{
    //remove old results   
	var oldSearch = document.getElementById("titlelist");
	while (oldSearch.hasChildNodes()) {
    	oldSearch.removeChild(oldSearch.lastChild);
	}
	document.getElementById("videoCSS").hidden = true;
    document.getElementById("playVideo").src = '';
    document.getElementById("desc").value = '';
	
    console.log(data);
    var arr = data['items'];
    var len = arr.length;
    console.log(len);

    //temp element to store all subsequenet sub element so that ONLY ONE call to appendchild is made to the live dom
    // thus a little faster performance
    var nodemain = document.createElement("div");
    for(var i =0;i<len;i++){
    	console.log(arr[i].title);

    	var node = document.createElement("div");
    	node.classList.add("item");

    	var img = document.createElement("img");
    	img.src= arr[i].image;   
        
        //html5 data-* can store extra information using to store the desccription
        node.setAttribute('data-d',arr[i].description);
    	node.id =arr[i].videoUrl;
    	node.onclick = function(){
    		console.log("click");
            document.getElementById("videoCSS").style["background-color"]="beige";
            document.getElementById("videoCSS").style["width"]="530px";
    		document.getElementById("videoCSS").hidden = false;
    		document.getElementById("playVideo").src = this.id;   //set the video on the iframe         
    		document.getElementById('titlelist').style["overflow-y"]="scroll";
   			document.getElementById('titlelist').style["max-height"]="575px";
    		document.getElementById('titlelist').style["width"]="750px";
            //set the descripption
            document.getElementById("desc").removeChild(document.getElementById("desc").lastChild); 
            document.getElementById('desc').appendChild(document.createTextNode(this.dataset.d));

    	};
        //add all the text to the temp list
        var info = document.createElement("div");
        info.classList.add("infoitem");
        var sp = document.createElement("span");
        sp.style["font-weight"] ="bold";
        sp.classList.add("txt");
        var sp1 = document.createElement("span");
        sp1.classList.add("txtowner");
   		var textnode = document.createTextNode(arr[i].title);          		
        sp.appendChild(textnode);
        sp.appendChild(document.createElement("br"));
        sp1.appendChild(document.createTextNode("by "));
        sp1.appendChild(document.createTextNode(arr[i].videoOwner));
        sp.appendChild(sp1);
        sp.appendChild(document.createElement("br"));
        var sp2 = document.createElement("span");
        sp2.classList.add("txtviews");        
        sp2.appendChild(document.createTextNode(arr[i].views));
        sp2.appendChild(document.createTextNode("views "));
        sp.appendChild(sp2);
    	info.appendChild(img);
        info.appendChild(sp);
        node.appendChild(info);
        nodemain.appendChild(node);    	
    }
    //add temp list only once to dom element
    document.getElementById("titlelist").appendChild(nodemain);
    document.getElementById('titlelist').style["max-height"]="auto";
    document.getElementById('titlelist').style["width"]="auto";
    
}