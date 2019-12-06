var mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mybase"
});

con.connect(function(err){
  if(err)throw err;
  console.log("- Ansluten -")

  var createPost = "CREATE TABLE mypost ( postid int NOT NULL AUTO_INCREMENT, post VARCHAR(30), PRIMARY KEY (postid))";
  var createComment = "CREATE TABLE mycomment ( commentid int NOT NULL AUTO_INCREMENT, comment VARCHAR(30), PRIMARY KEY (commentid))";
  var combine = "SELECT * FROM mypost JOIN mycomment ON mypost.postid = mycomment.commentid ";

  con.query(createPost, function(err, result){
    if(err)throw err; });
  con.query(createComment, function(err, result){
    if(err)throw err; });
  con.query(combine, function(err, result){
    if(err)throw err; });
})
const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use((req,res,next) => {
    req.con = con
    next()
})

app.get('/posts' , (req,res) => {routes.posts.getPosts(req,res)})
app.post('/posts' , (req,res) => {routes.posts.addPost(req,res)})
app.put('/posts/:postId' , (req,res) => {routes.posts.updatePost(req,res)})
app.delete('/posts/:postId' , (req,res) => {routes.posts.deletePost(req,res)})

app.get('/posts/:postId/comments' , (req,res) => {routes.comments.getComments(req,res)})
app.post('/posts/:postId' , (req,res) => {routes.comments.addComment(req,res)})
app.put('/posts/:postId/Comments/:commentId' , (req,res) => {routes.comments.updateComment(req,res)})
app.delete('/posts/:postId/comments/:commentId' , (req,res) => {routes.comments.deleteComment(req,res)})
