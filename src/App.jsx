import { useState } from 'react'

import './App.css'
import { Route, Routes,} from 'react-router'
import { Movies } from './pages/Movies'
import { TVSeries } from './pages/TVSeries'
import { Search } from './pages/Search'
import { MyLayout } from './components/MyLayout'

function App() {

  return (
    <Routes>
      <Route path='/' element={<MyLayout/>}>
        <Route path='/' element={<Movies/>}/>
        <Route path='/tvseries' element={<TVSeries/>}/>
        <Route path='/search' element={<Search/>}/>
      </Route>
      
    </Routes>
  )
}

export default App
