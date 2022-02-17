const { DataSource } = require('apollo-datasource');


class VideoAPI extends DataSource {
  constructor({videoModel, commentModel}) {
    super();
    this.videoModel = videoModel
    this.commentModel = commentModel
  }

  initialize(config) {
    this.context = config.context;
  }

  async uploadVideo({ video }) {
    const {title, content, thumbnail, author, authorName, authorAvatar} = video
    try {
      await this.videoModel.create({title: title, content, thumbnail, authorAvatar, authorName, author})
      return {
        status: 201,
        message: "success"
      }
    } catch (error) {
      return {
        status: 400,
        message: error
      }
    }
  }

  async getVideo({videoId}) {
    try {
      let video = await this.videoModel.findOne({ _id:videoId })
      return video
    } catch (error) {
      return {
        status: 400,
        message: "database search error"
      }
    }
  }
}

module.exports = VideoAPI