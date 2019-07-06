/*GLOBAL*/
var userID = document.getElementById("clicksamon").src.substring(39);
// var recordUserID = "test1";

/*+++++++++++++++++++++++++++++++++++++++++++++++++++ */
/*+++++++++++++++++++++++++++++++++++++++++++++++++++ */
/*+++++++++++++++++++++Firebase++++++++++++++++++++++ */
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAoM3RHcSvJngXXDB2Zgq61QJa87KKybtI",
    authDomain: "clicktracker-3d306.firebaseapp.com",
    databaseURL: "https://clicktracker-3d306.firebaseio.com",
    projectId: "clicktracker-3d306",
    storageBucket: "clicktracker-3d306.appspot.com",
    messagingSenderId: "602278567313",
    appId: "1:602278567313:web:d1b791f15e4c36f2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
/*+++++++++++++++++++++Firebase++++++++++++++++++++++ */
/*+++++++++++++++++++++++++++++++++++++++++++++++++++ */
/*+++++++++++++++++++++++++++++++++++++++++++++++++++ */

//Convert session string data to json
let route = JSON.parse(sessionStorage.getItem("route"));

//if click some button or anchor, redirect to http other page
document.addEventListener(
    "click",
    function(event) {
        let x = event.target;

        //storage information
        if (x.href) { //  && x.href.substr(0, 4) == "http" ==================================================================================
            sessionStorage.setItem("name", x.innerText);
            sessionStorage.setItem("baseURI", x.baseURI);
            sessionStorage.setItem("targetURI", x.href);
        }
    },
    false
);

// console.log(route);
if (route == null) {
    //make route be a new object
    route = {};
    route["name"] = "Home";//==================================================================================
    route["children"] = [];
    route["clicked-time"] = 1;
    route["URL"] = location.href;//==================================================================================
    //upload data to firebase (auto-generate ID)
    db.collection(userID)
        .add(route)
        .then(function(docRef) {
            sessionStorage.setItem("FirebaseID", docRef.id);
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
} else {
    //add new page and a empty array children
    let tmpobj = {};
    if (sessionStorage.getItem("name") !== null) {
        //get last click attr data
        tmpobj["name"] = sessionStorage.getItem("name");
        tmpobj["baseURI"] = sessionStorage.getItem("baseURI");
        tmpobj["targetURI"] = sessionStorage.getItem("targetURI");
        tmpobj["children"] = [];
        tmpobj["clicked-time"] = 1;
        //Recursive to find the object
        let bla = findthechildren(route);
        //push the new object inside the pointer object
        bla["children"].push(tmpobj);
        //remove seession after push in the json file
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("baseURI");
        sessionStorage.removeItem("targetURI");

        //if having new data, then update
        let updata = db
            .collection(userID)
            .doc(sessionStorage.getItem("FirebaseID"));
        updata.update(route);
    }
}

//Storage json with converting string data to session
sessionStorage.setItem("route", JSON.stringify(route));
// console.log(route);

function findthechildren(thisobj) {
    if (thisobj["children"].length) {
        //if thisobject has children, then recursion.
        return findthechildren(thisobj["children"][0]);
    } else {
        //if not, return the object.
        return thisobj;
    }
}
