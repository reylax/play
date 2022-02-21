const { RESTDataSource } = require('apollo-datasource-rest');
const { v4: uuidv4 } = require('uuid');



class RestAPI extends RESTDataSource {
  constructor( model ) {
    // Always call super()
    super();
    this.model = model
    // Sets the base URL for the REST API
    this.baseURL = 'http://localhost:8000';
  }

  async requestTencentYunKey({ purpose, _id, fileExtention }) {
    let user = await this.model.findOne({_id})
    if (!user) return {
      status: 404,
      message: "user not exsit!"
    }

    var path
    switch(purpose) {
      case "avatar":
        path = "/public/" + uuidv4() + fileExtention
        user.avatar = path
        await user.save()
        break;
      case "backgroundImage":
        path = "/public/" + uuidv4() + fileExtention
        user.backgroundImage = path
        await user.save()
        break;
      case "videoUpload":
        path = "/video/" + uuidv4() + fileExtention
        break;
      case "videoThumbnail":
        path = "/caption/" + uuidv4() + fileExtention
        break
      case "blog":
        path = "/blogs/" + uuidv4() + fileExtention
        break
      case "deleteCanceledImage":
        path = "/blogs/" + fileExtention
        break
      default: 
        ;
    }
    let message = await this.get(`/getkey?path=${encodeURIComponent(path)}`);
    return {
      status: 200,
      message,
    }
  } 
}

module.exports = RestAPI