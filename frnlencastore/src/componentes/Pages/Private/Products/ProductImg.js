import React, { Component } from 'react';
import Page from '../../Page';
import ReactCrop from 'react-image-crop';
import exif from 'exif-js';
import 'react-image-crop/dist/ReactCrop.css';
import {Redirect} from 'react-router-dom';
import { saxios } from '../../../Utilities/Utilities';


export default class ProductNew extends Component {
  constructor() {
    super();
    this.state = {
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 1 / 1
      },
      croppedImageUrl: null,
      croppedUrl: null,
      redirect:false,
    }
  }

  handleFile = e => {
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      this.setState({ src: fileReader.result })
    }
    fileReader.readAsDataURL(e.target.files[0])
  }

  onImageLoaded = image => {
    this.imageRef = image
  }

  onCropChange = (crop) => {
    this.setState({ crop });
  }

  onCropComplete = crop => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop)
      this.setState({ croppedImageUrl })
    }
  }

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");


    // --------
    const _this = this
    exif.getData(image, function(){
      var orientation = exif.getAllTags(this).Orientation;

      switch (orientation) {
        case 2:
          ctx.transform(-1, 0, 0, 1, crop.width, 0);
          break;
        case 3:
          ctx.transform(-1, 0, 0, -1, crop.width, crop.height);
          break;
        case 4:
          ctx.transform(1, 0, 0, -1, 0, crop.height);
          break;
        case 5:
          ctx.transform(0, 1, 1, 0, 0, 0);
          break;
        case 6:
          ctx.transform(0, 1, -1, 0, crop.height, 0);
          break;
        case 7:
          ctx.transform(0, -1, -1, 0, crop.height, crop.width);
          break;
        case 8:
          ctx.transform(0, -1, 1, 0, 0, crop.width);
          break;
        default:
          ctx.transform(1, 0, 0, 1, 0, 0);
      }
    
      //ctx.drawImage(img, 0, 0, img.width, img.height);
      //-----------

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      )

      const reader = new FileReader()
      canvas.toBlob(blob => {
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          _this.dataURLtoFile(reader.result, 'cropped.jpg')
        }
      })
    }
  )
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage: croppedImage, croppedUrl: dataurl })
  }

  clickHandler = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    const prodId = this.props.match.params.id;
    saxios.put(
      `/api/artesanos/products/updimg/${prodId}`,
      { imageurl: this.state.croppedUrl }
    ).then( (data)=>{
        this.setState({"redirect":true});
    })
    .catch((e)=>{
      console.log(e);
    }
    )
  }
  render() {

    const prodid =  this.props.match.params.id;
    if(this.state.redirect){
      return (<Redirect to={`/producto/${prodid}`}/>);
    }
    const { crop, profile_pic, src, croppedUrl} = this.state
    return (
      <Page auth={this.props.auth} pageTitle="Subir Imágen">
        {prodid}
        <input type='file' id='profile_pic' value={profile_pic}
          onChange={this.handleFile} />
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        <button onClick={this.clickHandler}>save</button>
        {croppedUrl && (<img src={croppedUrl} />)}
      </Page>
    )
  }
}
