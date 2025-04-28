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

      it('should return all notes belonging to the current user', async() => {
        notesService.create({
          title: "Test Note 1",
          message: "Hello world!",
          userId: mockAuth2.user
        })

        notesService.create({
          title: "Test Note 2",
          message: "Some sample text",
          userId: mockAuth2.user
        })

        notesService.create({
          title: "Test Note 3",
          message: "Lorem ipsum",
          userId: mockAuth2.user
        })

        notesService.create({
          title: "Other User's Note",
          message: "Lorem",
          userId: mockAuth1.user
        })

        const response = await agent
          .client()
          .get(`/user/${mockAuth2.user}/notes`)
          .set('authorization', mockAuth2.token)
          .expect(200)
          .promise()

        response.length.should.equal(3);
      })
    })
  })
})
