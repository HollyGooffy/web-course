import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@features/auth/model/auth-context';
import { HomePage } from "@pages/home";
import { BuyTicketPage } from "@pages/buy-ticket";
import { FestivalsPage } from "@pages/festivals";
import { AdminLogin } from "@pages/admin-login";
import { Dashboard } from "@pages/admin/dashboard";
import { Groups } from "@pages/admin/groups";
import { Application } from "@pages/admin/application";
import { Merch } from "@pages/admin/merch";
import { Cards } from "@pages/admin/cards";
import { CardsSettings } from "@pages/admin/cards/settings";
import { Poster } from "@pages/admin/poster";
import { Stats } from "@pages/admin/stats";
import { ErrorPage } from "@pages/error";
import { ProtectedRoute } from '@shared/components/ProtectedRoute';
import { AdminLayout } from '@shared/layouts/AdminLayout';
import { ROUTES } from '@shared/constants/routes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Публичные маршруты */}
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path="/buy-ticket" element={<BuyTicketPage />} />
            <Route path="/festivals" element={<FestivalsPage />} />
            <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
            
            <Route
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/groups" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Groups />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/application" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Application />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/merch" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Merch />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/cards" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Cards />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/cards/settings/:festivalId" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <CardsSettings />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/poster" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Poster />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/stats" 
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Stats />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Редирект с /admin на /admin/dashboard */}
            <Route 
              path="/admin" 
              element={<Navigate to="/admin/dashboard" replace />} 
            />

            {/* 404 страница */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;