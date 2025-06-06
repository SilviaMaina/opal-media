import React from 'react'

const PostShare = () => {
   
     const dispatch = useDispatch();
     const { user } = useSelector((state) => state.authReducer.authData);
     const loading = useSelector((state) => state.postReducer.uploading);
     const [file, setFile] = useState(null);
     const caption = useRef();
     const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
   
     // handle Image Change
     const onFileChange = (event) => {
       if (event.target.files && event.target.files[0]) {
         let img = event.target.files[0];
         setFile(img);
       }
     };
   
     const imageRef = useRef();
   
     // handle post upload
     const handleUpload = async (e) => {
       e.preventDefault();
   
       //post data
       const newPost = {
         userId: user._id,
         caption: caption.current.value,
       };
   
       // if there is an image with post
       if (file) {
         const data = new FormData();
         const fileName = Date.now() + image.name;
         data.append("name", fileName);
         data.append("file", image);
         newPost.image = fileName;
         console.log(newPost);
         try {
           dispatch(uploadImage(data));
         } catch (err) {
           console.log(err);
         }
       }
       dispatch(uploadPost(newPost));
       resetShare();
     };
   
     // Reset Post Share
     const resetShare = () => {
       setImage(null);
       desc.current.value = "";
     };
     return (
       <div className="PostShare">
         <img
           src={
             user.profilePicture
               ? serverPublic + user.profilePicture
               : serverPublic + "defaultProfile.png"
           }
           alt="Profile"
         />
         <div>
           <input
             type="text"
             placeholder="What's happening?"
             required
             ref={desc}
           />
           <div className="postOptions">
             <div
               className="option"
               style={{ color: "var(--photo)" }}
               onClick={() => imageRef.current.click()}
             >
               <UilScenery />
               Photo
             </div>
   
             <div className="option" style={{ color: "var(--video)" }}>
               <UilPlayCircle />
               Video
             </div>
             <div className="option" style={{ color: "var(--location)" }}>
               <UilLocationPoint />
               Location
             </div>
             <div className="option" style={{ color: "var(--shedule)" }}>
               <UilSchedule />
               Shedule
             </div>
             <button
               className="button ps-button"
               onClick={handleUpload}
               disabled={loading}
             >
               {loading ? "uploading" : "Share"}
             </button>
   
             <div style={{ display: "none" }}>
               <input type="file" ref={imageRef} onChange={onImageChange} />
             </div>
           </div>
   
           {image && (
             <div className="previewImage">
               <UilTimes onClick={() => setImage(null)} />
               <img src={URL.createObjectURL(image)} alt="preview" />
             </div>
           )}
         </div>
       </div>
     );
   };
   
   export default PostShare;


