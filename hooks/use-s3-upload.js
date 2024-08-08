import { useState } from 'react'
import { useUser } from './use-user'
import { post } from 'util/api'
import { useStore } from 'util/store'

export const useS3Upload = (uploadProgressCallback, folderPath) => {
  const [status, setStatus] = useState()
  const [url, setUrl] = useState('')
  const [user] = useUser()
  const token = user?.token
  const setNotification = useStore((state) => state.setNotification)

  async function getSignedUrl(data) {
    try {
      return await post('createSignedFile', data, {
        token,
      })
    } catch (error) {
      throwError(error)
      return null
    }
  }

  async function uploadToS3(fileData, file, callback) {
    const { presignedUrl, contentType } = fileData
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('PUT', presignedUrl)
      xhr.setRequestHeader('Content-Type', contentType)
      xhr.upload.onprogress = (event) => {
        if (typeof callback === 'function') {
          callback(event)
        }
      }
      xhr.onload = () => {
        setStatus(xhr.status)
        resolve(xhr.status)
      }
      xhr.onerror = () => {
        setStatus(xhr.status)
        reject(xhr.status)
      }
      xhr.send(file)
    })
  }

  function throwError(error) {
    setNotification({
      type: 'error',
      text: 'There was a problem uploading your file, please try again',
    })
    if (error) {
      console.error('Error uploading file', error)
    }
    throw new Error(error)
  }

  async function uploadFile(file) {
    const fileInfoForS3 = {
      fileName: folderPath ? `${folderPath}${file.name}` : file.name,
      acl: 'public-read',
      contentType: file.type,
    }

    setStatus('loading')
    uploadProgressCallback({ loaded: 0, total: file.size })

    const fileData = await getSignedUrl(fileInfoForS3, token)
    if (!fileData?.fileId) {
      throwError()
      setStatus('error')
      return
    }

    try {
      const status = await uploadToS3(fileData, file, (event) => {
        uploadProgressCallback({
          loaded: event.loaded,
          total: event.total,
        })
      })

      if (![204, 200].includes(status)) {
        throwError()
        setStatus('error')
        console.error('Upload error:', status)
      } else {
        setStatus(200)
        setUrl(fileData.url)
      }
    } catch (error) {
      console.error('Upload error:', error)
      throwError()
      setStatus('error')
    }
  }

  return {
    uploadFile,
    status,
    uploadedUrl: url,
  }
}
