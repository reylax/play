import { createReactEditorJS } from 'react-editor-js'
import List from '@editorjs/list'
import Header from '@editorjs/header'
import Marker from '@editorjs/marker'
import ImageTool from '@editorjs/image'
import Embed from '@editorjs/embed'
import { useState, useRef, useCallback, useEffect } from 'react'
import { setItem, getItem } from '../../../contexts/cache'
import useTencentCOS from '../../hooks/tencentYun/useTencentCOS'
import { gql, useMutation } from "@apollo/client";
import { useTheme } from '../../../contexts/themeContext'

const PUBLISH_BLOG = gql`
  mutation ($blog: String!) {
    publishBlog(blog: $blog) {
      status,
      message,
      _id,
    }
  }
`

const getFilename = (url => {
  return url.substring(url.lastIndexOf('/')+1)
})

export default function Index() {
  const EDITOR_JS_TOOLS = {
    embed: Embed,
    list: List,
    header: Header,
    marker: Marker,
    image: {
      class: ImageTool,
      config: {
        /**
         * Custom uploader
         */
        uploader: {
          /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
          uploadByFile(file){
            // your own uploading logic here
           return postFileToTencentYun({
              file: file,
              purpose: "blog",
              fileExtention: file.name.substring(file.name.lastIndexOf('.'))
            }).then(res => {
              let allimages = getItem("editing_selectedImages")
              if (allimages == undefined) {
                allimages = "[]"
              }
              let images = [...JSON.parse(allimages)]
              images.push(getFilename(res))
              setItem("editing_selectedImages", JSON.stringify(images))
              return {
                success: 1,
                file: {
                  url: "https://avatar-1305219845.cos.ap-shanghai.myqcloud.com" + res,
                  // any other image data you want to store, such as width, height, color, extension, etc
                }
              }
            })},
          uploadByUrl(url){
            // your ajax request for uploading
            return new Promise(function(resolve) {
              resolve("just use the original url")
            }).then(() => {
              return {
                success: 1,
                file: {
                  url: url,
                  // any other image data you want to store, such as width, height, color, extension, etc
                }
              }
            })
          }},
        }
      }
  }
  const ReactEditorJS = createReactEditorJS()
  const editorCore = useRef(null)
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const [publishBlog, { loading }] = useMutation(PUBLISH_BLOG, {
    onError: error => {
      console.log(error)
    }
  })

  const {postFileToTencentYun, deleteTencentYunFile} = useTencentCOS() 
  const { user: { _id, username, avatar }} = useTheme()
  const handleEidtorOnchange = useCallback(async () => {
    const savedData = await editorCore.current.save()
    setItem("writing_content", JSON.stringify(savedData))
  }, [])

  const [title, setTitle] = useState(getItem("writing_title"))

  const postDataToServer = async () => {
    const savedData = await editorCore.current.save()
    //delete canceled image, editor.js will upload image as user selected.
    _deleteCanceledImage()
    // post to text content server
    const description = _getfirstTextPhrase(savedData)
    publishBlog({variables: {
      blog: JSON.stringify({
        author: _id,
        title,
        description,
        content: JSON.stringify(savedData),
        authorName: username,
        authorAvatar: avatar,
      })
    }})
  }

  const _getfirstTextPhrase = savedData => {
    for (var i=0; i < savedData.blocks.length; i++) {
      if (savedData.blocks[i].type === 'paragraph') {
        return savedData.blocks[i].data.text
      }
    }
    return ""
  }

  const _deleteCanceledImage = async () => {
    const savedData = await editorCore.current.save()
    let remainedImages = new Set()
    savedData.blocks.forEach(element => {
      if (element.type === 'image') {
        remainedImages.add(getFilename(element.data.file.url))
      }
    });
    let allimages = getItem("editing_selectedImages")
    if (allimages == undefined) {
      allimages = "[]"
    }
    let images = [...JSON.parse(allimages)]
    images.forEach(imageFileName => {
      if (!remainedImages.has(imageFileName)) {
        deleteTencentYunFile({
          purpose: 'deleteCanceledImage',
          fileExtention: imageFileName,
        })
      }
    })
    setItem("editing_selectedImages", JSON.stringify([]))
  }

  useEffect(() => {
    return () => {
      _deleteCanceledImage()
    }
  }, [])

  return (
    <div className='w-full h-screen flex flex-col bg-white '>
      <input
        className='outline-none font-bold text-2xl px-12 pb-2.5 pt-7 bg-paper-100' 
        placeholder='标题'
        value={title}
        onChange={event => {
          let data = event.target.value
          setItem("writing_title", data)
          setTitle(data)
        }}
      />
      <div className='bg-white border-t border-b border-primary-50 py-3.5 pl-12 flex-1 overflow-x-hidden overflow-y-scroll scrollbar-hide tracking-widest'
        onWheel={e => e.stopPropagation()}
      >
        <ReactEditorJS 
          holder='editorjs'
          onInitialize={handleInitialize}
          tools={EDITOR_JS_TOOLS}
          placeholder={`写点什么...`}
          data={JSON.parse(getItem("writing_content"))}
          onChange={() => {
            handleEidtorOnchange()
          }}
        />
      </div>
      <div className='p-2 px-5 flex justify-between bg-paper-100'>
        <button className='bg-transparent px-3.5 py-1 border border-red-500 rounded-sm hover:bg-red-50 hover:text-red-500 font-medium'
          onClick={() => editorCore.current.clear()}
        >
          删除
        </button>
        <div className='relative flex justify-center items-center'>
          <button className="bg-green-500 px-3.5 py-1 border border-green-500  hover:bg-green-600 active:bg-green-700 text-white rounded-sm"
            onClick={ () => postDataToServer() }
          >
            <p className="font-display text-white">发表</p>
            <div className='fixed-center'>
              { loading && <img src='/loading.svg' alt='pending...' /> }
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}