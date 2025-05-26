
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjectStorage } from '../../hooks/useProjectStorage';
import { Project } from '../sections/ProjectsSection';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

interface AdminProjectFormProps {
  initialProject?: Project;
  onComplete?: () => void;
}

const AdminProjectForm = ({ initialProject, onComplete }: AdminProjectFormProps) => {
  const [title, setTitle] = useState(initialProject?.title || '');
  const [description, setDescription] = useState(initialProject?.description || '');
  const [category, setCategory] = useState(initialProject?.category || '');
  const [image, setImage] = useState(initialProject?.image || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addProject, updateProject } = useProjectStorage();
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Fil för stor",
          description: "Bilden får max vara 5MB.",
          variant: "destructive",
        });
        return;
      }

      setImageFile(file);
      
      // Convert to base64 for preview and storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !category || !image) {
      toast({
        title: "Ofullständig information",
        description: "Alla fält måste fyllas i.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (initialProject) {
        // Update existing project
        const success = updateProject(initialProject.id, {
          title: title.trim(),
          description: description.trim(),
          category,
          image,
        });
        
        if (success && onComplete) {
          onComplete();
        }
      } else {
        // Add new project
        const newProject = addProject({
          title: title.trim(),
          description: description.trim(),
          category,
          image,
        });
        
        if (newProject) {
          // Reset form
          setTitle('');
          setDescription('');
          setCategory('');
          setImage('');
          setImageFile(null);
        }
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      toast({
        title: "Fel",
        description: "Något gick fel. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setImage('');
    setImageFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Projekttitel</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ange projekttitel"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Välj kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Privatperson">Privatperson</SelectItem>
                <SelectItem value="Företag">Företag</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Beskrivning</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beskriv projektet..."
              rows={4}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Projektbild</Label>
            <div className="mt-2">
              {image ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="Förhandsvisning"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-sm text-blue-600 hover:text-blue-500">
                        Ladda upp en bild
                      </span>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF upp till 5MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {onComplete && (
          <Button type="button" variant="outline" onClick={onComplete}>
            Avbryt
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sparar...' : initialProject ? 'Uppdatera projekt' : 'Lägg till projekt'}
        </Button>
      </div>
    </form>
  );
};

export default AdminProjectForm;
