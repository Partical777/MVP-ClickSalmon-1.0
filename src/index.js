import "./styles.css";

let txtID;
// let docID = "Example";

document.getElementById("app").innerHTML = `
        <nav role="navigation">
            <div class="nav-wrapper container">
                <a id="logo-container" href="#" class="brand-logo center"
                    >Click Salmon</a
                >
                <ul class="right hide-on-med-and-down">
                    <li><a class="waves-effect waves-light btn modal-trigger" href="#modal1">Tutorial</a></li>
                    <li><a id="userforID" href="#">User ID: </a></li>                    
                </ul>

                <ul id="nav-mobile" class="sidenav">
                    <li><a href="#">Navbar Link</a></li>
                </ul>
            </div>
        </nav>
        <div class="container" id="put-the-cdnjs">
            <div class="row">
                <div class="col s12 m12">
                    <div class="card">
                        <div class="card-content" id="cdn-card-content">
                            <span class="card-title"
                                >Copy this to your Html file.</span
                            >
                            <pre>
&lt;script src=&quot;https://www.gstatic.com/firebasejs/6.2.3/firebase-app.js&quot;&gt;&lt;/script&gt;<br/>&lt;script src=&quot;https://www.gstatic.com/firebasejs/6.2.3/firebase-firestore.js&quot;&gt;&lt;/script&gt;<br/>&lt;script src=&quot;https://fir-host-60928.firebaseapp.com/&quot; id=&quot;clicksamon&quot;&gt;&lt;/script&gt;
                            </pre>
                        </div>
                        <div class="card-action">
                            <a href="#" id="copy-cdn">Copy</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section" id="index-banner">
            <div class="container">
                <div class="row">
                    <div class="col s12 m12">
                        <div class="card" id="main-card">
                            <div class="card-content">
                                <span class="card-title">Tree Diagram</span>
                                <div id="main-tree-diagram">
                                    <div  id="main-tree-diagram-inner-preloader" class="preloader-wrapper big active">
                                        <div class="spinner-layer spinner-red-only">
                                            <div class="circle-clipper left">
                                                <div class="circle"></div>
                                            </div><div class="gap-patch">
                                                <div class="circle"></div>
                                            </div><div class="circle-clipper right">
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-action">
                                <!--<a href="#">User1</a>-->
                                <!--<a href="#">User2</a>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col s12 m12">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">※Alert : Leave your userID below form, your data won't be deleted after a WEEK.</span>
                            <a id="feedback-link" href="https://forms.gle/6W29mTmHrU1HEejs8" target="_blank">https://forms.gle/6W29mTmHrU1HEejs8</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="page-footer">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">Click Salmon</h5>
                        <p class="grey-text text-lighten-4">
                            Click Salmon beta is a clicked tracker. Its special point is generating the tracking route. Everyone could easily see which button or route is most people explored. It can help you improve UI/UX of website. Even find something unexpected route from users.
                        </p>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">
                    Made by
                    <a
                        class="orange-text text-lighten-3"
                        href="http://materializecss.com"
                        >Materialize</a
                    >
                </div>
            </div>
        </footer>
`;

//pop alert input
function myFunction() {
    let storageIDlocally = localStorage.getItem("myID");
    if (storageIDlocally == null) {
        storageIDlocally = "";
    }
    let pop = prompt("Please set your ID:", storageIDlocally);
    //if ID is empty
    if (pop == null || pop == "") {
        myFunction();
    }
    localStorage.setItem("myID", pop);
    document.getElementById("userforID").innerHTML = "User ID: " + pop;
    document.getElementsByTagName("pre")[0].innerHTML =
        "&lt;script src=&quot;https://www.gstatic.com/firebasejs/6.2.3/firebase-app.js&quot;&gt;&lt;/script&gt;<br/>&lt;script src=&quot;https://www.gstatic.com/firebasejs/6.2.3/firebase-firestore.js&quot;&gt;&lt;/script&gt;<br/>" +
        "&lt;script src=&quot;https://fir-host-60928.firebaseapp.com/" +
        pop +
        "&quot; id=&quot;clicksamon&quot;&gt;&lt;/script&gt;";
    txtID = pop;
}
myFunction();

//Click to copy link
document.getElementById("copy-cdn").addEventListener("click", () => {
    /* Get the text field */
    let copyText = document.getElementsByTagName("pre")[0].innerText;
    console.log(copyText);
    /* Copy the text inside the text field */
    let inp = document.createElement("input");
    document.body.appendChild(inp);
    inp.value = copyText;
    inp.select();
    document.execCommand("copy", false);
    inp.remove();
    alert("Copied!");
});

/*GLOBAL*/
var userID = txtID; //"1234567";

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

//Get Firebase Datos
function getdata() {
    let route = db.collection(userID);
    let treeData = {};
    route.get().then(doc => {
        // console.log(doc.data());
        doc.forEach(item => {
            let bla = findthesamechildren(treeData, item.data());

            //if treeData is empty
            if (Object.getOwnPropertyNames(treeData).length === 0) {
                treeData = item.data();
            } else {
                //if thisobj has children
                if (bla["item"]["children"][0]) {
                    //push the new object inside the pointer object
                    bla["treeData"]["children"].push(
                        bla["item"]["children"][0]
                    );
                }
            }
        });
        loadData(treeData);
    });
}
getdata();
/*+++++++++++++++++++++Firebase++++++++++++++++++++++ */
/*+++++++++++++++++++++++++++++++++++++++++++++++++++ */
/*+++++++++++++++++++++++++++++++++++++++++++++++++++ */
function findthesamechildren(subobj, thisobj) {
    if (subobj.name === thisobj.name) {
        //make clicked-time plus 1
        subobj["clicked-time"]++;
        //check name
        if (
            subobj.children &&
            (thisobj.children.length !== 0 && thisobj.children !== undefined)
        ) {
            //check both if have children
            for (var k in subobj.children) {
                //check each children if same
                if (subobj.children[k].name === thisobj.children[0].name) {
                    //if subobj has children && children is same, then recursion.
                    return findthesamechildren(
                        subobj.children[k],
                        thisobj.children[0]
                    );
                }
            }
            //if every children is different, return the object.
            return { treeData: subobj, item: thisobj };
        } else {
            //if doesn't have children, return the object.
            return { treeData: subobj, item: thisobj };
        }
    } else {
        //if name is different, return the object.
        return { treeData: subobj, item: thisobj };
    }
}

/* +++++++++++++++++Move here from outside++++++++++++++++++ */
// Set the dimensions and margins of the diagram
let margin = { top: 20, right: 90, bottom: 30, left: 90 },
    width = 1080 - margin.left - margin.right,
    height = 720 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
let svg = d3
    .select("#main-tree-diagram")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// declares a tree layout and assigns the size
let treemap = d3.tree().size([height, width]);
/* +++++++++++++++++++++++++++++++++++ */

var i = 0,
    duration = 750,
    root;

function loadData(treeData) {
    // Assigns parent, children, height, depth
    // console.log(treeData);

    //add data to root with hierachy function
    root = d3.hierarchy(treeData, function(d) {
        // console.log(treeData);
        return d.children;
    });
    root.x0 = height / 2;
    root.y0 = 0;

    // !!==Collapse after the second level==!!
    // root.children.forEach(collapse);

    update(root);
}
// Collapse the node and all it's children
function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

function update(source) {
    // Assigns the x and y position for the nodes
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) {
        d.y = d.depth * 180;
    });

    //remove the preloader all element
    let rmelement = document.getElementById(
        "main-tree-diagram-inner-preloader"
    );
    rmelement.parentNode.removeChild(rmelement);

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll("g.node").data(nodes, function(d) {
        return d.id || (d.id = ++i);
    });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on("click", click);

    // Add Circle for the nodes
    nodeEnter
        .append("circle")
        .attr("class", "node")
        .attr("r", 1e-6)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    // Add Name for the nodes
    nodeEnter
        .append("text")
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) {
            return d.data.name;
        });

    // Add Clicked-Time for the nodes
    nodeEnter
        .append("text")
        .attr("dy", "1.5em")
        .attr("x", 0)
        .style("fill", "red")
        .text(function(d) {
            return d.data["clicked-time"];
        });

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    // Update the node attributes and style
    nodeUpdate
        .select("circle.node")
        .attr("r", 10)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
        })
        .attr("cursor", "pointer");

    // Remove any exiting nodes
    var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select("circle").attr("r", 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select("text").style("fill-opacity", 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll("path.link").data(links, function(d) {
        return d.id;
    });

    // Enter any new links at the parent's previous position.
    var linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            var o = { x: source.x0, y: source.y0 };
            return diagonal(o, o);
        });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate
        .transition()
        .duration(duration)
        .attr("d", function(d) {
            return diagonal(d, d.parent);
        });

    // Remove any exiting links
    var linkExit = link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function(d) {
            var o = { x: source.x, y: source.y };
            return diagonal(o, o);
        })
        .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
        let path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;

        return path;
    }

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}
