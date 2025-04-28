let should
let agent
let mockData
let notesService
let mongoose

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
  notesService = require('app/modules/notes')
  mongoose = require('mongoose')
})

describe('api', () => {
  describe('notes', () => {
    describe('create', () => {
      let mockAuth

      before(async () => {
        mockAuth = await mockData.mockAuthAndUser()
      })

      it('should fail with invalid auth', () => {
        return agent.client().post(`/note`).expect(401).promise()
      })

      it('should work', async () => {
        const body = {
          title: "Some title",
          message: "This is a test! Will it work?"
        }

        const response = await agent
          .client()
          .post(`/note`)
          .send(body)
          .set('authorization', mockAuth.token)
          .expect(201)
          .promise()

        response.userId.should.equal(mockAuth.user)
        response.title.should.equal(body.title);
        response.message.should.equal(body.message)
      })
    })
  })
})
