import React, { useState, useEffect, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';

const Test1 = () => {
    const [imgBase64, setImgBase64] = useState("")
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false); 
    const [predictionArr, setPredictionArr] = useState(''); 
    const [result, setResult] = useState(''); 
    const [keyword, setKeyword] = useState('안녕')
    const inputRef = useRef(); 
     
    const modelURL = "../my_model/model.json"
    const metadataURL = '"../my_model/metadata.json' 

    let model 

    const init = async () => {
        model = await tmImage.load(modelURL, metadataURL); 
        let maxPredictions;
        maxPredictions = model.getTotalClasses();
    }

    const predict = async () => {
        model = await tmImage.load(modelURL, metadataURL); 
        const tempImage = document.getElementById("srcImg"); 
        const prediction = await model.predict(tempImage, false); 
        prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
        setPredictionArr(prediction)
        setShowResult(true)
        setLoading(false)
        setResult(prediction[0].className)

        switch(prediction[0].className){
            case "독립운동가":
              setKeyword("독립운동가");
              break;
            case "친일파":
              setKeyword("친일파");
              break;
            default:
              break;
          }
          console.log("가장높은확률 : ",prediction[0].className)
    }; 

    const handleChangeFile = (event) => {
        setLoading(true); 
        setShowResult(false); 
        setPredictionArr(null)
        setResult(null); 

        let reader = new FileReader(); 

        reader.onloadend = () => {
            const base64 = reader.result; 
            if(base64) {
                setImgBase64(base64.toString()); 
            }
        }; 

        if(event.target.files[0]){
            reader.readAsDataURL(event.target.files[0]); 
            setImgFile(event.target.files[0])

            init().then(() => {
                console.log("init 모델")
                predict()
               }); 
        }
    }

 return(
    <div className='bg-black w-full h-screen flex justify-center items-center'>
        <div className='bg-main-pink w-[40rem] h-screen flex-col'>
            <div className='flex justify-center items-center mt-20'>
                <span className='text-black text-3xl font-bold'>
                독립운동가/친일파 관상 테스트
                </span>
            </div>
            <div className='flex justify-center items-center mt-8 flex-col'>
                <span className='text-main-ppink text-sm font-bold'>
                    3,420,045,254,485번 내 첫인상을 확인했습니다.
                </span>
                <span className='text-main-ppink text-sm font-bold'>
                    (2024년 1월 13일 15:00 기준)
                </span>
            </div>
            {showResult? <div>분석결과는?</div> : <div>{loading?"잠시만 기다려주세요" : "사진을 업로드해주세요" }</div>}
            <div className='flex justify-center items-center mt-20'>
              <div onClick={()=> {inputRef.current.click()}} className='w-80 h-44 rounded-2xl bg-main-green hover:bg-main-yellow'>
                <input ref={inputRef} onChange={handleChangeFile} type="file" accept="image/*" className='hidden'/>
                {imgBase64 ? <img id="srcImg" src={imgBase64} alt='Input'/> : null}
                <span className='text-xs text-gray-600'>얼굴 정면 사진을 업로드하세요!</span>
              </div>
            </div>
            <div>
                {/* <div src={require("../assets/someone.png")}></div> */}
                <span>give me a your picture</span>
                <span>{keyword}</span>
            </div>
            <img id="srcImg" src={imgBase64}></img>
             <div className='text-black'>친구한테 공유하기</div>

            <div className='text-black'>2024.NakTA.All rights reseved</div>
        </div>
    </div>
 )
};

export default Test1;
