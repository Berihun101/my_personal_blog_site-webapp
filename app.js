const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose')
var lodash = require('lodash');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// let postItems=[
//   {
//     titlePost:'Day 1',
//     post:'Venenatis cras sed felis eget velit aliquet sagittis. Nisi vitae suscipit tellus mauris a diam maecenas sed. Sit amet mauris commodo quis imperdiet. Aliquet enim tortor at auctor urna nunc id cursus. Pretium viverra suspendisse potenti nullam. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Diam ut venenatis tellus in metus. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Potenti nullam ac tortor vitae purus faucibus. Sem et tortor consequat id porta. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Eu scelerisque felis imperdiet proin.'
//   },
//   {
//     titlePost:'Day 2',
//     post:'Vel pretium lectus quam id leo in vitae turpis. Sit amet justo donec enim diam vulputate ut pharetra. Blandit aliquam etiam erat velit scelerisque in. Mauris in aliquam sem fringilla. Egestas erat imperdiet sed euismod nisi. Varius sit amet mattis vulputate enim nulla aliquet. Leo a diam sollicitudin tempor id eu. Est ullamcorper eget nulla facilisi etiam. Tellus elementum sagittis vitae et leo duis ut diam. Massa sed elementum tempus egestas sed.'
//   }

// ]
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/myblogDB")

const postItemSchema={
  titlePost:String,
  post:String,
}

const PostItem = mongoose.model("PostItem", postItemSchema)

const postitem1 = new PostItem({
  titlePost:'Day 1',
    post:'Venenatis cras sed felis eget velit aliquet sagittis. Nisi vitae suscipit tellus mauris a diam maecenas sed. Sit amet mauris commodo quis imperdiet. Aliquet enim tortor at auctor urna nunc id cursus. Pretium viverra suspendisse potenti nullam. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Diam ut venenatis tellus in metus. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Potenti nullam ac tortor vitae purus faucibus. Sem et tortor consequat id porta. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Eu scelerisque felis imperdiet proin.'
})

const postItem2 =new PostItem({
  titlePost:'Day 2',
  post:'Vel pretium lectus quam id leo in vitae turpis. Sit amet justo donec enim diam vulputate ut pharetra. Blandit aliquam etiam erat velit scelerisque in. Mauris in aliquam sem fringilla. Egestas erat imperdiet sed euismod nisi. Varius sit amet mattis vulputate enim nulla aliquet. Leo a diam sollicitudin tempor id eu. Est ullamcorper eget nulla facilisi etiam. Tellus elementum sagittis vitae et leo duis ut diam. Massa sed elementum tempus egestas sed.' 
})

const defaultPostItems =[postitem1, postItem2]



app.get("/", function(req, res){
  PostItem.find({}).then(foundItems =>{
    if(foundItems.length === 0){
      PostItem.insertMany(defaultPostItems)
      res.redirect('/')
    }else{
      res.render('home', {homeStartUp:homeStartingContent, itemspost:foundItems})
    }
  })
  
})

app.get('/contact', function(req,res){
  res.render('contact', {contact:contactContent})
})
app.get('/about', function(req,res){
  res.render('about', {contentAbout:aboutContent})
})

app.get('/compose', function(req,res){
  res.render('compose')
})

app.post('/', function(req, res){
const newPostitems={
  titlePost:req.body.title,
  post:req.body.todaysPost
}
const postItem= new PostItem({
  titlePost:newPostitems.titlePost,
  post:newPostitems.post
})
postItem.save()
res.redirect('/')
})


  app.get('/post/:title' , function(req, res) {
    var userId=req.params.title;
    PostItem.find({}).then(foundItems =>{
      for (var i = 0; i < foundItems.length; i++) {
        if(lodash.lowerCase(userId)===lodash.lowerCase(foundItems[i].titlePost)){
            res.render('post', {titleItem:userId, postitem:foundItems[i].post})
        }
      
      }
    })



  }); 



app.listen(3000,function(){
  console.log('Server is running on port 3000')
})
