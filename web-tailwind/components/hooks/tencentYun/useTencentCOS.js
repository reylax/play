import { useState } from "react";
import { gql, useMutation } from "@apollo/client"
import CosAuth from './cAuth.js'

const GET_TENCENT_KEY = gql`
  mutation ($purpose: String!, $fileExtention: String!) {
    requestTencentYunKey(purpose: $purpose, fileExtention: $fileExtention) {
      status,
      message
    }
  }
`

export default function useTencentCOS() {

  const [upLoadingRate, setUpLoadingRate] = useState(0)
  const [uploading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const [getKeyAndFileName] = useMutation(GET_TENCENT_KEY, {
    onError: console.error
  })

  
  const  postFileToTencentYun = async ({file, purpose, fileExtention}) => {
    if (!purpose || ! file || !fileExtention) return
    const { data:{ requestTencentYunKey: {status, message}} } = await getKeyAndFileName({
      variables: {
        purpose,
        fileExtention,
      }
    })

    if (status === 200) {
      const {TmpSecretId, TmpSecretKey, Token, path} = JSON.parse(message)
      let auth = CosAuth({
            SecretId: TmpSecretId,
            SecretKey: TmpSecretKey,
            Method: "PUT",
            Pathname: path,
        })
      let url = process.env.bucketUrl + path
      try {
        await _postFile(url, auth, Token, file, 'PUT')
        return path 
      } catch (error) {
        console.error(error.message)
        return false
      }
    }
    console.log("token fetch error")
    return false
  }

  // fileExtention here is the image filename
  const deleteTencentYunFile = async ({ purpose, fileExtention }) => {
    const { data:{ requestTencentYunKey: {status, message}} } = await getKeyAndFileName({
      variables: {
        purpose,
        fileExtention,
      }
    })
    if (status === 200) {
      const {TmpSecretId, TmpSecretKey, Token, path} = JSON.parse(message)
      let auth = CosAuth({
        SecretId: TmpSecretId,
        SecretKey: TmpSecretKey,
        Method: "delete",
        Pathname: path,
      })
      let url = process.env.bucketUrl + path
      try {
        await _postFile(url, auth, Token, "", 'delete')
      } catch (error) {
        console.error(error.message)
      }
      
    }
  }

  const  _postFile = (url, auth, Token, file, method) => {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Authorization', auth);
        xhr.setRequestHeader('x-cos-security-token', Token);
        xhr.upload.onprogress = function (e) {
            setUpLoadingRate(Math.round(e.loaded / e.total * 10000) / 100)
        };
        xhr.onload = function () {
            if (/^2\d\d$/.test('' + xhr.status)) {
              setLoading(false)
              setError("success!")
              resolve("success!")
            } else {
              setError(`upload failed.status code:${xhr.status}`)
              reject(`upload failed.status code:${xhr.status}`)
            }
        };
        xhr.onerror = function () {
          setLoading(false)
          reject(`upload failed.status code:${xhr.status}`)
        };
        setLoading(true)
        xhr.send(file);
      }
    )
  }

  return {
    upLoadingRate,
    uploading,
    error,
    postFileToTencentYun,
    deleteTencentYunFile,
  }
}