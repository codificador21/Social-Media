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
                    deletePost($(' .delete-post-button', newPost));
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
                <i class="fas fa-user-circle"></i>
                ${post.user.name}
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
                url: $(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${ data.data.post_id}`).remove();
                    
                },error: function(error){
                    console.log(error.responseText)
                }
            });

        });
    }

    deletePost()
    createPost()
  
}