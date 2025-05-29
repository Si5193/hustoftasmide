
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminProjectList from '../components/admin/AdminProjectList';
import AdminProjectForm from '../components/admin/AdminProjectForm';
import ImageMigrationPanel from '../components/admin/ImageMigrationPanel';
import ImageRepairTool from '../components/admin/ImageRepairTool';
import { useSupabaseProjects } from '../hooks/useSupabaseProjects';
import { useToast } from '@/hooks/use-toast';
import { LogOut } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { projects, loading } = useSupabaseProjects();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Simple password protection
  const ADMIN_PASSWORD = 'hustofta2024'; // In real app, this would be more secure

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      toast({
        title: "Inloggad",
        description: "Välkommen till admin-panelen!",
      });
    } else {
      toast({
        title: "Fel lösenord",
        description: "Försök igen.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Ange lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Logga in
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut size={16} />
            Logga ut
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Hantera Projekt</TabsTrigger>
            <TabsTrigger value="add">Lägg till Projekt</TabsTrigger>
            <TabsTrigger value="repair">Reparera Bilder</TabsTrigger>
            <TabsTrigger value="migration">Bildmigrering</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Befintliga Projekt ({projects.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Laddar projekt...</p>
                ) : (
                  <AdminProjectList />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="add" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lägg till nytt projekt</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminProjectForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="repair" className="mt-6">
            <ImageRepairTool />
          </TabsContent>

          <TabsContent value="migration" className="mt-6">
            <ImageMigrationPanel />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
