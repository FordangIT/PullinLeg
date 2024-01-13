import React, { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';

const Test1 = () => {
 return(
    <div className='bg-main-green w-full h-screen flex justify-center items-center'>
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
        
             <div className='text-black'>친구한테 공유하기</div>

            <div className='text-black'>2024.NakTA.All rights reseved</div>
        </div>
    </div>
 )
};

export default Test1;
