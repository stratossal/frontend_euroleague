import {BrowserRouter, Routes, Route} from "react-router";
import Layout from "@/components/layout/Layout.tsx";
import HomePage from "@/components/pages/HomePage.tsx";
import RegisterPage from "@/components/pages/RegisterPage.tsx";
import LoginPage from "@/components/pages/LoginPage.tsx";
import TeamsListPage from "@/components/pages/TeamsListPage.tsx";
// import TeamPage from "@/components/pages/TeamPage.tsx";

function App(){

    return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route element={<Layout/>}>
                  <Route index element={<HomePage/>}/>
                      <Route path="register" element={<RegisterPage/>}/>
                      <Route path="login" element={<LoginPage/>}/>
                      <Route path="teams">
                          <Route index element={<TeamsListPage/>}/>
                          {/*<Route path=":teamId" element={<TeamPage/>}/>*/}
                      </Route>
                  </Route>
              </Routes>
          </BrowserRouter>
      </>
    )
}

export default App
