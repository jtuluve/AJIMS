
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useUserData } from './UserDataContext'

export default function Profile() {
    const {userData} = useUserData();
    if(!userData)
        return 
            (<p style={{color:"white"}}>Failed to load data. Please, signout and signin again.</p>);
    let profileData = userData?.profile;
    const { data: session } = useSession()

    if (!session) {
      redirect('/')
    }

    if(profileData===null||profileData===undefined){
      return <p style={{color:"white"}}>Internal Error occured. Please logout and login again or try again later.</p>
    }

    return (
      <>
        <div className="profileform">
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
                  alt={profileData.profileUrl || 'user.png'}
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
        </div>
      </>
    )
}
