import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class BugsService {
  async getAllBugs() {
    const bugs = await dbContext.Bugs.find()
    return bugs
  }
  async getBugById(bugId) {
    const bug = await (await dbContext.Bugs.findById(bugId)).populate('creator')
    if (bug == null) {
      throw new BadRequest(`YOUR ID IS BAD AND YOU SHOULD FEEL BAD! ${bugId} does not exist!`)
    }
    return bug
  }
  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator')
    return bug
  }


}







export const bugsService = new BugsService()