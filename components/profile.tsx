import { getProfile } from '@/lib/mongoose/functions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Form from './form'

export default function Profile() {
  let [profileData, updateProfileData]: [
    profileData: any,
    updateProfileData: any
  ] = useState(false)
  let router = useRouter()
  let [formState, setFormState]: [formState: any, setFormState: any] =
    useState(false)
  const { data: session } = useSession()
  if (!session) {
    router.push('/')
  }

  const [profileUrl, setProfileUrl] = useState('')

  function formStatusUpdate(state) {
    setFormState(state)
  }
  useEffect(() => {
    ;(async () => {
      let profile = await getProfile()
      updateProfileData(profile)
      setProfileUrl(profile.profileUrl)
    })()
    // setProfileUrl(localStorage.getItem('profileUrl'))
  }, [formState])
  if (profileData === false)
    return <div style={{ color: 'black' }}>Loading...</div>

  // retrive profileUrl from mongo
  // const [profileUrl, setProfileUrl] = useState('')

  return (
    <>
      <div className="profileform">
        {formState === true && (
          <Form
            style={{ color: 'black' }}
            type="profile"
            formStatusUpdate={formStatusUpdate}
            formState={formState}
            _id={profileData['_id'] || ''}
          />
        )}
        <section style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ width: '60%' }}>
            <label>
              <b>Name</b>
            </label>
            <p className="info-p">{profileData['name'] || 'N/A'}</p>
            <label>
              <b>Designation</b>
            </label>
            <p className="info-p">{profileData['designation'] || 'N/A'}</p>
            <label>
              <b>Department</b>
            </label>
            <p className="info-p">{profileData['department'] || 'N/A'}</p>
          </div>
          <div
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'lightgray',
              borderRadius: '1rem',
            }}
          >
            <figure>
              <img
                src={profileUrl ? profileUrl : 'user.png'}
                alt=""
                width={240}
                height={240}
                style={{ objectFit: 'cover' }}
              />
              <figcaption style={{ textAlign: 'center', marginTop: '.5rem' }}>
                Profile Photo
              </figcaption>
            </figure>
          </div>
        </section>
        <input
          type="submit"
          className="profileEditBtn"
          value={'EDIT'}
          onClick={(e) => {
            e.preventDefault()
            setFormState(true)
          }}
        />
      </div>
    </>
  )
}
