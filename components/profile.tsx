
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useUserData } from './UserDataContext'

export default function Profile() {
  // let [profileData, updateProfileData]: [
  //   profileData: any,
  //   updateProfileData: any
  // ] = useState(false)
    const {userData} = useUserData();
    if(!userData) return <p style={{color:"white"}}>Failed to load data. Please, signout and signin again.</p>
  let profileData = userData?.profile;
  // let router = useRouter()
  // let [formState, setFormState]: [formState: any, setFormState: any] = useState(false)
  
  //if user not logged in, redirect to login page
  const { data: session } = useSession()
  if (!session) {
    redirect('/')
  }
  if(profileData===null||profileData===undefined){
    return <p style={{color:"white"}}>Internal Error occured. Please logout and login again or try again later.</p>
  }

  /* function formStatusUpdate(state) {
    setFormState(state)
  } */

/*   useEffect(() => {
    (async () => {
      let profile = await getProfile()
      updateProfileData(profile)
      setProfileUrl(profile?.profileUrl)
    })()
    // setProfileUrl(localStorage.getItem('profileUrl'))
  }, [ formState ]) */

  // retrive profileUrl from mongo
  // const [profileUrl, setProfileUrl] = useState('')

  return (
    <>
      <div className="profileform">
        {/* {formState === true && (
          <Form
            style={{ color: 'black' }}
            type="profile"
            formStatusUpdate={formStatusUpdate}
            formState={formState}
            _id={profileData['_id'] || ''}
          />
        )} */}
        <section style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ width: '60%' }} className='profileoutput'>
            <p className='info-d'>
              <b>Name: </b>
            <a>{profileData?.['name'] || 'N/A'}</a>
            </p>
            <p className='info-d'>
              <b>Designation: </b>
            <a>{profileData?.['designation'] || 'N/A'}</a>
            </p>
            <p className='info-d'>
              <b>Department: </b>
              <a>{profileData?.['department'] || 'N/A'}</a>
            </p>
           {/* <p className='info-d'>
              <b>Educational Qualification: </b>
              <a>{profileData?.['educationalQualification'] || 'N/A'}</a>
            </p>*/}
            <p className='info-d'>
              <b>Date of joining: </b>
              <a>{profileData?.['dateOfJoining']?.toString().slice(0, 10) || 'N/A'}</a>
            </p>
            <p className='info-d'>
              <b>KMC Registration number: </b>
              <a>{profileData?.['kmcRegistrationNo'] || 'N/A'}</a>
            </p>
          </div>
          <div
            className='profilepic'
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'lightgray',
              borderRadius: '1rem',
            }}
          >
            <figure className='profilepic'>
              <img
                src={profileData.profileUrl || 'user.png'}
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
        {/* <input
          type="submit"
          className="profileEditBtn"
          value={'EDIT'}
          onClick={(e) => {
            e.preventDefault()
            setFormState(true)
          }}
        /> */}
      </div>
    </>
  )
}
