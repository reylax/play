const { DataSource } = require('apollo-datasource');


class CommentAPI extends DataSource {
  constructor({commentModel, userModel, blogModel, videoModel}) {
    super();
    this.commentModel = commentModel
    this.blogModel = blogModel
    this.videoModel = videoModel
    this.User = userModel
  }

  initialize(config) {
    this.context = config.context;
  }

  async updateComment({_id, newData}) {
    try {
      let Comment = await this.commentModel.findOne({_id})
      for (const [key, value] of Object.entries(newData)) {
        Comment[key] = value
      }
      await Comment.save()
      return {
        status: 202,
        message: "ok",
      }
    } catch (error) {
      return {
        status: 400,
        message: error
      }
    }
  }


  async leaveComment({ comment }) {
    const { subject, referId, authorName, authorAvatar, content, author } = JSON.parse(comment)
    try {
      const { _id } = await this.commentModel.create({ author, content, authorName, authorAvatar })
      switch (subject) {
        case 'blog':
          await this.blogModel.findOneAndUpdate({_id:referId}, {$push: {comments: _id}}) 
          break
        case 'comment':
          await this.commentModel.findOneAndUpdate({_id:referId}, {$push: {comments: _id}}) 
          break
        case 'video':
          await this.videoModel.findOneAndUpdate({_id:referId}, {$push: {comments: _id}}) 
          break
        default:
          ;
      }
      return {
        status: 201,
        message: "successful!"
      }
    } catch (error) {
      return {
        status: 401,
        message: error
      }
    }
  }

  async getComments({ subject, id }) {

    try {
      switch (subject) {
        case 'blog':
          var { comments }  = await this.blogModel.findOne({_id: id}).populate("comments")
          return comments
        case 'comment':
          var { comments } = await this.commentModel.findOne({_id: id}).populate("comments")
          return comments
        case 'video':
          var { comments } = await this.videoModel.findOne({_id: id}).populate("comments")
          return comments
        default:
          ;
      }
    } catch (error) {
      return {
        status: 401,
        message: error
      }
    }
  }

  async like({subject, referId, inc}) {
    let userId = this.context.user._id
    if (!userId) return {
      status: 401,
      message: "please log in"
    }
    try {
      switch(subject) {
        case 'comment':
          _updateLikedNumber({
            userModel: this.User,
            subjectModel: this.commentModel,
            userId,
            referId,
            inc,
          })
          break
        case 'blog':
          _updateLikedNumber({
            userModel: this.User,
            subjectModel: this.blogModel,
            userId,
            referId,
            inc,
          })
          break
        case 'video':
          _updateLikedNumber({
            userModel: this.User,
            subjectModel: this.videoModel,
            userId,
            referId,
            inc,
          })
          break
        default:
          return {
            status: 404,
            message: "subject not found!"
          }
      }
      return {
        status: 201,
        message: "success",
      }
    } catch (error) {
      console.log(error)
      return {
        status: 401,
        message: error
      }
    }
  }
}

const _updateLikedNumber = async ({ userModel, subjectModel, inc, userId, referId }) => {
  try {
    if (inc == 1) {
      await userModel.findOneAndUpdate({_id: userId}, {$push: {"liked": referId}})
      await subjectModel.findOneAndUpdate({_id: referId}, {$inc: {"numberOfpros": inc}, $push: {"LikedBy": userId}})
    } else if(inc == -1) {
      await userModel.findOneAndUpdate({_id: userId}, {$pull: {"liked": referId}})
      await subjectModel.findOneAndUpdate({_id: referId}, {$inc: {"numberOfpros": inc}, $pull: {"LikedBy": userId}})
    }   
  } catch (error) {
    throw error
  }
}


module.exports = CommentAPI