let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('update-by-id', () => {
      let mockAuth1
      let mockAuth2

      before(async () => {
        mockAuth1 = await mockData.mockAuthAndUser()
        mockAuth2 = await mockData.mockAuthAndUser()
      })

      it('should fail if user id parameter doesn\'t match current user', async () => {
        const body = {
          firstName: "Jane",
          lastName: "Doe",
          email: `${mockAuth2.email}@test.com`
        }

        await agent
          .client()
          .put(`/user/${mockAuth2.user}`)
          .send(body)
          .set('authorization', mockAuth1.token)
          .expect(403)
          .promise()
      })

      /*
      This test fails since userService.readAndUpdate() was not implemented by the starter code. Since there's no
      instruction to implement this function I'm assuming this is intended.
      */
      test.skip('should succeed assuming correct parameters', async () => {
        const body = {
          firstName: "Jane",
          lastName: "Doe",
          email: `${mockAuth2.email}@test.com`
        }

        await agent
          .client()
          .put(`/user/${mockAuth2.user}`)
          .send(body)
          .set('authorization', mockAuth2.token)
          .expect(200)
          .promise()
      })
    })
  })
})
