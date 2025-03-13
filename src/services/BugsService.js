import { dbContext } from "../db/DbContext.js"

class BugsService {
  async createBug(bugData) {
    const bug = await dbContext.Bug.create(bugData)
    await bug.populate('creator')
    return bug
  }


}







export const bugsService = new BugsService()