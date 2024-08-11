import Results from '@/components/Ai/Results'
import { AptiProvider } from '@/context/AptiContext'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* <AptiProvider> */}
      <Results/>
      {/* </AptiProvider> */}
    </div>
  )
}

export default page
