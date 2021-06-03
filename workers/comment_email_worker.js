const queue = require('../config/Kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails',function(job, done){

    commentsMailer.newComment(job.data);
    done();
})