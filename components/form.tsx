'use client'
import { getDataAny } from '@/lib/mongoose/serverActions'
import { getInput } from '@/lib/formFunctions'
import { handleUpsertAny } from '@/lib/mongoose/serverActions'
import styles from '@css/form.module.css'
import { startTransition, useEffect, useState } from 'react'

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../app/firebase'

type otherInput = {
  type: string
  name: string
  label?: string
  required: boolean
  default?: string
  placeholder?: string
}
type selectInput = {
  type: 'select'
  name: string
  label?: string
  required: boolean
  default?: string
  options: Array<{ label?: string; value: string }>
}

type input = selectInput | otherInput

export default function Form({
  formStatusUpdate,
  type,
  formState,
  _id,
  style,
}: {
  formStatusUpdate: (status: any) => void
  type: string
  formState: any
  _id?: string
  style?: any
}) {
  //Cannot create form without type
  if (!type) return <></>

  const [inputs, setInputs] = useState<{ status?: string; inputs?: input[] }>({
    status: 'loading',
  })
  const [formData, setFormData] = useState<any>({})
  const [formStatus, setFormStatus]: [
    FormStatus: {
      error: boolean
      status: 'none' | 'submitted' | 'submitting' | 'error'
    },
    setFormStatus: any
  ] = useState({
    error: false,
    status: 'none',
  })

  // form upload
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [uploadUrl, setUploadUrl] = useState('')
  // let uploadUrl: string = ''
  // console.log(uploadUrl)

  // console.log(file)

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // console.log(progress);
        setFilePerc(Math.round(progress))
      },
      (error) => {
        console.log(error)
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log(downloadURL)
          setUploadUrl(downloadURL)
        })
      }
    )
  }

  // upload profile picture
  const [profilePhoto, setProfilePhoto] = useState(undefined)
  const [profilePhotoPerc, setProfilePhotoPerc] = useState(0)
  const [profilePhotoUploadError, setProfilePhotoUploadError] = useState(false)

  const [profilePhotoUrl, setProfilePhotoUrl] = useState('')

  useEffect(() => {
    if (profilePhoto) {
      handleProfilePhotoUpload(profilePhoto)
    }
  }, [profilePhoto])

  const handleProfilePhotoUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // console.log(progress);
        setProfilePhotoPerc(Math.round(progress))
      },
      (error) => {
        console.log(error)
        setProfilePhotoUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log(downloadURL)
          setProfilePhotoUrl(downloadURL)
        })
      }
    )
  }

  useEffect(() => {
    if (formStatus.status === 'submitting')
      localStorage.setItem('profileUrl', profilePhotoUrl)
    // console.log(formStatus)
  }, [formStatus])

  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    ;(async () => {
      try {
        const inputs = await getInput(type)
        setInputs({ status: 'loaded', inputs })
        if (_id) {
          setFormData({ loading: true })
          let formData = await getDataAny(type, _id)
          setFormData(formData)
        } else setFormData({ loading: false })
      } catch (e) {
        setInputs({ status: 'error' })
        console.error(e)
      }
    })()
  }, [type, _id || ''])

  /* Select component */
  function SelectComponent({
    options,
    name,
    defaultValue,
  }: {
    options: Array<{ label?: string; value: string }>
    name: string
    defaultValue: string
  }) {
    return (
      <select name={name} defaultValue={defaultValue || ''}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
    )
  }

  if (formStatus.status === 'submitted') return <></>
  if (inputs.status === 'loading' || formData.loading === true)
    return <p style={{ color: style?.['color'] || 'white' }}>Loading form...</p>

  if (inputs.status === 'error')
    return (
      <p style={{ color: style?.['color'] || 'white' }}>
        Error... Please try again later.
      </p>
    )

  return (
    <div className={styles.formWrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          formData.append('uploadUrl', uploadUrl)
          formData.append('profileUrl', profilePhotoUrl)
          // const data = Object.fromEntries(formData)
          // console.log(data)

          // const newData = { ...data, uploadUrl }
          // console.log(newData)
          // console.log(data)
          // console.log(uploadUrl)

          setFormStatus({ status: 'submitting' })
          startTransition(() => {
            handleUpsertAny(formData)
              .then(() => {
                setFormStatus({ status: 'submitted', error: false })
                formStatusUpdate({})
              })
              .catch(() => {
                setFormStatus({ status: 'submitted', error: true })
                formStatusUpdate({})
              })
          })
        }}
      >
        <h2 className={styles.title}>Submit Form</h2>
        <span>
          {_id && <input type="hidden" name="_id" value={_id || ''} />}
          <input type="hidden" name="type" value={type} />
        </span>
        {inputs?.inputs?.map((e) => {
          return (
            <span key={(e.name || e.label || Math.random()) + 'Key'}>
              <b>
                <label htmlFor={e.name || e.label}>{e.label || e.name}</label>
              </b>
              {e.type === 'select' ? (
                <SelectComponent
                  name={e.name}
                  options={(e as selectInput).options}
                  defaultValue={
                    formData?.[e.name] || formData?.[e.label] || e.default || ''
                  }
                />
              ) : e.type === 'file' && e.name === 'profilePhoto' ? (
                profilePhotoUrl ? (
                  <figure
                    style={{
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'lightgray',
                      borderRadius: '1rem',
                      width: 'min-content',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={profilePhotoUrl}
                      alt="profile"
                      width={240}
                      height={240}
                      style={{ objectFit: 'cover' }}
                    />
                  </figure>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        // setFile(e.target.files[0])
                        // console.log(e.target.files[0])
                        setProfilePhoto(e.target.files[0])
                      }}
                      name={e.name}
                      placeholder={(e as otherInput).placeholder || ' '}
                      required={e.required || false}
                      defaultValue={
                        formData?.[e.name] ||
                        formData?.[e.label] ||
                        e.default ||
                        ''
                      }
                    />
                    <p>
                      {profilePhotoUploadError ? (
                        <span style={{ color: 'white' }}>
                          Error in profilePhoto uplaod
                        </span>
                      ) : profilePhotoPerc > 0 && profilePhotoPerc < 100 ? (
                        <span
                          style={{ color: 'white' }}
                        >{`Uploading ${profilePhotoPerc}%...`}</span>
                      ) : profilePhotoPerc === 100 ? (
                        <span style={{ color: 'white' }}>
                          Profile Photo Succesfully uploaded
                        </span>
                      ) : (
                        ''
                      )}
                    </p>
                  </div>
                )
              ) : e.type === 'file' ? (
                <div>
                  <input
                    type="file"
                    accept="*/*"
                    onChange={(e) => {
                      setFile(e.target.files[0])
                      // console.log(e.target.files[0])
                    }}
                    name={e.name}
                    placeholder={(e as otherInput).placeholder || ' '}
                    required={e.required || false}
                    defaultValue={
                      formData?.[e.name] ||
                      formData?.[e.label] ||
                      e.default ||
                      ''
                    }
                  />
                  <p>
                    {fileUploadError ? (
                      <span style={{ color: 'white' }}>
                        Error in file uplaod
                      </span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                      <span
                        style={{ color: 'white' }}
                      >{`Uploading ${filePerc}%...`}</span>
                    ) : filePerc === 100 ? (
                      <span style={{ color: 'white' }}>
                        File Succesfully uploaded
                      </span>
                    ) : (
                      ''
                    )}
                  </p>
                </div>
              ) : (
                <input
                  type={e.type || 'text'}
                  name={e.name}
                  placeholder={(e as otherInput).placeholder || ' '}
                  required={e.required || false}
                  defaultValue={
                    formData?.[e.name] || formData?.[e.label] || e.default || ''
                  }
                />
              )}
            </span>
          )
        })}
        <span>
          <input
            className={styles.submit}
            type="submit"
            disabled={uploadUrl || profilePhotoUrl ? false : true}
            style={{ opacity: `${uploadUrl || profilePhotoUrl}` ? 1 : 0.3 }}
            value={
              formStatus.status === 'submitting' ? 'SUBMITTING..' : 'SUBMIT'
            }
          />
          <button
            className={styles.cancel}
            onClick={(e) => {
              e.preventDefault()
              formStatusUpdate({})
            }}
            style={{ marginLeft: '10px' }}
          >
            CANCEL
          </button>
        </span>
      </form>
    </div>
  )
}
