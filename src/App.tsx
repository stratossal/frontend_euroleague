import {BrowserRouter, Routes, Route} from "react-router";
import Layout from "@/components/layout/Layout.tsx";
import HomePage from "@/components/pages/HomePage.tsx";
import RegisterPage from "@/components/pages/RegisterPage.tsx";
import LoginPage from "@/components/pages/LoginPage.tsx";
import TeamsListPage from "@/components/pages/TeamsListPage.tsx";
import TeamPage from "@/components/pages/TeamPage.tsx";
import PlayersListPage from "@/components/pages/PlayersListPage.tsx";
import PlayerPage from "@/components/pages/PlayerPage.tsx";
import StatsPage from "@/components/pages/StatsPage.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import {AuthProvider} from "@/context/AuthProvider.tsx";
import {Toaster} from "sonner";


function App(){

    return (
      <>
          <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route element={<Layout/>}>
                  <Route index element={<HomePage/>}/>
                      <Route path="register" element={<RegisterPage/>}/>
                      <Route path="login" element={<LoginPage/>}/>
                      <Route element={<ProtectedRoute/>}>
                      <Route path="teams">
                          <Route index element={<TeamsListPage/>}/>
                          <Route path=":teamId" element={<TeamPage/>}/>
                      </Route>
                      <Route path="players">
                          <Route index element={<PlayersListPage/>}/>
                          <Route path=":playerId" element={<PlayerPage/>}/>
                      </Route>
                      <Route path="stats" element={<StatsPage/>}/>
                      </Route>
                  </Route>
              </Routes>
          </BrowserRouter>
              <Toaster richColors/>
          </AuthProvider>
      </>
    )
}

export default App
