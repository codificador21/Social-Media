  
{
 //method to submit data to form using ajax   
    let createPost = function(){
        let newPostForm = $('#new-post-forms');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    $('#text-area').val("");

                    // to populate the 'deleteLink' parameter inside 'deletePost()' function defined below
                    // below statement means, class named 'delete-post-button' inside the object 'newPost'
                    // there should be a space before .delete-post-button
                    // this is JQuery syntax
                    deletePost($(' .delete-post-button', newPost));

                    //call the create comment class
                    new PostComments(data.data.post._id);

                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme:'relax',
                        text: "Post Created",
                        type:'success',
                        layout: 'bottomRight',
                        timeout:1500
                    }).show();
                    
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in the dom
    let newPostDom = function(post){
        return $(`<li id = "post-${post._id}">
        <p>
    <div class = "space-between-post">
    
    <div id = "post-name-dp">
        
    <div>
        <img class = "Dp_post_comment" src="${post.user.avatar}" width="30"> &nbsp;
    </div>
    <div>
        ${post.user.name}
        
    </div>

    

    </div>

            <div>
                    
                <small>
                <a class = "delete-post-button" href="/posts/destroy/${post._id}"><i class="fas fa-trash"></i></a>
                </small>

                <br>
            </div>
    
    </div>
        <div id = "post-container">
        ${post.content}
        </div>
        <div id = "like-comment">
        <a class = "toggle-like-button" data-likes = "0" href="/likes/toggle/?id=${post._id}&type=Post">
        <i class="fas fa-thumbs-up"></i> 0 
        </a>
        &nbsp; &nbsp;
        <i class="fas fa-comment-dots"></i> ${post.comments.length}
        </div>
    
    </p>
        
        <div class="post-comments-list">
            <ul id = "post-comments-${post._id}">
                  
            </ul>
    
        </div>
        <div class = "post-comments">
            
    
                <form action="/comments/create" method="POST" class="buttonIn">
                    <input type="text" name="content" placeholder="Comment...">
                    <input type="hidden" name="post" value="${post._id}">
                    <button>Add Comment</button>
                </form>
    
            
            
        </div>
        
        
    </li>
    `);
    }


    //method to delete a post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),//fetches the url defined in 'href' attribute of 'a' tag
                success:function(data){
                     
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme:'relax',
                        text: "Post Deleted",
                        type:'success',
                        layout: 'bottomRight',
                        timeout:1500
                    }).show();
                              
                },error: function(error){
                    console.log(error.responseText)
                }
            });

        });
    }

    let convertPostsToAjax = function () {
        $('#posts-list-container>ul>li').each(function () {
          let self = $(this);
          let deleteButton = $(' .delete-post-button', self);
          deletePost(deleteButton);
      
          // get the post's id by splitting the 'id' attribute
          // splitting is done when hyphen (-) is encountered
          // i.e. id="post-${ post._id }
          // [1] refers to the first element in the array
          let postId = self.prop('id').split("-")[1];
          new PostComments(postId);
        });
      }

      
    createPost();
    convertPostsToAjax();
  
}
