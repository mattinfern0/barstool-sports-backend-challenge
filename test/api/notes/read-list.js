let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('notes', () => {
    describe('read-list', () => {
      let mockAuth1
      let mockAuth2

      before(async () => {
        mockAuth1 = await mockData.mockAuthAndUser()
        mockAuth2 = await mockData.mockAuthAndUser()
      })

      it('should fail with invalid auth', () => {
        return agent.client().get(`/user/${mockAuth1.user}`).expect(401).promise()
      })

      it('should fail if user id parameter doesn\'t match current user', async () => {
        await agent
          .client()
          .get(`/user/${mockAuth1.user}/notes`)
          .set('authorization', mockAuth2.token)
          .expect(403)
          .promise()
      })
    })
  })
})
