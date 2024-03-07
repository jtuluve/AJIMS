'use server'
import mongoose from 'mongoose'
import User from './model'
import { getServerSession } from 'next-auth'
var isConnected = false
var isInitialized = false
//basic functions
export async function createUserIfNotExists({ email, uid }: { email?, uid }) {
  try {
    await connectToDB();
    email = email || await getEmail();
    const user =
      (await User.findOne({ email, uid })) || (await User.findOne({ uid }))
    if (!user) {
      User.create({ uid, email })
        .then(() => console.log('User created'))
        .catch((err) => {
          throw err
        })
      return true
    }
    user.email = email;
    user.uid = uid;
    user.save()
    return true
  } catch {
    console.error('Error occured while creating user')
    return false
  }
}

export async function getEmail() {
  await connectToDB()
  return (await getServerSession())?.user?.email
}

export async function getUidFromEmail(email) {
  try {
    await connectToDB()
    const user = await User.findOne({ email })
    return user?.uid
  } catch {
    return null
  }
}
export async function getUid() {
  try {
    await connectToDB()
    const user = await User.findOne({ email: await getEmail() })
    return user?.uid
  } catch {
    return null
  }
}
async function verifyUid(uid) {
  await initializeDb()
  return uid == (await getUid()) || (await getUser({uid}))._doc.isAdmin
}

async function getUser(uid) {
  try {
    await initializeDb()
    return await User.findOne({ uid })
  } catch {
    console.error('Error occured while getting user')
    return new Error('User Not Found')
  }
}

async function defaultUser() {
  try {
    const uid = await getUid()
    if (!uid) return false
    const user = await getUser(uid)
    if (!uid) return false
    user.appraisal = user.appraisal || {}
    user.appraisal.research = user.appraisal.research || {}
    user.appraisal.research.clinicalDuty =
      user.appraisal.research.clinicalDuty || []
    user.appraisal.research.grants = user.appraisal.research.grants || []
    user.appraisal.research.books = user.appraisal.research.books || []
    user.appraisal.research.guidance = user.appraisal.research.guidance || []
    user.appraisal.research.conferences =
      user.appraisal.research.conferences || []
    user.appraisal.academics = user.appraisal.academics || {}
    user.appraisal.academics.score = user.appraisal.academics.score || {}
    user.appraisal.academics.teaching = user.appraisal.academics.teaching || {}
    user.appraisal.professional = user.appraisal.professional || {}
    user.appraisal.professional.score = user.appraisal.professional.score || {}
    user.appraisal.professional.clinicalDuty =
      user.appraisal.professional.clinicalDuty || {}
    user.appraisal.professional.postHeld =
      user.appraisal.professional.postHeld || {}
    user.appraisal.professional.examDuties =
      user.appraisal.professional.examDuties || []
    user.appraisal.professional.committee =
      user.appraisal.professional.committee || []
    user.appraisal.professional.conferences =
      user.appraisal.professional.conferences || []
    user.appraisal.professional.guestLectures =
      user.appraisal.professional.guestLectures || 0
    user.save()
    return true
  } catch {
    console.error('Error occured while initializing user')
    return false
  }
}

async function initializeDb() {
  try {
    if (isInitialized) return true
    isInitialized = true
    await connectToDB()
    await createUserIfNotExists({ uid: await getUid() })
    await defaultUser()
    isInitialized = true
    return true
  } catch (err) {
    isInitialized = false
    console.error(err?.msg || err?.message || err)
    return false
  }
}

/* Mongodb Functions */
export async function connectToDB() {
  if (!process.env.MONGODB_URI) return console.log('MONGODB URL is not set')
  if (isConnected) return console.log('Already connected to DB')
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    console.log('Connected to DB')
    return true
  } catch (e) {
    console.error("Couldn't connect to db", e)
    return false
  }
}

//profile update method
export async function updateProfile(profile, uid?) {
  //   console.log(profile)

  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw new Error('Invalid UID')
    await User.findOneAndUpdate({ uid }, {...profile,profile}); //updating both universal and inner profile property
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/* Mongodb upsert (update/insert) functions */
//appraisal->research->publications
export async function upsertResearchPublications(publication, uid?) {
  try {
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found.'
    const { _id, ...publicationWithoutId } = publication
    if (_id) {
      const index = user.appraisal.research.publications.findIndex(
        (p) => p?._id.toString?.() == _id
      )
      if (index == -1) throw 'Publication for given uid not found.'
      user.appraisal.research.publications[index] = {
        ...user.appraisal.research.publications[index],
        ...publicationWithoutId,
      }
    } else {
      user.appraisal.research.publications.push(publicationWithoutId)
    }
    await user.save()
    return true
  } catch (e) {
    console.error(e.msg || e.message || e)
    return false
  }
}

//appraisal->research->grants
export async function upsertResearchGrants(grants, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."

    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...grantsWithoutId } = grants
    if (_id) {
      let index = user.appraisal.research.grants.findIndex(
        (item) => item?._id.toString() == _id
      )
      if (index == -1) throw 'Research Grant not found'
      user.appraisal.research.grants[index] = {
        ...user.appraisal.research.grants[index],
        ...grantsWithoutId,
      }
    } else {
      user.appraisal.research.grants.push(grantsWithoutId)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err.message || err)
    return false
  }
}

//appraisal->research->books
export async function upsertResearchBooks(book, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...bookWithoutId } = book
    console.log(bookWithoutId)
    if (_id) {
      let index = user.appraisal.research.books.findIndex(
        (item) => item?._id.toString() == _id
      )
      if (index == -1) throw 'Research Book not found'
      user.appraisal.research.books[index] = {
        ...user.appraisal.research.books[index],
        ...bookWithoutId,
      }
    } else {
      user.appraisal.research.books.push(bookWithoutId)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//appraisal->research->guidance
export async function upsertResearchGuidance(guidance, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...guidanceWithoutId } = guidance
    if (_id) {
      let index = user.appraisal.research.guidance.findIndex(
        (item) => item?._id.toString() == _id
      )
      if (index == -1) throw 'Research Guidance not found'
      user.appraisal.research.guidance[index] = {
        ...user.appraisal.research.guidance[index],
        ...guidanceWithoutId,
      }
    } else {
      user.appraisal.research.guidance.push(guidanceWithoutId)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//appraisal->research->conferences
export async function upsertResearchConference(conference, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...conferenceWithoutId } = conference
    if (_id) {
      let index = user.appraisal.research.conferences.findIndex(
        (item) => item?._id.toString() == _id
      )
      if (index == -1) throw 'Research Conference not found'
      user.appraisal.research.conferences[index] = {
        ...user.appraisal.research.conferences[index],
        ...conferenceWithoutId,
      }
    } else {
      user.appraisal.research.conferences.push(conferenceWithoutId)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//appraisal->academics->teaching
export async function updateAcademicsTeaching(teaching, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    let { _id, ...teachingWithoutId } = teaching //remove _id from teaching object
    //direct teaching = teachingWithoutId works
    user.appraisal.academics.teaching = teachingWithoutId;
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//appraisal->professional->clinicalDuty
export async function updateProfessionalClinicalDuty(clinicalDuty, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...clinicalDutyWithoutId } = clinicalDuty //remove _id from clinicalDuty object
    // user.appraisal.professional.clinicalDuty = {...user.appraisal.professional.clinicalDuty, ...clinicalDutyWithoutId}
    user.appraisal.professional.clinicalDuty = clinicalDutyWithoutId;
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//appraisal->professional->postHeld
export async function updateProfessionalPostHeld(postHeld, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...postHeldWithoutId } = postHeld //remove _id from postHeld object
    user.appraisal.professional.postHeld = postHeldWithoutId;
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//appraisal->professional->examDuties (array)
export async function upsertProfessionalExamDuties(examDuty, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    if (!examDuty._id) user.appraisal.professional.examDuties.push(examDuty)
    else {
      let index = user.appraisal.professional.examDuties.findIndex(
        (item) => item?._id.toString() == examDuty._id
      )
      if (index == -1) throw 'professional Examduty not found'
      user.appraisal.professional.examDuties[index] = examDuty
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//appraisal->professional->committee (array)
export async function upsertProfessionalCommittee(committee, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    user.appraisal.professional.committee =
      user.appraisal.professional.committee || []
    if (committee._id) {
      const index = user.appraisal.professional.committee.findIndex(
        (x) => x._id.toString() === committee._id
      )
      if (index === -1) throw 'Professional committee not found'
      user.appraisal.professional.committee[index] = committee
    } else user.appraisal.professional.committee.push(committee)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//appraisal->professional->conferences (array)
export async function upsertProfessionalConference(conference, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    user.appraisal.professional.conferences =
      user.appraisal.professional.conferences || []
    if (conference._id) {
      const index = user.appraisal.professional.conferences.findIndex(
        (item) => item?._id.toString() == conference._id
      )
      if (!index) throw 'Professional Conference not found'
      user.appraisal.professional.conferences[index] = conference
    } else user.appraisal.professional.conferences.push(conference)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//appraisal->professional->guestLectures (array)
export async function upsertProfessionalGuestLecture(lecture, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    user.appraisal.professional.guestLectures =
      user.appraisal.professional.guestLectures || []
    if (lecture._id) {
      const index = user.appraisal.professional.guestLectures.findIndex(
        (item) => item?._id.toString() == lecture._id
      )
      if (!index) throw 'Professional Guest Lecture not found'
      user.appraisal.professional.guestLectures[index] = lecture
    } else user.appraisal.professional.guestLectures.push(lecture)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

/* FUNCTIONS TO RETRIEVE DATA */
//appraisal->research->publications
export async function getProfile(uid?: string) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    if (!user._doc || Object.keys(user._doc).length == 0)
      throw new Error('Internal Error or incomplete data')
    const {_id, ...restUserProfile} = user.profile?._doc
    const newUser = {
      name: user._doc.name,
      designation: user._doc.designation,
      ...restUserProfile
    }
    return newUser
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

export async function getResearchPublications(_id?: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.research.publications.find((p) => p._id == _id)
      : user.appraisal.research.publications
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}
//appraisal->research->grants
export async function getResearchGrants(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.research.grants.find((d) => d._id == _id)
      : user.appraisal.research.grants
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->research->books
export async function getResearchBooks(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.research.books.find((d) => d._id == _id)
      : user.appraisal.research.books
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->research->guidance
export async function getResearchGuidance(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.research.guidance.find((d) => d._id == _id)
      : user.appraisal.research.guidance
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->research->conferences
export async function getResearchConferences(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.research.conferences.find((d) => d._id == _id)
      : user.appraisal.research.conferences
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}
//appraisal->research->score (object)
export async function getResearchScore(uid?) {
    uid = uid || (await getUid())
    try {
      await initializeDb()
      const user = await getUser(uid)
      if (!user) throw 'User not found'
      return user.appraisal.research?.score;
    } catch (err) {
      console.error(err?.msg || err?.message || err)
    }
}

//appraisal->academics->teaching (object)
export async function getAcademicsTeaching(uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return user.appraisal.academics.teaching
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->academics->score (object)
export async function getAcademicsScore(uid?) {
    uid = uid || (await getUid())
    try {
      await initializeDb()
      const user = await getUser(uid)
      if (!user) throw 'User not found'
      return user.appraisal.academics?.score;
    } catch (err) {
      console.error(err?.msg || err?.message || err)
    }
}

//appraisal->professional->clinicalDuty (object)
export async function getProfessionalClinicalDuty(uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return user.appraisal.professional.clinicalDuty
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->professional->postHeld (object)
export async function getProfessionalPostHeld(uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return user.appraisal.professional.postHeld
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->professional->examDuties
export async function getProfessionalExamDuties(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.professional.examDuties.find((exam) => exam?._id.toString?.() === _id)
      : user.appraisal.professional.examDuties
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->professional->committee
export async function getProfessionalCommittee(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.professional.committee.find((comm) => comm?._id.toString?.() === _id)
      : user.appraisal.professional.committee
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->professional->conferences
export async function getProfessionalConferences(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.professional.conferences.find((con) => con?._id.toString?.() === _id)
      : user.appraisal.professional.conferences
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->professional->guestLectures
export async function getProfessionalGuestLectures(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.professional.guestLectures.find((gu) => gu?._id.toString?.() === _id)
      : user.appraisal.professional.guestLectures
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}
//appraisal->research->score (object)
export async function getProfessionalScore(uid?) {
    uid = uid || (await getUid())
    try {
      await initializeDb()
      const user = await getUser(uid)
      if (!user) throw 'User not found'
      return user.appraisal.professional?.score;
    } catch (err) {
      console.error(err?.msg || err?.message || err)
    }
}

/* FUNCTIONS TO DELETE DATA */
//appraisal->research->publications
export async function deleteResearchPublication(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.publications.findIndex(
      (pub) => pub?._id.toString?.() === _id
    )
    if (index === -1) throw 'Publication not found'
    user.appraisal.research.publications.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->research->grants
export async function deleteResearchGrant(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.grants.findIndex(
      (gr) => gr?._id.toString?.() === _id
    )
    if (index === -1) throw 'Grant not found'
    user.appraisal.research.grants.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->research->books
export async function deleteResearchBook(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.books.findIndex(
      (book) => book?._id?.toString?.() === _id
    )
    if (index === -1) throw 'Book not found'
    user.appraisal.research.books.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->research->guidance
export async function deleteResearchGuidance(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.guidance.findIndex(
      (guid) => guid?._id.toString?.() === _id
    )
    if (index === -1) throw 'Guidance not found'
    user.appraisal.research.guidance.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->research->conferences
export async function deleteResearchConference(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.conferences.findIndex(
      (conference) => conference?._id.toString?.() === _id
    )
    if (index === -1) throw 'Conference not found'
    user.appraisal.research.conferences.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

/*
    NOTE: Didn't cover objects. (teaching etc.)
*/

//appraisal->professional->examDuties (array)
export async function deleteProfessionalExamDuty(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.professional.examDuties.findIndex(
      (examDuty) => examDuty?._id.toString?.() === _id
    )
    if (index === -1) throw 'Exam Duty not found'
    user.appraisal.professional.examDuties.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->professional->committee (array)
export async function deleteProfessionalCommittee(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.professional.committee.findIndex(
      (committee) => committee?._id.toString?.() === _id
    )
    if (index === -1) throw 'Committee not found'
    user.appraisal.professional.committee.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->professional->conferences (array)
export async function deleteProfessionalConference(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.professional.conferences.findIndex(
      (conference) => conference?._id.toString?.() === _id
    )
    if (index === -1) throw 'Conference not found'
    user.appraisal.professional.conferences.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//appraisal->professional->guestLectures (array)
export async function deleteProfessionalGuestLecture(
  _id: string,
  uid?: string
) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.professional.guestLectures.findIndex(
      (guestLecture) => guestLecture?._id.toString?.() === _id
    )
    if (index === -1) throw 'Guest lecture not found'
    user.appraisal.professional.guestLectures.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}
