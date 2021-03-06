 
// let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments {
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    this.createComment(postId);

    let self = this;

    // call for all the existing comments
    $(' .delete-comment-button', this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;
    this.newCommentForm.submit(function (e) {
      e.preventDefault();

      let self = this;

      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: $(self).serialize(),
        success: function (data) {
          let newComment = pSelf.newCommentDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          $('#comment-input').val("");
          pSelf.deleteComment($(' .delete-comment-button', newComment));   
          
          new ToggleLike($(' .toggle-like-button', newComment));


          new Noty({
            theme: 'relax',
            text: 'Comment published!',
            type: 'success',
            layout: 'bottomRight',
            timeout: 1500
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        }
      });
    });
  }

  // show the count of likes as zero on this comment
  newCommentDom(comment) {
    return $(`<li id = "comment-${ comment._id }">
    <p>
       <div class = "space-between-comment">
       <div id = "comment-name-dp">
           
       <div>
           <img class = "Dp_post_comment" src="${comment.user.avatar}" width="25"> &nbsp;
       </div>
       <div>
           ${comment.user.name}
       </div>
        
   </div>
   
        <div>
            
                <small>
                    <a class = "delete-comment-button" href="/comments/destroy/${comment._id}"><i class="fas fa-trash"></i></a>
                </small>
            
        </div>
       </div>
       <div id = "lalign">
           ${comment.content}
        </div>
      <div id = "like-comment-container">
      <div id = "like-comment">  
      <a class = "toggle-like-button" data-likes = "0" href="/likes/toggle/?id=${comment._id}&type=Comment">
      <i class="fas fa-thumbs-up"></i> 0 
       </a>
      </div> 
        
    </p>
</li>`);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();
          new Noty({
            theme: 'relax',
            text: 'Comment Deleted',
            type: 'success',
            layout: 'bottomRight',
            timeout: 1500
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        }
      });
    });
  }
}

