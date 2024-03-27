import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PdfBuilder from '../components/PdfDemo';

function Next(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-typescript-tailwindcss)</title>
        
      </Head>
  
      <div className='flex flex-wrap justify-center w-full mt-1'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium id ab fuga repudiandae corporis sapiente mollitia, tempore perferendis quo quos explicabo, non saepe, esse voluptas cupiditate aspernatur! Magnam, quisquam reprehenderit?
        <Link href='/user'>
          <a className='primary'>Go to next page</a>
        </Link>
      </div>
     {/*  <PdfBuilder/> */}
    </React.Fragment>
  )
}

export default Next
