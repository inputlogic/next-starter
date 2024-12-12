import Image from 'next/image'
import { useQuery } from 'hooks/use-query'
import { blurhashToDataURL } from 'util/blurhash'
import { axiosClient } from 'util/axios-client'

const Page = () => {
  const filesQuery = useQuery({url: '/user/files'})
  console.log(filesQuery.data)
  const onChangeFile = async (ev) => {
    const file = ev.target.files[0]
    if (!file) return
    const fileResponse = await axiosClient.post('/user/files/create-signed-file', {
      fileName: file.name,
      contentType: file.type,
    })
    const presignedUrl = fileResponse.data.presignedUrl
    const uploadResponse = await axiosClient.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type
      }
    })

    console.log('done!', file, fileResponse, uploadResponse)
  }

  return <div>
    <h3>Image</h3>
    <input type='file' onChange={onChangeFile} />
    <div>
      {filesQuery.data?.results.map(file => 
        <Image
          key={file.id}
          src={file.image?.large || file.url}
          width={400}
          height={file.image?.width ? 400 * file.image.height / file.image.width : 400}
          {...file.image?.blurhash ? {placeholder: 'blur', blurDataURL: blurhashToDataURL(file.image.blurhash, 5, 5)} : {}}
          alt='Picture'
        />
      )}
    </div>
  </div>
}

Page.Layouts = ['DemoLayout']
export default Page
