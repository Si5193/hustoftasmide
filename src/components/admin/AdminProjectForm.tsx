import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupabaseProjects, Project } from '../../hooks/useSupabaseProjects';
import { useImageUpload } from '../../hooks/useImageUpload';
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
  const [previewImage, setPreviewImage] = useState(initialProject?.image || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const { addProject, updateProject } = useSupabaseProjects();
  const { uploadImage, isUploading, uploadProgress } = useImageUpload();
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('📸 Starting optimized image upload...');
    const result = await uploadImage(file);
    
    if (result) {
      setPreviewImage(result.publicUrl);
      setUploadResult(result);
      console.log('✅ Image ready for project save');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !category) {
      toast({
        title: "Ofullständig information",
        description: "Titel, beskrivning och kategori måste fyllas i.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const projectData = {
        title: title.trim(),
        description: description.trim(),
        category,
        image: previewImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop',
        ...(uploadResult && { storage_path: uploadResult.storagePath })
      };

      if (initialProject) {
        const success = await updateProject(initialProject.id, projectData);
        if (success && onComplete) {
          onComplete();
        }
      } else {
        const newProject = await addProject(projectData);
        if (newProject) {
          // Reset form
          setTitle('');
          setDescription('');
          setCategory('');
          setPreviewImage('');
          setUploadResult(null);
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
    setPreviewImage('');
    setUploadResult(null);
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
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Förhandsvisning"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                    disabled={isUploading}
                  >
                    <X size={16} />
                  </Button>
                  {uploadResult && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Komprimerad: {(uploadResult.compressedSize / 1024).toFixed(1)}KB
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {isUploading ? (
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${uploadProgress.progress}%` }}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent mb-2" />
                        <p className="text-sm text-gray-600 font-medium">{uploadProgress.stage}</p>
                        <p className="text-xs text-gray-500">{uploadProgress.progress}%</p>
                      </div>
                    </div>
                  ) : (
                    <>
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
                            disabled={isUploading}
                          />
                        </Label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Alla bildformat, optimerad komprimering till &lt;500KB
                      </p>
                    </>
                  )}
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
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting ? 'Sparar...' : initialProject ? 'Uppdatera projekt' : 'Lägg till projekt'}
        </Button>
      </div>
    </form>
  );
};

export default AdminProjectForm;
