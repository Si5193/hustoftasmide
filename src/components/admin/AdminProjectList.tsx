
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseProjects } from '../../hooks/useSupabaseProjects';
import AdminProjectForm from './AdminProjectForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Project } from '../../hooks/useSupabaseProjects';
import { Edit, Trash2 } from 'lucide-react';

const AdminProjectList = () => {
  const { projects, deleteProject } = useSupabaseProjects();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setEditDialogOpen(true);
  };

  const handleEditComplete = () => {
    setEditingProject(null);
    setEditDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Är du säker på att du vill ta bort detta projekt?')) {
      deleteProject(id);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Inga projekt hittades. Lägg till ditt första projekt!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <div className="flex">
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="text-sm">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {project.category}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {project.description}
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Redigera projekt</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <AdminProjectForm
              initialProject={editingProject}
              onComplete={handleEditComplete}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjectList;
