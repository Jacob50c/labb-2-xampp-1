module.exports{
  getPosts (req,res){
      res.status(200).json(req.con.posts)
  },
  addPost (req,res){
      req.con.posts.push(req.body)
      res.status(201).send({id : req.con.posts.length-1})
  },
  updatePost (req,res){
      req.con.posts[req.params.postId] = req.body
      res.status(200).send(req.con.posts[req.params.postId])
  },
  deletePost (req,res){
      req.con.posts.splice(req.params.postId,1)
      res.sendStatus(204)
  }
}
  /*var createPost = "CREATE TABLE mypost (post VARCHAR(30))";
  con.query(createPost, function(err, reslult){
    if(err)throw err; });*/
}
