{let t=function(){let t=$("#new-post-forms");t.submit((function(s){s.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){let s=n(t.data.post);$("#posts-list-container>ul").prepend(s),$("#text-area").val(""),e($(" .delete-post-button",s)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",s)),new Noty({theme:"relax",text:"Post Created",type:"success",layout:"bottomRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},n=function(t){return $(`<li id = "post-${t._id}">\n        <p>\n    <div class = "space-between-post">\n    \n    <div id = "post-name-dp">\n        \n    <div>\n        <img class = "Dp_post_comment" src="${t.user.avatar}" width="30"> &nbsp;\n    </div>\n    <div>\n        ${t.user.name}\n        \n    </div>\n\n    \n\n    </div>\n\n            <div>\n                    \n                <small>\n                <a class = "delete-post-button" href="/posts/destroy/${t._id}"><i class="fas fa-trash"></i></a>\n                </small>\n\n                <br>\n            </div>\n    \n    </div>\n        <div id = "post-container">\n        ${t.content}\n        </div>\n        <div id = "like-comment">\n        <a class = "toggle-like-button" data-likes = "0" href="/likes/toggle/?id=${t._id}&type=Post">\n        <i class="fas fa-thumbs-up"></i> 0 \n        </a>\n        &nbsp; &nbsp;\n        <i class="fas fa-comment-dots"></i> ${t.comments.length}\n        </div>\n    \n    </p>\n        \n        <div class="post-comments-list">\n            <ul id = "post-comments-${t._id}">\n                  \n            </ul>\n    \n        </div>\n        <div class = "post-comments">\n            \n    \n                <form action="/comments/create" method="POST" class="buttonIn">\n                    <input type="text" name="content" placeholder="Comment...">\n                    <input type="hidden" name="post" value="${t._id}">\n                    <button>Add Comment</button>\n                </form>\n    \n            \n            \n        </div>\n        \n        \n    </li>\n    `)},e=function(t){$(t).click((function(n){n.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$("#post-"+t.data.post_id).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"bottomRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},s=function(){$("#posts-list-container>ul>li").each((function(){let t=$(this),n=$(" .delete-post-button",t);e(n);let s=t.prop("id").split("-")[1];new PostComments(s)}))};t(),s()}