
import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
  }
  /**
  * @param {import("express").Request} req
  * @param {import("express").Response} res
  * @param {import("express").NextFunction} next
  */
  async getAllBugs(req, res, next) {
    try {
      const bugs = await bugsService.getAllBugs()
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }
  /**
  * @param {import("express").Request} req
  * @param {import("express").Response} res
  * @param {import("express").NextFunction} next
  */
  async createBug(req, res, next) {
    try {
      const bugData = req.body
      const userInfo = req.userInfo
      bugData.creatorId = userInfo.id
      const bug = await bugsService.createBug(bugData)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}