const { DataSource } = require('apollo-datasource');


class BlogAPI extends DataSource {
  constructor(mode) {
    super();
    this.mode = mode;
  }

  initialize(config) {
    this.context = config.context;
  }

  async publishBlog({ blog }) {
    const { title, author, content, authorName, authorAvatar, description } = blog
    try {
      const { _id } = await this.mode.create({title, author, content, authorName, authorAvatar, description})
      return {
        status: 201,
        message: "success",
        _id,
      }
    } catch (error) {
      return {
        status: 404,
        message: error
      }
    }
  }

  async blogCaption({ blog_id }) {
    try {
      const blog = await this.mode.findOne({_id: blog_id})
      const caption = {
        title: blog.title,
        authorName: blog.authorName,
        description: blog.description
      }
      return caption
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async readBlog({ blog_id }) {
    try {
      const blog = await this.mode.findOne({_id: blog_id })
      return blog
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

module.exports = BlogAPI