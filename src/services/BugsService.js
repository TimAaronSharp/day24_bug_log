import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

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
  async updateBug(bugId, bugData, userInfo) {
    const bugToUpdate = await this.getBugById(bugId)

    bugToUpdate.title = bugData.title ?? bugToUpdate.title
    bugToUpdate.description = bugData.description ?? bugToUpdate.description
    bugToUpdate.priority = bugData.priority ?? bugToUpdate.priority
    bugToUpdate.closed = bugData.closed ?? bugToUpdate.closed
    bugToUpdate.closedDate = bugData.closedDate ?? bugToUpdate.closedDate

    await bugToUpdate.populate('creator')

    await bugToUpdate.save()
    return bugToUpdate
    // if ((await bugToUpdate).creatorId != userInfo.id) {
    //   throw new Forbidden(`YOU CAME TO THE WRONG NEIGHBORHOOD, SUHN!!!! This isn't your bug to ${userInfo.nickname.toUpperCase()}`)
    // }
  }

}







export const bugsService = new BugsService()