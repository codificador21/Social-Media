  
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

                    // to populate the 'deleteLink' parameter inside 'deletePost()' function defined below
                    // below statement means, class named 'delete-post-button' inside the object 'newPost'
                    // there should be a space before .delete-post-button
                    // this is JQuery syntax
                    deletePost($(' .delete-post-button', newPost));

                    //call the create comment class
                    new PostComments(data.data.post._id);

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
    <div class = "space-between">
        <div>
            <small>
            <img class = "Dp_post_comment" src="${post.user.avatar}" width="20">
                ${ post.user.name }
                    :
            </small>
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
