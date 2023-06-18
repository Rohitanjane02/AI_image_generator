import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import {FormField, Loader} from '../components'

const CreatePost = () => {
  //this is going to allow us to go to home page once the post is created
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  //this will be used while making the contact to api to geneerate the image
  const [generatingImg, setGeneratingImg] = useState(false);
  //general loading
  const [loading, setLoading] = useState(false);


  //*All required functions
  //this button will be used to generate the image in backend
  // const generateImage = async() => {
  //   if(form.prompt) {
  //     try {
  //       setgeneratingImg(true);
  //       // getting backend img data in response
  //       const response = await fetch('http://localhost:8080/api/v1/dalle',{
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({prompt: form.prompt}),
  //       })

  //       const data = await response.json();
  //       setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
  //     } catch (error) {
  //       alert(error);
  //     } finally {
  //       setgeneratingImg(false);
  //     }
  //   } else {
  //     alert('Please enter a prompt');
  //   }
  // }



  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        console.log(data);
        setForm({ ...form, photo:`data:image/jpeg;base64,${data.photo}`});
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };


  //async: function will fetch the data
  const handleSubmit = async(e) => {
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (form.prompt && form.photo) {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:8080/api/v1/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          });
  
          await response.json();
          alert('Success');
          navigate('/home');
        } catch (err) {
          alert(err);
        } finally {
          setLoading(false);
        }
      } else {
        alert('Please generate an image with proper details');
      }
    };
  }

  //To implement the functionality of field so we get ready to send the data over to the backend
  //*first make sure we actually type value in field
  const handleChange = (e) => {
    setForm({ ...form,[e.target.name]: e.target.value})
  }


  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);//here we get the random prompt
    setForm({...form , prompt: randomPrompt})//now we update the prompt
  }
  
  return (
    // To center a container, use the mx-auto utility:
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>Create imaginative and visually stunning images through DALL-E AI and share with community</p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName = "Your name"
            type = "text"
            name = "name"
            placeholder="John Doe"
            value = {form.name}
            handleChange={handleChange}
          />

          {/* isSurpriseMe--> with this we get know whether we have to show additional button or not with the help of name="prompt" field*/}
          <FormField
            labelName = "Prompt"
            type = "text"
            name = "prompt"
            placeholder="'A plush toy robot sitting against a yellow wall'"
            value = {form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* //*we are creating a place where ai image generate will be show */}
          {/*//*-> but also we will show preview of image in case it has been already generated*/}
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
              // if there is no image below preview image will be show
            ): (
              <img
                src={preview}
                alt="preview"
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {/* if image is generating than this loader will be show*/}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader/>
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImg? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with others in the community</p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
           >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
















