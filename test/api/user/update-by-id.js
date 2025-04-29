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

      let mockUser2Email

      before(async () => {
        mockAuth1 = await mockData.mockAuthAndUser()

        mockUser2Email = `${mockData.uuid()}@test.com`
        mockAuth2 = await mockData.mockAuthAndUser({
          email: mockUser2Email,
          password: mockData.uuid()
        })
      })

      it('should fail if user id parameter doesn\'t match current user', async () => {
        const body = {
          firstName: "Jane",
          lastName: "Doe",
          email: mockUser2Email
        }

        await agent
          .client()
          .put(`/user/${mockAuth2.user}`)
          .send(body)
          .set('authorization', mockAuth1.token)
          .expect(403)
          .promise()
      })

      it('should succeed assuming correct parameters', async () => {
        const body = {
          firstName: "Jane",
          lastName: "Doe",
          email: mockUser2Email
        }

        const response = await agent
          .client()
          .put(`/user/${mockAuth2.user}`)
          .send(body)
          .set('authorization', mockAuth2.token)
          .expect(200)
          .promise()

        response.firstName.should.equal(body.firstName);
        response.lastName.should.equal(body.lastName)
        response.email.should.equal(body.email)
      })


    })
  })
})
